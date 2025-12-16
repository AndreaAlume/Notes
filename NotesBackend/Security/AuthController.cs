using Microsoft.AspNetCore.Mvc;
using NotesBackend.Models.Dtos;

namespace NotesBackend.Security
{
    [Route("api/login")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        [HttpPost]
        public IActionResult Login([FromBody] LoginDto user)
        {
            if (user.Email == "andre" && user.Password == "andre")
            {
                var token = JwtTokenService.GenerateToken(user.Email);
                return Ok(new { token = token });
            }
            
            return Unauthorized("Credenziali non valide");
        }
    }
}
