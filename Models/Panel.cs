using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class Panel
    {
        public int Id { get; set; }
        // public int DashId { get; set; }
        public int PanelListId { get; set; }                      // Presets could have null UserId
        public string Endpoint { get; set; }
        public string EndpointName { get; set; }
        public string EndpointLogo { get; set; }
    }
}