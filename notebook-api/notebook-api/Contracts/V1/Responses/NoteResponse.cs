namespace notebook_api.Contracts.V1.Responses
{
    public class NoteResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime Date { get; set; }
    }
}
