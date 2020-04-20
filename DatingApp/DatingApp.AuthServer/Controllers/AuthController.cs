using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.AuthManager;
using DatingApp.Models;
using DatingApp.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.AuthServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthManager _manager;
        private readonly IConfiguration _config;
        public AuthController(IAuthManager manager, IConfiguration config)
        {
            _config = config;
            _manager = manager;
        }

        // GET api/auth
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto dto)
        {
            var userFromRepo = await _manager.Login(dto.UserName.ToLower(), dto.Password);
            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            { 
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }

        // POST api/auth
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto dto)
        {
            dto.UserName = dto.UserName.ToLower();
            if (await _manager.UserExists(dto.UserName))
            {
                return BadRequest("User Already Exists");
            }
            var userToCreate = new User
            {
                UserName = dto.UserName
            };

            var createUser = await _manager.Register(userToCreate, dto.Password);
            return StatusCode(201);
        }
    }
}