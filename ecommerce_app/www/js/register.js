document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));
  if (loggedInUser) {
    location.href = "index.html";
  } else {
    var last_item = document.getElementById("register-menu-bar-last-item");
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="login.html" class="nav-link">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Login</span>
      </a>`;
  }

  var rb = document.getElementById("register-button");

  if (rb) {
    rb.addEventListener("click", registerHandler);
  }
});

var storage = window.localStorage;

let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

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

  var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
  var createAccount = true;
  for (const account of accountsFromLocalStorage) {
    var u = account.username;
    var uLower = u.toLowerCase();
    if (u == username || uLower == username) {
      alert("Username already taken.");
      createAccount = false;
      break;
    }
    if (account.email == email) {
      alert("Email already taken.");
      createAccount = false;
      break;
    }
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
    if (phone.length != 13) {
      alert("Phone Number has wrong format.");
      createAccount = false;
      break;
    }
    if (calculate_age(birthdate) < 18) {
      alert("You need to be 18 or above.");
      createAccount = false;
      break;
    }
  }

  if (createAccount) {
    if (password == confirmPassword && password != "") {
      // ADD USERNAME AND PASSWORD TO DATABASE
      if (isUserNameValid(username) && StrengthChecker(password)) {
        var accountDetails = {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email,
          birthdate: birthdate,
          telephone: phone,
          is_admin: false,
          date_joined: new Date(),
        };
        accountsFromLocalStorage.push(accountDetails);
        // alert(accountsFromLocalStorage);
        storage.setItem("accounts", JSON.stringify(accountsFromLocalStorage));
        alert("Account created!");
        location.href = "login.html";
      } else if (!isUserNameValid(username)) {
        alert("Only characters A-Z, a-z and '-' are  acceptable for username.");
      } else {
        alert("Weak password. Please construct a stronger password.");
      }
    } else if (password != confirmPassword && password != "") {
      alert("Passwords do not match!");
    }
  }
}

function isUserNameValid(username) {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[A-Za-z0-9_\.]+$/.exec(username);
  const valid = !!res;
  return valid;
}

function StrengthChecker(PasswordParameter) {
  if (strongPassword.test(PasswordParameter)) {
    return true;
  } else if (mediumPassword.test(PasswordParameter)) {
    return true;
  } else {
    return false;
  }
}

function calculate_age(dob) {
  var d = new Date(dob);
  var diff_ms = Date.now() - d.getTime();
  var age_dt = new Date(diff_ms);

  var age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return age;
}
