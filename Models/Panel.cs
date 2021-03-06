using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class Panel // Many-Many with Dashes
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;

        // ----------------------------------------------------------- //

        public string FilterSite { get; set; } // change to URL

        public string FilterSiteName { get; set; }

        public List<PanelAssignment> DashPanelAssignments { get; set; }
    }
}

