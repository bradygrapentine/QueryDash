using System;
// using System.Collections.Generic;
namespace QueryDash.Models
{
    public class DashQuery
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DashId { get; set; }
        public string UserQueryContent { get; set; }
        public DateTime QueryTimeStamp { get; set; }
    }
}