using NotesBackend.Models;
using NotesBackend.Models.Dtos;

namespace NotesBackend.Services.Mappers
{
    public class LoginMapper
    {
        private LoginMapper() { }

        public static LoginDto ConvertToDto(User user)
        {
            return new LoginDto
            {
                Email = user.Email,
                Password = user.Password,
                GoogleId = user.GoogleId
            };
        }
    }
}
