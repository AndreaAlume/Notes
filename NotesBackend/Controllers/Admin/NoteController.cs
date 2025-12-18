using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesBackend.Models;
using NotesBackend.Models.Dtos;
using NotesBackend.Services.Mappers;
using System.Threading.Tasks;


namespace NotesBackend.Controllers.Admin
{
    [ApiController]
    [Route("api/notes")]
    public class NoteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NoteController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetAll()
        {
            List<Note> note = await _context.Notes.ToListAsync();

            List<NoteDto> noteDtos = NoteMapper.ConvertToDtoList(note);

            return noteDtos;
        }


        // GET api/notes/id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Note>> GetById(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound();
            return note;
        }

        // POST api/notes
        [HttpPost]
        public async Task<ActionResult<Note>> Post([FromBody] Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = note.Id }, note);
        }


        // PUT api/<ValuesController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] Note note)
        {
            if (id != note.Id) return BadRequest();

            _context.Entry(note).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE api/<ValuesController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound();

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
