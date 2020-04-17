using System.ComponentModel.DataAnnotations;

namespace DatingApp.Models.DTOs
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password Must Be Between 4 to 8 Characters")]
        public string Password { get; set; }
    }
}