using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class DashQuery // Search History by User and Dash
    {
        public int Id { get; set; }

        // --------------------------------------------- //

        // public int UserId { get; set; }

        // public User RootUser { get; set; }

        // --------------------------------------------- //

        public int DashId { get; set; }

        public Dash RootDash { get; set; }

        // --------------------------------------------- //

        public string QueryContent { get; set; }

        public DateTime QueryTimeStamp { get; private set; } = DateTime.Now;

        // public string JsonResultString { get; set; }
    }
}

// use JSON mapping to create query result's objects

// public class SomeEntity
// {
//     public int Id { get; set; }
//     [Column(TypeName = "jsonb")]
//     public Customer Customer { get; set; }
// }

// public class Customer    // Mapped to a JSON column in the table
// {
//     public string Name { get; set; }
//     public int Age { get; set; }
//     public Order[] Orders { get; set; }
// }

// public class Order       // Part of the JSON column
// {
//     public decimal Price { get; set; }
//     public string ShippingAddress { get; set; }
// }








// public List<string> SiteFilters { get; set; } // get these from RootDash -> Panels -> Panel -> Panel.SiteFilter, could do on front end and send down with request as well

// public List<string> RootDash.Panels( => panel.SiteFilter) { get; } // 




// public int QueryResultId { get; set; }

// public QueryResult DashQueryResult { get; set; }

// public List<string> JsonResultStrings { get; set; } // expand properties to accord with the JSON data input from the search API
// public List<QueryResult> JsonResultStrQueryResults { get; set; } // expand properties to accord with the JSON data input from the search API