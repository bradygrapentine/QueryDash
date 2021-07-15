using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueryDash.Models;

namespace QueryDash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UsersController(DatabaseContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new
                {
                    id = user.Id
                }, user);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "This account already exists!" }
                };
                return BadRequest(response);
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(user => user.Id == id);
        }
    }
}


