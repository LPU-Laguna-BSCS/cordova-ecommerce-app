// Event listener for when device is ready
document.addEventListener("deviceready", onDeviceReady, false);

var storage = window.localStorage;

var loggedInUser;
// var categoriesSTRING = JSON.stringify(categories);
// storage.setItem("categories", categoriesSTRING);

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

  // Sets components to either go to login or profile page depending on whether user is logged in
  if (loggedInUser) {
    // location.href = "index.html";

    //Displays an account circle icon that redirects user to Profile page
    var header_item = document.getElementById("home-header-last-item");
    header_item.innerHTML =
      header_item.innerHTML +
      `
      <a href="profile.html" class="btn-header">
      <i class="material-icons md-account_circle"></i>
      </a>
      `;

    //Displays "Profile" when user is logged in
    var last_item = document.getElementById("home-menu-bar-last-item");
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="profile.html" class="nav-link">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Profile</span>
      </a>`;

    //Displays basic account information about the user on the sidebar
    var sidebar_account_item = document.getElementById("home-sidebar-account");
    sidebar_account_item.innerHTML =
      sidebar_account_item.innerHTML +
      `<img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" class="icon avatar-sm" alt="" />
        <div class="text">
          <h6 class="mb-0">Hi ${loggedInUser.first_name}</h6>
        </div>`;

    //Sidebar Contents
    var sidebar_item = document.getElementById("home-sidebar-section");
    sidebar_item.innerHTML =
      sidebar_item.innerHTML +
      `<nav class="nav-sidebar mt-2">
        <a href="#">
        <a href="category-detail.html?id=1"><i class="material-icons md-local_offer"></i> New arrivals</a>
          <a href="category-detail.html?id=2"> <i class="material-icons md-store"></i> Best Sellers </a>
        <a href="cart.html"> <i class="material-icons md-local_shipping"></i> My Orders</a>
        <a href="#"><i class="material-icons md-chat"></i> Payment</a>
        <hr />
        <a href="about.html"><i class="material-icons md-local_police"></i> About us</a>
        <a href="profile.html"><i class="material-icons md-account_circle"></i> Profile</a>
        <hr />
        <a href="#" id="logout-button">
          <i class="material-icons md-log_out"></i> Logout</a>
      </nav>`;
  } else {
    //Displays an account circle icon that redirects user to login page
    var header_item = document.getElementById("home-header-last-item");
    header_item.innerHTML =
      header_item.innerHTML +
      `
      <a href="login.html" class="btn-header">
      <i class="material-icons md-account_circle"></i>
      </a>
      `;

    //Displays "Sign in" button when user is not logged in
    var sign_in_item = document.getElementById("sign-in-menu-bar-last-item");
    sign_in_item.innerHTML =
      sign_in_item.innerHTML +
      `
      <p class="text-center mx-3">
        <a href="register.html" class="btn w-100 btn-light">
          Sign in
          <i class="material-icons md-arrow_forward"></i>
        </a>
      </p>
      <br />
      `;

    //Displays "Login" when user is  not logged in
    var last_item = document.getElementById("home-menu-bar-last-item");
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="login.html" class="nav-link">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Login</span>
      </a>`;

    var sidebar_account_item = document.getElementById("home-sidebar-account");
    sidebar_account_item.innerHTML =
      sidebar_account_item.innerHTML +
      `<img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" class="icon avatar-sm" alt="" />
        <div class="text">
           <h6 class="mb-0">Hi Guest</h6>
        </div>`;

    var sidebar_item = document.getElementById("home-sidebar-section");
    sidebar_item.innerHTML =
      sidebar_item.innerHTML +
      `<nav class="nav-sidebar mt-2">
      <a href="category-detail.html?id=1"><i class="material-icons md-local_offer"></i> New arrivals</a>
      <a href="category-detail.html?id=2"> <i class="material-icons md-store"></i> Best Sellers </a>
      <hr />
      <a href="about.html"><i class="material-icons md-local_police"></i> About us</a>
      <hr />
      <a href="login.html"><i class="material-icons md-account_circle"></i> Login</a>
      <a href="register.html"><i class="material-icons md-arrow_forward"></i> Sign up</a>
     </nav>`;
  }

  var lob = document.getElementById("logout-button");

  if (lob) {
    lob.addEventListener("click", logoutHandler);
  }
});

// Event handler for when device is ready
function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  // checkLocalStorage();

  // Storage variables
  var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
  var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
  var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
  var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
  var categories_productFromLocalStorage = JSON.parse(
    storage.getItem("categories_product")
  );

  // Returns an array of all products in the database
  var data = [];

  try {
    for (const p of productsFromLocalStorage) {
      var id = p.id;
      var name = p.name;
      var prices = [];
      var images = [];
      var categories = [];

      for (const s of skusFromLocalStorage) {
        if (s.product_id == id) {
          prices.push(s.price);
        }
      }

      for (const i of imagesFromLocalStorage) {
        if (i.product_id == id) {
          images.push(i.link);
        }
      }

      for (const cp of categories_productFromLocalStorage) {
        if (cp.product_id == id) {
          for (const category of categoriesFromLocalStorage) {
            if (cp.category_id == category.id) {
              categories.push(category.name);
            }
          }
        }
      }

      var d = {
        id: id,
        name: name,
        price: Math.min(...prices),
        image: images[0],
        categories: categories,
      };

      data.push(d);
    }
  } catch (e) {
    alert(e);
  }

  // alert(JSON.stringify(data[0]));

  try {
    var category_section = document.getElementById("category_section");
    for (const c of categoriesFromLocalStorage) {
      if (
        c.name != "New Arrivals" &&
        c.name != "Best Sellers" &&
        c.name != "Electronics" &&
        c.name != "Toys and Games"
      ) {
        category_section.innerHTML =
          category_section.innerHTML +
          `
            <li class="col-4">
              <a href="category-detail.html?=${c.id}" class="item-category-grid">
                <span class="icon-wrap">
                  <img
                    class="icon"
                    height="32"
                    src="${c.icon}"
                    alt=""
                  />
                </span>
                <small class="text">${c.name}</small>
              </a>
          `;
      }
    }
  } catch (e) {
    alert(e);
  }

  try {
    //Displays a banner for Electronics Category
    var banner_section = document.getElementById("home-page-banner");
    var electronics = categoriesFromLocalStorage[4];
    banner_section.innerHTML =
      banner_section.innerHTML +
      `
            <article
              class="card card-banner"
              style="
                min-height: 160px;
                background-image: url('${electronics.link}');
              "
            >
              <div class="card-body caption">
                <h5 class="card-title mb-3">
                  Electronics:<br />Great offers <br />just started now
                </h5>
                <a href="category-detail.html?=${electronics.id}" class="btn btn-sm btn-warning">Discover</a>
              </div>
            </article>
          `;
  } catch (e) {
    alert(e);
  }

  try {
    //Displays list of products from New Arrivals category
    var new_arrival_section = document.getElementById("new-arrival");
    for (const d of data) {
      var c = d.categories;
      if (c.indexOf("New Arrivals") > -1) {
        new_arrival_section.innerHTML =
          new_arrival_section.innerHTML +
          `
        <div class="item">
            <a href="product-detail.html?id=${d.id}" class="product">
                <div class="img-wrap"><img src="${d.image}" /></div>
                <div class="text-wrap">
                    <div class="price">${formatter.format(
                      parseInt(d.price)
                    )}</div>
                    <p class="title">${d.name.slice(0, 80)}...</p>
                </div>
            </a>
        </div>
        `;
      }
    }
  } catch (e) {
    alert(e);
  }

  try {
    //Displays list of products from Best Sellers category
    var best_seller_section = document.getElementById("best-sellers");
    for (const d of data) {
      var c = d.categories;
      if (c.indexOf("Best Sellers") > -1) {
        best_seller_section.innerHTML =
          best_seller_section.innerHTML +
          `
        <div class="item">
            <a href="product-detail.html?id=${d.id}" class="product">
                <div class="img-wrap"><img src="${d.image}" /></div>
                <div class="text-wrap">
                    <div class="price">${formatter.format(
                      parseInt(d.price)
                    )}</div>
                    <p class="title">${d.name.slice(0, 80)}...</p>
                </div>
            </a>
        </div>
        `;
      }
    }
  } catch (e) {
    alert(e);
  }
}

// Currency formatter to be Php XX.XX
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// Event handler for when the logout button is clicked
function logoutHandler(element) {
  // CHECK DATABASE FOR MATCHING USERNAME AND PASSWORD
  try {
    storage.removeItem("loggedInUser");
    location.href = "index.html";
  } catch (e) {
    alert(e);
  }
}

// Tests if local storage has data propagated
function checkLocalStorage() {
  try {
    var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
    alert(JSON.stringify(productsFromLocalStorage[0]));

    var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
    alert(JSON.stringify(skusFromLocalStorage[0]));

    var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
    alert(JSON.stringify(imagesFromLocalStorage[0]));

    var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
    alert(JSON.stringify(categoriesFromLocalStorage[0]));

    var categories_productFromLocalStorage = JSON.parse(
      storage.getItem("categories_product")
    );
    alert(JSON.stringify(categories_productFromLocalStorage[0]));

    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
    alert(JSON.stringify(accountsFromLocalStorage[0]));

    var addressesFromLocalStorage = JSON.parse(storage.getItem("addresses"));
    alert(JSON.stringify(addressesFromLocalStorage[0]));

    var paymentsFromLocalStorage = JSON.parse(storage.getItem("payments"));
    alert(JSON.stringify(paymentsFromLocalStorage[0]));

    var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
    alert(JSON.stringify(cartFromLocalStorage[0]));

    var ordersFromLocalStorage = JSON.parse(storage.getItem("orders"));
    alert(JSON.stringify(ordersFromLocalStorage[0]));
  } catch (e) {
    alert(e);
  }
}
