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
    // All of these routes will be at the base URL:     /api/Dashes
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case DashesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class DashesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public DashesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Dashes
        //
        // Returns a list of all your Dashes
        //

        [HttpGet("NoAccount")]
        public async Task<ActionResult<IEnumerable<Dash>>> GetDashesNonUser()
        {
            // Uses the database context in `_context` to request all of the Dashes, sort
            // them by row id and return them as a JSON array.
            return await _context.Dashes.OrderBy(row => row.Id)
                                        .Include(dash => dash.DashPanelAssignments)
                                        .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootPanel)
                                        .ToListAsync();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Dash>>> GetDashes()
        {
            // Uses the database context in `_context` to request all of the Dashes, sort
            // them by row id and return them as a JSON array.
            return await _context.Dashes.OrderBy(row => row.Id)
                                        .Where(dash => dash.UserId != GetCurrentUserId())
                                        .Include(dash => dash.SavedLinks)
                                        .Include(dash => dash.DashPanelAssignments)
                                        .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootPanel)
                                        .ToListAsync();
        }

        [HttpGet("User")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Dash>>> GetUserDashes()
        {
            // Uses the database context in `_context` to request all of the Dashes, sort
            // them by row id and return them as a JSON array.
            return await _context.Dashes.OrderBy(row => row.Id)
                                        .Where(dash => dash.UserId == GetCurrentUserId())
                                        .Include(dash => dash.SavedLinks)
                                        .Include(dash => dash.DashPanelAssignments)
                                        .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootPanel)
                                        .ToListAsync();
        }


        // GET: api/Dashes/5
        //
        // Fetches and returns a specific dash by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Dash>> GetDash(int id)
        {
            // Find the dash in the database using `FindAsync` to look it up by id
            var dash = await _context.Dashes.Where(dash => dash.Id == id)
                                            .Include(dash => dash.SavedLinks)
                                            .Include(dash => dash.DashPanelAssignments)
                                            .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootPanel)
                                            .FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (dash == null)
            {
                // Return a `404` response to the client indicating we could not find a dash with this id
                return NotFound();
            }

            //  Return the dash as a JSON object.
            return dash;
        }

        // PUT: api/Dashes/5
        //
        // Update an individual dash with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Dash
        // variable named dash. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Dash POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutDash(int id, Dash dash)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != dash.Id || GetCurrentUserId() != dash.UserId)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in dash to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from dash
            _context.Entry(dash).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!DashExists(id))
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
            return Ok(dash);
        }

        // POST: api/Dashes
        //
        // Creates a new dash in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Dash
        // variable named dash. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Dash POCO class. This represents the
        // new values for the record.
        //

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Dash>> PostDash(Dash dash)
        {

            dash.UserId = GetCurrentUserId();
            // Indicate to the database context we want to add this new record
            _context.Dashes.Add(dash);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetDash", new { id = dash.Id }, dash);
        }

        // DELETE: api/Dashes/5
        //
        // Deletes an individual dash with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDash(int id)
        {
            // Find this dash by looking for the specific id
            var dash = await _context.Dashes.FindAsync(id);

            if (id != dash.Id || GetCurrentUserId() != dash.UserId)
            {
                return BadRequest();
            }

            if (dash == null)
            {
                // There wasn't a dash with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Dashes.Remove(dash);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(dash);
        }

        // Private helper method that looks up an existing dash by the supplied id
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
