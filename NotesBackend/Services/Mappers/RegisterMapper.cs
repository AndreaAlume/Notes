using NotesBackend.Models.Dtos;
using NotesBackend.Models;

namespace NotesBackend.Services.Mappers
{
    public class RegisterMapper
    {
        private RegisterMapper() { }

        public static User ConvertToDto(RegisterDto user)
        {
            return new User
            {
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Role = "User"
            };
        }
    }
}
