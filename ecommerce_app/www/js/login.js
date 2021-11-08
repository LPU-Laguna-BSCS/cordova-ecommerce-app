// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));
  if (loggedInUser) {
    location.href = "index.html";
  } else {
    var last_item = document.getElementById("login-menu-bar-last-item");
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="login.html" class="nav-link active">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Login</span>
      </a>`;
  }

  var lb = document.getElementById("login-button");

  if (lb) {
    lb.addEventListener("click", loginHandler);
  }
});

// Storage variable
var storage = window.localStorage;

// Event handler for when the login button is clicked
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
        } else {
          alert("No account matched.");
        }
      }
    }
  } catch (e) {
    alert(e);
  }
}
