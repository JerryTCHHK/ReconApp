using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Text.RegularExpressions; 

namespace ReconciliationWebApp.Attributes {

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple=false,Inherited=true)] 
    public sealed class ValidatePasswordStrengthAttribute : ValidationAttribute, IClientValidatable {

        private const string _defaultErrorMessage = "Password must have at least 1 lower-case letter, 1 upper-case letter, 1 number, 1 special character"; 

        public ValidatePasswordStrengthAttribute()
            : base() {

            /*Empty Constructor of Validate Password Strength*/
        }


        public override string FormatErrorMessage(string name) {

            return _defaultErrorMessage; 
        }

        public override bool IsValid(object value) {

            string valueString = value.ToString();

            Regex lowerAlphaRegex = new Regex("[a-z]");
            Regex upperAlphaRegex = new Regex("[A-Z]");
            Regex numberRegex = new Regex("[0-9]");
            Regex specialRegex = new Regex("[ \"!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\\\\]");
            
            return ( lowerAlphaRegex.IsMatch(valueString) && upperAlphaRegex.IsMatch(valueString) && numberRegex.IsMatch(valueString) 
                     && specialRegex.IsMatch(valueString));

        }

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metaData, ControllerContext context) {


            return new[] { new ModelClientValidationRegexRule(FormatErrorMessage(metaData.GetDisplayName()), "") } ;

        }
    }
}