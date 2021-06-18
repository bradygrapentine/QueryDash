using System;
// using System.Collections.Generic;
namespace QueryDash.Models
{
    public class OpenedLink
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DashId { get; set; }
        public string DashQueryResult { get; set; }
        public DateTime OpenTimeStamp { get; set; }
        // do I need a temporary model for accepting api input?
        // where am i in need of intermediate connections?
    }
}