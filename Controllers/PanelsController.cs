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
    public class PanelsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PanelsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Panel>>> GetPanels()
        {
            return await _context.Panels.OrderByDescending(panel => panel.DashPanelAssignments.Count())
                                        .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Panel>> PostPanel(Panel panel)
        {
            _context.Panels.Add(panel);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPanel", new { id = panel.Id }, panel);
        }


        private bool PanelExists(int id)
        {
            return _context.Panels.Any(panel => panel.Id == id);
        }
    }
}


