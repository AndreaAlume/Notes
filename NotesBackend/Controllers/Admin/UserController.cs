using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesBackend.Models;
using NotesBackend.Models.Dtos;
using NotesBackend.Services.Mappers;


namespace NotesBackend.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/users/id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        // POST api/users
        [HttpPost]
        public async Task<IActionResult >Post([FromBody] AdminDto admin)
        {
            var adminDto = AdminMapper.ConvertToDto(admin);
            adminDto.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(admin.Password, 8);
            var adminVerify = _context.Users.Add(adminDto);
            await _context.SaveChangesAsync();
            return Ok($"{admin.Name} creato correttamente");
        }

        // PUT api/users/id
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] User user)
        {
            var value = await _context.Users.FindAsync(id);
            if (value == null) return NotFound();

            user.Name = user.Name;
            user.Email = user.Email;
            user.Password = user.Password;
            user.Role = user.Role;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/users/id
        [HttpDelete("{id:int}")]
        public async  Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
