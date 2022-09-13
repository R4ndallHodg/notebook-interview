using AutoMapper;
using Microsoft.EntityFrameworkCore;
using notebook_api.Contracts.V1.Requests;
using notebook_api.Contracts.V1.Responses;
using notebook_api.Data;
using notebook_api.Domain;
using System.Linq.Dynamic.Core;

namespace notebook_api.Services
{
    public class NoteService: INoteService
    {
        private readonly ApplicationDbContext _context;

        public NoteService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Note>> GetNotesAsync(Filter filter)
        {
            // Returning the notes collection as a Queryable collection so we can manipulate its information.
            IQueryable<Note> notesQueryable = _context.Notes.AsQueryable();

            // Checking which operation is the one that the user wants to do so we can manipulate the data correctly.
            if (!string.IsNullOrEmpty(filter.Title))
            {
                notesQueryable = notesQueryable.Where(x => x.Title.Contains(filter.Title));
            }

            if (!string.IsNullOrEmpty(filter.Body))
            {
                notesQueryable = notesQueryable.Where(x => x.Body.Contains(filter.Body));
            }

            if (!string.IsNullOrEmpty(filter.OrderField))
            {
                // Checking if the user wants to get the data in an ascending or descending order.
                string orderType = filter.OrderAsc ? "ascending" : "descending";
                // Method included with the nuget package System.Linq.Dynamic.Core. Here we pass the field and the order in which we want to sort the elements from the queryable.
                notesQueryable = notesQueryable.OrderBy($"{filter.OrderField} {orderType}");
            }

            // Maping to the return type and returning the data.
            List<Note> notes = await notesQueryable.ToListAsync();
            return notes;
        }

        public async Task<Note> GetNoteAsync(int id)
        {
            // Returning a singular note or null in case that we don`t found the resource in the database
            return await _context.Notes.AsNoTracking().FirstOrDefaultAsync(note => note.Id == id);
        }

        public async Task<bool> CreateNoteAsync(Note note)
        {
            // Adding the resource to the database. Saving the changes and checking if we wrote more than 0 entities to the database.
            await _context.Notes.AddAsync(note);
            int created = await _context.SaveChangesAsync();
            return created > 0;
        }


        public async Task<bool> UpdateNoteAsync(Note note)
        {
            // Updating the resource on the database. Saving the changes and checking if we wrote more than 0 entities to the database.
            _context.Notes.Update(note);
            int updated = await _context.SaveChangesAsync();
            return updated > 0;
        }

    }
}
