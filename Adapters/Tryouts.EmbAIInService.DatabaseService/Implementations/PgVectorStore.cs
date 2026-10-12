using Tryouts.EmbAIInService.Interfaces.RAGServices;
using Tryouts.EmbAIInService.Models.RAGModels;

namespace Tryouts.EmbAIInService.RAGServices.Implementations
{
    public class PGVectorStore : IVectorStore
    {
        public Task<List<SearchResult>> QueryAsync(float[] embedding, ulong topN)
        {
            throw new NotImplementedException();
        }

        public Task UpsertAsync(string id, float[] embedding, object payload)
        {
            throw new NotImplementedException();
        }
    }
}
