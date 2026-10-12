namespace Tryouts.EmbAIInService.Interfaces.AIServices
{
    public interface IEmbeddingService
    {
        float[] GenerateEmbedding(string text);
    }
}
