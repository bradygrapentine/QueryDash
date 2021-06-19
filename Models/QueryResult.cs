using System;
using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
// using System.JsonObject;

namespace QueryDash.Models
{
    public class QueryResult // Search History by User and Dash
    {
        public int Id { get; set; }

        public int DashQueryId { get; set; }

        public DashQuery RootDashQuery { get; set; }

        public int DashId { get; set; }

        public Dash RootDash { get; set; }

        public bool LatestQuery { get; set; }

        // --------------------------------------------- //

        public List<string> JsonResultStrings { get; set; } // could expand properties to accord with the JSON data input from the search API in the backend, or just send the JSON for each panel

        // public List<List<List<string>>> JsonResultlist { get; set; } // could just grab link string, site name string, and image url string from results

        // public string SiteHead { get; set; }

        // public string SiteUrl { get; set; }

        // public string SiteSnippet { get; set; }

        // public string SiteImageUrl { get; set; }

        // public string OriginalQuery { get; set; } // has the site filter and the search term separated by a space

        // public JsonObject<string> SearchResult { get; set; }
    }
}

// should I send this back? or the Dash Query? Would it be a post with the dash query from the front end, and then make the searches + fill out query result + and save to dash and dash query on the backend, and then grabbing the response on the front end which will have the Dash Query object which contains a the query results, which contains a list in the same order as the SiteFilters, which can be used to match the rendered panels on the front end