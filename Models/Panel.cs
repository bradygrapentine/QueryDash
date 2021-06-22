using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class Panel // Many-Many with Dashes
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;

        // ----------------------------------------------------------- //

        public string FilterSite { get; set; }

        public string FilterSiteName { get; set; }

        public List<Dash> Dashes { get; set; }

        public List<PanelAssignment> DashPanelAssignments { get; set; }
    }
}









// public string FilterSiteLogo { get; set; }
