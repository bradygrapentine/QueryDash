using System;
using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
// using System.JsonObject;

namespace QueryDash.Models
{
public class UserDashQuery // Search History by User and Dash
{
public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int DashQueryId { get; set; }

        // public DashQuery RootDashQuery { get; set; }

        public int DashId { get; set; }

        // public Dash RootDash { get; set; }

        public bool LatestQuery { get; set; }

        // --------------------------------------------- //

        [Column(TypeName = "jsonb")]
        public string SearchResponse { get; set; } // could expand properties to accord with the JSON data input from the search API in the backend, or just send the JSON for each panel
    }

}
