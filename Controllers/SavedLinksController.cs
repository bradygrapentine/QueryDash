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
    // All of these routes will be at the base URL:     /api/SavedLinks
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case SavedLinksController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class SavedLinksController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public SavedLinksController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/SavedLinks
        //
        // Returns a list of all your SavedLinks
        //
        [HttpGet]
        // on history and archive pages
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

        // POST: api/SavedLinks
        //
        // Creates a new savedLink in the database.
        //
        // The `body` of the request is parsed and then made available to us as a SavedLink
        // variable named savedLink. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our SavedLink POCO class. This represents the
        // new values for the record.
        //


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<SavedLink>> PostSavedLink(SavedLink savedLink)
        {
            // Indicate to the database context we want to add this new record
            savedLink.UserId = GetCurrentUserId();

            _context.SavedLinks.Add(savedLink);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetSavedLink", new { id = savedLink.Id }, savedLink);
        }

        //----------------------------------------------------------------------------------------------------------------//

        // DELETE: api/SavedLinks/5
        //
        // Deletes an individual savedLink with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteSavedLink(int id)
        {
            // DELETE http://localhost:5000/api/SavedLinks/35 => deletes SavedLink with given ID

            // Find this savedLink by looking for the specific id
            var savedLink = await _context.SavedLinks.FindAsync(id);
            if (savedLink.UserId == GetCurrentUserId())
            {
                if (savedLink == null)
                {
                    // There wasn't a savedLink with that id so return a `404` not found
                    return NotFound();
                }

                // Tell the database we want to remove this record
                _context.SavedLinks.Remove(savedLink);

                // Tell the database to perform the deletion
                await _context.SaveChangesAsync();

                // Return a copy of the deleted data
                return Ok(savedLink);
            }
            else
            {
                return BadRequest();
            }
        }

        //----------------------------------------------------------------------------------------------------------------//

        // Private helper method that looks up an existing savedLink by the supplied id
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































// var allSavedLinks = await _context.SavedLinks.OrderBy(row => row.Id).Where(row => row.UserId == savedLinkUserId).ToListAsync();
// if (isArchive && dashId != 0)
// {
//     List<SavedLink> dashArchive = allSavedLinks.Where(savedLink => savedLink.DashId == dashId && savedLink.IsArchive).ToList();
//     return dashArchive;
// }
// else if (isArchive)
// {
//     // List<SavedLink> userArchive = allSavedLinks.Where(savedLink => savedLink.UserId == userId && savedLink.IsArchive).ToList();
//     List<SavedLink> userArchive = allSavedLinks.Where(savedLink => savedLink.IsArchive).ToList();
//     return userArchive;
// }
// else if (isArchive == false && dashId != 0)
// {
//     List<SavedLink> dashOpened = allSavedLinks.Where(savedLink => savedLink.DashId == dashId && !savedLink.IsArchive).ToList();
//     return dashOpened;
// }
// else if (isArchive == false)
// {
//     List<SavedLink> userOpened = allSavedLinks.Where(savedLink => !savedLink.IsArchive).ToList();
//     return userOpened;
// }



// GET: api/SavedLinks/5
//
// Fetches and returns a specific savedLink by finding it by id. The id is specified in the
// URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// [HttpGet("{id}")]
// public async Task<ActionResult<SavedLink>> GetSavedLink(int id)
// {
//     // Find the savedLink in the database using `FindAsync` to look it up by id
//     var savedLink = await _context.SavedLinks.FindAsync(id);

//     // If we didn't find anything, we receive a `null` in return
//     if (savedLink == null)
//     {
//         // Return a `404` response to the client indicating we could not find a savedLink with this id
//         return NotFound();
//     }

//     //  Return the savedLink as a JSON object.
//     return savedLink;
// }

// PUT: api/SavedLinks/5
//
// Update an individual savedLink with the requested id. The id is specified in the URL
// In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
// to grab the id from the URL. It is then made available to us as the `id` argument to the method.
//
// In addition the `body` of the request is parsed and then made available to us as a SavedLink
// variable named savedLink. The controller matches the keys of the JSON object the client
// supplies to the names of the attributes of our SavedLink POCO class. This represents the
// new values for the record.
//
// [HttpPut("{id}")]
// public async Task<IActionResult> PutSavedLink(int id, SavedLink savedLink)
// {
//     // If the ID in the URL does not match the ID in the supplied request body, return a bad request
//     if (id != savedLink.Id)
//     {
//         return BadRequest();
//     }

//     // Tell the database to consider everything in savedLink to be _updated_ values. When
//     // the save happens the database will _replace_ the values in the database with the ones from savedLink
//     _context.Entry(savedLink).State = EntityState.Modified;

//     try
//     {
//         // Try to save these changes.
//         await _context.SaveChangesAsync();
//     }
//     catch (DbUpdateConcurrencyException)
//     {
//         // Ooops, looks like there was an error, so check to see if the record we were
//         // updating no longer exists.
//         if (!SavedLinkExists(id))
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

// Return a copy of the updated data
//     return Ok(savedLink);
// }

