// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fetches the logged in user from local storage
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

  // Checks whether user is logged in or not
  if (loggedInUser) {
    // Redirects users that are logged in to home page
    location.href = "index.html";
  } else {
    // Finds the last item in the menu bar
    var last_item = document.getElementById("login-menu-bar-last-item");

    // Sets the last item in menu bar to "Login"
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="login.html" class="nav-link active">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Login</span>
      </a>`;
  }

  // Finds the login button in the page
  var lb = document.getElementById("login-button");

  // Adds an event listener to the login button
  if (lb) {
    lb.addEventListener("click", loginHandler);
  }
});

// Storage variable
var storage = window.localStorage;

// Event handler for when the login button is clicked
function loginHandler(element) {
  // Form values
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;

  // CHECK DATABASE FOR MATCHING USERNAME AND PASSWORD
  try {
    // Fetches the accounts table
    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
    // Iterates through account in the database
    for (const account of accountsFromLocalStorage) {
      // Checks whether username is present in database
      if (username == account.username) {
        // Checks whethr password is present in database
        if (password == account.password) {
          alert("Username and password matched!");
          // Sets the account to the logged in user
          storage.setItem("loggedInUser", JSON.stringify(account));
        } else
          //Displays "No account matched."
          alert("No account matched.");
        }
      }
    }
  } catch (e) {
    alert(e);
  }
}
