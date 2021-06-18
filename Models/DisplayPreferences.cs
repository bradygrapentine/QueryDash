using System;
// using System.Collections.Generic;
namespace QueryDash.Models
{
    public class DisplayPreferences
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool InvertColors { get; set; }
        public bool FixPanelSize { get; set; }
        public bool FullScreenMode { get; set; }
    }
}