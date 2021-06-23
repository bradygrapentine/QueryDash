using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using QueryDash.Models;
using QueryDash.Utils;

namespace QueryDash.Controllers
{
    // All of these routes will be at the base URL:     /api/Sessions
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class QueryController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        [HttpGet("{DashQuery}")]
        public string Query(string str, int DashId) // Why can't static be here??
        {
            // return string.Concat(str.Select(n => new string(n, int.Parse(n.ToString())))); // some solutions involve going from ASCII value of character to ASCII value needed to select the intAsChar the correct number of times (num - 48, gives ASCII number that corressponds to value of char)
            return "null";
        }
    }
}