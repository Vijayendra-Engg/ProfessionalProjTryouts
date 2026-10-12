using Qdrant.Client;
using Qdrant.Client.Grpc;
using Tryouts.EmbAIInService.Interfaces.RAGServices;
using Tryouts.EmbAIInService.Models.RAGModels;

namespace Tryouts.EmbAIInService.RAGServices.Implementations
{
    public class QdrantVectorStore : IVectorStore
    {
        private readonly QdrantClient _qdrantClient;

        private const string COLLECTION_NAME = "my_collection";

        public QdrantVectorStore(QdrantClient qdrantClient) => _qdrantClient = qdrantClient;
        
        public async Task UpsertAsync(string id, float[] embedding, object payload)
        {
            var point = new PointStruct
            {
                Id = new PointId(),
                Vectors = embedding,
                //Payload = payload 
            };
            await _qdrantClient.UpsertAsync(
                collectionName: COLLECTION_NAME, 
                points: new[] 
                { 
                    point
                });
        }

        public async Task<List<SearchResult>> QueryAsync(float[] embedding, ulong topN)
        {
            var results = await _qdrantClient.SearchAsync(
                collectionName: COLLECTION_NAME, 
                vector: embedding, 
                limit: topN);

            return results.Select(r => new SearchResult(id: r.Id.ToString(), score: r.Score)).ToList();
        }

        public async Task CreateNewCollectionAsync(string collectionName, VectorParams vectorParams)
        {
            await _qdrantClient.CreateCollectionAsync(
                collectionName: collectionName,
                vectorsConfig: vectorParams);
        }

        public async Task CreateNewCollectionAsync(
            string collectionName, 
            ulong vectorSize = 786,
            Distance distance = Distance.Cosine)
        {
            await _qdrantClient.CreateCollectionAsync(
                collectionName: collectionName,
                vectorsConfig: new VectorParams
                {
                    Size = vectorSize,
                    Distance = distance
                });
        }
    }
}
