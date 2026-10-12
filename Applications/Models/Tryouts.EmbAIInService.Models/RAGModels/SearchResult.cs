namespace Tryouts.EmbAIInService.Models.RAGModels
{
    //public class SearchResult
    //{
    //    public string Id { get; }
    //    public float Score { get; }
    //    public object Payload { get; }

    //    public SearchResult(string id, float score, object payload)
    //    {
    //        Id = id;
    //        Score = score;
    //        Payload = payload;
    //    }
    //}

    public class SearchResult
    {
        public string Id { get; }
        public float Score { get; }
        public Dictionary<string, object>? Payload { get; }
        public float[]? Vector { get; }

        public SearchResult(
            string id,
            float score,
            Dictionary<string, object>? payload = null,
            float[]? vector = null)
        {
            Id = id;
            Score = score;
            Payload = payload;
            Vector = vector;
        }
    }
}
