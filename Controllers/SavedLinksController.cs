using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using QueryDash.Models;

namespace QueryDash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedLinksController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SavedLinksController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<SavedLink>>> GetSavedLinks()
        {
            var userId = GetCurrentUserId();
            var allSavedLinks = await _context.SavedLinks.OrderByDescending(savedLink => savedLink.TimeStamp)
                                                         .Where(savedLink => savedLink.UserId == userId)
                                                         .Include(savedLink => savedLink.RootDash)
                                                         .ToListAsync();

            List<SavedLink> userSavedLinks = allSavedLinks.ToList();
            return userSavedLinks;

        }

        //----------------------------------------------------------------------------------------------------------------//

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<SavedLink>> PostSavedLink(SavedLink savedLink)
        {
            savedLink.UserId = GetCurrentUserId();

            _context.SavedLinks.Add(savedLink);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSavedLink", new { id = savedLink.Id }, savedLink);
        }

        //----------------------------------------------------------------------------------------------------------------//

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteSavedLink(int id)
        {
            var savedLink = await _context.SavedLinks.FindAsync(id);
            if (savedLink.UserId == GetCurrentUserId())
            {
                if (savedLink == null)
                {
                    return NotFound();
                }

                _context.SavedLinks.Remove(savedLink);

                await _context.SaveChangesAsync();

                return Ok(savedLink);
            }
            else
            {
                return BadRequest();
            }
        }

        //----------------------------------------------------------------------------------------------------------------//

        private bool SavedLinkExists(int id)
        {
            return _context.SavedLinks.Any(savedLink => savedLink.Id == id);
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}





