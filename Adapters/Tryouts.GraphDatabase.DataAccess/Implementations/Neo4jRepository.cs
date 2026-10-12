using Neo4j.Driver;

namespace Tryouts.GraphDatabase.DataAccess.Implementations
{
    public sealed class Neo4jRepository : IAsyncDisposable
    {
        private readonly IDriver _driver;

        public Neo4jRepository(string uri, string username, string password) => 
            _driver = Neo4j.Driver.GraphDatabase.Driver(uri, AuthTokens.Basic(username, password));

        public async Task<IReadOnlyList<string>> GetPersonNamesAsync(
            CancellationToken cancellationToken = default)
        {
            await using var session = _driver.AsyncSession();

            var result = await session.RunAsync("MATCH (p:Person) RETURN p.name AS name");

            var records = await result.ToListAsync(cancellationToken);
            
            return records
                .Select(r => r["name"].As<string>())
                .ToList();
        }

        public async ValueTask DisposeAsync()
        {
            await _driver.DisposeAsync();
        }
    }
}
