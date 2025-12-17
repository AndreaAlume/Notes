using Microsoft.AspNetCore.Mvc;
using NotesBackend.Models;
using NotesBackend.Models.Dtos;

namespace NotesBackend.Security
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto user)
        {
            var cred = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (cred == null || cred.Password != user.Password) 
            {
                return Unauthorized("Credenziali non valide");
            }
            var token = JwtTokenService.GenerateToken(user.Email);
            return Ok(new { token = token });
        }

    }
}
