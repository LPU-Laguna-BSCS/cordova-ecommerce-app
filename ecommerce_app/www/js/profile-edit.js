var storage = window.localStorage;
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  if (loggedInUser) {
    //location.href = "index.html";

    try {
      var profile_form_fields = document.getElementById("profile-form-fields");
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

  var peb = document.getElementById("profile-edit-button");

  if (peb) {
    peb.addEventListener("click", profileEditHandler);
  }
});

function profileEditHandler(element) {
  // On click Code
  var username = document.getElementById("profile-edit-username").value;
  var email = document.getElementById("profile-edit-email").value;
  var phone = document.getElementById("profile-edit-phone").value;
  var password = document.getElementById("profile-edit-password").value;

  var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
  var editAccount = true;
  for (const account of accountsFromLocalStorage) {
    var u = account.username;
    var uLower = u.toLowerCase();
    if (loggedInUser.username != username) {
      if (u == username || uLower == username) {
        alert("Username already taken.");
        editAccount = false;
        break;
      }
    }
    if (loggedInUser.email != email) {
      if (account.email == email) {
        alert("Email already taken.");
        editAccount = false;
        break;
      }
    }

    if (loggedInUser.username != username) {
      if (!isUserNameValid(username)) {
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

    if (loggedInUser.telephone != phone) {
      if (phone.length != 13) {
        alert("Phone Number has wrong format.");
        editAccount = false;
        break;
      }
    }

    if (password == "") {
      alert("Please enter your password.");
      editAccount = false;
      break;
    }
  }

  if (editAccount) {
    if (loggedInUser.password == password) {
      for (let i = 0; i < accountsFromLocalStorage.length; i++) {
        var account = accountsFromLocalStorage[i];
        if (account.id == loggedInUser.id) {
          account.username = username;
          account.email = email;
          account.telephone = phone;
          accountsFromLocalStorage[i] = account;
          storage.setItem("accounts", JSON.stringify(accountsFromLocalStorage));
          storage.setItem("loggedInUser", JSON.stringify(account));
          location.href = "profile.html";
          break;
        }
      }
    } else {
      alert("Wrong password. Please double check!");
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
