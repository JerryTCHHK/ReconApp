using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ReconciliationWebApp.Enums;
using ReconciliationWebApp.Models;
using ReconciliationWebApp.Classes; 

namespace ReconciliationWebApp.Controllers
{
    public class SignUpController : Controller
    {
        //
        // GET: /SignUp/

        public ActionResult SignUpPage()
        {
            return View();
        }

    
        [HttpPost]
        public ActionResult CheckUsernameAvailablity(string id) {

            return Json(id);

        }

        [HttpPost]
        public ActionResult CheckIfEmailRegistered(string id) {

            return Json(id);

        }

        [HttpPost]
        public ActionResult Register(RegisterModel model) {
            
            if (ModelState.IsValid) {

               
                //Add the information into Database
                mySQLDatabase mySQLObj = new mySQLDatabase();

                mySQLObj.insertRegistrationData(model);

                ViewData[StatusKeys.SUCCESS.ToString()] = model;

                return View("RegisterSuccessPage");
                

            } else {

                ViewData[StatusKeys.ERROR.ToString()] = "Error: Something is wrong with the sign up information provided. Please check if the information is entered correctly";

                return View("_error");

            }
        }

        
        public ActionResult Register() {

            return RedirectToAction("SignUpPage");

        }
    }
}
