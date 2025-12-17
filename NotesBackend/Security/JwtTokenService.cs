using Microsoft.IdentityModel.Tokens;
using NotesBackend.Models;
using System.Security.Claims;
using System.Text;

namespace NotesBackend.Security
{
    public class JwtTokenService
    {
        public static string GenerateToken(string email, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("rIAzo6rJIfHJEM5gHmIki1xgi9LQB37L"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email), 
                new Claim(ClaimTypes.Role, role)
            };

            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: "MyNotes",
                audience: "MyNotesWeb",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}