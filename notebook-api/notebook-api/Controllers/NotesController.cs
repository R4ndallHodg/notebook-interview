using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using notebook_api.Contracts;
using notebook_api.Contracts.V1.Requests;
using notebook_api.Contracts.V1.Responses;
using notebook_api.Data;
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
            IQueryable<Note> notesQueryable = _context.Notes.AsQueryable();
            if(!string.IsNullOrEmpty(filter.OrderField))
            {
                string orderType = filter.OrderAsc ? "ascending" : "descending";
                notesQueryable = notesQueryable.OrderBy($"{filter.OrderField} {orderType}");
            }

            List<Note> notes = await notesQueryable.ToListAsync();
            return _mapper.Map<List<NoteResponse>>(notes);
        }

        [HttpPost(ApiRoutes.Notes.Create)]
        public async Task<ActionResult> CreatePost([FromBody] CreateNoteRequest createNoteRequest)
        {
            // Checking if there is a note with the same title
            bool existsNoteWithTheSameTitle = await _context.Notes.AnyAsync(note => note.Title == createNoteRequest.Title);
            if (existsNoteWithTheSameTitle) return BadRequest($"There is already an author with the name {createNoteRequest.Title}");

            // Mapping type from CreateNoteRequest to Note so entity framework can save it
            Note note = _mapper.Map<Note>(createNoteRequest);
            _context.Add(note);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
