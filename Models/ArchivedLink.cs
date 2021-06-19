using System;
// using System.Collections.Generic;
namespace QueryDash.Models
{
    public class ArchivedLink
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        // isArchived or isOpenedLink
        public int DashId { get; set; }
        public string DashQueryResult { get; set; }
        public DateTime ArchiveTimeStamp { get; set; }
    }
}