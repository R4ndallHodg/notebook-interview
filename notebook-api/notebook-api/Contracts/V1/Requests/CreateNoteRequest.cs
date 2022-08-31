namespace notebook_api.Contracts.V1.Requests
{
    public class CreateNoteRequest
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime Date { get; set; }
    }
}
