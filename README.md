                         ┌────────────────────────────┐
                         │        API LAYER           │
                         │  (HTTP, gRPC, SignalR)     │
                         └────────────┬───────────────┘
                                      │
                                      ▼
                         ┌────────────────────────────┐
                         │     APPLICATION LAYER      │
                         │  (Use Cases / Orchestration│
                         │   + SK Agents & Plugins)   │
                         └────────────┬───────────────┘
                                      │ Ports (Interfaces)
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌────────────────┐           ┌────────────────────┐        ┌────────────────────┐
│  AI Services   │           │   RAG Services     │        │  Persistence Ports │
│  Ports         │           │  Ports             │        │  (Repositories,    │
│ (IChat, IEmbed,│           │ (IRagQuery,        │        │   IUnitOfWork)     │
│  IGen, IAgent) │           │  IVectorStore)     │        └────────────────────┘
└────────────────┘           └────────────────────┘

        ▲                             ▲                             ▲
        │ Adapters                    │ Adapters                    │ Adapters
        │ (Infrastructure)            │ (Infrastructure)            │ (Infrastructure)
        │                             │                             │
┌────────────────────────┐  ┌────────────────────────────┐  ┌────────────────────────────┐
│  Semantic Kernel        │  │  RAG + Vector Store        │  │  PostgreSQL (EF Core,     │
│  (Microsoft.Semantic-   │  │  (pgvector, SK Memory,     │  │  Npgsql, Row-Level Sec)   │
│   Kernel + Abstractions)│  │   Document Store)          │  └────────────────────────────┘
│  - Kernel               │  │  - IVectorStore impl       │
│  - Agents               │  │  - Chunking, indexing      │
│  - Plugins              │  │  - Retrieval pipeline      │
└─────────┬───────────────┘  └──────────────┬────────────┘
          │                                  │
          │                                  │
          ▼                                  ▼
┌────────────────────────┐        ┌────────────────────────────┐
│ ONNX Local Models      │        │ External LLMs (optional)   │
│ (ONNX Runtime, SK      │        │ OpenAI / Azure OpenAI      │
│  ONNX connector)       │        │ via SK connectors          │
└────────────────────────┘        └────────────────────────────┘
