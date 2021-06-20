using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class DashQuery // Search History by User and Dash
    {
        public int Id { get; set; }

        // --------------------------------------------- //

        public int UserId { get; set; }

        public User RootUser { get; set; }

        // --------------------------------------------- //

        public int DashId { get; set; }

        public Dash RootDash { get; set; }

        // --------------------------------------------- //

        public string QueryContent { get; set; }

        public DateTime QueryTimeStamp { get; set; }

        public List<string> JsonResultStrings { get; set; }
    }
}











// public List<string> SiteFilters { get; set; } // get these from RootDash -> Panels -> Panel -> Panel.SiteFilter, could do on front end and send down with request as well

// public List<string> RootDash.Panels( => panel.SiteFilter) { get; } // 




// public int QueryResultId { get; set; }

// public QueryResult DashQueryResult { get; set; }

// public List<string> JsonResultStrings { get; set; } // expand properties to accord with the JSON data input from the search API
// public List<QueryResult> JsonResultStrQueryResults { get; set; } // expand properties to accord with the JSON data input from the search API