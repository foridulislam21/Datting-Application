using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Abstractions.BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.AuthServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
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
        public ActionResult<string> GetstringById(int id)
        {
            return null;
        }

        // POST api/value
        [HttpPost("")]
        public void Poststring(string value)
        { }

        // PUT api/value/5
        [HttpPut("{id}")]
        public void Putstring(int id, string value)
        { }

        // DELETE api/value/5
        [HttpDelete("{id}")]
        public void DeletestringById(int id)
        { }
    }
}