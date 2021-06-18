using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class PanelList
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DashId { get; set; }
        public List<Panel> Endpoints { get; set; }
        public List<int> Priority { get; set; }
    }
}