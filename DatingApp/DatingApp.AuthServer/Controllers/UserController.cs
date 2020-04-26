using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Abstractions.BLL;
using DatingApp.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.AuthServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;
        private readonly IMapper _mapper;
        public UserController(IUserManager userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET api/user
        [HttpGet("")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.GetAll();
            var usersToReturn = _mapper.Map<IEnumerable<UserforListDto>>(users);
            return Ok(usersToReturn);
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var user = await _userManager.GetById(id);
            var userToReturn = _mapper.Map<UserForDetailsDto>(user);
            return Ok(userToReturn);
        }

        // POST api/user
        [HttpPost("")]
        public void Poststring(string value)
        { }

        // PUT api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, UserForUpdateDto dto)
        {
            if (id != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _userManager.GetById(id);
            var userUpdate = _mapper.Map(dto, userFromRepo);
            if (await _userManager.Update(userUpdate))
            {
                return NoContent();
            }
            throw new Exception($"Updating user {id} failed on save");
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public void DeletestringById(int id)
        { }
    }
}