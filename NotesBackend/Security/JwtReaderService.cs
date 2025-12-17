namespace NotesBackend.Security
{
    public class JwtReaderService
    {
        private readonly Jwt _settings;

        public JwtReaderService(Jwt settings)
        {
            _settings = settings;
        }

        public string GetJwtKey()
        {
            return _settings.SecretKey;
        }
    }
}

