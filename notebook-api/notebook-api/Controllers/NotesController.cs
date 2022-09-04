using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using notebook_api.Data;
using notebook_api.Contracts;
using notebook_api.Contracts.V1.Requests;
using notebook_api.Contracts.V1.Responses;
using notebook_api.Domain;
using System.Linq.Dynamic.Core;

namespace notebook_api.Controllers
{
    [ApiController]
    public class NotesController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public NotesController(ApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        [HttpGet(ApiRoutes.Notes.GetAll)]
        public async Task<ActionResult<List<NoteResponse>>> Get([FromQuery] Filter filter)
        {
            // Returning the notes collection as a Queryable collection so we can manipulate its information.
            IQueryable<Note> notesQueryable = _context.Notes.AsQueryable();

            // Checking which operation is the one that the user wants to do so we can manipulate the data correctly.
            if(!string.IsNullOrEmpty(filter.Title))
            {
                notesQueryable = notesQueryable.Where(x => x.Title.Contains(filter.Title));
            }

            if(!string.IsNullOrEmpty(filter.Body))
            {
                notesQueryable = notesQueryable.Where(x => x.Body.Contains(filter.Body));
            }

            if(!string.IsNullOrEmpty(filter.OrderField))
            {
                // Checking if the user wants to get the data in an ascending or descending order.
                string orderType = filter.OrderAsc ? "ascending" : "descending";
                // Method included with the nuget package System.Linq.Dynamic.Core. Here we pass the field and the order in which we want to sort the elements from the queryable.
                notesQueryable = notesQueryable.OrderBy($"{filter.OrderField} {orderType}");
            }

            // Maping to the return type and returning the data.
            List<Note> notes = await notesQueryable.ToListAsync();
            return _mapper.Map<List<NoteResponse>>(notes);
        }

        [HttpGet(ApiRoutes.Notes.FindOneById, Name = "getNoteById")]
        public async Task<ActionResult<NoteResponse>> Get(int id)
        {
            // Using first or default to find the element. If we dont find any element that matches the id then is going to return null.
            Note note = await _context.Notes.AsNoTracking().FirstOrDefaultAsync(note => note.Id == id);

            // Returning not found resource (404) or the element. This condition is going to depend on if we found the element or not.
            return note is null ? NotFound($"The note with id {id} was not found") : _mapper.Map<NoteResponse>(note);
        }

        [HttpPost(ApiRoutes.Notes.Create)]
        public async Task<ActionResult> CreatePost([FromBody] CreateNoteRequest createNoteRequest)
        {
            // Checking if there is already a note with the same title.
            bool existsNoteWithTheSameTitle = await _context.Notes.AnyAsync(note => note.Title == createNoteRequest.Title);
            if (existsNoteWithTheSameTitle) return BadRequest($"There is already a note with the title {createNoteRequest.Title}");

            // Mapping type from CreateNoteRequest to Note so entity framework can save it.
            Note note = _mapper.Map<Note>(createNoteRequest);
            _context.Add(note);
            await _context.SaveChangesAsync();
            NoteResponse noteResponse = _mapper.Map<NoteResponse>(note);
            return CreatedAtRoute("getNoteById", new { id = noteResponse.Id}, noteResponse);
        }

        [HttpPut(ApiRoutes.Notes.UpdateOneById)]
        public async Task<ActionResult> Put(int id, [FromBody] CreateNoteRequest noteUpdate)
        {
            // Checking if there is a record with the given id.
            bool existsNote = await _context.Notes.AnyAsync(x => x.Id == id);
            if (!existsNote) return NotFound($"Note with id {id} was not found");

            // Mapping the Note received as a parameter. And changing its status as modified so entity framework can update the record.
            Note note = _mapper.Map<Note>(noteUpdate);
            note.Id = id;
            _context.Entry(note).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        } 
    }
}
