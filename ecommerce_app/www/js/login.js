document.addEventListener("DOMContentLoaded", function () {
  var lb = document.getElementById("login-button");

  if (lb) {
    lb.addEventListener("click", loginHandler);
  }
});

var storage = window.localStorage;

function loginHandler(element) {
  // On click Code
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;

  // CHECK DATABASE FOR MATCHING USERNAME AND PASSWORD
  try {
    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
    for (const account of accountsFromLocalStorage) {
      if (username == account.username) {
        if (password == account.password) {
          alert("Username and password matched!");
          storage.setItem("loggedInUser", JSON.stringify(account));
          location.href = "index.html";
        } else {
          alert("No account matched.");
        }
      }
    }
  } catch (e) {
    alert(e);
  }
}
