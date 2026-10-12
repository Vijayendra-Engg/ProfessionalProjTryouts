namespace Tryouts.EmbAIInService.BusinessServices.Interfaces
{
    public interface IRAGQueryHandler
    {
        Task<string> HandleQueryAsync(string query, ulong topN = 5);

        Task<string> GenerateAnswerAsync(string query, string context, ulong topN = 5);
    }
}
