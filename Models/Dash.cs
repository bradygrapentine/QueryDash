using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class Dash // Many-Many with Panels
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;

        public string Name { get; set; }

        // ------------------------------------------------------ //

        public List<PanelAssignment> DashPanelAssignments { get; set; }

        // ------------------------------------------------------ //

        public int LinksPerPanel { get; set; }

        // ------------------------------------------------------ //

        public List<SavedLink> SavedLinks { get; set; }
    }
}







// public List<int> Priority { get; set; }                     

// public List<DashQuery> SearchHistory { get; set; }

// public bool InvertColors { get; set; }

// public bool FullScreenMode { get; set; }

// public bool ColumnMode { get; set; }

// public bool IsPreset { get; set; }

// public DateTime PresetPublicationDate { get; set; } // Dates Sharing of Dashes

// public int FirstUserID { get; set; }

// public User RootFirstUser { get; set; } // Bestows Ownership on Creator of Shared Dash

// ------------------------------------------------------ //