using Microsoft.AspNetCore.Mvc;
using NotesBackend.Models;
using NotesBackend.Models.Dtos;
using System.Reflection.Metadata.Ecma335;

namespace NotesBackend.Security
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto user)
        {
            
            var cred = _context.Users.FirstOrDefault(u => u.Email == user.Email);

            if (cred == null) { return Unauthorized("Credenziali non valide"); }

            else if (user.Password != null)
            {
                var passwordVerify = BCrypt.Net.BCrypt.EnhancedVerify(user.Password, cred.Password);

                if (passwordVerify)
                {
                    var token = JwtTokenService.GenerateToken(cred.Email, cred.Role);
                    return Ok(new { token = token });
                }
            }
            else if (user.GoogleId != null)
            {
                var googleIdVerify = _context.Users.FirstOrDefault(u => u.GoogleId == user.GoogleId);
                if (googleIdVerify != null) 
                {
                    var token = JwtTokenService.GenerateToken(cred.Email, cred.Role);
                    return Ok(new { token = token });
                }
            }

            return BadRequest("Credenziali non valide");
        }

    }
}
