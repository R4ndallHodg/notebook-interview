namespace notebook_api.Contracts.V1.Requests
{
    public class Filter
    {
        public string OrderField { get; set; }
        public bool OrderAsc { get; set; } = true;
    }
}
