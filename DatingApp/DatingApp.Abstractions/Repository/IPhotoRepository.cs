using System.Threading.Tasks;
using DatingApp.Abstractions.Repository.Base;
using DatingApp.Models;

namespace DatingApp.Abstractions.Repository
{
    public interface IPhotoRepository : IRepository<Photo>
    {
        Task<Photo> GetMainPhotoForUser(long userId);
    }
}