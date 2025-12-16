using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotesBackend.Models.Dtos
{
    public class NoteDto
    {
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public DateOnly CreatedAt { get; set; }

        public DateOnly? ExpiryDate { get; set; }

        public bool Deleted { get; set; }

        public string? Tag { get; set; }

        public int UserId { get; set; }
    }
}
