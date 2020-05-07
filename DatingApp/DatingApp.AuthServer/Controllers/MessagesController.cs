using System.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Abstractions.BLL;
using DatingApp.Configurations.Helpers;
using DatingApp.Models;
using DatingApp.Models.DTOs.MessageDTOs;
using DatingApp.Models.PaginationHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.AuthServer.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/user/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageManager _messageManager;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;
        public MessagesController(IMessageManager messageManager, IMapper mapper, IUserManager userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _messageManager = messageManager;
        }

        // GET api/messages
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessage(long userId, long id)
        {
            if (userId != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var messageFromRepo = await _messageManager.GetById(id);
            if (messageFromRepo == null)
            {
                return NoContent();
            }
            return Ok();
        }
        [HttpGet("")]
        public async Task<IActionResult> GetMessagesForUser(long userId, [FromQuery] MessagePrams messagePrams)
        {
            if (userId != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            messagePrams.UserId = userId;
            var messagesFromRepo = await _messageManager.GetMessagesforUser(messagePrams);
            var messages = _mapper.Map<IEnumerable<MessageForReturnDto>>(messagesFromRepo);
            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize,
                messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);
            return Ok(messages);
        }
        // POST api/messages
        [HttpPost("")]
        public async Task<IActionResult> CreateMessage(long userId, MessageForCreationDto messageForCreationDto)
        {
            if (userId != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            messageForCreationDto.SenderId = userId;
            var recipient = await _userManager.GetById(messageForCreationDto.RecipientId);
            if (recipient == null)
            {
                return BadRequest("Could not find user");
            }
            var message = _mapper.Map<Message>(messageForCreationDto);

            var addMessage = await _messageManager.Add(message);
            var messageToReturn = _mapper.Map<MessageForCreationDto>(message);
            if (addMessage)
            {
                return CreatedAtRoute(new
                {
                    id = message.Id
                }, messageToReturn);
            }
            throw new Exception("failed to save");
        }

        // PUT api/messages/5
        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(long userId, long recipientId)
        {
            if (userId != long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var messageFromRepo = await _messageManager.GetMessageThread(userId, recipientId);

            var messageThread = _mapper.Map<IEnumerable<MessageForReturnDto>>(messageFromRepo);
            return Ok(messageThread);
        }

        // DELETE api/messages/5
        [HttpDelete("{id}")]
        public void DeletestringById(int id)
        { }
    }
}