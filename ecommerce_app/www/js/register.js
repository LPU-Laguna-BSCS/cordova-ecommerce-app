document.addEventListener("DOMContentLoaded", function () {
  var rb = document.getElementById("register-button");

  if (rb) {
    rb.addEventListener("click", registerHandler);
  }
});

var storage = window.localStorage;

function registerHandler(element) {
  // On click Code
  var username = document.getElementById("register-username").value;
  var email = document.getElementById("register-email").value;
  var firstname = document.getElementById("register-firstname").value;
  var lastname = document.getElementById("register-lastname").value;
  var phone = document.getElementById("register-phone").value;
  var birthdate = document.getElementById("register-birthdate").value;
  var password = document.getElementById("register-password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  try {
    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
    for (account in accountsFromLocalStorage) {
      if (account.username == username) {
        alert("Username already taken.");
        break;
      } else if (account.email == email) {
        alert("Email already taken.");
        break;
      } else if (phone.length != 13) {
        alert("Phone Number has wrong format.");
        break;
      } else {
        if (password == confirmPassword) {
          // ADD USERNAME AND PASSWORD TO DATABASE
          try {
            // storage.setItem(username, password);
            alert("Account created!");
            // location.href = "login.html";
          } catch (e) {
            alert(e);
          }
        } else {
          alert("Passwords do not match!");
        }
      }
    }
  } catch (e) {
    alert(e);
  }
}
