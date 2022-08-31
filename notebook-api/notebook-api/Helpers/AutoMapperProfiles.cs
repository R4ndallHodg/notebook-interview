using AutoMapper;
using notebook_api.Contracts.V1.Requests;
using notebook_api.Contracts.V1.Responses;
using notebook_api.Domain;

namespace notebook_api.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<CreateNoteRequest, Note>();
            CreateMap<Note, NoteResponse>();
        }
    }
}
