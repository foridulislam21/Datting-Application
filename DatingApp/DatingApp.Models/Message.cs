using System;
namespace DatingApp.Models
{
    public class Message
    {
        public long Id { get; set; }
        public long SenderId { get; set; }
        public User Sender { get; set; }
        public long RecipientId { get; set; }
        public User Recipient { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}