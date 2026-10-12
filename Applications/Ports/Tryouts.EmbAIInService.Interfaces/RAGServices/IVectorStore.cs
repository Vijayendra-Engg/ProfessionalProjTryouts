using Tryouts.EmbAIInService.Models.RAGModels;

namespace Tryouts.EmbAIInService.Interfaces.RAGServices
{
    public interface IVectorStore
    {
        Task UpsertAsync(string id, float[] embedding, object payload);
        Task<List<SearchResult>> QueryAsync(float[] embedding, ulong topN);
    }
}
