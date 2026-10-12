using Microsoft.ML.OnnxRuntime;
using Tryouts.EmbAIInService.Interfaces.AIServices;

namespace Tryouts.EmbAIInService.AIServices.Implementations
{
    public class OnnxEmbeddingService : IEmbeddingService
    {
        private readonly InferenceSession _inferenceSession;

        public OnnxEmbeddingService(string modelPath)
        {
            _inferenceSession = new InferenceSession(modelPath);
        }

        public float[] GenerateEmbedding(string text)
        {
            // Tokenize and run inference
            // This is a placeholder for the actual tokenization logic.
            // This will depend on the specific tokenizer used by the model.
            NamedOnnxValue input = null; // = Tokenize(text);

            IReadOnlyCollection<NamedOnnxValue> inputs = new List<NamedOnnxValue> { input };
            return _inferenceSession.Run(inputs).First().Value as float[];
        }
    }
}
