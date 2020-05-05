using System.Threading.Tasks;
using DatingApp.Abstractions.BLL;
using DatingApp.Abstractions.Repository;
using DatingApp.BLL.Base;
using DatingApp.Models;

namespace DatingApp.BLL
{
    public class LikeManager : Manager<Like>, ILikeManager
    {
        private readonly ILikeRepository _repo;
        public LikeManager(ILikeRepository repo) : base(repo)
        {
            _repo = repo;
        }

        public async Task<Like> GetLike(long userId, long recipientId)
        {
            return await _repo.GetLike(userId, recipientId);
        }
    }
}