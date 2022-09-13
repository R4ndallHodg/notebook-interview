using notebook_api.Contracts.V1.Requests;
using notebook_api.Domain;

namespace notebook_api.Services
{
    public interface INoteService
    {
        Task<List<Note>> GetNotesAsync(Filter filter);
        Task<Note> GetNoteAsync(int id);
        Task<bool> CreateNoteAsync(Note note);
        Task<bool> UpdateNoteAsync(Note note);

    }
}
