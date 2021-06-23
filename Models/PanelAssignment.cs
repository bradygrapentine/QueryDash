using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class PanelAssignment // Intermediate Object
    {
        public int Id { get; set; }

        // ---------------------------------- //

        public int PanelId { get; set; }

        public Panel RootPanel { get; set; }

        // ---------------------------------- //

        public int DashId { get; set; }

        public Dash RootDash { get; set; }
    }
}

