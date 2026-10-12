using Npgsql;
using Tryouts.EmbAIInService.Interfaces.RAGServices;
using Tryouts.EmbAIInService.Models.RAGModels;

namespace Tryouts.EmbAIInService.RAGServices.Implementations
{
    public class PgDocumentRepository : IDocumentRepository
    {
        private readonly NpgsqlConnection _connection;

        public PgDocumentRepository(string connectionString)
        {
            _connection = new NpgsqlConnection(connectionString);
        }

        public async Task<IEnumerable<Document>> GetDocumentsAsync()
        {
            List<Document> documents;

            await _connection.OpenAsync();

            using (var cmd = new NpgsqlCommand("SELECT id, content, metadata FROM documents", _connection))
            using (var reader = await cmd.ExecuteReaderAsync())
            {
                documents = new List<Document>();
                while (await reader.ReadAsync())
                {
                    documents.Add(new Document
                    {
                        Id = reader.GetString(0),
                        Content = reader.GetString(1),
                        Metadata = reader.GetString(2)
                    });
                }
            }

            await _connection.CloseAsync();
            return documents;
        }

        public async Task<bool> AddDocumentAsync(Document document)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteDocumentAsync(string documentId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateDocumentAsync(Document document)
        {
            throw new NotImplementedException();
        }
    }
}
