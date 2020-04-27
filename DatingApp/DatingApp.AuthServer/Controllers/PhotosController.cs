using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Abstractions.BLL;
using DatingApp.Configurations.Helpers;
using DatingApp.DbServer;
using DatingApp.Models;
using DatingApp.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DatingApp.AuthServer.Controllers
{
    [Authorize]
    [Route("api/user/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoManager _photoManager;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IUserManager _userManager;
        private Cloudinary _cloudinary;

        public PhotosController(
            IPhotoManager photoManager,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig,
            IUserManager userManager
        )
        {
            _cloudinaryConfig = cloudinaryConfig;
            _userManager = userManager;

            _mapper = mapper;
            _photoManager = photoManager;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoto(long id)
        {
            var photoFromRepo = await _photoManager.GetById(id);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photo);
        }
        // GET api/photos
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(long userId, [FromForm] PhotoForCreationDto creationDto)
        {
            if (userId != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _userManager.GetById(userId);

            var file = creationDto.File;

            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadPrams = new ImageUploadParams()
                    {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation()
                    .Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadPrams);

                }
            }
            creationDto.Url = uploadResult.Uri.ToString();
            creationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(creationDto);

            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }
            userFromRepo.Photos.Add(photo);
            if (await _userManager.SaveAll())
            {
                var photoFromDto = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute(new
                {
                    id = photo.Id
                }, photoFromDto);
            }
            return BadRequest("Could not added photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(long userId, long id)
        {
            if (userId != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await _userManager.GetById(userId);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }
            var photoFromRepo = await _photoManager.GetById(id);
            if (photoFromRepo.IsMain)
            {
                return BadRequest("This photo already as a main photo");
            }
            var currentPhoto = await _photoManager.GetMainPhotoForUser(userId);
            currentPhoto.IsMain = false;
            photoFromRepo.IsMain = true;
            if (await _photoManager.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Could not set photo as main");
        }
    }
}