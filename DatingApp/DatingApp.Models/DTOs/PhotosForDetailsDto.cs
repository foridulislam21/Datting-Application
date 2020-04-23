using System;

namespace DatingApp.Models.DTOs
{
    public class PhotosForDetailsDto
    {
        public long Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public long UserId { get; set; }
    }
}