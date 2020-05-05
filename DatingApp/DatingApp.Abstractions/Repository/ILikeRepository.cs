using System.Threading.Tasks;
using DatingApp.Abstractions.Repository.Base;
using DatingApp.Models;

namespace DatingApp.Abstractions.Repository
{
    public interface ILikeRepository : IRepository<Like>
    {
        Task<Like> GetLike(long userId, long recipientId);
    }
}