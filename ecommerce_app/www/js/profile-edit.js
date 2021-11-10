// Storage variables
var storage = window.localStorage;

// Fetches the logged in user from the local storage
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Checks whether user is logged in or not
  if (loggedInUser) {
    try {
      // Finds the profile form fields section in page
      var profile_form_fields = document.getElementById("profile-form-fields");

      // Sets the details of the user on the profile form fields section (similar to autocomplete)
      profile_form_fields.innerHTML =
        profile_form_fields.innerHTML +
        `
        <div class="mb-3">
          <label class="form-label">Username</label>
          <div class="input-group">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
            <input
              type="text"
              class="form-control bg-light"
              placeholder="Username"
              id="profile-edit-username"
              value="${loggedInUser.username}"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input
            type="text"
            class="form-control bg-light"
            pattern="^[+][0-9]{12}"
            id="profile-edit-phone"
            value="${loggedInUser.telephone}"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control bg-light"
            placeholder="Email"
            id="profile-edit-email"
            value="${loggedInUser.email}"
            required
          />
        </div>
        `;
    } catch (e) {
      alert(e);
    }
  }

  // Finds the profile edit button in page
  var peb = document.getElementById("profile-edit-button");

  // Adds an event handler to profile edit button
  if (peb) {
    peb.addEventListener("click", profileEditHandler);
  }
});

function profileEditHandler(element) {
  // Form values
  var username = document.getElementById("profile-edit-username").value;
  var email = document.getElementById("profile-edit-email").value;
  var phone = document.getElementById("profile-edit-phone").value;
  var password = document.getElementById("profile-edit-password").value;

  // Fetches the accounts table from local storage
  var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));

  // Boolean variable to decide whether the user be able to edit their account
  var editAccount = true;

  // Form validation
  for (const account of accountsFromLocalStorage) {
    var u = account.username;
    var uLower = u.toLowerCase();
    // Checks if username is unique
    if (loggedInUser.username != username) {
      if (u == username || uLower == username) {
        alert("Username already taken.");
        editAccount = false;
        break;
      }
    }

    // Checks if email is unique
    if (loggedInUser.email != email) {
      if (account.email == email) {
        alert("Email already taken.");
        editAccount = false;
        break;
      }
    }

    // Checks if username valid
    if (loggedInUser.username != username) {
      if (!isUserNameValid(username)) {
        // Checks if username is not blank
        if (username == "") {
          alert("Username can not be blank.");
          editAccount = false;
          break;
        } else {
          alert(
            "Only characters A-Z, a-z and '-' are  acceptable for username."
          );
          editAccount = false;
          break;
        }
      }
    }

    // Checks if the input for phone number has proper format
    if (loggedInUser.telephone != phone) {
      if (phone.length != 13) {
        alert("Phone Number has wrong format.");
        editAccount = false;
        break;
      }
    }

    // Checks if password field is not blank
    if (password == "") {
      alert("Please enter your password.");
      editAccount = false;
      break;
    }
  }

  // Checks if it passes all of the criteria
  if (editAccount) {
    // Updates the account details of the user
    if (loggedInUser.password == password) {
      for (let i = 0; i < accountsFromLocalStorage.length; i++) {
        var account = accountsFromLocalStorage[i];
        // Finds a match on the database
        if (account.id == loggedInUser.id) {
          // Sets new values
          account.username = username;
          account.email = email;
          account.telephone = phone;

          // Updates the accounts table
          accountsFromLocalStorage[i] = account;

          // Updates the accounts table in local storage
          storage.setItem("accounts", JSON.stringify(accountsFromLocalStorage));

          // Updates the logged in user in local storage
          storage.setItem("loggedInUser", JSON.stringify(account));
          // Redirects to the profile page
          location.href = "profile.html";
          break;
        }
      }
    } else {
      //Displays "Wrong password. Please double check!"
      alert("Wrong password. Please double check!");
    }
  }
}

// Function for checking if the username is valid
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
