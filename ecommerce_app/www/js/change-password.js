// Storage variables
var storage = window.localStorage;
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  if (loggedInUser) {
    //location.href = "index.html";
  }

  var cpb = document.getElementById("change-password-button");

  if (cpb) {
    cpb.addEventListener("click", changePasswordHandler);
  }
});

// Event handler when change password button is clicked
function changePasswordHandler(element) {
  try {
    // On click Code
    var oldPassword = document.getElementById("change-password-old").value;
    var newPassword = document.getElementById("change-password-new").value;
    var confirmNewPassword = document.getElementById("change-password-confirm")
      .value;

    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
    var editPassword = true;
    if (oldPassword == "") {
      alert("Please enter your old password.");
      editPassword = false;
    }
    if (newPassword == "") {
      alert("Please enter your new password.");
      editPassword = false;
    }
    if (confirmNewPassword == "") {
      alert("Please enter your new password to confirm.");
      editPassword = false;
    }

    if (loggedInUser.password == oldPassword) {
      if (editPassword) {
        if (newPassword == confirmNewPassword) {
          if (StrengthChecker(newPassword)) {
            var accountsFromLocalStorage = JSON.parse(
              storage.getItem("accounts")
            );

            for (let i = 0; i < accountsFromLocalStorage.length; i++) {
              var account = accountsFromLocalStorage[i];
              if (account.id == loggedInUser.id) {
                account.password = newPassword;
                accountsFromLocalStorage[i] = account;
                storage.setItem(
                  "accounts",
                  JSON.stringify(accountsFromLocalStorage)
                );
                storage.removeItem("loggedInUser");
                alert(
                  "Successfully changed password. You will now be logged out."
                );
                location.href = "login.html";
                break;
              }
            }
          } else {
            alert(
              "Password should be minimum 8 characters and only characters A-Z, a-z and '-' are  acceptable for username."
            );
          }
        } else {
          alert("Passwords do not match.");
        }
      }
    } else {
      alert(
        "Your old password does not match with your current password. Please double check!"
      );
    }
  } catch (e) {
    alert(e);
  }
}

// Regex pattern for strong password
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);

// Regex pattern for medium password
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

// Checks string if it is a medium or strong password and returns a boolean
function StrengthChecker(PasswordParameter) {
  if (strongPassword.test(PasswordParameter)) {
    return true;
  } else if (mediumPassword.test(PasswordParameter)) {
    return true;
  } else {
    return false;
  }
}
