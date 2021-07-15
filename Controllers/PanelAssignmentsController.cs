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
    public class PanelAssignmentsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PanelAssignmentsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<PanelAssignment>> PostPanelAssignment(PanelAssignment panelAssignment)
        {
            _context.PanelAssignments.Add(panelAssignment);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPanelAssignment", new { id = panelAssignment.Id }, panelAssignment);
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeletePanelAssignment(int id)
        {
            var panelAssignment = await _context.PanelAssignments.FindAsync(id);
            if (panelAssignment == null)
            {
                return NotFound();
            }
            _context.PanelAssignments.Remove(panelAssignment);

            await _context.SaveChangesAsync();

            return Ok(panelAssignment);
        }

        private bool PanelAssignmentExists(int id)
        {
            return _context.PanelAssignments.Any(panelAssignment => panelAssignment.Id == id);
        }
        private int GetCurrentUserId()
        {
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}


