namespace notebook_api.Contracts
{
    // Class used to centralize anything related with the API routes. 
    public static class ApiRoutes
    {
        private const string Root = "api";
        private const string Version = "v1";
        private const string Base = $"{Root}/{Version}";
    
        
        public static class Notes
        {
            public const string Create = $"{Base}/notes";
            public const string GetAll = $"{Base}/notes";
            public const string FindOneById = $"{Base}/notes/{{id:int}}";
            public const string UpdateOneById = $"{Base}/notes/{{id:int}}";

        }
    }
}
