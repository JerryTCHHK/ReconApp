using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;


namespace ReconciliationWebApp.Attributes {

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple=false, Inherited=true)]
    public sealed class ValidatePasswordLengthAttribute : ValidationAttribute,IClientValidatable {

        private const string _defaultErrorMessage = "Password must be at least {0} characters long";

        private readonly int _minimumCharacters = 8; 


        public ValidatePasswordLengthAttribute() : base(){

            /*Constructor of ValidatePasswordLengthAttribute*/

        }

        public override string FormatErrorMessage(string name) {

            return String.Format(_defaultErrorMessage, _minimumCharacters) ;
        }

        public override bool IsValid(object value){

 	        return ( value.ToString() != null && value.ToString().Length >= _minimumCharacters); 
        }

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metaData, ControllerContext context) {


            return new[] { new ModelClientValidationStringLengthRule(FormatErrorMessage(metaData.GetDisplayName()), _minimumCharacters, int.MaxValue) };

        }




    }
}