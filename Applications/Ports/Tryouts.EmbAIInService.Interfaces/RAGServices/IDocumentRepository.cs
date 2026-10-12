using Tryouts.EmbAIInService.Models.RAGModels;

namespace Tryouts.EmbAIInService.Interfaces.RAGServices
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetDocumentsAsync();
        Task<bool> AddDocumentAsync(Document document);
        Task<bool> UpdateDocumentAsync(Document document);
        Task<bool> DeleteDocumentAsync(string documentId);
    }
}
