$(document).ready(function () {

    //CopRight Statement
    $("#CopyRight").html("Copyright&#169;JerrySoftware");

    
    //Glyphicons for all form groups 
    var successIcon = "<i class=\"glyphicon fas fa-check-circle text-success\"></i>";
    var errorIcon   = "<i class=\"glyphicon fas fa-times-circle text-danger\" ></i>";

    $(".form-group").addClass("inner-addon right-addon");

    //Login Form and Sign Up Form Validation

    var informationType = { ERROR : 0 , SUCCESS : 1 , INFO : 2 , WARNING : 3 } ; 
    var successBorderColor = "#3c763d";  
    var infoBorderColor = "#31708f"; 
    var dangerBorderColor = "#a94442";
    var warningBorderColor = "#8a6d3b";
    var storedPlaceHolder = "";
    var newUserNameChecked = false;
    var newEmailChecked = false;
    var newPasswordChecked = false;
    var newConfirmPasswordChecked = false;

    //Focus in Event
    $("#newUserName, #newEmail, #newPassword, #confirmPassword").focusin(function () {


        storedPlaceHolder = $(this).attr("placeholder");

        $(this).attr("placeholder", "");

    });
    //Focus out event
    $("#newUserName, #newEmail, #newPassword, #confirmPassword").focusout(function () {

        $(this).attr("placeholder", storedPlaceHolder);

        storedPlaceHolder = "";

        var valueInCheck = null; 

        //Get the value in the input 

        valueInCheck = $(this).val(); 

        switch (this.id) {

                case "newUserName":

                    newUsernameCheck(this, valueInCheck);       //Change the value of newUserNameChecked

                    break;

                case "newEmail":

                    newEmailCheck(this, valueInCheck);          //Change the value of newEmailChecked

                    break;

                case "newPassword":

                    passwordCheck(this , valueInCheck, "#confirmPassword");       //Change the value of newPasswordChecked and newConfirmPasswordChecked
                    break;

                case "confirmPassword":

                    passwordCheck(this, valueInCheck, "#newPassword");
                    break;
            }

        
    });

    //OnSubmit Event
    $("#signUp-Form").submit(function (event) {

        if (newUserNameChecked == false) {

            var value = $("#newUserName").val();

            if (isEmptyCheck(value)) {

                inputBoxChange(informationType.ERROR, "#newUserName", "This field cannot be empty.");

            }

            event.preventDefault(); 

        }

        if (newEmailChecked == false) {

            var value = $("#newEmail").val();

            if (isEmptyCheck(value)) {

                inputBoxChange(informationType.ERROR, "#newEmail", "This field cannot be empty.");

            }

            event.preventDefault();

        }

      
        if (newPasswordChecked == false) {

            var value = $("#newPassword").val();

            if (isEmptyCheck(value)) {

                inputBoxChange(informationType.ERROR, "#newPassword", "This field cannot be empty.");

            }

            event.preventDefault();

        }

        

        if (newConfirmPasswordChecked == false) {

            var value = $("#confirmPassword").val();

            if (isEmptyCheck(value)) {

                inputBoxChange(informationType.ERROR, "#confirmPassword", "This field cannot be empty.");

            }

            event.preventDefault();

        }

        if ($("#agreeCheckbox").is(":checked") == false) {

            displayErrorBox("#welcomeDiv", "You have to agree the Term of Services and Policy");
            
            event.preventDefault();
        }




        

    });


    function isEmptyCheck(value) {

        if (value == null || value == "") {

            return true;
        }

        return false;
    }

    function removeGlyphIconAndMessage(inputTagID) {

        if ($(inputTagID).prev().prop("class") == "glyphicon fas fa-check-circle text-success" ||
            $(inputTagID).prev().prop("class") == "glyphicon fas fa-times-circle text-danger") {

            $(inputTagID).prev().remove();

        }

        if ($(inputTagID).attr('id') == "newPassword") {

            if ($("#confirmPassword").prev().prop("class") == "glyphicon fas fa-check-circle text-success") {

                $("#confirmPassword").prev().remove();

            }


        }

        if ($(inputTagID).next().prop("class") == "text-danger small") {

            $(inputTagID).next().remove();


        }

        $(inputTagID).removeClass("error-input-border");
        $(inputTagID).removeClass("success-input-border");



    }

    function newUsernameCheck(inputTagID, inputValue) {
        
        //Check if it is empty
        if (isEmptyCheck(inputValue)) {

            removeGlyphIconAndMessage(inputTagID);

            newUserNameChecked = false;

        //Check userName Length
        } else if (inputValue.length > 30) {

            inputBoxChange(informationType.ERROR, inputTagID, "It cannot be greater than 30 characters");

            newUserNameChecked = false; 

        //Check username characters
        } else if (isUsernameWithInvalidCharacters(inputValue)) {

            inputBoxChange(informationType.ERROR, inputTagID, "Username cannot have special characters");

            newUserNameChecked = false;

        //Check username availablity
        } else {

            $.ajax({
                type: "POST",
                url: "/SignUp/CheckUsernameAvailablity/",
                data: '{ "id":"' + inputValue + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data,status) {

                    if (data == "found") {
                        inputBoxChange(informationType.ERROR, inputTagID, "Sorry ! This username has already been used");

                        newUserNameChecked = false;

                    } else {

                        inputBoxChange(informationType.SUCCESS, inputTagID, "");

                        newUserNameChecked = true;
                    }

                }
              
            });

            

           


        }

    }

    function newEmailCheck(inputTagID, inputValue) {

        //Check if it is empty
        if (isEmptyCheck(inputValue)) {

            removeGlyphIconAndMessage(inputTagID);

            newEmailChecked = false;

        //Check email is a valid email
        } else if (isEmailValid(inputValue) == false) {

            inputBoxChange(informationType.ERROR, inputTagID, "Please enter a valid email");

            newEmailChecked = false; 
        //Check email has already been registered
        } else {

            $.ajax({
                type: "POST",
                url: "/SignUp/CheckIfEmailRegistered/",
                data : '{ "id":"' + inputValue + '"}' ,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, status) {

                    if (data == "found") {
                        inputBoxChange(informationType.ERROR, inputTagID, "Sorry ! This email has already been used");

                        newEmailChecked = false;

                    } else {

                        inputBoxChange(informationType.SUCCESS, inputTagID, "");

                        newEmailChecked = true;
                    }

                },

            });
            



        }




    }

    function passwordCheck(inputTagID , inputValue, partnerInputTagID) {

        //Check if it is empty
        if (isEmptyCheck(inputValue)) {

            removeGlyphIconAndMessage(inputTagID);

            if ($(inputTagID).attr('id') == "newPassword") {

                newPasswordChecked = false;

            } else {

                newConfirmPasswordChecked = false;

            }
        //Check Password Length
        } else if ( inputValue.length < 8) {

            inputBoxChange(informationType.ERROR, inputTagID, "Password must have at least 8 characters");

            if (isEmptyCheck($(partnerInputTagID).val()) == false && partnerInputTagID == "#confirmPassword") {

                inputBoxChange(informationType.ERROR, partnerInputTagID, "Password does not match or it is less than 8 characters");
            }

            newPasswordChecked = false; 
            newConfirmPasswordChecked = false; 

        } else if (isPasswordWithMixedCharacters(inputValue) == false) {

            inputBoxChange(informationType.ERROR, inputTagID,"Password should have mixed characters (1 number, 1 lowercase letter, 1 uppercase letter and 1 special characters)" );

            if (isEmptyCheck($(partnerInputTagID).val()) == false && partnerInputTagID == "#confirmPassword") {

                inputBoxChange(informationType.ERROR, partnerInputTagID, "Password does not match or it does not have mixed characters");
            }

            newPasswordChecked = false;
            newConfirmPasswordChecked = false;


        } else {

            if ($(inputTagID).attr('id') == "newPassword") {

                inputBoxChange(informationType.SUCCESS, inputTagID, "");

                newPasswordChecked = true; 

                if (isEmptyCheck($(partnerInputTagID).val()) == false) {

                    if (passwordMatch(partnerInputTagID, inputTagID)) {

                        inputBoxChange(informationType.SUCCESS, partnerInputTagID, "");

                        newConfirmPasswordChecked = true; 

                    } else {

                        inputBoxChange(informationType.ERROR, partnerInputTagID, "Password does not match");

                        newConfirmPasswordChecked = false; 
                    }

                }

            } else {

    
                if (isEmptyCheck($(partnerInputTagID).val()) == false) {

                    if (passwordMatch(partnerInputTagID, inputTagID)) {

                        inputBoxChange(informationType.SUCCESS, partnerInputTagID, "");
                        inputBoxChange(informationType.SUCCESS, inputTagID, "");

                        newPasswordChecked = true;
                        newConfirmPasswordChecked = true;


                    } else {

                        inputBoxChange(informationType.ERROR, inputTagID, "Password does not match");

                        newConfirmPasswordChecked = false;
                    }

                }






            }

         



        }


    }

    function inputBoxChange(infoType, inputTagID, message) {

        if ($(inputTagID).prev().prop("class") == "glyphicon fas fa-check-circle text-success" ||
            $(inputTagID).prev().prop("class") == "glyphicon fas fa-times-circle text-danger") {

            $(inputTagID).prev().remove();

        }

        if ($(inputTagID).next().prop("class") == "text-danger small") {

            $(inputTagID).next().remove();


        }

        $(inputTagID).removeClass("error-input-border");
        $(inputTagID).removeClass("success-input-border");

        switch (infoType) {

            case informationType.ERROR:

                var messageTag = "<span class= \"text-danger small\">" + message + "</span>";

                $(errorIcon).insertBefore(inputTagID);

                $(messageTag).insertAfter(inputTagID);

                $(inputTagID).addClass("error-input-border");

                break;

            case informationType.SUCCESS:

                $(successIcon).insertBefore(inputTagID);

                $(inputTagID).addClass("success-input-border");

                break; 
             

        }

    }

    function isUsernameWithInvalidCharacters(usernameInCheck) {

        var invalidCharacterRegex = /[\\/:*?"<>|';% ]/;

        if (invalidCharacterRegex.test(usernameInCheck)) {

            return true;
        }


        return false; 


    }

    function isEmailValid(emailInCheck) {

        var emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailRegex.test(emailInCheck)) {

            return true;
        }

        return false;

    }


    function isPasswordWithMixedCharacters(password) {

        var lowerAlphaRegex = /[a-z]/; 
        var upperAlphaRegex = /[A-Z]/;
        var numberRegex = /[0-9]/;
        var specialCharacterRegex = /[ \"!#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~\\]/;

        if (lowerAlphaRegex.test(password) == false || upperAlphaRegex.test(password) == false ||
            numberRegex.test(password) == false || specialCharacterRegex.test(password) == false) {

            return false;

        } 

        return true;


    }

    function passwordMatch(confirmPassID, passID) {

        if ($(confirmPassID).val() != $(passID).val()) {

            return false;
        }
        

        return true;

    }

    function displayErrorBox(inputTagID, message) {

        var messagewithCloseButton = "<a href='#' class='close closeSize' data-dismiss='alert' aria-label='close'>&times;</a>" + message;

        var dialogBox = "<div class='alert alert-danger alert-dismissible small' id='errorDiv'>" + messagewithCloseButton + "</div>";

        if ($(inputTagID).next().attr('id') == "errorDiv") {

            $("#errorDiv").html(messagewithCloseButton);

        } else {

            $(dialogBox).insertAfter(inputTagID);

        }
    }




});