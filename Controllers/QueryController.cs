using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using QueryDash.Models;
using Microsoft.Azure.CognitiveServices.Search.WebSearch;
using QueryDash.Utils;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text;
using System.Text.Unicode;
using System.Net.Http.Headers;
using System.Linq;
using Newtonsoft.Json;
using System.Net;
using System.IO;


namespace QueryDash.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class QueryController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public QueryController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
        }

        [HttpGet("{dashQuery}")]
        async public Task<ActionResult<List<string>>> Query(string dashQuery, int dashId)
        {
            var dash = await _context.Dashes.
                                        Where(dash => dash.Id == dashId).
                                        Include(dash => dash.DashPanelAssignments).
                                        ThenInclude(panelAssignment => panelAssignment.RootPanel).
                                        FirstOrDefaultAsync();
            if (dash == null)
            {
                return BadRequest();
            }

            List<string> searchResults = new List<string>(dash.DashPanelAssignments.Count() * 2);
            foreach (var panelAssignment in dash.DashPanelAssignments)
            {
                var filterSite = panelAssignment.RootPanel.FilterSite;

                var client = new HttpClient();
                var request = new HttpRequestMessage

                {

                    Method = HttpMethod.Get,
                    // Additional parameters
                    // &n=30 # of results in query
                    // &searchtype=images searches for images
                    // &showimages=1 provides thumbnail images with results, default already provides the hq thumbnails
                    // &relqueries=1 provide related queries in search results
                    // &fast=1 worse results, but faster
                    // &ff=1 removes adult content

                    RequestUri = new Uri($"https://gigablast.com/search?&userid=503&code=1393867175&ff=1&n=30&format=json&q={dashQuery}&sites={filterSite}")
                };
                using (var response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    var body = await response.Content.ReadAsStringAsync(); // how to parallelize? parallel queires, supplementary lecture // star wars api
                    searchResults.Add(body);
                }
            }
            return searchResults;
        }
    }
}


// public class LoginUser
// {
// [JsonPropertyName("id")]
// public int Id { get; set; } // if property names differ from JSON key names
// [JsonPropertyName("text")]
// public string Text { get; set; }
// [JsonPropertyName("complete")]
// public bool Complete { get; set; }
// [JsonPropertyName("created_at")]
// public DateTime CreatedAt { get; set; } // Converts to DateTime automatically because JSON date formatting aligns with C# date formatting
// [JsonPropertyName("updated_at")]
// public DateTime UpdatedAt { get; set; }
// }


