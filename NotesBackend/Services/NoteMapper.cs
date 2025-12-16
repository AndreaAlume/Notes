using NotesBackend.Models;
using NotesBackend.Models.Dtos;

namespace NotesBackend.Services
{
    public class NoteMapper
    {
        private NoteMapper() { }

        public static NoteDto ConvertToDto(Note note)
        {
            return new NoteDto
            {
                Name = note.Name,
                Description = note.Description,
                ExpiryDate = note.ExpiryDate,
                Deleted = note.Deleted,
                Tag = note.Tag,
                UserId = note.UserId
            }; 
        }

        public static List<NoteDto> ConvertToDtoList(List<Note> notes)
        {
            List<NoteDto> noteDtos = new List<NoteDto>();
            foreach (var note in notes)
            {
                noteDtos.Add(ConvertToDto(note));
            }
            return noteDtos;
        }

    }
}
