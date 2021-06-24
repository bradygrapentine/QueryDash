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
    // All of these routes will be at the base URL:     /api/Sessions
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL

    [Route("api/[controller]")]
    [ApiController]
    public class QueryController : ControllerBase
    {
        public string subscriptionKey = "00844542644f4b1aa8d7e9e8cf995bdf";
        public string endpoint = "https://querydashendpoints.cognitiveservices.azure.com/bing/v7.0/search";
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        [HttpGet("{dashQuery}")]
        async public Task<string> Query(string dashQuery) //int DashId
        {
            // grab the FilterSites off the Panels and plug into the site parameter, and grab info off the dash, then loop through the filter sites and compose a list of Json response strings
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=site%3Acss-tricks.com%20{dashQuery}&pageNumber=1&pageSize=10&autoCorrect=true"),
                Headers = { { "x-rapidapi-key", "9650ee4b51msh94314e454641433p102fd6jsn2039b1ef4622" }, { "x-rapidapi-host", "contextualwebsearch-websearch-v1.p.rapidapi.com" }, },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                Console.WriteLine(body);
                return body;
            }
        }
    }
}


//                     try
// {
//     // var client = new ApiKeyServiceClientCredentials(subscriptionKey);
//     // var webData = await client.Web.SearchAsync(query: str);
//     // Console.WriteLine("Searching for \"Yosemite National Park\"");

//     // Code for handling responses is provided in the next section...

// }
// catch (Exception ex)
// {
//     Console.WriteLine("Encountered exception. " + ex.Message);
// }

// return string.Concat(str.Select(n => new string(n, int.Parse(n.ToString())))); // some solutions involve going from ASCII value of character to ASCII value needed to select the intAsChar the correct number of times (num - 48, gives ASCII number that corressponds to value of char)

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




// var panels = _context.Dashes.Where(dash => dash.Id == DashId).Include()
// .ThenInclude(dashPanelAssignment => dashPanelAssignment.RootPanel);
// var panelFilters = panels.Select((dash, panel) => panel.FilterSite);
// Select(panel => panel.FilterSite)

// Task WebResults(WebSearchClient client)
// {
//     try
//     {
//         var webData = client.Web.SearchAsync(query: "Yosemite National Park");
//         Console.WriteLine("Searching for \"Yosemite National Park\"");

//         // Code for handling responses is provided in the next section...

//     }
//     catch (Exception error)
//     {
//         Console.WriteLine("Encountered exception. " + error.Message);
//     }
// } 

//                 // Add your Azure Bing Search V7 subscription key and endpoint to your environment variables
// static string subscriptionKey = Environment.GetEnvironmentVariable("BING_SEARCH_V7_SUBSCRIPTION_KEY");
// static string endpoint = Environment.GetEnvironmentVariable("BING_SEARCH_V7_ENDPOINT") + "/bing/v7.0/search";

// const string query = "Microsoft Cognitive Services";

// static void Main()
// {
//     // Create a dictionary to store relevant headers
//     Dictionary<String, String> relevantHeaders = new Dictionary<String, String>();

//     Console.OutputEncoding = Encoding.UTF8;

//     Console.WriteLine("Searching the Web for: " + query);

//     // Construct the URI of the search request
//     var uriQuery = endpoint + "?q=" + Uri.EscapeDataString(query);

//     // Perform the Web request and get the response
//     WebRequest request = HttpWebRequest.Create(uriQuery);
//     request.Headers["Ocp-Apim-Subscription-Key"] = subscriptionKey;
//     HttpWebResponse response = (HttpWebResponse)request.GetResponseAsync().Result;
//     string json = new StreamReader(response.GetResponseStream()).ReadToEnd();

//     // Extract Bing HTTP headers
//     foreach (String header in response.Headers)
//     {
//         if (header.StartsWith("BingAPIs-") || header.StartsWith("X-MSEdge-"))
//             relevantHeaders[header] = response.Headers[header];
//     }

//     // Show headers
//     Console.WriteLine("\nRelevant HTTP Headers:\n");
//     foreach (var header in relevantHeaders)
//         Console.WriteLine(header.Key + ": " + header.Value);

//     Console.WriteLine("\nJSON Response:\n");
//     dynamic parsedJson = JsonConvert.DeserializeObject(json);
//     Console.WriteLine(JsonConvert.SerializeObject(parsedJson, Formatting.Indented));
