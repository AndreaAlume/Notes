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
            var passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, 8);
            var passwordVerify = BCrypt.Net.BCrypt.EnhancedVerify("Ciao", passwordHash);
            
            var cred = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            
            if (cred == null || passwordVerify != false) 
            {
                return Unauthorized("Credenziali non valide");
            }
            var token = JwtTokenService.GenerateToken(cred.Email, cred.Role);
            return Ok(new { token = token });
        }

    }
}
