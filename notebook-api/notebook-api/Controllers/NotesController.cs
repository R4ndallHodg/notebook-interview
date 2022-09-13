using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using notebook_api.Data;
using notebook_api.Contracts;
using notebook_api.Contracts.V1.Requests;
using notebook_api.Contracts.V1.Responses;
using notebook_api.Domain;
using notebook_api.Services;

namespace notebook_api.Controllers
{
    [ApiController]
    public class NotesController: ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IMapper _mapper;

        public NotesController(ApplicationDbContext context, IMapper mapper, INoteService noteService)
        {
            _mapper = mapper;
            _noteService = noteService;
        }

        [HttpGet(ApiRoutes.Notes.GetAll)]
        public async Task<ActionResult<List<NoteResponse>>> Get([FromQuery] Filter filter)
        {
            // Using note service`s method GetNotesAsync which receives a Filter Object to search by an specific criteria
            // and this method returns a List of notes.
            List<Note> notes = await _noteService.GetNotesAsync(filter);

            // Mapping the notes received to the response type.
            List<NoteResponse> response = _mapper.Map<List<NoteResponse>>(notes);
            return Ok(response);
        }

        [HttpGet(ApiRoutes.Notes.FindOneById, Name = "getNoteById")]
        public async Task<ActionResult<NoteResponse>> Get(int id)
        {
            // Using note service`s method GetNoteAsync which receives an id as a parameter and returns a note object
            // if the resource is found it returns the first coincidence else it will return a null value.
            Note note = await _noteService.GetNoteAsync(id);

            // Returning not found resource (404) or the element. This condition is going to depend on if we found the element or not.
            return note is null ? 
                NotFound($"The note with id {id} was not found") :
                _mapper.Map<NoteResponse>(note);
        }

        [HttpPost(ApiRoutes.Notes.Create)]
        public async Task<ActionResult> CreatePost([FromBody] CreateNoteRequest createNoteRequest)
        {

            // Mapping type from CreateNoteRequest to Note so we can pass this value to the note service.
            Note note = _mapper.Map<Note>(createNoteRequest);

            // Checking if the service could successfully create a new note in the database. In case that a mistake happens we return a bad request error
            // Indicating to the user that something went wrong with the petition.
            bool created = await _noteService.CreateNoteAsync(note);

            if (!created)
                return BadRequest("Unable to create note :/");

            NoteResponse noteResponse = _mapper.Map<NoteResponse>(note);
            return CreatedAtRoute("getNoteById", new { id = noteResponse.Id}, noteResponse);
        }

        [HttpPut(ApiRoutes.Notes.UpdateOneById)]
        public async Task<ActionResult> Put(int id, [FromBody] CreateNoteRequest noteUpdate)
        {
            
            Note note = _mapper.Map<Note>(noteUpdate);
            note.Id = id;

            // Checking if the service could successfully create a new note in the database. In case that a mistake happens we return a not found error
            bool updated = await _noteService.UpdateNoteAsync(note);

            if(updated)
                return NoContent();

            return NotFound($"The Note with id: ${id} was not found" );
        } 
    }
}
