using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Abstractions.BLL;
using DatingApp.Abstractions.Repository;
using DatingApp.BLL.Base;
using DatingApp.Models;
using DatingApp.Models.PaginationHelper;

namespace DatingApp.BLL
{
    public class MessageManager : Manager<Message>, IMessageManager
    {
        private readonly IMessageRepository _repo;
        public MessageManager(IMessageRepository repo) : base(repo)
        {
            _repo = repo;

        }
        public async Task<PageList<Message>> GetMessagesforUser(MessagePrams messagePrams)
        {
            return await _repo.GetMessagesforUser(messagePrams);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(long userId, long recipientId)
        {
            return await _repo.GetMessageThread(userId, recipientId);
        }
    }
}