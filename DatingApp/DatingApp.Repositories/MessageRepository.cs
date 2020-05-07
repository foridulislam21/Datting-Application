using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DatingApp.Abstractions.Repository;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Models.PaginationHelper;
using DatingApp.Repositories.Base;

using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repositories
{
    public class MessageRepository : EfRepository<Message>, IMessageRepository
    {
        private readonly DatingAppData _db;
        public MessageRepository(DbContext db) : base(db)
        {
            _db = db as DatingAppData;

        }
        public async override Task<Message> GetById(long id)
        {
            return await _db.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }
        public async Task<PageList<Message>> GetMessagesforUser(MessagePrams messagePrams)
        {
            var messages = _db.Messages
                .Include(u => u.Sender).ThenInclude(p => p.Photos)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos).AsQueryable();

            switch (messagePrams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messagePrams.UserId);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messagePrams.UserId);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messagePrams.UserId && u.IsRead == false);
                    break;
            }
            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PageList<Message>.CreateAsync(messages, messagePrams.PageNumber, messagePrams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(long userId, long recipientId)
        {
            var messages = await _db.Messages
                .Include(m => m.Sender).ThenInclude(p => p.Photos)
                .Include(m => m.Recipient).ThenInclude(p => p.Photos)
                .Where(u => u.RecipientId == userId && u.SenderId == recipientId ||
                    u.RecipientId == recipientId && u.SenderId == userId)
                .OrderByDescending(m => m.MessageSent).ToListAsync();
            return messages;
        }
    }
}