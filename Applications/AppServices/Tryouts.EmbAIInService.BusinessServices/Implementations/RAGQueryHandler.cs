using Tryouts.EmbAIInService.BusinessServices.Interfaces;
using Tryouts.EmbAIInService.Interfaces.AIServices;
using Tryouts.EmbAIInService.Interfaces.RAGServices;

namespace Tryouts.EmbAIInService.BusinessServices.Implementations
{
    public class RAGQueryHandler : IRAGQueryHandler
    {
        private readonly IEmbeddingService _embeddingService;
        private readonly IVectorStore _vectorStore;
        private readonly IDocumentRepository _documentRepository;

        public RAGQueryHandler(IEmbeddingService embeddingService, 
            IVectorStore vectorStore, 
            IDocumentRepository documentRepository)
        {
            _embeddingService = embeddingService;
            _vectorStore = vectorStore;
            _documentRepository = documentRepository;
        }

        public Task<string> GenerateAnswerAsync(string query, string context, ulong topN = 5)
        {
            // Call the LLM or local model here to generate an answer based on the query and context.
            return Task.FromResult($"Generated answer for query: '{query}' with context: '{context}'");
        }

        public async Task<string> HandleQueryAsync(string query, ulong topN = 5)
        {
            var embedding = _embeddingService.GenerateEmbedding(query);
            var results = await _vectorStore.QueryAsync(embedding, topN);

            var context = string.Join("\n", results.Select(r => r.Payload.ToString()));
            var response = await GenerateAnswerAsync(query, context, topN);
            return response;
        }
    }
}
