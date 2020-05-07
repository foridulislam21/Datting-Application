using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Abstractions.Repository.Base;
using DatingApp.Models;
using DatingApp.Models.PaginationHelper;

namespace DatingApp.Abstractions.Repository
{
    public interface IMessageRepository : IRepository<Message>
    {
        Task<PageList<Message>> GetMessagesforUser(MessagePrams messagePrams);
        Task<IEnumerable<Message>> GetMessageThread(long userId, long recipientId);
    }
}