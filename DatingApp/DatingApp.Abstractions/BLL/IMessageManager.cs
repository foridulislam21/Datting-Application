using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Abstractions.BLL.Base;
using DatingApp.Models;
using DatingApp.Models.PaginationHelper;

namespace DatingApp.Abstractions.BLL
{
    public interface IMessageManager : IManager<Message>
    {
         Task<PageList<Message>> GetMessagesforUser(MessagePrams messagePrams);
         Task<IEnumerable<Message>> GetMessageThread(long userId, long recipientId);
    }
}