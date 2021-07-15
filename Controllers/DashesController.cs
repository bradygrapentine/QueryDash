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
    public class DashesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public DashesController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("UsersNoAccount")]
        public async Task<ActionResult<IEnumerable<Dash>>> GetDashesNoAccount()
        {
            return await _context.Dashes.OrderBy(dash => dash.Id)
                                        .Where(dash => dash.UserId != 1)
                                        .Reverse()
                                        .ToListAsync();
        }

        [HttpGet("PresetsNoAccount")]
        public async Task<ActionResult<IEnumerable<Dash>>> GetPresetsNoAccount()
        {
            return await _context.Dashes.OrderByDescending(dash => dash.Id)
                                        .Where(dash => dash.UserId == 1)
                                        .ToListAsync();
        }

        [HttpGet("Presets")]
        public async Task<ActionResult<IEnumerable<Dash>>> GetPresets()
        {
            return await _context.Dashes.OrderByDescending(dash => dash.Id)
                                        .Where(dash => dash.UserId == 1)
                                        .ToListAsync();
        }


        [HttpGet("OtherDashes")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Dash>>> GetOtherDashes()
        {
            return await _context.Dashes.OrderByDescending(dash => dash.Id)
                                        .Where(dash => dash.UserId != GetCurrentUserId() && dash.UserId != 1)
                                        .ToListAsync();
        }

        [HttpGet("User")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Dash>>> GetUserDashes()
        {
            return await _context.Dashes.OrderByDescending(dash => dash.SavedLinks.Count())
                                        .Where(dash => dash.UserId == GetCurrentUserId())
                                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dash>> GetDash(int id)
        {
            var dash = await _context.Dashes.Where(dash => dash.Id == id)
                                            .Include(dash => dash.SavedLinks)
                                            .Include(dash => dash.DashPanelAssignments)
                                            .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootPanel)
                                            .FirstOrDefaultAsync();
            if (dash == null)
            {
                // Return a `404` response to the client indicating we could not find a dash with this id
                return NotFound();
            }

            return dash;
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutDash(int id, Dash dash)
        {
            if (id != dash.Id || GetCurrentUserId() != dash.UserId)
            {
                return BadRequest();
            }

            _context.Entry(dash).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DashExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(dash);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Dash>> PostDash(Dash dash)
        {

            dash.UserId = GetCurrentUserId();
            _context.Dashes.Add(dash);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDash", new { id = dash.Id }, dash);
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteDash(int id)
        {
            var dash = await _context.Dashes.FindAsync(id);

            if (id != dash.Id || GetCurrentUserId() != dash.UserId)
            {
                return BadRequest();
            }

            if (dash == null)
            {
                return NotFound();
            }

            _context.Dashes.Remove(dash);

            await _context.SaveChangesAsync();

            return Ok(dash);
        }

        private bool DashExists(int id)
        {
            return _context.Dashes.Any(dash => dash.Id == id);
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}
