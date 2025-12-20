using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotesBackend.Models;
using NotesBackend.Models.Dtos;
using NotesBackend.Services.Mappers;

namespace NotesBackend.Controllers
{
    [Route("api/registration")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = RegisterMapper.ConvertToDto(registerDto);

            if (user.Password != null)
            {
                user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, 8);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user.Email);
            }
            else
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok($"Utente: {user.Name} creato correttamente");
            }
        }
    }
}
