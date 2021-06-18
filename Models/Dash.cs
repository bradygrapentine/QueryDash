using System;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class Dash
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsPreset { get; set; }
        // could create a starter dash model
        // same object just drop UserId
        // and drop IsPreset from this model
        // Presets could have null UserId
        public List<string> Endpoints { get; set; }
        public List<string> EndpointNames { get; set; }
        public List<string> EndpointLogos { get; set; }
        // public PanelList UserPanelList { get; set; }
        // public List<Panel> PanelList { get; set; }
        public List<int> Priority { get; set; }              // {1,2,3,4,5}
        public bool InvertColors { get; set; }
        public bool FixPanelSize { get; set; }
        public bool FullScreenMode { get; set; }
    }
}





// public List<string> EndpointOne { get; set; }     // EndpointUrl, EndpointName, EndpointLogo
// public List<string> EndpointTwo { get; set; }
// public List<string> EndpointThree { get; set; }
// public List<string> EndpointFour { get; set; }
// public List<string> EndpointFive { get; set; }

// public int userId { get; set; }
// public bool IsPreset { get; set; }
// public string Endpoint1Url { get; set; }
// public string Endpoint1Name { get; set; }
// public string Endpoint1Logo { get; set; }
// public string Endpoint2Url { get; set; }
// public string Endpoint2Name { get; set; }
// public string Endpoint2Logo { get; set; }
// public string Endpoint3Url { get; set; }
// public string Endpoint3Name { get; set; }
// public string Endpoint3Logo { get; set; }
// public string Endpoint4Url { get; set; }
// public string Endpoint4Name { get; set; }
// public string Endpoint4Logo { get; set; }
// public string Endpoint5Url { get; set; }
// public string Endpoint5Name { get; set; }
// public string Endpoint5Logo { get; set; }



// the below attributes are not ancillary, not needed in free dash mode either 
// if customizable dashes are added, it'd be nice to have redundancy in the dash object, 
// so no sorting will need to occur when switching between dashes, but because of the current 
// implementation that doesn't matter -> Panel's don't exist, dashes are used by users but 
// not associated with them directly, and the server will handle the sorting on login in or 
// when switching between dashes, adding that single layer of redundancy later will improve
//  switching between dashes via programming not processing speed 

// public List<Panel> PanelList { get; set; }
// public List<ArchivedLink> DashArchive { get; set; }
// public List<DashQuery> DashQueryHistory { get; set; }
// public List<OpenedLink> OpenHistory { get; set; }
// public List<string> DisplayPreferences { get; set; }



// using System;
// using System.Collections.Generic;
// namespace QueryDash.Models
// {
//     public class Panel
//     {
//         public int Id { get; set; }
//         public int DashId { get; set; }
//         public string EndpointUrl { get; set; }
//         public string EndpointName { get; set; }
//         public string EndpointLogoUrl { get; set; }
// public List<string> endpointResults {get; set;}

//         // can this be completely nested in the Dash Object?
//         // - let's try - it may solve the redundancy issue entirely and simplify the database and ERD immensely simpler
//     }
// }