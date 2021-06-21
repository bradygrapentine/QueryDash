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
    // All of these routes will be at the base URL:     /api/PanelAssignment
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case PanelAssignmentController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class PanelAssignmentController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public PanelAssignmentController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PanelAssignment
        //
        // Returns a list of all your PanelAssignmentTable
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PanelAssignment>>> GetPanelAssignmentTable()
        {
            // Uses the database context in `_context` to request all of the PanelAssignmentTable, sort
            // them by row id and return them as a JSON array.
            return await _context.PanelAssignmentTable.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/PanelAssignment/5
        //
        // Fetches and returns a specific panelAssignment by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<PanelAssignment>> GetPanelAssignment(int id)
        {
            // Find the panelAssignment in the database using `FindAsync` to look it up by id
            var panelAssignment = await _context.PanelAssignmentTable.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (panelAssignment == null)
            {
                // Return a `404` response to the client indicating we could not find a panelAssignment with this id
                return NotFound();
            }

            //  Return the panelAssignment as a JSON object.
            return panelAssignment;
        }

        // PUT: api/PanelAssignment/5
        //
        // Update an individual panelAssignment with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a PanelAssignment
        // variable named panelAssignment. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our PanelAssignment POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPanelAssignment(int id, PanelAssignment panelAssignment)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != panelAssignment.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in panelAssignment to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from panelAssignment
            _context.Entry(panelAssignment).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!PanelAssignmentExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(panelAssignment);
        }

        // POST: api/PanelAssignment
        //
        // Creates a new panelAssignment in the database.
        //
        // The `body` of the request is parsed and then made available to us as a PanelAssignment
        // variable named panelAssignment. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our PanelAssignment POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<PanelAssignment>> PostPanelAssignment(PanelAssignment panelAssignment)
        {
            // Indicate to the database context we want to add this new record
            _context.PanelAssignmentTable.Add(panelAssignment);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetPanelAssignment", new { id = panelAssignment.Id }, panelAssignment);
        }

        // DELETE: api/PanelAssignment/5
        //
        // Deletes an individual panelAssignment with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePanelAssignment(int id)
        {
            // Find this panelAssignment by looking for the specific id
            var panelAssignment = await _context.PanelAssignmentTable.FindAsync(id);
            if (panelAssignment == null)
            {
                // There wasn't a panelAssignment with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.PanelAssignmentTable.Remove(panelAssignment);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(panelAssignment);
        }

        // Private helper method that looks up an existing panelAssignment by the supplied id
        private bool PanelAssignmentExists(int id)
        {
            return _context.PanelAssignmentTable.Any(panelAssignment => panelAssignment.Id == id);
        }
    }
}
