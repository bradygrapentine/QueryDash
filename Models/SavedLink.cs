using System;
// using System.Collections.Generic;
namespace QueryDash.Models
{
    public class SavedLink // OpenHistory and Archives By User and Dash
    {
        public int Id { get; set; }

        public bool IsArchive { get; set; }

        // ---------------------------------- //

        public int UserId { get; set; }

        // ---------------------------------- //

        public int DashId { get; set; }

        public Dash RootDash { get; set; }

        // ---------------------------------- //

        public string QueryUrl { get; set; }

        public DateTime TimeStamp { get; private set; } = DateTime.Now;
    }
}
