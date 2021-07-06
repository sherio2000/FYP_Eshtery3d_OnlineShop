namespace API.Dtos
{
    public class UserDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string BirthDate { get; set; }
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public bool Reviewed { get; set; }
        public string Gender { get; set; }
    }
}