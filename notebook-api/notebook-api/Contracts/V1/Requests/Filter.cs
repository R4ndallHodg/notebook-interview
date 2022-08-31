namespace notebook_api.Contracts.V1.Requests
{
    public class Filter
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public string OrderField { get; set; }
        public bool OrderAsc { get; set; } = true;
    }
}
