using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using ReconciliationWebApp.Attributes;

namespace ReconciliationWebApp.Models {
    public class RegisterModel {

        [Required]
        [DataType(DataType.Text)]
        [Display( Name = "newUserName")]
        public string newUserName { get; set; }


        [Required]
        [DataType(DataType.EmailAddress)]
        [Display( Name = "newEmail")]
        public string newEmail { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [ValidatePasswordLength]
        [ValidatePasswordStrength]
        [Display( Name = "newPassword")]
        public string newPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display( Name = "confirmPassword")]
        [Compare( "newPassword", ErrorMessage= "Password does not match")]
        public string confirmPassword { get; set; }

        [Required]
        
        public bool agreeCheckbox { get; set; } 

    }
}