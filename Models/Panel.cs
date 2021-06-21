using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class Panel // Many-Many with Dashes
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;

        // ----------------------------------------------------------- //

        public List<Dash> Dashes { get; set; }

        public List<PanelAssignment> DashAssignments { get; set; }

        // ----------------------------------------------------------- //

        public string SiteFilter { get; set; }

        public string FilterSiteName { get; set; }

        // public string FilterSiteLogo { get; set; }
    }
}

