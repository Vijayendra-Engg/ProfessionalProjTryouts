import { Injectable, signal } from '@angular/core';
import * as duckdb from '@duckdb/duckdb-wasm';

@Injectable({
    providedIn: 'root',
})
export class DuckDBService {
    private db: duckdb.AsyncDuckDB | null = null;
    private connection: duckdb.AsyncDuckDBConnection | null = null;

    public isReady = signal<boolean>(false);
    public errorMessage = signal<string | null>(null);

    constructor() {
        this.initDatabase();
    }

    private async initDatabase() {
        try {
            // 1. Define bundle configuration (MVP / EH)
            // Usuall, worker and wasm assets are bundled or served from assets folder. Here we define the paths to the assets.
            const MANUAL_BUNDLES = {
                mvp: {
                    mainModule: '/assets/duckdb/duckdb-mvp.wasm',
                    mainWorker: '/assets/duckdb/duckdb-browser-mvp.worker.js',
                },
                eh: {
                    mainModule: '/assets/duckdb/duckdb-eh.wasm',
                    mainWorker: '/assets/duckdb/duckdb-browser-eh.worker.js',
                },
            };

            // 2. Selet the optimal bundle supported by the current browser
            const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

            // 3. Instantiate the Web Worker using the worker script from the bundle
            const worker = new Worker(bundle.mainWorker!);

            // 4. Initialize the DuckDB-WASM with logger and worker
            const logger = new duckdb.ConsoleLogger();
            this.db = new duckdb.AsyncDuckDB(logger, worker);
            await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);

            // 5. Open a shared connection to the database for running queries
            this.connection = await this.db.connect();

            this.isReady.set(true);
            console.log('DuckDB-WASM successfully initialized in Web Worker!');
        } catch (error: any) {
            console.error('Failed to initialize DuckDB:', error);
            this.errorMessage.set(error.message || 'Initialization error');
        }
    }

    public async query(sql: string): Promise<any[]> {
        if (!this.connection) {
            throw new Error('DuckDB connection is not initialized.');
        }

        const arrowTable = await this.connection.query(sql);
        return arrowTable.toArray().map((row) => row.toJSon());
    }

    public async insertJsonData(tableName: string, data: any[]): Promise<void> {
        if (!this.db || !this.connection) {
            throw new Error('DuckDB connection is not initialized.');
        }

        // Register data buffer as a file in DuckDB's virtual file system
        const jsonString = JSON.stringify(data);
        await this.db.registerFileText(`{tableName}.json`, jsonString);

        // Create table from the registered JSON file
        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} AS SELECT * FROM read_json_auto('{tableName}.json')
        `);
    }

    public async closeConnection() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}