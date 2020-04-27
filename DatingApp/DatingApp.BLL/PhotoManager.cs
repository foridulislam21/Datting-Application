using System.Threading.Tasks;
using DatingApp.Abstractions.BLL;
using DatingApp.Abstractions.Repository;
using DatingApp.BLL.Base;
using DatingApp.Models;

namespace DatingApp.BLL
{
    public class PhotoManager : Manager<Photo>, IPhotoManager
    {
        private readonly IPhotoRepository _repo;
        public PhotoManager(IPhotoRepository repo) : base(repo)
        {
            _repo = repo;
        }

        public async Task<Photo> GetMainPhotoForUser(long userId)
        {
            return await _repo.GetMainPhotoForUser(userId);
        }
    }
}