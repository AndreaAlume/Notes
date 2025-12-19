using NotesBackend.Models;
using NotesBackend.Models.Dtos;

namespace NotesBackend.Services.Mappers
{
    public class AdminMapper
    {
        private AdminMapper() { }

        public static User ConvertToDto(AdminDto admin)
        {
            return new User
            {
                Name = admin.Name,
                Email = admin.Email,
                Password = admin.Password,
                Role = "Admin"
            };
        }
    }
}
