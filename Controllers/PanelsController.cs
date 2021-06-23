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
    // All of these routes will be at the base URL:     /api/Panels
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case PanelsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class PanelsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public PanelsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Panels
        //
        // Returns a list of all your Panels
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Panel>>> GetPanels()
        {
            // Uses the database context in `_context` to request all of the Panels, sort
            // them by row id and return them as a JSON array.
            return await _context.Panels.OrderBy(panel => panel.Id)
                                        .Include(panel => panel.DashPanelAssignments)
                                        .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootDash)
                                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dash>> GetPanel(int id)
        {
            // Find the dash in the database using `FindAsync` to look it up by id
            var panel = await _context.Dashes.Where(panel => panel.Id == id)
                                            .Include(panel => panel.DashPanelAssignments)
                                            .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootDash)
                                            .FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (panel == null)
            {
                // Return a `404` response to the client indicating we could not find a dash with this id
                return NotFound();
            }

            //  Return the dash as a JSON object.
            return panel;
        }

        // POST: api/Panels
        //
        // Creates a new panel in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Panel
        // variable named panel. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Panel POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Panel>> PostPanel(Panel panel)
        {
            // Indicate to the database context we want to add this new record
            _context.Panels.Add(panel);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetPanel", new { id = panel.Id }, panel);
        }


        // Private helper method that looks up an existing panel by the supplied id
        private bool PanelExists(int id)
        {
            return _context.Panels.Any(panel => panel.Id == id);
        }
    }
}






















// GET: api/Panels/5
//
// Fetches and returns a specific panel by finding it by id. The id is specified in the
// URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// [HttpGet("{id}")]
// public async Task<ActionResult<Panel>> GetPanel(int id)
// {
//     // Find the panel in the database using `FindAsync` to look it up by id
//     var panel = await _context.Panels.FindAsync(id);

//     // If we didn't find anything, we receive a `null` in return
//     if (panel == null)
//     {
//         // Return a `404` response to the client indicating we could not find a panel with this id
//         return NotFound();
//     }

//     //  Return the panel as a JSON object.
//     return panel;
// }

// PUT: api/Panels/5
//
// Update an individual panel with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// In addition the `body` of the request is parsed and then made available to us as a Panel
// variable named panel. The controller matches the keys of the JSON object the client
// supplies to the names of the attributes of our Panel POCO class. This represents the
// new values for the record.
//
// [HttpPut("{id}")]
// public async Task<IActionResult> PutPanel(int id, Panel panel)
// {
//     // If the ID in the URL does not match the ID in the supplied request body, return a bad request
//     if (id != panel.Id)
//     {
//         return BadRequest();
//     }

//     // Tell the database to consider everything in panel to be _updated_ values. When
//     // the save happens the database will _replace_ the values in the database with the ones from panel
//     _context.Entry(panel).State = EntityState.Modified;

//     try
//     {
//         // Try to save these changes.
//         await _context.SaveChangesAsync();
//     }
//     catch (DbUpdateConcurrencyException)
//     {
//         // Ooops, looks like there was an error, so check to see if the record we were
//         // updating no longer exists.
//         if (!PanelExists(id))
//         {
//             // If the record we tried to update was already deleted by someone else,
//             // return a `404` not found
//             return NotFound();
//         }
//         else
//         {
//             // Otherwise throw the error back, which will cause the request to fail
//             // and generate an error to the client.
//             throw;
//         }
//     }

//     // Return a copy of the updated data
//     return Ok(panel);
// }



// DELETE: api/Panels/5
//
// Deletes an individual panel with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// [HttpDelete("{id}")]
// public async Task<IActionResult> DeletePanel(int id)
// {
//     // Find this panel by looking for the specific id
//     var panel = await _context.Panels.FindAsync(id);
//     if (panel == null)
//     {
//         // There wasn't a panel with that id so return a `404` not found
//         return NotFound();
//     }

//     // Tell the database we want to remove this record
//     _context.Panels.Remove(panel);

//     // Tell the database to perform the deletion
//     await _context.SaveChangesAsync();

//     // Return a copy of the deleted data
//     return Ok(panel);
// }
