namespace notebook_api.Contracts
{
    // Class used to centralize anything related with the API routes. 
    public class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = $"{Root}/{Version}";
    
        
        public static class Notes
        {
            public const string Create = $"{Base}/notes";
            public const string GetAll = $"{Base}/notes";
            public const string FindOneById = $"{Base}/notes/{{id:int}}";
            public const string UpdateOneById = $"{Base}/notes/{{id:int}}";

        }
    }
}
