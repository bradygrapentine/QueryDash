using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace QueryDash.Models
{
    public class User
    {
        public int Id { get; set; }

        // ---------------------------------- //

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        // ---------------------------------- //

        public List<Dash> DashList { get; set; }

        // ---------------------------------- //

        public List<Dash> SharedDashList { get; set; }

        // ---------------------------------- //

        public List<SavedLink> ArchivedLinks { get; set; }

        public List<SavedLink> OpenedLinks { get; set; }

        // ---------------------------------- //

        public List<DashQuery> SearchHistory { get; set; }

    }
}

















// public List<string> Location { get; set; } ~ add Location when quick dashes are added

// [Required]
// public string Language { get; set; }

// This redundancy is the only one currently. 
// This scales one-one with the number of users in the current implementation.

// public DisplayPreferences UserDisplayPreferences { get; set; }

// Might be beneficial to build in these redundancy

// public List<ArchivedLink> Archive { get; set; }
// public List<DashQuery> QueryHistory { get; set; }
// public List<OpenedLink> OpenHistory { get; set; }

// only need when allowed to create new dashes
// public List<Dash> UserDashList { get; set; }


// {
//     public string Password
//     {
//         // Define only the `set` aspect of the property
//         set
//         {
//             // When set, use the PasswordHasher to encrypt the password
//             // and store the result in our HashedPassword
//             this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
//         }
//     }

//     // Add a method that can validate this user's password
//     public bool IsValidPassword(string password)
//     {
//         // Look to see if this password, and the user's hashed password can match
//         var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);
//         // Return True if the verification was a success
//         return passwordVerification == PasswordVerificationResult.Success;
//     }
// }