using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Abstractions.BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.AuthServer.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ValueController : ControllerBase
    {
        private readonly IValueManager _manager;
        public ValueController(IValueManager manager)
        {
            _manager = manager;
        }

        // GET api/value
        [HttpGet("")]
        public async Task<IActionResult> GetValues()
        {
            var values = await _manager.GetAll();
            return Ok(values);
        }
        // GET api/value/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _manager.GetById(id);
            return Ok(value);
        }
    }
}