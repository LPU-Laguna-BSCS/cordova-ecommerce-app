// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fetches the logged in user
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

  // Checks whether user is logged in or not
  if (loggedInUser) {
    // Redirects the user
    location.href = "index.html";
  } else {
    // Finds the last item in the menu bar
    var last_item = document.getElementById("register-menu-bar-last-item");

    // Sets the html of the last item in the menu bar
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="login.html" class="nav-link">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Login</span>
      </a>`;
  }

  // Finds the register button in page
  var rb = document.getElementById("register-button");

  // Adds an event handler for the register button
  if (rb) {
    rb.addEventListener("click", registerHandler);
  }
});

// Local Storage variable
var storage = window.localStorage;

// Regex for strong password
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);

// Regex for medium password
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

// Register handler function when the user clicks on the register button
function registerHandler(element) {
  // Form values
  var username = document.getElementById("register-username").value;
  var email = document.getElementById("register-email").value;
  var firstname = document.getElementById("register-firstname").value;
  var lastname = document.getElementById("register-lastname").value;
  var phone = document.getElementById("register-phone").value;
  var birthdate = document.getElementById("register-birthdate").value;
  var password = document.getElementById("register-password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Fetches the accounts table
  var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));

  // Boolean variable to decide whether to be able to create an account or not
  var createAccount = true;

  // Form validation
  for (const account of accountsFromLocalStorage) {
    var u = account.username;
    var uLower = u.toLowerCase();
    // Checks if the user input fo username field is unique
    if (u == username || uLower == username) {
      alert("Username already taken.");
      createAccount = false;
      break;
    }
    // Checks if the user input fo email field is unique
    if (account.email == email) {
      alert("Email already taken.");
      createAccount = false;
      break;
    }
    // Checks if the username field is blank
    if (!isUserNameValid(username)) {
      if (username == "") {
        alert("Username can not be blank.");
        createAccount = false;
        break;
      } else {
        alert("Only characters A-Z, a-z and '-' are  acceptable for username.");
        createAccount = false;
        break;
      }
    }
    // Checks if the user input for the phone number field has wrong format
    if (phone.length != 13) {
      alert("Phone Number has wrong format.");
      createAccount = false;
      break;
    }
    //Checks if the user is 18 or above
    if (calculate_age(birthdate) < 18) {
      alert("You need to be 18 or above.");
      createAccount = false;
      break;
    }
    //Checks if password and confirm password field is not blank
    if (password == "" && confirmPassword == "") {
      alert("Missing passwords");
      createAccount = false;
      break;
    }
  }

  // Checks if all criteria is met
  if (createAccount) {
    // Checks if password and confirm password is the same and that it is not blank
    if (password == confirmPassword && password != "") {
      // Checks if username is valid and password is strong
      if (isUserNameValid(username) && StrengthChecker(password)) {
        // Preparation of data to be added to database
        var accountDetails = {
          id: accountsFromLocalStorage.length + 1,
          username: username,
          password: password,
          first_name: firstname,
          last_name: lastname,
          email: email,
          birthdate: birthdate,
          telephone: phone,
          is_admin: false,
          date_joined: new Date(),
        };

        // Pushes the data to the accounts table
        accountsFromLocalStorage.push(accountDetails);

        // Updates the account table in local storage
        storage.setItem("accounts", JSON.stringify(accountsFromLocalStorage));
        alert("Account created!");

        // Redirects user to login page
        location.href = "login.html";
        // Displays valid username input for username field
      } else if (!isUserNameValid(username)) {
        alert("Only characters A-Z, a-z and '-' are  acceptable for username.");
        // Reminds the user to construct a stronger password
      } else {
        alert("Weak password. Please construct a stronger password.");
      }
      // Checks if the password and confirm passwod is not blank and if passwords does not match
    } else if (password != confirmPassword && password != "") {
      alert("Passwords do not match!");
    } else {
      // Alerts user if passwords are blank
      alert("Missing passwords");
    }
  }
}

// Function to check if username is valid
function isUserNameValid(username) {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  // Regex for username
  const res = /^[A-Za-z0-9_\.]+$/.exec(username);
  const valid = !!res;
  return valid;
}

// Function to check if password is strong or not
function StrengthChecker(PasswordParameter) {
  if (strongPassword.test(PasswordParameter)) {
    return true;
  } else if (mediumPassword.test(PasswordParameter)) {
    return true;
  } else {
    return false;
  }
}

// Returns boolean if user is over 18 years old
function calculate_age(dob) {
  var d = new Date(dob);
  var diff_ms = Date.now() - d.getTime();
  var age_dt = new Date(diff_ms);

  var age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return age;
}
