// Event listener for when device is ready
document.addEventListener("deviceready", onDeviceReady, false);

// Local Storage variable
var storage = window.localStorage;

// Storage variables
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);
var ordersFromLocalStorage = JSON.parse(storage.getItem("orders"));
var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
var addressesFromLocalStorage = JSON.parse(storage.getItem("addresses"));
var paymentsFromLocalStorage = JSON.parse(storage.getItem("payments"));
var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));

// Used to access current logged in user
var loggedInUser;

// Checks IF accounts table is in local storage ELSE import data
if (accountsFromLocalStorage == null) {
  var accountsSTRING = JSON.stringify(accounts);
  storage.setItem("accounts", accountsSTRING);
}
// Checks IF products table is in local storage ELSE import data
if (productsFromLocalStorage == null) {
  var productsSTRING = JSON.stringify(products);
  storage.setItem("products", productsSTRING);
}

// Checks IF skus table is in local storage ELSE import data
if (skusFromLocalStorage == null) {
  var skusSTRING = JSON.stringify(skus);
  storage.setItem("skus", skusSTRING);
}

// Checks IF images table is in local storage ELSE import data
if (imagesFromLocalStorage == null) {
  var imagesSTRING = JSON.stringify(images);
  storage.setItem("images", imageSTRING);
}

// Checks IF categories table is in local storage ELSE import data
if (categoriesFromLocalStorage == null) {
  var categoriesSTRING = JSON.stringify(categories);
  storage.setItem("categories", categoriesSTRING);
}

// Checks IF categories_product table is in local storage ELSE import data
if (categories_productFromLocalStorage == null) {
  var category_productSTRING = JSON.stringify(category_product);
  storage.setItem("categories_product", category_productSTRING);
}

// Checks IF orders table is in local storage ELSE import data
if (ordersFromLocalStorage == null) {
  var ordersSTRING = JSON.stringify(orders);
  storage.setItem("orders", ordersSTRING);
}

// Checks IF cart table is in local storage ELSE import data
if (cartFromLocalStorage == null) {
  var cartSTRING = JSON.stringify(cart);
  storage.setItem("cart", cartSTRING);
}

// Checks IF addresses table is in local storage ELSE import data
if (addressesFromLocalStorage == null) {
  var addressesSTRING = JSON.stringify(addresses);
  storage.setItem("addresses", addressesSTRING);
}

// Checks IF payments table is in local storage ELSE import data
if (paymentsFromLocalStorage == null) {
  var paymentsSTRING = JSON.stringify(payments);
  storage.setItem("payments", paymentsSTRING);
}

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fetch logged in user
  loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

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

    // Displays "Hi Guest" when there is no logged in user
    var sidebar_account_item = document.getElementById("home-sidebar-account");
    sidebar_account_item.innerHTML =
      sidebar_account_item.innerHTML +
      `<img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" class="icon avatar-sm" alt="" />
        <div class="text">
           <h6 class="mb-0">Hi Guest</h6>
        </div>`;

    // Displays login and sign up buttons when there is no logged in user
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

  // Finds the logout button on the page
  var lob = document.getElementById("logout-button");
  // Sets an event listener for the logout button
  if (lob) {
    lob.addEventListener("click", logoutHandler);
  }
});

// Event handler for when device is ready
function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);

  var data = getProductsData();

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

// Returns an array of all products in the database
function getProductsData() {
  var data = [];

  try {
    for (const p of productsFromLocalStorage) {
      var id = p.id;
      var name = p.name;
      var description = p.description;
      var variant;
      var variant_options = [];
      var prices = [];
      var images = [];
      var categories = [];

      for (const s of skusFromLocalStorage) {
        if (s.product_id == id) {
          prices.push(s.price);
          variant_options.push(s);
          variant = s.variant;
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
        description: description,
        variant: variant,
        variant_options: variant_options,
        price: Math.min(...prices),
        image: images[0],
        categories: categories,
      };

      data.push(d);
    }
  } catch (e) {
    alert(e);
  }

  return data;
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



var accounts=[
  {
    "id": 1,
    "username": "admin",
    "password": "admin",
    "first_name": "admin",
    "last_name": "admin",
    "email": "admin@gmail.com",
    "birthdate": "1/1/2000",
    "telephone": 9999999999,
    "is_admin": "TRUE",
    "date_joined": "10/2"
  },
  {
    "id": 2,
    "username": "user",
    "password": "user",
    "first_name": "user",
    "last_name": "user",
    "email": "user@gmail.com",
    "birthdate": "2/2/2000",
    "telephone": 9111111111,
    "is_admin": "FALSE",
    "date_joined": "10/13"
  }
];


var addresses=[
  {
    "id": 1,
    "account_id": 2,
    "name": "Aeronn",
    "email": "aeronn@gmail.com",
    "phone": 639999999999,
    "region": "Laguna",
    "address": "42 4-A Cocoland Subd., San Pablo City",
    "zip code": 4000
  },
  {
    "id": 2,
    "account_id": 2,
    "name": "Ronnel",
    "email": "ronnel@gmail.com",
    "phone": 639999999999,
    "region": "Laguna",
    "address": "45 Bulaklak St., Southwoods, Binan",
    "zip code": 4024
  }
];


var cart=[
  {
    "id": 1,
    "account_id": 1,
    "sku_id": 53,
    "quantity": 1,
    "is_ongoing": "TRUE",
    "is_completed": "FALSE"
  },
  {
    "id": 2,
    "account_id": 1,
    "sku_id": 60,
    "quantity": 1,
    "is_ongoing": "FALSE",
    "is_completed": "TRUE"
  },
  {
    "id": 3,
    "account_id": 1,
    "sku_id": 75,
    "quantity": 1,
    "is_ongoing": "FALSE",
    "is_completed": "FALSE"
  },
  {
    "id": 4,
    "account_id": 1,
    "sku_id": 85,
    "quantity": 1,
    "is_ongoing": "FALSE",
    "is_completed": "FALSE"
  },
  {
    "id": 5,
    "account_id": 2,
    "sku_id": 20,
    "quantity": 1,
    "is_ongoing": "TRUE",
    "is_completed": "FALSE"
  },
  {
    "id": 6,
    "account_id": 2,
    "sku_id": 32,
    "quantity": 1,
    "is_ongoing": "FALSE",
    "is_completed": "TRUE"
  },
  {
    "id": 7,
    "account_id": 2,
    "sku_id": 10,
    "quantity": 2,
    "is_ongoing": "FALSE",
    "is_completed": "FALSE"
  },
  {
    "id": 8,
    "account_id": 2,
    "sku_id": 44,
    "quantity": 1,
    "is_ongoing": "FALSE",
    "is_completed": "FALSE"
  }
];


var categories=[
  {
    "id": 1,
    "name": "New Arrivals",
    "link": "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    "id": 2,
    "name": "Best Sellers",
    "link": "https://images.unsplash.com/photo-1589828994425-cee7c6e8dbf8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2112&q=80"
  },
  {
    "id": 3,
    "name": "Clothing",
    "link": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
  },
  {
    "id": 4,
    "name": "Pet Supplies",
    "link": "https://images.unsplash.com/photo-1508948956644-0017e845d797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
  },
  {
    "id": 5,
    "name": "Electronics",
    "link": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1625&q=80"
  },
  {
    "id": 6,
    "name": "Groceries",
    "link": "https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    "id": 7,
    "name": "Beauty Products",
    "link": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80"
  },
  {
    "id": 8,
    "name": "Appliances",
    "link": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
  },
  {
    "id": 9,
    "name": "Sports and Outdoors",
    "link": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
  },
  {
    "id": 10,
    "name": "Toys and Games",
    "link": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
  }
];


var category=[
  {
    "id": 1,
    "name": "New Arrivals",
    "link": "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "icon": "",
    "icon_white": "https://i.ibb.co/5hkyS8X/icons8-new-50-2.png"
  },
  {
    "id": 2,
    "name": "Best Sellers",
    "link": "https://images.unsplash.com/photo-1589828994425-cee7c6e8dbf8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2112&q=80",
    "icon": "",
    "icon_white": "https://i.ibb.co/VD3PPcR/icons8-best-seller-50.png"
  },
  {
    "id": 3,
    "name": "Clothing",
    "link": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
    "icon": "https://i.imgur.com/qwNecME.png",
    "icon_white": "https://i.ibb.co/4Y8Ckjr/qw-Nec-ME-1.png"
  },
  {
    "id": 4,
    "name": "Pet Supplies",
    "link": "https://images.unsplash.com/photo-1508948956644-0017e845d797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    "icon": "https://i.imgur.com/xJszGHF.png",
    "icon_white": "https://i.ibb.co/FbJyddt/x-Jsz-GHF-1.png"
  },
  {
    "id": 5,
    "name": "Electronics",
    "link": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1625&q=80",
    "icon": "https://i.imgur.com/yIe5okR.png",
    "icon_white": "https://i.ibb.co/tXPTCgV/y-Ie5ok-R-1.png"
  },
  {
    "id": 6,
    "name": "Groceries",
    "link": "https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "icon": "https://i.imgur.com/cewA64p.png",
    "icon_white": "https://i.ibb.co/fdRWgpx/cew-A64p-1.png"
  },
  {
    "id": 7,
    "name": "Beauty Products",
    "link": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80",
    "icon": "https://i.imgur.com/LjCWEOp.png",
    "icon_white": "https://i.ibb.co/CzZJCVy/Lj-CWEOp-1.png"
  },
  {
    "id": 8,
    "name": "Appliances",
    "link": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
    "icon": "https://i.imgur.com/dDObC0A.png",
    "icon_white": "https://i.ibb.co/NjfHGGD/d-DOb-C0-A-1.png"
  },
  {
    "id": 9,
    "name": "Sports and Outdoors",
    "link": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
    "icon": "https://i.imgur.com/xD3crCv.png",
    "icon_white": "https://i.ibb.co/wKXcNqM/x-D3cr-Cv-1.png"
  },
  {
    "id": 10,
    "name": "Toys and Games",
    "link": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
    "icon": "https://i.imgur.com/cfXL6M2.png",
    "icon_white": "https://i.ibb.co/Hnq1NTC/cf-XL6-M2-1.png"
  }
];


var category_product=[
  {
    "id": 1,
    "category_id": 1,
    "product_id": 2
  },
  {
    "id": 2,
    "category_id": 1,
    "product_id": 12
  },
  {
    "id": 3,
    "category_id": 1,
    "product_id": 20
  },
  {
    "id": 4,
    "category_id": 1,
    "product_id": 23
  },
  {
    "id": 5,
    "category_id": 1,
    "product_id": 38
  },
  {
    "id": 6,
    "category_id": 2,
    "product_id": 1
  },
  {
    "id": 7,
    "category_id": 2,
    "product_id": 5
  },
  {
    "id": 8,
    "category_id": 2,
    "product_id": 25
  },
  {
    "id": 9,
    "category_id": 2,
    "product_id": 31
  },
  {
    "id": 10,
    "category_id": 2,
    "product_id": 42
  },
  {
    "id": 11,
    "category_id": 3,
    "product_id": 1
  },
  {
    "id": 12,
    "category_id": 3,
    "product_id": 2
  },
  {
    "id": 13,
    "category_id": 3,
    "product_id": 3
  },
  {
    "id": 14,
    "category_id": 3,
    "product_id": 4
  },
  {
    "id": 15,
    "category_id": 3,
    "product_id": 5
  },
  {
    "id": 16,
    "category_id": 4,
    "product_id": 6
  },
  {
    "id": 17,
    "category_id": 4,
    "product_id": 7
  },
  {
    "id": 18,
    "category_id": 4,
    "product_id": 8
  },
  {
    "id": 19,
    "category_id": 4,
    "product_id": 9
  },
  {
    "id": 20,
    "category_id": 4,
    "product_id": 10
  },
  {
    "id": 21,
    "category_id": 5,
    "product_id": 11
  },
  {
    "id": 22,
    "category_id": 5,
    "product_id": 12
  },
  {
    "id": 23,
    "category_id": 5,
    "product_id": 13
  },
  {
    "id": 24,
    "category_id": 5,
    "product_id": 14
  },
  {
    "id": 25,
    "category_id": 5,
    "product_id": 15
  },
  {
    "id": 26,
    "category_id": 6,
    "product_id": 16
  },
  {
    "id": 27,
    "category_id": 6,
    "product_id": 17
  },
  {
    "id": 28,
    "category_id": 6,
    "product_id": 18
  },
  {
    "id": 29,
    "category_id": 6,
    "product_id": 19
  },
  {
    "id": 30,
    "category_id": 6,
    "product_id": 20
  },
  {
    "id": 31,
    "category_id": 7,
    "product_id": 21
  },
  {
    "id": 32,
    "category_id": 7,
    "product_id": 22
  },
  {
    "id": 33,
    "category_id": 7,
    "product_id": 23
  },
  {
    "id": 34,
    "category_id": 7,
    "product_id": 24
  },
  {
    "id": 35,
    "category_id": 7,
    "product_id": 25
  },
  {
    "id": 36,
    "category_id": 8,
    "product_id": 26
  },
  {
    "id": 37,
    "category_id": 8,
    "product_id": 27
  },
  {
    "id": 38,
    "category_id": 8,
    "product_id": 28
  },
  {
    "id": 39,
    "category_id": 8,
    "product_id": 29
  },
  {
    "id": 40,
    "category_id": 8,
    "product_id": 30
  },
  {
    "id": 41,
    "category_id": 9,
    "product_id": 31
  },
  {
    "id": 42,
    "category_id": 9,
    "product_id": 32
  },
  {
    "id": 43,
    "category_id": 9,
    "product_id": 33
  },
  {
    "id": 44,
    "category_id": 9,
    "product_id": 34
  },
  {
    "id": 45,
    "category_id": 9,
    "product_id": 35
  },
  {
    "id": 46,
    "category_id": 10,
    "product_id": 36
  },
  {
    "id": 47,
    "category_id": 10,
    "product_id": 37
  },
  {
    "id": 48,
    "category_id": 10,
    "product_id": 38
  },
  {
    "id": 49,
    "category_id": 10,
    "product_id": 39
  },
  {
    "id": 50,
    "category_id": 10,
    "product_id": 40
  }
];


var images=[
  {
    "id": 1,
    "product_id": 1,
    "link": "https://m.media-amazon.com/images/I/61zgAKftPUL._AC_UY500_.jpg"
  },
  {
    "id": 2,
    "product_id": 1,
    "link": "https://m.media-amazon.com/images/I/61E6dK1NptL._AC_UY500_.jpg"
  },
  {
    "id": 3,
    "product_id": 1,
    "link": "https://m.media-amazon.com/images/I/51zbqb1UE1L._AC_UY500_.jpg"
  },
  {
    "id": 4,
    "product_id": 1,
    "link": "https://m.media-amazon.com/images/I/61rAAuGJusL._AC_UY500_.jpg"
  },
  {
    "id": 5,
    "product_id": 1,
    "link": "https://m.media-amazon.com/images/I/51vJbmdbZ8L._AC_UY500_.jpg"
  },
  {
    "id": 6,
    "product_id": 1,
    "link": "https://m.media-amazon.com/images/I/61uGK3n-93L._AC_UY500_.jpg"
  },
  {
    "id": 7,
    "product_id": 2,
    "link": "https://m.media-amazon.com/images/I/619qFDgtooL._AC_UX425_.jpg"
  },
  {
    "id": 8,
    "product_id": 2,
    "link": "https://m.media-amazon.com/images/I/61xEPodPO-L._AC_UY500_.jpg"
  },
  {
    "id": 9,
    "product_id": 2,
    "link": "https://m.media-amazon.com/images/I/61y9krlctzL._AC_UY500_.jpg"
  },
  {
    "id": 10,
    "product_id": 2,
    "link": "https://m.media-amazon.com/images/I/719IUERdpDL._AC_UY500_.jpg"
  },
  {
    "id": 11,
    "product_id": 2,
    "link": "https://m.media-amazon.com/images/I/71uIWPGS7sL._AC_UY500_.jpg"
  },
  {
    "id": 12,
    "product_id": 2,
    "link": "https://m.media-amazon.com/images/I/716r1Mga3+L._AC_UY500_.jpg"
  },
  {
    "id": 13,
    "product_id": 3,
    "link": "https://m.media-amazon.com/images/I/71dNWVnVuLS._AC_UY500_.jpg"
  },
  {
    "id": 14,
    "product_id": 3,
    "link": "https://m.media-amazon.com/images/I/71-RBvdNQpS._AC_UY500_.jpg"
  },
  {
    "id": 15,
    "product_id": 3,
    "link": "https://m.media-amazon.com/images/I/81uAgtsHnxS._AC_UY500_.jpg"
  },
  {
    "id": 16,
    "product_id": 3,
    "link": "https://m.media-amazon.com/images/I/71r5rNulAMS._AC_UY500_.jpg"
  },
  {
    "id": 17,
    "product_id": 4,
    "link": "https://m.media-amazon.com/images/I/91l4WvVBnFL._AC_UY500_.jpg"
  },
  {
    "id": 18,
    "product_id": 4,
    "link": "https://m.media-amazon.com/images/I/71z8b3o4VRL._AC_UX385_.jpg"
  },
  {
    "id": 19,
    "product_id": 4,
    "link": "https://m.media-amazon.com/images/I/81QQ+zdYubL._AC_UX385_.jpg"
  },
  {
    "id": 20,
    "product_id": 5,
    "link": "https://m.media-amazon.com/images/I/81kQEUsB08L._AC_UX425_.jpg"
  },
  {
    "id": 21,
    "product_id": 5,
    "link": "https://m.media-amazon.com/images/I/81r7GLoBPfL._AC_UX385_.jpg"
  },
  {
    "id": 22,
    "product_id": 5,
    "link": "https://m.media-amazon.com/images/I/81t81TW6GXS._AC_UX385_.jpg"
  },
  {
    "id": 23,
    "product_id": 5,
    "link": "https://m.media-amazon.com/images/I/71xCDF9E5KS._AC_UX385_.jpg"
  },
  {
    "id": 24,
    "product_id": 5,
    "link": "https://m.media-amazon.com/images/I/81NZYjPHcJS._AC_UX385_.jpg"
  },
  {
    "id": 25,
    "product_id": 5,
    "link": "https://m.media-amazon.com/images/I/81alcWJFTRS._AC_UY500_.jpg"
  },
  {
    "id": 26,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/81RlzzV4bWL._AC_SL1500_.jpg"
  },
  {
    "id": 27,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/816ykYIa3nL._AC_SL1500_.jpg"
  },
  {
    "id": 28,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/81BPmXtlhFL._AC_SL1500_.jpg"
  },
  {
    "id": 29,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/61gczymtVpL._AC_SL1500_.jpg"
  },
  {
    "id": 30,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/81mgTXGTxpL._AC_SL1500_.jpg"
  },
  {
    "id": 31,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/71KiR7AcmOL._AC_SL1500_.jpg"
  },
  {
    "id": 32,
    "product_id": 6,
    "link": "https://m.media-amazon.com/images/I/81t9ROOKtoL._AC_SL1500_.jpg"
  },
  {
    "id": 33,
    "product_id": 7,
    "link": "https://m.media-amazon.com/images/I/71LFrX3BSIS._AC_SY550_.jpg"
  },
  {
    "id": 34,
    "product_id": 7,
    "link": "https://m.media-amazon.com/images/I/81lwGpS+R2S._AC_SY606_.jpg"
  },
  {
    "id": 35,
    "product_id": 7,
    "link": "https://m.media-amazon.com/images/I/81tin764liL._AC_SY606_.jpg"
  },
  {
    "id": 36,
    "product_id": 8,
    "link": "https://m.media-amazon.com/images/I/71Rogdhu44L._AC_SY550_.jpg"
  },
  {
    "id": 37,
    "product_id": 8,
    "link": "https://m.media-amazon.com/images/I/81ZzJ3i7poL._AC_SY679_.jpg"
  },
  {
    "id": 38,
    "product_id": 8,
    "link": "https://m.media-amazon.com/images/I/51sNyHrITnL._AC_SX450_.jpg"
  },
  {
    "id": 39,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/61n8bwn1ixS._AC_SL1500_.jpg"
  },
  {
    "id": 40,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/712kaInZAWL._AC_SL1500_.jpg"
  },
  {
    "id": 41,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/81CvdaX+2BL._AC_SL1500_.jpg"
  },
  {
    "id": 42,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/81IqdXCn8HL._AC_SL1500_.jpg"
  },
  {
    "id": 43,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/71caaxLP-rL._AC_SL1500_.jpg"
  },
  {
    "id": 44,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/71S0KSJv-4L._AC_SL1500_.jpg"
  },
  {
    "id": 45,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/716xjDpiMBL._AC_SL1500_.jpg"
  },
  {
    "id": 46,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/81DFD8CmKlS._AC_SL1500_.jpg"
  },
  {
    "id": 47,
    "product_id": 9,
    "link": "https://m.media-amazon.com/images/I/71dEcVQlkzL._AC_SL1500_.jpg"
  },
  {
    "id": 48,
    "product_id": 10,
    "link": "https://m.media-amazon.com/images/I/61ZwZ9YLe7L._AC_SY450_.jpg"
  },
  {
    "id": 49,
    "product_id": 10,
    "link": "https://m.media-amazon.com/images/I/51-6jXUpvrL._AC_SY450_.jpg"
  },
  {
    "id": 50,
    "product_id": 10,
    "link": "https://m.media-amazon.com/images/I/71QYYMakTAL._AC_SY450_.jpg"
  },
  {
    "id": 51,
    "product_id": 11,
    "link": "https://m.media-amazon.com/images/I/71SKyLxrALL._AC_SL1500_.jpg"
  },
  {
    "id": 52,
    "product_id": 11,
    "link": "https://m.media-amazon.com/images/I/810xjhlEIzL._AC_SL1500_.jpg"
  },
  {
    "id": 53,
    "product_id": 11,
    "link": "https://m.media-amazon.com/images/I/81qgvjdAysL._AC_SL1500_.jpg"
  },
  {
    "id": 54,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/51QxA-98Q+L._AC_SL1000_.jpg"
  },
  {
    "id": 55,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/51Kg5XJiiHL._AC_SL1000_.jpg"
  },
  {
    "id": 56,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/81+h-aapf2L._AC_SL1500_.jpg"
  },
  {
    "id": 57,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/81CvcNLYIXL._AC_SL1500_.jpg"
  },
  {
    "id": 58,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/81y5WqpIwsL._AC_SL1500_.jpg"
  },
  {
    "id": 59,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/919C+rLsL1L._AC_SL1500_.jpg"
  },
  {
    "id": 60,
    "product_id": 12,
    "link": "https://m.media-amazon.com/images/I/413-FyxJ0vL._AC_SL1000_.jpg"
  },
  {
    "id": 61,
    "product_id": 13,
    "link": "https://m.media-amazon.com/images/I/71bmukMiAEL._AC_SL1500_.jpg"
  },
  {
    "id": 62,
    "product_id": 13,
    "link": "https://m.media-amazon.com/images/I/61bFwWz5exL._AC_SL1000_.jpg"
  },
  {
    "id": 63,
    "product_id": 13,
    "link": "https://m.media-amazon.com/images/I/81VAajNgjEL._AC_SL1500_.jpg"
  },
  {
    "id": 64,
    "product_id": 13,
    "link": "https://m.media-amazon.com/images/I/81YVJDLt26L._AC_SL1500_.jpg"
  },
  {
    "id": 65,
    "product_id": 13,
    "link": "https://m.media-amazon.com/images/I/81a3N5vL3rL._AC_SL1500_.jpg"
  },
  {
    "id": 66,
    "product_id": 13,
    "link": "https://m.media-amazon.com/images/I/81A7ihPlUUL._AC_SL1500_.jpg"
  },
  {
    "id": 67,
    "product_id": 14,
    "link": "https://m.media-amazon.com/images/I/81FF+Guqm-L._AC_SX425_.jpg"
  },
  {
    "id": 68,
    "product_id": 14,
    "link": "https://m.media-amazon.com/images/I/81mFNcOrSyL._AC_SX425_.jpg"
  },
  {
    "id": 69,
    "product_id": 14,
    "link": "https://m.media-amazon.com/images/I/71LuNG8X+9L._AC_SX425_.jpg"
  },
  {
    "id": 70,
    "product_id": 14,
    "link": "https://m.media-amazon.com/images/I/71BbXapoTWL._AC_SX425_.jpg"
  },
  {
    "id": 71,
    "product_id": 15,
    "link": "https://m.media-amazon.com/images/I/71L6TFxiWEL._AC_SL1500_.jpg"
  },
  {
    "id": 72,
    "product_id": 15,
    "link": "https://m.media-amazon.com/images/I/61LHhvXdh8L._AC_SL1000_.jpg"
  },
  {
    "id": 73,
    "product_id": 15,
    "link": "https://m.media-amazon.com/images/I/617TiP8UfSL._AC_SL1000_.jpg"
  },
  {
    "id": 74,
    "product_id": 15,
    "link": "https://m.media-amazon.com/images/I/81mhYYG0BEL._AC_SL1500_.jpg"
  },
  {
    "id": 75,
    "product_id": 15,
    "link": "https://m.media-amazon.com/images/I/718XCCon2sL._AC_SL1500_.jpg"
  },
  {
    "id": 76,
    "product_id": 15,
    "link": "https://m.media-amazon.com/images/I/71zwP-212hL._AC_SL1500_.jpg"
  },
  {
    "id": 77,
    "product_id": 16,
    "link": "https://m.media-amazon.com/images/I/71bClMX-YvL._SL1000_.jpg"
  },
  {
    "id": 78,
    "product_id": 16,
    "link": "https://m.media-amazon.com/images/I/318f-5hRdpL.jpg"
  },
  {
    "id": 79,
    "product_id": 16,
    "link": "https://m.media-amazon.com/images/I/81sj9vymmAL._SL1500_.jpg"
  },
  {
    "id": 80,
    "product_id": 16,
    "link": "https://m.media-amazon.com/images/I/81vrGC30uWL._SL1500_.jpg"
  },
  {
    "id": 81,
    "product_id": 16,
    "link": "https://m.media-amazon.com/images/I/81zCLmQQfjL._SL1500_.jpg"
  },
  {
    "id": 82,
    "product_id": 17,
    "link": "https://m.media-amazon.com/images/I/61R3pJH7jGL._SX679_.jpg"
  },
  {
    "id": 83,
    "product_id": 17,
    "link": "https://m.media-amazon.com/images/I/61raJF1cF0L._SX679_.jpg"
  },
  {
    "id": 84,
    "product_id": 17,
    "link": "https://m.media-amazon.com/images/I/4178eSjXysL._SX425_.jpg"
  },
  {
    "id": 85,
    "product_id": 17,
    "link": "https://m.media-amazon.com/images/I/41RLRNFcL2L._SX425_.jpg"
  },
  {
    "id": 86,
    "product_id": 17,
    "link": "https://m.media-amazon.com/images/I/71pkWv74gvL._SX425_.jpg"
  },
  {
    "id": 87,
    "product_id": 17,
    "link": "https://m.media-amazon.com/images/I/71pgjnOqPeL._SX679_.jpg"
  },
  {
    "id": 88,
    "product_id": 18,
    "link": "https://m.media-amazon.com/images/I/710WIeuN0mL._SX679_PIbundle-2,TopRight,0,0_AA679SH20_.jpg"
  },
  {
    "id": 89,
    "product_id": 18,
    "link": "https://m.media-amazon.com/images/I/71NPZ68I9fL._SX425_.jpg"
  },
  {
    "id": 90,
    "product_id": 18,
    "link": "https://m.media-amazon.com/images/I/71a7HqXzALL._SX425_.jpg"
  },
  {
    "id": 91,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/71Iu2Odw-VS._SL1500_.jpg"
  },
  {
    "id": 92,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/71ZwXl83jTS._SL1500_.jpg"
  },
  {
    "id": 93,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/710MqpSNugS._SL1500_.jpg"
  },
  {
    "id": 94,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/71y98usRCIS._SL1200_.jpg"
  },
  {
    "id": 95,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/81LxOC7i3dS._SL1500_.jpg"
  },
  {
    "id": 96,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/71JybXo+rwS._SL1500_.jpg"
  },
  {
    "id": 97,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/71kP6mwZ8vS._SL1500_.jpg"
  },
  {
    "id": 98,
    "product_id": 19,
    "link": "https://m.media-amazon.com/images/I/91-VaDr8+YL._SL1500_.jpg"
  },
  {
    "id": 99,
    "product_id": 20,
    "link": "https://m.media-amazon.com/images/I/4122psjbK7L.jpg"
  },
  {
    "id": 100,
    "product_id": 21,
    "link": "https://m.media-amazon.com/images/I/618JNkdWjwL._SX522_.jpg"
  },
  {
    "id": 101,
    "product_id": 21,
    "link": "https://m.media-amazon.com/images/I/51Ht2DdhcyL._SX466_.jpg"
  },
  {
    "id": 102,
    "product_id": 21,
    "link": "https://m.media-amazon.com/images/I/61npgHpcmNL._SX466_.jpg"
  },
  {
    "id": 103,
    "product_id": 21,
    "link": "https://m.media-amazon.com/images/I/91DSSmxQDiL._SX466_.jpg"
  },
  {
    "id": 104,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/71ebw68XKPL._SL1500_.jpg"
  },
  {
    "id": 105,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/71C2i4iCFpL._SL1500_.jpg"
  },
  {
    "id": 106,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/71aNeQSzMyL._SL1500_.jpg"
  },
  {
    "id": 107,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/61ByC5AlS-L._SL1500_.jpg"
  },
  {
    "id": 108,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/710bu0HBVdL._SL1500_.jpg"
  },
  {
    "id": 109,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/71IBDl-FUML._SL1500_.jpg"
  },
  {
    "id": 110,
    "product_id": 22,
    "link": "https://m.media-amazon.com/images/I/61HofVjE0GL._SL1500_.jpg"
  },
  {
    "id": 111,
    "product_id": 23,
    "link": "https://m.media-amazon.com/images/I/61BZC1ao0FL._SL1500_.jpg"
  },
  {
    "id": 112,
    "product_id": 23,
    "link": "https://m.media-amazon.com/images/I/61kwPgLNE6L._SL1500_.jpg"
  },
  {
    "id": 113,
    "product_id": 23,
    "link": "https://m.media-amazon.com/images/I/61ou2Dsaq+L._SL1000_.jpg"
  },
  {
    "id": 114,
    "product_id": 23,
    "link": "https://m.media-amazon.com/images/I/517uYI4-OPL._SL1000_.jpg"
  },
  {
    "id": 115,
    "product_id": 23,
    "link": "https://m.media-amazon.com/images/I/51HZjIU1cTL.jpg"
  },
  {
    "id": 116,
    "product_id": 24,
    "link": "https://m.media-amazon.com/images/I/71NYlrUDfQS._SX466_.jpg"
  },
  {
    "id": 117,
    "product_id": 24,
    "link": "https://m.media-amazon.com/images/I/71tY2Fy8wjS._SY355_.jpg"
  },
  {
    "id": 118,
    "product_id": 24,
    "link": "https://m.media-amazon.com/images/I/81Pp6QrooES._SY355_.jpg"
  },
  {
    "id": 119,
    "product_id": 24,
    "link": "https://m.media-amazon.com/images/I/71T71RiazFS._SY355_.jpg"
  },
  {
    "id": 120,
    "product_id": 25,
    "link": "https://m.media-amazon.com/images/I/71qbVupjTzL._SX679_.jpg"
  },
  {
    "id": 121,
    "product_id": 26,
    "link": "https://m.media-amazon.com/images/I/615sZiaGyzL._AC_SL1500_.jpg"
  },
  {
    "id": 122,
    "product_id": 26,
    "link": "https://m.media-amazon.com/images/I/818RKGO2ixL._AC_SL1500_.jpg"
  },
  {
    "id": 123,
    "product_id": 26,
    "link": "https://m.media-amazon.com/images/I/71L7fg75lHL._AC_SL1500_.jpg"
  },
  {
    "id": 124,
    "product_id": 26,
    "link": "https://m.media-amazon.com/images/I/61T+BqXGqOL._AC_SL1500_.jpg"
  },
  {
    "id": 125,
    "product_id": 26,
    "link": "https://m.media-amazon.com/images/I/61y6NjJs4wL._AC_SL1500_.jpg"
  },
  {
    "id": 126,
    "product_id": 26,
    "link": "https://m.media-amazon.com/images/I/71GrPW3hGhL._AC_SL1500_.jpg"
  },
  {
    "id": 127,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/719t66oZquL._AC_SL1500_.jpg"
  },
  {
    "id": 128,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/71l9+oVBYfL._AC_SL1500_.jpg"
  },
  {
    "id": 129,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/71oe1TmN0NL._AC_SL1500_.jpg"
  },
  {
    "id": 130,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/714XlE-e+FL._AC_SL1500_.jpg"
  },
  {
    "id": 131,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/71xO3-krOvL._AC_SL1500_.jpg"
  },
  {
    "id": 132,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/813Xf3sOBpL._AC_SL1500_.jpg"
  },
  {
    "id": 133,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/71Vq2dq9lWL._AC_SL1500_.jpg"
  },
  {
    "id": 134,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/71gIuthU5CL._AC_SL1500_.jpg"
  },
  {
    "id": 135,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/71YcKzYvPzL._AC_SL1500_.jpg"
  },
  {
    "id": 136,
    "product_id": 27,
    "link": "https://m.media-amazon.com/images/I/91D5zzPmk+L._AC_SL1500_.jpg"
  },
  {
    "id": 137,
    "product_id": 28,
    "link": "https://m.media-amazon.com/images/I/71JLPXiPChL._AC_SL1500_.jpg"
  },
  {
    "id": 138,
    "product_id": 28,
    "link": "https://m.media-amazon.com/images/I/71+td7MB+YL._AC_SL1500_.jpg"
  },
  {
    "id": 139,
    "product_id": 28,
    "link": "https://m.media-amazon.com/images/I/7128bmBTraL._AC_SL1500_.jpg"
  },
  {
    "id": 140,
    "product_id": 29,
    "link": "https://m.media-amazon.com/images/I/81-bhwMdKAL._AC_SX569_.jpg"
  },
  {
    "id": 141,
    "product_id": 29,
    "link": "https://m.media-amazon.com/images/I/91ppz5GncJL._AC_SY450_.jpg"
  },
  {
    "id": 142,
    "product_id": 29,
    "link": "https://m.media-amazon.com/images/I/81Zx+4hpeGL._AC_SY450_.jpg"
  },
  {
    "id": 143,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/610eFWo8u-L._AC_SL1500_.jpg"
  },
  {
    "id": 144,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/51xRAVUfb9L._AC_SL1000_.jpg"
  },
  {
    "id": 145,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/61QBwajoplL._AC_SL1000_.jpg"
  },
  {
    "id": 146,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/61GyjrXUSwL._AC_SL1000_.jpg"
  },
  {
    "id": 147,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/61amLS8rKWL._AC_SL1000_.jpg"
  },
  {
    "id": 148,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/51XQk2-ST2L._AC_SL1000_.jpg"
  },
  {
    "id": 149,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/71NTrFLDrdL._AC_SL1500_.jpg"
  },
  {
    "id": 150,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/71ZEfjRBGDL._AC_SL1500_.jpg"
  },
  {
    "id": 151,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/71sqo9Z0TcL._AC_SL1500_.jpg"
  },
  {
    "id": 152,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/519PP96YhqL._AC_SL1000_.jpg"
  },
  {
    "id": 153,
    "product_id": 30,
    "link": "https://m.media-amazon.com/images/I/61FyXtCdl6L._AC_SL1000_.jpg"
  },
  {
    "id": 154,
    "product_id": 31,
    "link": "https://m.media-amazon.com/images/I/71yDp1JEKpL._AC_SL1500_.jpg"
  },
  {
    "id": 155,
    "product_id": 31,
    "link": "https://m.media-amazon.com/images/I/91xQHsTVy9L._AC_SL1500_.jpg"
  },
  {
    "id": 156,
    "product_id": 31,
    "link": "https://m.media-amazon.com/images/I/81Ea6pLv5UL._AC_SL1500_.jpg"
  },
  {
    "id": 157,
    "product_id": 32,
    "link": "https://m.media-amazon.com/images/I/81m3Qk2ginS._AC_SL1500_.jpg"
  },
  {
    "id": 158,
    "product_id": 32,
    "link": "https://m.media-amazon.com/images/I/71A7NswB7jL._AC_SL1500_.jpg"
  },
  {
    "id": 159,
    "product_id": 32,
    "link": "https://m.media-amazon.com/images/I/71+OHsAPTPL._AC_SL1500_.jpg"
  },
  {
    "id": 160,
    "product_id": 32,
    "link": "https://m.media-amazon.com/images/I/81Ux8yMD9iL._AC_SL1500_.jpg"
  },
  {
    "id": 161,
    "product_id": 32,
    "link": "https://m.media-amazon.com/images/I/81oBGPOAtdS._AC_SL1500_.jpg"
  },
  {
    "id": 162,
    "product_id": 32,
    "link": "https://m.media-amazon.com/images/I/81iq9z7HgcL._AC_SL1500_.jpg"
  },
  {
    "id": 163,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/71Cu39Uk4eS._AC_SL1500_.jpg"
  },
  {
    "id": 164,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/71eDyxsRPjS._AC_SL1500_.jpg"
  },
  {
    "id": 165,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/7153cWD+QNS._AC_SL1500_.jpg"
  },
  {
    "id": 166,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/71Q3L2Ar0lS._AC_SL1500_.jpg"
  },
  {
    "id": 167,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/911bLzpA2GS._AC_SL1500_.jpg"
  },
  {
    "id": 168,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/71TR3q6ODpS._AC_SL1500_.jpg"
  },
  {
    "id": 169,
    "product_id": 33,
    "link": "https://m.media-amazon.com/images/I/81g4vUlhB-L._AC_SL1500_.jpg"
  },
  {
    "id": 170,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/51UB72DpVuL._AC_SL1000_.jpg"
  },
  {
    "id": 171,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/61DYjUxzBSL._AC_SL1000_.jpg"
  },
  {
    "id": 172,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/61I0ob8ZJML._AC_SL1000_.jpg"
  },
  {
    "id": 173,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/71qTIi1aiGL._AC_SL1000_.jpg"
  },
  {
    "id": 174,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/614mDFiqmEL._AC_SL1000_.jpg"
  },
  {
    "id": 175,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/61sTVsqeTrS._AC_SL1000_.jpg"
  },
  {
    "id": 176,
    "product_id": 34,
    "link": "https://m.media-amazon.com/images/I/71QAO962QoL._AC_SL1000_.jpg"
  },
  {
    "id": 177,
    "product_id": 35,
    "link": "https://m.media-amazon.com/images/I/71igwEAJIQS._AC_SL1500_.jpg"
  },
  {
    "id": 178,
    "product_id": 35,
    "link": "https://m.media-amazon.com/images/I/81wbvCF-5yL._AC_SL1500_.jpg"
  },
  {
    "id": 179,
    "product_id": 35,
    "link": "https://m.media-amazon.com/images/I/913oL2ivdFL._AC_SL1500_.jpg"
  },
  {
    "id": 180,
    "product_id": 35,
    "link": "https://m.media-amazon.com/images/I/91eej9k7xbL._AC_SL1500_.jpg"
  },
  {
    "id": 181,
    "product_id": 35,
    "link": "https://m.media-amazon.com/images/I/71WrMxVGNyL._AC_SL1500_.jpg"
  },
  {
    "id": 182,
    "product_id": 35,
    "link": "https://m.media-amazon.com/images/I/81tGPFefMkL._AC_SL1500_.jpg"
  },
  {
    "id": 183,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/71DDYHzczpL._AC_SL1500_.jpg"
  },
  {
    "id": 184,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/61ILR76ARmL._AC_SL1000_.jpg"
  },
  {
    "id": 185,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/711V3ZTchnL._AC_SL1200_.jpg"
  },
  {
    "id": 186,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/712pPUaueTL._AC_SL1500_.jpg"
  },
  {
    "id": 187,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/715xcOVoXyL._AC_SL1200_.jpg"
  },
  {
    "id": 188,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/71LdGiNRClL._AC_SL1200_.jpg"
  },
  {
    "id": 189,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/61vEw3UsGBL._AC_SL1200_.jpg"
  },
  {
    "id": 190,
    "product_id": 36,
    "link": "https://m.media-amazon.com/images/I/81mtQfaMglL._AC_SL1500_.jpg"
  },
  {
    "id": 191,
    "product_id": 37,
    "link": "https://m.media-amazon.com/images/I/71lmDFTt1tL._AC_SL1500_.jpg"
  },
  {
    "id": 192,
    "product_id": 37,
    "link": "https://m.media-amazon.com/images/I/71pa1k7OSVL._AC_SL1500_.jpg"
  },
  {
    "id": 193,
    "product_id": 37,
    "link": "https://m.media-amazon.com/images/I/71VSTMAqeYL._AC_SL1500_.jpg"
  },
  {
    "id": 194,
    "product_id": 37,
    "link": "https://m.media-amazon.com/images/I/71kb-8qw2tL._AC_SL1500_.jpg"
  },
  {
    "id": 195,
    "product_id": 37,
    "link": "https://m.media-amazon.com/images/I/71W4LyoqeKL._AC_SL1500_.jpg"
  },
  {
    "id": 196,
    "product_id": 37,
    "link": "https://m.media-amazon.com/images/I/71ZsIA90FFL._AC_SL1500_.jpg"
  },
  {
    "id": 197,
    "product_id": 38,
    "link": "https://m.media-amazon.com/images/I/61E49Wl-7iL._AC_SL1000_.jpg"
  },
  {
    "id": 198,
    "product_id": 38,
    "link": "https://m.media-amazon.com/images/I/81IOdwKzE8L._AC_SL1500_.jpg"
  },
  {
    "id": 199,
    "product_id": 38,
    "link": "https://m.media-amazon.com/images/I/71xtvrwlPxL._AC_SL1404_.jpg"
  },
  {
    "id": 200,
    "product_id": 38,
    "link": "https://m.media-amazon.com/images/I/715FOgPQn3L._AC_SL1404_.jpg"
  },
  {
    "id": 201,
    "product_id": 39,
    "link": "https://m.media-amazon.com/images/I/71PeknIreML._AC_SL1500_.jpg"
  },
  {
    "id": 202,
    "product_id": 39,
    "link": "https://m.media-amazon.com/images/I/81Os7TJKcSS._AC_SL1500_.jpg"
  },
  {
    "id": 203,
    "product_id": 39,
    "link": "https://m.media-amazon.com/images/I/710HhbJbzMS._AC_SL1500_.jpg"
  },
  {
    "id": 204,
    "product_id": 39,
    "link": "https://m.media-amazon.com/images/I/71Vx6pfPnqS._AC_SL1500_.jpg"
  },
  {
    "id": 205,
    "product_id": 39,
    "link": "https://m.media-amazon.com/images/I/71J3iJlsa-S._AC_SL1500_.jpg"
  },
  {
    "id": 206,
    "product_id": 39,
    "link": "https://m.media-amazon.com/images/I/81ZIGUpxYOS._AC_SL1500_.jpg"
  },
  {
    "id": 207,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/91sjL7skP2S._AC_SL1500_.jpg"
  },
  {
    "id": 208,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/91vXjXAv-6S._AC_SL1500_.jpg"
  },
  {
    "id": 209,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/91MKXLJ6rvL._AC_SL1500_.jpg"
  },
  {
    "id": 210,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/91R1cx0OCYS._AC_SL1500_.jpg"
  },
  {
    "id": 211,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/91cBVFLfQZS._AC_SL1500_.jpg"
  },
  {
    "id": 212,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/81QXJRm+lZL._AC_SL1500_.jpg"
  },
  {
    "id": 213,
    "product_id": 40,
    "link": "https://m.media-amazon.com/images/I/812WSZhLrRL._AC_SL1500_.jpg"
  }
];


var order=[
  {
    "id": 1,
    "account_id": 1,
    "cart_ids": [
      1
    ],
    "payment_id": 2,
    "address_id": 1,
    "create_date": "10/5"
  },
  {
    "id": 2,
    "account_id": 1,
    "cart_ids": [
      2
    ],
    "payment_id": 2,
    "address_id": 2,
    "create_date": "10/12"
  },
  {
    "id": 3,
    "account_id": 2,
    "cart_ids": [
      5
    ],
    "payment_id": 2,
    "address_id": 1,
    "create_date": "10/15"
  },
  {
    "id": 4,
    "account_id": 2,
    "cart_ids": [
      6
    ],
    "payment_id": 2,
    "address_id": 2,
    "create_date": "10/15"
  }
];


var payment=[
  {
    "id": 1,
    "account_id": 2,
    "name": "Aeronn",
    "provider": "Visa",
    "card_number": 4111111111111111,
    "expiration_date": "10/2025",
    "cvv": 123
  },
  {
    "id": 2,
    "account_id": 2,
    "name": "Ronnel",
    "provider": "Mastercard",
    "card_number": 5555555555554444,
    "expiration_date": "11/2027",
    "cvv": 123
  }
];


var products=[
  {
    "id": 1,
    "name": "Dr. Martens Men's Vegan 1460 Fashion Boot",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>100% Synthetic</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>Dr. Martens</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Department</dt>\n<dd>Mens</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item model number</dt>\n<dd>Vegan 1460</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>11.81 x 7.87 x 3.94 inches; 2.2 Pounds</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>100% Synthetic</li>\n<li>Imported</li>\n<li>Synthetic Sole</li>\n<li>Shaft measures approximately Ankle from arch</li>\n<li>Vegan</li>\n<li>Goodyear welt stitching</li>\n<li>Good abrasion resistance</li>\n<li>Slip resistance</li>\n<li>Two tone synthetic leather upper</li>\n</ul>\n<hr />\n<p>The 1460 is the original Dr. Martens boot. The boot's recognizable dna looks like this: 8 eyes, grooved sides, a heel-loop, yellow stitching, and a comfortable, air-cushioned sole. But this boot goes one step further, with a cherry-red synthetic material and a 100% vegan construction.</p>\n</article>",
    "date_created": "10/25/2021"
  },
  {
    "id": 2,
    "name": "Match Men's Slim Tapered Stretchy Casual Pants",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>97% Cotton, 3% Spandex</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Department</dt>\n<dd>Mens</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Rise</dt>\n<dd>Sits at the waist</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Closure</dt>\n<dd>Zip fly and button closure</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Fit</dt>\n<dd>Slim fit</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>97% Cotton, 3% Spandex</li>\n<li>Imported</li>\n<li>Button closure</li>\n<li>97% Cotton/ 3% Spandex, thin fabric(stretch)</li>\n<li>Slightly below waist/ flat front</li>\n<li>Slim fit/ Slightly tapered</li>\n<li>Two side-seam pockets, two rear welt pockets/ zip fly with button</li>\n<li>Suitable for spring &amp; autumn casual wear</li>\n</ul>\n<hr />\n<p>Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men’s must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort.</p>\n</article>",
    "date_created": "10/26/2021"
  },
  {
    "id": 3,
    "name": "Men's Classic-fit Stretch Golf Pant",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Olive</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>98% Polyester</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Special Size Type</dt>\n<dd>Kids Snug-Fit%, 2% Spandex</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Department</dt>\n<dd>Boys</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>8.98 x 7.6 x 2.01 inches; 5.64 Ounces</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>98% Polyester, 2% Spandex</li>\n<li>Imported</li>\n<li>Machine Wash</li>\n<li>Roomy through hip &amp; thigh with straight leg. Sits at the waist</li>\n<li>Smooth, wrinkle-free blend with moisture wicking and a gentle stretch</li>\n<li>Set-in pockets at rear</li>\n<li>An Amazon brand</li>\n</ul>\n<hr />\n<p>Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men’s must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort.</p>\n</article>",
    "date_created": "10/27/2021"
  },
  {
    "id": 4,
    "name": "Star Wars Family Matching Pajama Sleep Sets",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Purple, Star Wars Comic</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>100% Cotton</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Special Size Type</dt>\n<dd>Kids Snug-Fit</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Department</dt>\n<dd>Boys</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>>8.98 x 7.6 x 2.01 inches; 5.64 Ounces</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>100% Cotton</li>\n<li>Imported</li>\n<li>Machine Wash</li>\n<li>Find your Disney style! Amazon Essentials and Disney pair up to add some wonder to your wardrobe with fresh prints and patterns for your family featuring your favorite characters from Mickey, Marvel to Star Wars and more.</li>\n<li>For children's safety, sleepwear should be either flame resistant or snug-fitting. This item is snug-fitting</li>\n<li>Sleep in style and cozy comfort with these coordinating pajama sets featuring super soft cotton for a cozy night's sleep</li>\n<li>Everyday made better: we listen to customer feedback and fine-tune every detail to ensure quality, fit, and comfort</li>\n</ul>\n<hr />\n<p>Find your Disney style! Essentials and Disney pair up to add some wonder to your wardrobe with fresh prints and patterns for your family featuring your favorite characters from Mickey, Marvel to Star Wars and more</p>\n</article>",
    "date_created": "10/28/2021"
  },
  {
    "id": 5,
    "name": "5 Pack Men's 9\" Athletic Tricot Mesh Shorts with Pockets",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Multi-Color</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>100% Polyester</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>Liberty Imports</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Department</dt>\n<dd>Mens</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>>14.5 x 13 x 2.5 inches; 2.5 Pounds</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>100% Polyester</li>\n<li>Designed in New, Imported</li>\n<li>Drawstring closure</li>\n<li>Machine Wash</li>\n<li>5-pack men's active shorts with iconic tricot mesh design. Lightweight, breathable and easy on skin.</li>\n<li>Tagless. Comfortable stretch waistband with internal drawcord.</li>\n<li>Deep side pockets that securely carry your phone and other essentials.</li>\n</ul>\n<hr />\n<p>Our versatile shorts can handle whatever you throw at them. The super-smooth tricot lining is easy on your skin. Longer 9-inch length and generous side pockets make them a must-have for your shorts line up. Made with an athletic men's fit and soft, elastic waistband to keep it comfortable workout to weekend.</p>\n</article>",
    "date_created": "10/29/2021"
  },
  {
    "id": 6,
    "name": "Heavy Duty Dog Collar, Ultra Comfortable Soft Neoprene Padded, Adjustable Reflective Nylon Pet Collar with Durable Metal Belt Buckle for Small/Medium/Large/X-Large Breeds",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Blue</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Nylon, Neoprene, Metal</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Fida</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Closure Type</dt>\n<dd>Buckle</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>11.1 x 2.95 x 1.57 inches; 6.74 Ounces</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>【Tough &amp; Heavy Duty】- This XL dog collar is 1-1/2 inch width with sturdy metal belt buckle, extremely tough and durable for extra large breeds. High Strength and Thicker Nylon Belt with new webbing make the collar last long and resist the forces of the most strong, energetic, powerful, and playful dogs.</li>\n<li>【Neoprene Soft Padding】- The fast dry and odor resistant neoprene padding properly protect dog sensitive skin from scratching and provide maximum comfort during walking, jogging, running and hiking.</li>\n<li>【Bright Reflective Stitching】- Brightly reflective stitching on the edges increase the dog visibility and security in the early of morning or late at night.</li>\n<li>【Choose the Best Fit】- Please always measure your dog’s neck according to our Sizing Chart - Small 11\" – 14.5\" | Medium 14.5\" - 19\" | Large 19\" - 23\" | XL/X-Large 24\" - 28\" | Do not choose the size by dog’s weight or breeds only. This X-Large dog collar is designed to fit extra large dogs with neck girth: 24\"-28\". Width of nylon belt is 1-1/2\". Please note: Always allow for adequate breathing room.</li>\n<li>【100% Satisfaction Guaranteed】- We're super confident you'll love this comfort nylon dog collar. And we commit 30 days full money back with no reason and 1 year warranty. Worth to have this great comfort dog collar for all pet lovers. If you have any question, do not hesitate to contact us any time, our service team will provide the best solution within 24 hours.</li>\n</ul>\n<hr />\n<p>This dog collar do not have more features, but only heavy duty and comfortable. The soft neoprene padded provide maximum comfort for your dog neck. 2 layers high strength and thicker Nylon Tape with new weaving technology will make your collar last more longer than most of other's. The sturdy metal belt buckle resist the forces of the most strong, energetic, powerful, and playful dogs. Especially the heavy duty Extra Large Size, 1.5 inch width collar with Two Metal Pin Belt Buckle definitely hold your biggest dog with super comfortable experience when your dog walking, jogging, hiking or training.</p>\n</article>",
    "date_created": "10/30/2021"
  },
  {
    "id": 7,
    "name": "Pet Shampoo for Dogs & Cats (2 Pack) – Lavender Essential Oil - pH Balanced for Dry & Sensitive Skin, Puppies & Kittens – Apple Fruit Extract & Aloe Vera – Fragrance, Soap & Cruelty Free – 16 Oz",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Nuesta Pets</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Type</dt>\n<dd>Shampoo</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Sold By</dt>\n<dd>Nuestra Products</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>Superior Solutionz LLC</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>8.86 x 5.51 x 2.52 inches; 2.4 Pounds</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>No nonsense, no hidden ingredients, calming &amp; soothing lavender shampoo for dogs, cats and puppies to cleanse, detangle and moisturize their coats.. Simply lather from head to toe, massage in, and rinse off.</li>\n<li>Features a salon quality shampoo formula enriched with lavender essential oil, oat amino acids, aloe vera, chamomile &amp; apple fruit extract to shampoo &amp; condition leaving your loved one feeling clean, refreshed and smelling great.</li>\n<li>No parabens or SLS. Non-toxic, soap, PEG, &amp; cruelty free. No caustics, dyes, phthalates, chlorine, formaldehyde, triclosan, or phosphates.</li>\n<li>pH balanced to match your cat &amp; dogs skin pH, keeping their skin &amp; coat clean and healthy.</li>\n<li>Try our waterless shampoo for in between normal baths. You will receive two 16 oz calming and soothing lavender shampoo bottles.</li>\n</ul>\n<hr />\n<p>For your beloved four-legged friend that tries to use puppy eyes to get out of its bath time or who usually gets a skin reaction at the salon, Nuesta Pets Shampoo is a better alternative to cosmetic products, with powerhouse natural ingredients that help bring soothing relief to dry, itchy, flaky skin.</p>\n</article>",
    "date_created": "10/31/2021"
  },
  {
    "id": 8,
    "name": "Wag Dry Dog Food with Grains (Chicken/Salmon/Beef and Brown Rice)",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>WAG</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Form</dt>\n<dd>Dry</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Chicken</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Specific Uses for Product</dt>\n<dd>Brain, Dental Health, Immune System, Bones, Joints</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>17 x 5 x 26 inches; 30 Pounds</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Real Meat First: Cage-free American chicken is the #1 ingredient; protein helps keep your dog at his bounding best</li>\n<li>No added chicken by-product meal, corn, wheat, soy, artificial colors, flavors, or preservatives</li>\n<li>Added calcium and phosphorus for bones and teeth</li>\n<li>Added antioxidants to support immune system; added DHA for brain function. Support for bones and joints with guaranteed glucosamine.</li>\n<li>Formulated with the help of veterinarians and a pet nutritionist and made in a family-owned facility in California, USA</li>\n<li>Gradual transitioning is important to help avoid dietary upsets. Please see instructions below or on the bag.</li>\n<li>30 LB bag of Wag Dry Dog Food, Chicken &amp; Brown Rice Recipe</li>\n</ul>\n<ul>\n<li>If you like BLUE BUFFALO LIFE PROTECTION, we invite you to try this Wag Dry Dog Food</li>\n<li>Satisfaction Guarantee: We’re proud of our products. If you aren’t satisfied, we’ll refund you for any reason within a year of purchase. 1-877-485-0385</li>\n<li>An Amazon brand</li>\n</ul>\n</article>",
    "date_created": "11/1/2021"
  },
  {
    "id": 9,
    "name": "Bedsure Orthopedic Dog Bed for Medium Dogs - Waterproof Dog Bed Medium, Foam Sofa with Removable Washable Cover, Waterproof Lining and Nonskid Bottom Couch, Pet Bed",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>28 x 7 x 23 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>4.98 pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>Bedsure Comfy Pet</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Country of Origin</dt>\n<dd>China</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Polyester, Polyurethane foam</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Egg Crate Foam: The 3\" high-density egg create foam dog bed evenly distributes your pet’s weight, which provides maximum support and comfort for pets of all ages.</li>\n<li>Sofa-Style Bed Design: The 3-sided 3.5\" bolstered side pillow adds extra support to your pet's neck and head for a more restful sleep.</li>\n<li>Cozy Spot: The sleep surface (28”x23”) is made of a flannel cover that provides a soft and comfortable sleeping area for dogs or cats.</li>\n<li>Nonskid Bottom: The non-slip, studded plastic bottom can fix the position of your dog bed, so it brings the dog a sense of security.</li>\n<li>Easy to Care: Removable cover with zip closure for easy cleaning. The inner foam has a TPU cover, which provides protection from dog pee and excrement.</li>\n</ul>\n</article>",
    "date_created": "11/2/2021"
  },
  {
    "id": 10,
    "name": "Rxyia Dog Bowl Stainless Steel Dog Bowl with Rubber Base for Small/Medium/Large Dogs,Kittens (Set of 2) (10oz)",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Stainless Steel</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Stainless steel</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Rxyia</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Dimensions</dt>\n<dd>6.89 x 6.89 x 1.77 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Target Species</dt>\n<dd>Dog</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>The capacity of this dog bowl is 10 ounces, top diameter 5.3 inches (13.5cm), bottom diameter 6.9 inches (17.5 cm),Height 1.7 inches (4.5 cm)</li>\n<li>This dog bowl is made of Stainless steel material, polished to a mirror sheen, rubber base can reduce noise and skidding.</li>\n<li>Dishwasher-safe for easy cleaning, rubber base can be removed and put on.</li>\n<li>Flat bottom design can stop pets to tip the bowl over, rubber base can protect the hardwood floor from scratch.</li>\n<li>Set of 2 stainless dog food bowls. ,we replace or refund any defective products.</li>\n</ul>\n<hr />\n<p>Stainless steel material bowl, polished to a mirror sheen. Flat bottom design can stop pets to tip the bowl over.</p>\n</article>",
    "date_created": "11/3/2021"
  },
  {
    "id": 11,
    "name": "Apple iPhone 12, 64GB, (Product)Red - Fully Unlocked (Renewed)",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Wireless Carrier</dt>\n<dd>Unlocked</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Apple</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Form Factor</dt>\n<dd>Smartphone</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Memory Storage Capacity</dt>\n<dd>64 GB</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Operating System</dt>\n<dd>IOS</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Operating System</dt>\n<dd>IOS</dd>\n</dl><dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Red</dd>\n</dl><dl class=\"dlist-align\">\n<dt class=\"text-muted\">Cellular Technology</dt>\n<dd>5G</dd>\n</dl><dl class=\"dlist-align\">\n<dt class=\"text-muted\">Display Type</dt>\n<dd>OLED</dd>\n</dl><dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>Apple Computer</dd>\n</dl>\n</dl><dl class=\"dlist-align\">\n<dt class=\"text-muted\">Shooting Modes</dt>\n<dd>Night Mode, Manual</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Fully unlocked and compatible with any carrier of choice (e.g. AT&T, T-Mobile, Sprint, Verizon, US-Cellular, Cricket, Metro, etc.)</li>\n<li>The device does not come with headphones or a SIM card. It does include a charger and charging cable that may be generic.</li>\n<li>Dishwasher-safe for easy cleaning, rubber base can be removed and put on.</li>\n<li>Inspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arm's length.</li>\n<li>Successfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.</li>\n  <li>Tested for battery health and guaranteed to have a minimum battery capacity of 80%.</li>\n</ul>\n<hr />\n<p>This iPhone 12 is Certified Refurbished. It is 100% functional and in near perfect cosmetic condition with the possibility of a few light hair marks. It will NOT come in its original packaging but will include a certified cable and UL approved power adapter. Headsets, SIM card and manual are NOT included. 5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all</p>\n</article>",
    "date_created": "11/4/2021"
  },
  {
    "id": 12,
    "name": "Beats Solo3 Wireless On-Ear Headphones - Apple W1 Headphone Chip, Class 1 Bluetooth, 40 Hours of Listening Time, Built-in Microphone - Black (Latest Model)",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Name</dt>\n<dd>Beats Solo3</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Beats</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Ear Placement</dt>\n<dd>On Ear</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Black</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Connectivity Technology</dt>\n<dd>Wireless</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>High-performance wireless Bluetooth headphones in black</li>\n<li>Features the Apple W1 chip and Class 1 wireless Bluetooth connectivity\nWith up to 40 hours of battery life, Beats Solo3 wireless is your perfect everyday headphone</li>\n<li>Compatible with iOS and Android devices</li>\n<li>With Fast Fuel, 5 minutes of charging gives you 3 hours of playback when battery is low</li>\n<li>Adjustable fit with comfort-cushioned ear cups made for everyday use</li>\n<li>Sleek, streamlined design that’s durable and affordable to go everywhere you do</li>\n<li>Take calls, control your music, and activate Siri with the multifunction on-ear controls</li>\n<li>The sound and design you’ve come to love from Beats, with premium playback with fine-tuned acoustics that maximize clarity, breadth, and balance</li>\n</ul>\n</article>",
    "date_created": "11/5/2021"
  },
  {
    "id": 13,
    "name": "SAMSUNG 32-inch Class FRAME QLED LS03 Series - FHD Dual LED Quantum HDR Smart TV with Alexa Built-in (QN32LS03TBFXZA, 2020 Model)",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Screen Size</dt>\n<dd>32 Inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Supported Internet Services</dt>\n<dd>Netflix, Hulu, Amazon Instant Video, YouTube, Browser</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Connectivity Technologyt</dt>\n<dd>Wireless, Bluetooth, USB, HDMI</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>SAMSUNG</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Resolution</dt>\n<dd>1080p</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Display Technology</dt>\n<dd>QLED</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Name</dt>\n<dd>LS03T Lifestyle Series</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Refresh Rate</dt>\n<dd>30 Hz</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Special Feature</dt>\n<dd>Art Mode; Art Store; Customizable Frame; 100% Color Volume with Quantum Dot; Smart TV powered by Tizen</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Year</dt>\n<dd>2020</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>100% COLOR VOLUME WITH QUANTUM DOT: Quantum dots produce over a billion shades of color that stay true-to-life even in bright scenes.</li>\n<li>ART MODE: The Frame transforms into a beautiful work of art when you’re not watching TV. Activate the built-in motion sensor so whenever you walk into the room, your TV displays one of your favorite selections.</li>\n<li>ART STORE: Buy individual pieces or subscribe to an ever-increasing library of established and emerging artists’ work.</li>\n<li>CUSTOMIZABLE FRAME: Elevate your space and make The Frame your own by enhancing it with a frame in black, white, beige or walnut.</li>\n<li>ALEXA BUILT-IN: Ask more from your TV. Just ask Alexa to open apps, change the channel, search for movies and shows, play music, control your smart home devices and more. To talk to Alexa, press and hold the mic button on your remote.</li>\n<li>INCLUDED ACCESSORIES: SAMSUNG OneRemote (TM-2050A), No Gap Wall Mount, One Connect Box, One Invisible Connection Cable 5m | For a gapless mount wall must be flat and with no sockets or outlets</li>\n</ul>\n</article>",
    "date_created": "11/6/2021"
  },
  {
    "id": 14,
    "name": "JBL FLIP 5 Portable Wireless Bluetooth Speaker IPX7 Waterproof On-The-Go Bundle with Boomph Hardshell Protective Case",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Connectivity Technology</dt>\n<dd>Bluetooth, USB</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Speaker Type</dt>\n<dd>Portable Bluetooth Speakers</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Boomph</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Name</dt>\n<dd>FLIP 5</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Recommended Uses For Product</dt>\n<dd>For Smartphones or Tablets</dd>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>100% COLOR VOLUME WITH QUANTUM DOT: Quantum dots produce over a billion shades of color that stay true-to-life even in bright scenes.</li>\n<li>LOUD &amp; CLEAR MUSIC ANYWHERE: This wireless Bluetooth speaker has a new racetrack-shaped driver that delivers crystal clear and loud music as well as strong bass. The portable speaker is wireless so you can listen to music during your outdoor and travel adventures.</li>\n<li>ULTRA PROTECTIVE SHOCKPROOF CASE: This hardshell travel case by BOOMPH has been specially designed for the Flip 5 edition of the JBL Bluetooth speaker. The shockproof and water-resistant shell and the elastic band will keep your portable speaker safe at all times.</li>\n<li>CARRY THE SPEAKER AROUND WITH EASE: The shockproof carrying case of this JBL portable speaker has a mesh pocket where you can store the USB charging cable. The BOOMPH speaker case allows you to carry the Flip 5 or Flip 4 wireless Bluetooth portable speaker in your backpack or luggage with complete safety.</li>\n<li>WATER-RESISTANT BLUETOOTH SPEAKER: The Flip 5 Bluetooth wireless speaker has an innovative IPX7 waterproof design that allows you to fearlessly emerge the entire speaker into the water up to three-feet deep. Are you already excited to try it out?</li>\n<li>LISTEN TO MUSIC FOR HOURS AND HOURS: Thanks to its powerful built-in rechargeable battery, this wireless outdoor speaker can deliver up to 12 hours of playtime. In this way, you can listen to your favorite playlist for hours without having to worry that the speaker will run out of battery. To charge, simply use the included USB cable. *PLEASE NOTE* - THE JBL FLIP 5 DOES *NOT* INCLUDE A USB WALL ADAPTER AND DOES *NOT* HAVE A 3.5mm AUX INPUT!</li>\n</ul>\n</article>",
    "date_created": "11/7/2021"
  },
  {
    "id": 15,
    "name": "Toshiba Canvio Advance 1TB Portable External Hard Drive USB 3.0, White - HDTCA10XW3AA",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Digital Storage Capacity</dt>\n<dd>1TB</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Compatible Devices</dt>\n<dd>PC, Mac (reformatting required)</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Toshiba</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Series</dt>\n<dd>Canvio Advance</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Specific Uses For Product</dt>\n<dd>Multimedia, Personal, Business</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Automatic backup software to easily back up your content (free download, for Windows PC only).</li>\n<li>Password protection software to help prevent unauthorized access to your data (free download, for Windows PC only).\nUSB 3.0 and USB 2.0 compatible.</li>\n<li>Compact design with stylish, textured finish and color options to fit your lifestyle.</li>\n  <li>Compatible devices: Mac (reformatting required)</li>\n</ul>\n  <hr />\n<p>\nWhenever and wherever creativity strikes, Canvio Advance offers the space to save your greatest work yet. The drive features easy-to-use backup and security software* and comes in a stylish textured finish with vibrant color options to fit your style. (*software is available via free download, for PC only)\n</p>\n</article>",
    "date_created": "11/8/2021"
  },
  {
    "id": 16,
    "name": "Health Valley Organic Soup, No Salt Added, Minestrone, 15 Oz (Pack of 12)",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Health Valley</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Filtered Water, Organic Celery, Organic Carrots, Organic Tomatoes, Organic Onions, Organic Peas, Organic Tomato Paste, Organic Pasta (Organic Wheat Flour, Organic Egg Whites), Organic Green Beans, Organic Red Kidney Beans, Organic Corn Starch, Organic Small White Beans, Organic Spinach, Organic Expeller Pressed Canola Oil, Organic Evaporated Cane Juice, Organic Onion Powder, Organic Garlic Granules, Organic Spices, Organic Concentrated Lemon Juice, Organic White Pepper, Organic Cayenne Pepper, Vitamin A Palmitate.</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Weight</dt>\n<dd>11.25 Pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Minestrone</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Package Information</dt>\n<dd>Can</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Certified USDA Organic</li>\n<li>No Salt Added</li>\n<li>No Artificial Flavors, Colors, Preservatives or GMO's</li>\n  <li>Low Sodium, Heart Healthy Soup</li>\n  <li>Good Source of Fiber</li>\n</ul>\n  <hr />\n<p>\nHealth Valley Organic No Salt Added Soup, Minestrone, 15 Ounce (Pack of 12)\nAt Health Valley brand, we don’t load up our cans with salt, and instead, let the true flavors come out.\n</p>\n</article>",
    "date_created": "11/9/2021"
  },
  {
    "id": 17,
    "name": "Barilla Pasta, Spaghetti Rigati, 12 & 16 oz",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Barilla</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Semolina (Wheat), Durum Wheat Flour, Niacin, Iron (Ferrous Sulfate), Thiamine Mononitrate, Riboflavin, Folic Acid.</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Spaghetti Rigati</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>12 & 16 Ounces</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Variety</dt>\n<dd>Spaghetti</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Delicious pasta the whole family will enjoy</li>\n<li>Sauce-hugging pasta shape due to its exact ridges</li>\n<li>Good for everyday meals and special occasions</li>\n</ul>\n</article>",
    "date_created": "11/10/2021"
  },
  {
    "id": 18,
    "name": "Dunkin' Donuts Ground Coffee, Original Blend Medium Roast, 90 Ounce",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Dunkin' Donuts</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Original Blend Medium Roast, Robusta, Arabica, Hazelnut</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Weight</dt>\n<dd>5, 10 Pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Roast Level</dt>\n<dd>Medium Roast</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Package Information</dt>\n<dd>Bag</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Smooth, medium roast</li>\n<li>Formulated to taste just like the Dunkin' Donut coffee you get in the shops</li>\n<li>Original blend</li>\n  <li>100% Robusta and Arabica Coffee</li>\n  <li>Two 40-ounce bags</li>\n</ul>\n</article>",
    "date_created": "11/11/2021"
  },
  {
    "id": 19,
    "name": "BEN'S ORIGINAL Long Grain White Original Enriched Parboiled Rice, 10 lbs.",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>BEN'S ORIGINAL</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Ingredients</dt>\n<dd>Enriched Long Grain Parboiled Rice [Long Grain Rice, Iron (Ferric Orthophosphate), Thiamin (Thiamine Mononitrate) and Folate (Folic Acid)].</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Weight</dt>\n<dd>5, 10 Pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Allergen Information</dt>\n<dd>Glutten Free</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Package Information</dt>\n<dd>Bag</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>100% US Grown</li>\n<li>No artificial colors, flavors, or preservatives</li>\n<li>Gluten-free</li>\n  <li>No trans fat, no saturated fat, no cholesterol</li>\n  <li>No sodium</li>\n</ul>\n</article>",
    "date_created": "11/12/2021"
  },
  {
    "id": 20,
    "name": "NATURES OWN WHOLE GRAIN BREAD 100% PER LOAF 20 OZ",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>NATURES OWN At The Neighborhood Corner Store</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>NATURES OWN</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Flavor</dt>\n<dd>Whole Grain</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>20 Ounces</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<hr />\n<p>\nNature's Own 100% Whole Grain is a delicious way to do something good for your family. Every slice is brimming with 12 grams of nutritious whole grain and topped with a blend of bran flakes, flax seeds and amaranth seeds, yet delivers the soft Nature’s Own texture you love.\n</p>\n</article>",
    "date_created": "11/13/2021"
  },
  {
    "id": 21,
    "name": "HAUS LABORATORIES By Lady Gaga: SPARKLE LIPSTICK | Red, Pink, Long Lasting Universal Lipstick, Full-Coverage Lip Color, Vegan & Cruelty-Free | 0.12 Oz",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Haus Laboratories</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Finish Type</dt>\n<dd>Creamy</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Form</dt>\n<dd>Stick</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>0.17 Ounces</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Skin Tone</dt>\n<dd>All</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<hr />\n<p>\nThe flattering Burlesque SPARKLE LIPSTICK offers one-swipe coverage and glittering shine. Unparalleled creamy texture and star-like pigments offer an ultra-reflective finish while the burlesque-inspired bullet delivers smooth, high-impact payoff.\n</p>\n</article>",
    "date_created": "11/14/2021"
  },
  {
    "id": 22,
    "name": "CETAPHIL Daily Hydrating Lotion for Face | With Hyaluronic Acid | 3 fl oz | Lasting 24 Hour Hydration | Daily Lotion for Combination Skin | No Added Fragrance | Non-Comedogenic",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Cetaphil</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Special Ingredients</dt>\n<dd>Hyaluronic Acid</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Use For</dt>\n<dd>Face</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Form</dt>\n<dd>Lotion</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Scent</dt>\n<dd>Original</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Skin Type</dt>\n<dd>Dry</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>CETAPHIL DAILY HYDRATING LOTION FOR COMBINATION SKIN: Instantly hydrates and locks in moisture for 24 hours to protect skin from dryness</li>\n<li>IMMEDIATE AND INTENSE HYDRATION: Hyaluronic acid and powerful moisturizing agents provide long lasting hydration</li>\n<li>FAST ABSORBING, LIGHTWEIGHT FORMULA: Non-greasy moisturizer won't clog pores</li>\n  <li>NO ADDED FRAGRANCE AND HYPOALLERGENIC: Clinically tested to be gentle on combination, sensitive skin</li>\n  <li>DESIGNED FOR SENSITIVE SKIN: All CETAPHIL products are effective yet non-irritating</li>\n    <li>FROM THE DERMATOLOGIST RECOMMENDED FACIAL SKINCARE BRAND</li>\n</ul>\n</article>",
    "date_created": "11/15/2021"
  },
  {
    "id": 23,
    "name": "Original Kojie San Facial Beauty Soap - 135g, 2 Bars Per Pack - Guaranteed Original With Authenticity Tag",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Skin Science</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Trendy Collection</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Use For</dt>\n<dd>Face</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Form</dt>\n<dd>Bar</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Scent</dt>\n<dd>Original</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Skin Type</dt>\n<dd>Acne Prone</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>THE ORIGINAL KOJIC ACID SOAP, LARGEST SIZE AVAILABLE: Kojie San's formulation blends effective ingredients with nourishing coconut oil and a fresh orange fragrance will have you feeling your best.</li>\n<li>EVEN SKIN TONE: Powerful, natural ingredients reduce the appearance of age spots, hyperpigmentation, melasma, freckles, red marks, scars, and other signs of sun damage.</li>\n<li>HIGHEST QUALITY: Combining soothing coconut oil, natural kojic acid, and refreshing tea tree oil, Original Kojie San Soaps help your skin look its best.</li>\n  <li>GUARANTEED AUTHENTIC: Scan Hiddentag with Hiddentag App to confirm product authenticity. All Authentic Kojie San products feature Hiddentag on box, please check your products carefully.</li>\n  <li>Kojie San Soap comes in 3 different sizes: 65g, 100g, and 135g. This listing is for 2 bars of the 135g size, only the 135g bars have the stamp.</li>\n</ul>\n</article>",
    "date_created": "11/16/2021"
  },
  {
    "id": 24,
    "name": "Nicole Miller Mini Nail Polish Set - 15 Glossy and Trendy Colors",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Nicole Miller New York</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Trendy Collection</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Finish Type</dt>\n<dd>Glitter, Glossy</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Form</dt>\n<dd>Liquid</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Volume</dt>\n<dd>7 Milliliters, 10 Milliliters</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>ADD SOME COLOR- This 15 piece mini nail polish collection from Nicole Miller gives you multiple color options to try.</li>\n<li>SET INCLUDES – The set comes with 15 glossy, mini nail polishes in various shades ranging from pinks, purples, blues, glossy shades, and glitter shades. Each polish is 4.5 ml.</li>\n<li>MIX AND MATCH YOUR LOOKS- Upgrade your beauty collection so you can breeze through every season with a fresh manicure that complements and matches your wardrobe staples. These mini bottles let you experiment to find a perfect new style.</li>\n  <li>GIFTING MADE SIMPLE – With its variety of shades, this nail polish set would be the perfect gift for the nail polish lovers in your life.</li>\n  <li>CUSTOMER SATISFACTION GUARANTEE - At Nicole Miller, our #1 goal is customer satisfaction, please feel free to reach out to us so we can ensure that your Nicole Miller order experience is positive and hassle free.</li>\n</ul>\n</article>",
    "date_created": "11/17/2021"
  },
  {
    "id": 25,
    "name": "Kim Kardashian True Reflection Women Eau De Parfum Spray, 3.4 Ounce",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Kim Kardashian</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Scent</dt>\n<dd>Plum, Gardenia, Peach, Chocolate Orchid, Textured Woods, Skin Musk, Lotus, Bergamot, Patchoul</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Form</dt>\n<dd>Spray</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>1 Pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Volume</dt>\n<dd>100 Milliliters</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>True Reflection is a truly feminine, very well balanced composition which is built of fruity, watery and floral notes</li>\n<li>The composition starts with fresh mouthwatering notes of Italian bergamot, luscious plum and peach</li>\n<li>The heart is composed of floral notes: night blooming gardenia, chocolate orchid and lotus flower</li>\n</ul>\n</article>",
    "date_created": "11/18/2021"
  },
  {
    "id": 26,
    "name": "Signature Design by Ashley - Hettinger Faux Leather Sofa, Brown",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>110 pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>38 x 79 x 36 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item model number</dt>\n<dd>4950138</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Assembled Seat Height</dt>\n<dd>20 Inches</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<hr />\n<p>\nYou could easily spend an arm and a leg for high-end leather furniture. We say the heck With that. Rest assured, the Hettinger sofa entices with real leather, rich with natural grain and a dry matte aesthetic for subtle sophistication. The seating area is covered in genuine leather where it matters most. Skillfully matched faux leather on the exterior keeps the price incomparably affordable. Minimalist elements include a 2-over-2 cushion design, Tapered feet and t-cushions wrapping the slim track arms to soften the linear look just a touch.\n</p>\n</article>",
    "date_created": "11/19/2021"
  },
  {
    "id": 27,
    "name": "LG 12,000 BTU 115V Window-Mounted Air Conditioner with Remote Control, White",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Manufacturer</dt>\n<dd>LG</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Info</dt>\n<dd>CLV09N1AMG</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>81 pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>22.2 x 23.6 x 15 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Incuded Components</dt>\n<dd>Air conditioner, remote control, mesh filter, installation kit, manual/installation instructions, warranty</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Warranty Description</dt>\n<dd>1 year parts and labor.</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>LOW NOISE PERFORMANCE - operates at sound levels as low as 53dB (in low mode) eliminating unnecessary noise.</li>\n<li>ENERGY STAR CERTIFIED - This air conditioner has met the high standards of the ENERGY STAR Program using energy-efficient technologies that translate into electricity savings.</li>\n<li>MULTIPLE FAN SPEEDS - 3 cooling and fan speeds with Auto Cool allow you to customize your cooling. Air Filter: Washable</li>\n<li>MAXIMUM USABILITY - Easy to use electronic controls with remote</li>\n <li>COOLS ROOMS UP TO 550 SQ. FT.- LW1216ER is ideal for cooling medium rooms (22' X 25')</li>\n  <li>Fits window : 23'-36'W x 16\"H</li>\n</ul>\n</article>",
    "date_created": "11/20/2021"
  },
  {
    "id": 28,
    "name": "Frigidaire EFR341, 3.2 cu ft 2 Door Fridge and Freezer, Platinum Series, Stainless Steel, Double",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand Name</dt>\n<dd>Frigidaire</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Info</dt>\n<dd>EFR341</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>32 pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>22 x 20 x 34 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Stainless Steel</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Voltage</dt>\n<dd>120 Volts</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Capacity</dt>\n<dd>3.2 Cubic Feet</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Top Freezer Refrigerator is more spacious than a mini-fridge. 0. 96 cu ft freezer features ample storage space can be used to store ice cream. The door storage offer a convenient place to store jugs of milk, cartons of juice, or bottles of soda. Humidity-controlled crisper drawers help keep fruits and vegetables fresh longer.\"</li>\n<li>LED lighting makes it easy to see fresh food - it puts a spotlight on food and casts a more natural light on the contents of your refrigerator so food looks as it should. Electronic temperature control makes it easy to change the temperature when you need to.</li>\n<li>Reversible door design allows you to install the doors to open to the left or right, which is perfect for lunchrooms, smaller kitchens, wet bars and dormitories. Adjustable leveling legs offers convenience to situate fridge.</li>\n<li>The refrigerator has a large vegetable crisper, integrated door shelving for tall bottles, 2 full width glass refrigerator shelves help make cleanup easy so there's less reason to cry over spilt milk. Recessed handles make opening and closing the doors simple.</li>\n <li>ENERGY STAR qualified means it's , which is good for the planet and for your wallet. Fresh food section is frost-free with a manual defrost freezer.</li>\n</ul>\n</article>",
    "date_created": "11/21/2021"
  },
  {
    "id": 29,
    "name": "Comfort Zone CZ121WT Quiet 3-Speed 12-inch Oscillating Table Fan with Adjustable Tilt",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Electric Fan Design</dt>\n<dd>Table Fan</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Power Source</dt>\n<dd>AC</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Special Feature</dt>\n<dd>Manual</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Recommended Uses For Product</dt>\n<dd>Office, Indoor, Home</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Included Components</dt>\n<dd>Product, Manual</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>CCC Comfort Zone</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Blue, White, Yellow</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Nullify</li>\n<li>Imported</li>\n<li>Whisper quiet operation</li>\n<li>Adjustable horizontal tilt</li>\n <li>Three speed push button control</li>\n   <li>Costs less than 1/2 cent per hour to operate</li>\n   <li>Tough break resistant ABS plastic blades</li>\n</ul>\n</article>",
    "date_created": "11/22/2021"
  },
  {
    "id": 30,
    "name": "COMFEE' Portable Washing Machine, 0.9 cu.ft Compact Washer With LED Display, 5 Wash Cycles, 2 Built-in Rollers, Space Saving Full-Automatic Washer, Ideal Laundry for RV, Dorm, Apartment, Magnetic Gray",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand Name</dt>\n<dd>COMFEE'</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Info</dt>\n<dd>CLV09N1AMG</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Weight</dt>\n<dd>44.1 pounds</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Dimensions</dt>\n<dd>18.1 x 17.7 x 31.5 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Country of Origin</dt>\n<dd>China</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Voltage</dt>\n<dd>120 Volts</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Max Spin Speed</dt>\n<dd>840 RPM</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>The full-automatic washing machine equipped with Heavy, Soft, Normal, Rapid, and Soak 5 programs and 3 water levels, you are allowed to quickly start the machine the way you like. You are also welcomed to customize your washing program by selecting load size, adding wash time, rinse time, and spin time.</li>\n<li>This top load compact washing machine with only 18.1 inches in width, 17.7 inches in-depth, and 31.5 inches in height, this portable washer is able to be stored easily. You can store it in your cabinet, RV, dorm, or even bathtub! Even better, it comes with wheels and handles for easy movement. It is a perfect choice for small households with limited space and minimal optimal.</li>\n<li>With the transparent lid design, this washing machine allows you to see and monitor the water and washing conditions. Featuring a durable rust-resistant steel inner tub, lint filter, water inlet and drain pump which allows you to easily drain out dirty water. In addition, this portable laundry washing machine has an LED display that shows the time left to finish.</li>\n<li>This compact design washing machine has DOE (Department of Energy) certificate that clearly shows how much energy would be consumed on national average conditions. Saving as much as 87.5% energy consumption comparing to similar models, it equips with a powerful and durable motor, up to 840RPM spin speed but quiet when running.</li>\n  <li>Unbalance could be a very serious issue for washing machines. It could cause washing machine to \"dance on the floor\", or even worse, to unleash itself from the water inlet, leaking everywhere. Equipped with Auto Unbalance Detection (AUD), however, it's able to automatically fix the unbalance issue through allowing more water to come in. It will also alert the user if the problem can't be fixed, ensuring a safe and pleasant experience. NOTE : Refer to the PDF attached below in Technical Specification for the Installation and Troubleshooting Steps</li>\n</ul>\n</article>",
    "date_created": "11/23/2021"
  },
  {
    "id": 31,
    "name": "Coleman Cabin Tent with Instant Setup in 60 Seconds",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Sport Type</dt>\n<dd>Multi-Sport</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Occupancy</dt>\n<dd>4 Person</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Design</dt>\n<dd>Camping Tent</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Installation Type</dt>\n<dd>Instant</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Coleman</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Size</dt>\n<dd>4-Person</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Weatherproof: Welded corners and inverted seams keep water from getting in; Integrated rainfly offers extra weather protection with better airflow</li>\n<li>Built to last: Double-thick fabric stands up to the elements season after season</li>\n<li>Instant setup: In as fast as 1 minute</li>\n<li>Roomy interior: 8 x 7 feet with 4 feet 11-inch center height; Fits 1 queen-size air bed</li>\n  <li>1-year limited warranty</li>\n</ul>\n  <hr />\n<p>\nThe Coleman Instant Cabin makes getting camp set up quicker and easier than ever. This instant tent has pre-attached poles that make setting up camp as simple as unfolding, extending, and securing. You can assemble the tent in about a minute and then get started on your adventure. This camping tent is designed with the WeatherTec system that features patented welded floors and inverted seams to help ensure you stay dry if it starts to rain. An integrated vented rainfly offers added protection from the rain and improves airflow without the need for extra assembly. This backpacking tent is made from rugged Polyguard 2X double-thick fabric that stands up to the rigors of the outdoors, so you can use it reliably season after season. This 6-person tent offers enough room for two queen size air beds and comes with integrated storage pockets to help you keep small items organized. And when it’s time to go home, the camping tent packs away securely in the included expandable carry bag that lets you tear away the rip strip for easy packing.\n</p>\n</article>",
    "date_created": "11/24/2021"
  },
  {
    "id": 32,
    "name": "Aokiwo 200Pcs Emergency Survival Kit and First Aid Kit Professional Survival Gear SOS Emergency Tool with Molle Pouch for Camping Adventures",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Power Source</dt>\n<dd>Battery Powered</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Black: 1800 Lumens</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Energizer</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Aluminum</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brightness</dt>\n<dd>1800 Lumen</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Exclusive 200 PCS Survival Kit - Uniquely customized by U.S military veterans, our survival kit includes 28pcs emergency survival gears, 16pcs medical supplies, 10pcs fishing tools, and 4 in 1 Molle EMT pouch to suit all your needs. Includes folding knife, muols to better suit your needs. The all-in-one survival kit includes a tactical folding knife, wire saw, pen, fire starter, compass, emergency blanket, folding pliers, tactical defense whistle, saber card, bottle clip, carabiner, etc.</li>\n<li>Top Quality Survival Gears & Approved First Aid Kit - Includes the most popular survival necessities: military knife, saber card, tactical pen, 3-mode tactical, multi-function paracord bracelet, and more practical survival gears. With approved comprehensive first aid supplies for emergency treatment, you can deal with wounds soon to prevent wound infections. Allowing to treat a single family or a group of friends under an emergency case.</li>\n<li>Molle System Compatible - The EMT bag was made of military-grade 1000D nylon which is durable, portable, and water-resistant, its small size and large capacity, the size is 8” x 6.5” x 6”, it offers three large compartments and plenty of rooms to add your vital supplies gear. Durable MOLLE compatible straps with strong snaps allow you to attach this medical IFAK pouch to any MOLLE compatible gear or your belt which made it a perfect companion for any outdoor activities.</li>\n<li>Perfect for Any Emergency Situation - Ideal for tactical medics, military, police, firefighter, EMT, hunter, first responders, hikers, campers, outdoor enthusiasts, and more! Perfect for car, boat, bike, motorcycle, home, workplace; travel, shooting, hunting, camping, hiking, fishing, boating, cycling, backpacking, climbing, mountain biking, outdoor sports, wilderness adventures, etc. Also suit for natural disasters survival emergencies, such as earthquakes, hurricanes, tornados, floods, and fires.</li>\n  <li>Our all-inclusive outdoor gear set is designed to help you deal with any kind of emergency and make your camping trips 100% fuss-free! We provide 24-Hour Easy-to-Reach Customer Service in order to ensure you a good shopping experience. What are you waiting for? Just get your survival kit now to prepare yourself for your next great adventure!</li>\n</ul>\n  <hr />\n<p>\nA Complete Set of Emergency Survival Kit\n<br><br>\nThis is an amazing high-quality survival emergency first-aid ALL-IN-ONE kit, a truly meaningful Holiday/ Birthday Gift Idea for Boyfriend, Husband, all family members, and your loved ones!\n<br><br>\nMilitary Molle System Compatible\n<br><br>\nThe pouch made of military grade high-density 1,000D nylon, which is sturdy, durable, portable and water-resistant, its portable size but offer large compartments and plenty of rooms to add your vital supplies gear. Perfect companion for any outdoor activities!\n</p>\n</article>",
    "date_created": "11/25/2021"
  },
  {
    "id": 33,
    "name": "Schwinn Wayfarer Adult Bike Hybrid Retro-Styled Cruiser, Step-Over or Step-Through Frame Option, 7-Speed Drivetrain, Rear Rack, 700C Wheels, Multiple Colors",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Bike Type</dt>\n<dd>Hybrid Bike</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Age Range (Description)</dt>\n<dd>Adult</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Schwinn</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Specific Uses For Product</dt>\n<dd>Comfort, Fitness / Transportation</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Suspension Type</dt>\n<dd>Rear, Front</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Number of Speeds</dt>\n<dd>7</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Size</dt>\n<dd>Small (16-inch)</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Light Mint</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Frame Material</dt>\n<dd>Steel</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brake Style</dt>\n<dd>Rim Brakes</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Schwinn steel retro city frame and fork offers a stylish, comfortable ride.</li>\n<li>Schwinn 7 speed twist shifter with Schwinn rear derailleur provide quick gear changes.</li>\n<li>Alloy front and rear linear pull brakes ensure precise stops.</li>\n<li>Fenders protect you from splashes, while the classic rear carrier provides convenient storage.</li>\n  <li>700c size wheel fits adult riders 5’4” to 6’2”. Includes limited lifetime warranty for as long as you own the bike.</li>\n</ul>\n</article>",
    "date_created": "11/26/2021"
  },
  {
    "id": 34,
    "name": "OutdoorMaster Skateboard Cycling Helmet - Two Removable Liners Ventilation Multi-Sport Scooter Roller Skate Inline Skating Rollerblading for Kids, Youth & Adults",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Size</dt>\n<dd>Medium</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Grey</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Recommended Uses For Product</dt>\n<dd>Cycling, Inline Skating, Skateboarding</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>OutdoorMaster</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Athlete</dt>\n<dd>Skateboard</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>DURABLE - Built for both comfort and impact resistance with REINFORCED ABS SHELL & THICKENED SHOCK-ABSORBING EPS CORE.</li>\n<li>EXTRA REMOVABLE LINING - Skateboard helmet with two removable liner for different head sizes and easy to wash the sweat away.</li>\n<li>A HELMET for MULTI-SPORT - Smooth Venlitation System helps to protect and enjoy SKATING, CYCLING, BMX, MTB and etc.</li>\n<li>DOUBLE ADJUSTMENT - Well-attached & long-lasting adjustment dial and skin-friendly adjustable chin strap maxmize the best fit and comfortable wearing.</li>\n  <li>HOW TO MEASURE A PROPER HELMET? - To find the right size bike helmet, start by measuring your head circumference, wrap a flexible tape measure around the largest portion of your head—about one inch above your eyebrows. Or, wrap a string around your head, then measure the length of string with a yardstick. Size Large is recommended if your size is between 21.3-22.8inch (54cm-58cm).</li>\n</ul>\n</article>",
    "date_created": "11/27/2021"
  },
  {
    "id": 35,
    "name": "Energizer High-Powered LED Flashlights, 1000+ Lumens Flash Lights, Water Resistant, Heavy Duty Metal Body, AA Batteries Included",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Power Source</dt>\n<dd>Battery Powered</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Black: 1800 Lumens</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Energizer</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Aluminum</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brightness</dt>\n<dd>1800 Lumen</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>[Battery Powered Light]: One (1) Energizer Vision HD Ultra LED Flashlight with nine (9) included Energizer MAX AA batteries</li>\n<li>[High Definition Performance]: LED light up to 15X brighter than standard LED technology features sharp, high definition light that resembles daylight</li>\n<li>[Camping, Work & Emergency Light]: Ideal camping light, emergency light or work light for household projects</li>\n<li>[Durable Construction]: This bright light is IPX4 water resistant and impact resistant up to 1 meter for durability you can count on</li>\n  <li>[Multiple Modes]: Flashlight with Digital Focus to effortlessly switch between focused, area light and strobe light modes</li>\n</ul>\n</article>",
    "date_created": "11/28/2021"
  },
  {
    "id": 36,
    "name": "Classic Mini Retro Game Consoles, AV Output 8-bit Video Game Built-in 620 Games with 2 Classic Controllers",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Hardware Platform</dt>\n<dd>Desktop, PC/Mac/Linux/Unix</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>PartEGG</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Age Range (Description)</dt>\n<dd>Kid</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Navy</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Acrylonitrile Butadiene Styrene</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>🎮[Retro Game Console]: PartEGG game console takes you back to the memories of the post-80s generation, catch those before they are completely obsolete. Retro classic games, such as Super Mario Bros allow you to share your childhood fun with your children in the joy of games. PartEGG retro game console can be shared as a gift to parents, friends, lovers, and children.</li>\n<li>🎮[Hundreds of Games]: The Apriluna game console contains 620 built-in classic video games such as Super Mario Bros, Donkey Kong, PacMan, Tetris, including many classic games from the last century, and more than 300 completely different video games allow you to participate throughout the day to make up for your childhood regrets. Multiple video game types, such as action, puzzle, sports, fighting and racing.</li>\n<li>🎮[AV OUT, PLUG & PLAY]: This mini classic console is AV output, pls make sure your TV/screen has AV input port. Just plug & play, no need to download games or insert cards. If you have an AV to HDMI converter and HDMI cable, you can use the mini console in big screen with HDMI input. 2 joysticks allows 2 persons to play together. Pls use the port on right to select and start games.</li>\n<li>🎮[NOTES]: This is a third-party product, not the original console. These classic games do not have the same clear image as today’s games on the big screen, and may not be compatible with some 4K monitor, but they are still so exciting and challenging to play!</li>\n  <li>🎮[MONEY BACK GUARANTEE]: We provide a 30-day return service. There is a certain defect rate in any electronic product. We have tried our best to control it within 1/1000. When such a problem occurs, the first step is to contact us in exchange for a new one. 320 * 240 color pixels fully create the retro feel of the game of the year, image quality will not be as clear as today's game. We cannot guarantee a 0% defective rate, but we guarantee a 100% satisfaction rate.</li>\n</ul>\n</article>",
    "date_created": "11/29/2021"
  },
  {
    "id": 37,
    "name": "SGILE RC Robot Toy, Gesture Sensing Remote Control Robot for Kid 3-8 Year Birthday Gift Present, Blue",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>SGILE</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Dimensions LxWxH</dt>\n<dd>6.3 x 3.15 x 10.43 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Age Range (Description)</dt>\n<dd>Kid</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Navy</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Acrylonitrile Butadiene Styrene</dd>\n</dl>\n\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Gesture Sensing: The remote control robot toy has a gesture sensing function, the sensor receiver zone on the chest can respond quickly after receiving various gesture commands and move forward, backward, left, and right accordingly.</li>\n<li>Programming: The programmable kid's robot toy has a One-button Programming function that can demonstrate a set of actions that the child enters through the remote control, and can input up to 50 motion commands so that kids can play their own imagination in play.</li>\n<li>Patrol: After the patrol function is activated, the fun robot toy will move to observe. With its built-in sensor, the intelligent robot can detect and avoid obstacles encountered to avoid potential collisions.</li>\n<li>Sing and Dance: The robot toy has a pair of bright LED eyes, which can not only walk, slide but also have the function of singing and dancing. Dynamic music and dance will bring more fun to children.</li>\n  <li>Battery: The robot can play for 60 minutes after charging for about 120 minutes! And you can easily charge it using the USB cable that comes with the robot.</li>\n</ul>\n</article>",
    "date_created": "11/30/2021"
  },
  {
    "id": 38,
    "name": "Green Toys Dump Truck in Yellow and Red - BPA Free, Phthalates Free Play Toys for Gross Motor, Fine Motor Skill Development. Pretend Play , Red/Yellow",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Size</dt>\n<dd>Size</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Product Packaging</dt>\n<dd>Standard Packaging</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Green Toys</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Model Name</dt>\n<dd>Dump Truck</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Plastic</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Red/Yellow</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Theme</dt>\n<dd>Video-games</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Safe Toy: green toy dump truck is made using environmental friendly materials and does not contain BPA, phthalates or PVC. The packing of this tea set is done with recycled, recyclable materials, printed with soy inks</li>\n<li>Dump Toy Utility: this yellow and red color truck toy is made for improving gross motor and fine motor skills. It will also help them absorb where and how the garbage needs to be dumped for making them learn about keeping the surroundings clean</li>\n<li>Package Includes: truck dump toy includes a workable dumper and no metal axles. Make the learning and skill development of your child practical and innovative</li>\n<li>Durable Truck Toy: this toy set is made from recycled plastic milk containers. FDA food contact standards ensure durability, strength and safety</li>\n  <li>Easy Cleaning: clean the dump truck toy using mild baby shampoo or soap. It is dishwasher safe and should be cleaned whenever your child prefers playing with it. Suitable for use in the indoors as well as outdoors</li>\n</ul>\n  <hr />\n<p>\nLet your child learn while playing with the Green Toys Dump Truck. This dumping truck toy is a practical and innovative way to make your child improve their fine and gross motor skills, including the improvement of their pincer grip. This toy from Green Toys does not contain BPA, phthalates or PVC and is safe for earth and child. This dumping truck is a great way of making your child learn about the dumping of garbage, which will help them understand about the necessity of clean surroundings.\n</p>\n</article>",
    "date_created": "12/1/2021"
  },
  {
    "id": 39,
    "name": "Taco vs Burrito - The Wildly Popular Surprisingly Strategic Card Game Created by a 7 Year Old",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Paper</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Taco vs Burrito</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Age Range (Description)</dt>\n<dd>Kids, Teens, Adults</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Item Dimensions LxWxH</dt>\n<dd>6.75 x 4.75 x 1.5 inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Number of Players</dt>\n<dd>2-4</dd>\n</dl>\n<hr />\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Wildly Popular All-Ages Card Game - TvB soared on Kickstarter, surpassing the initial goal by 2,400%! A sensation at the Indie Game Showcase at Emerald City Comicon!</li>\n<li>Surprisingly Strategic - Basic gameplay is easy to master but the Action Cards shift the game into unpredictable territory. Exciting up to the very last card!</li>\n<li>Create by a Kid, Perfect for Everyone - Alex dreamed up TvB at age 7, but this crazy, fun strategic food fight is a smash with kids and adults alike! Ideal for ages from 7-77.</li>\n<li>Easy to Learn and Quick to Play - Takes only a few minutes to learn. Gameplay runs 10-15 minutes. Optimal for 2-4 players.</li>\n  <li>Brilliant Gift Idea - This popular card game is the perfect birthday gift for boys, girls, parents, adults, friends, or family as well as any board game or card game lover in your life. Have a food fight on game night or Taco Tuesday!</li>\n</ul>\n</article>",
    "date_created": "12/2/2021"
  },
  {
    "id": 40,
    "name": "Spalding Zi/O Indoor-Outdoor Basketball",
    "description": "<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Size</dt>\n<dd>Official Size 7, 29.5\"</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Sport Type</dt>\n<dd>Basketball</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Color</dt>\n<dd>Orange</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Material</dt>\n<dd>Faux Leather</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Diameter</dt>\n<dd>29.5 Inches</dd>\n</dl>\n<dl class=\"dlist-align\">\n<dt class=\"text-muted\">Brand</dt>\n<dd>Spalding</dd>\n</dl>\n\n<hr />\n\n<article id=\"product-details-section\">\n<h6 class=\"fw-normal text-muted\">Product features</h6>\n<ul class=\"list-bullet\">\n<li>Official size and weight: Size 7, 29.5\"</li>\n<li>Zi/O Tournament composite cover</li>\n<li>Designed for indoor and outdoor play</li>\n<li>Shipped inflated and game-ready</li>\n</ul>\n</article>",
    "date_created": "12/3/2021"
  }
];


var skus=[
  {
    "id": 1,
    "product_id": 1,
    "variant": "SIZE",
    "variant_option": "7'",
    "image": "",
    "sku": "BOO-7",
    "price": 4999,
    "quantity": 10
  },
  {
    "id": 2,
    "product_id": 1,
    "variant": "SIZE",
    "variant_option": "8'",
    "image": "",
    "sku": "BOO-8",
    "price": 4999,
    "quantity": 9
  },
  {
    "id": 3,
    "product_id": 1,
    "variant": "SIZE",
    "variant_option": "9'",
    "image": "",
    "sku": "BOO-9",
    "price": 5499,
    "quantity": 8
  },
  {
    "id": 4,
    "product_id": 1,
    "variant": "SIZE",
    "variant_option": "10'",
    "image": "",
    "sku": "BOO-10",
    "price": 5999,
    "quantity": 37
  },
  {
    "id": 5,
    "product_id": 1,
    "variant": "SIZE",
    "variant_option": "11'",
    "image": "",
    "sku": "BOO-11",
    "price": 6999,
    "quantity": 22
  },
  {
    "id": 6,
    "product_id": 1,
    "variant": "SIZE",
    "variant_option": "12'",
    "image": "",
    "sku": "BOO-12",
    "price": 7999,
    "quantity": 4
  },
  {
    "id": 7,
    "product_id": 2,
    "variant": "SIZE",
    "variant_option": "SMALL",
    "image": "",
    "sku": "SHI-SMA",
    "price": 1249,
    "quantity": 16
  },
  {
    "id": 8,
    "product_id": 2,
    "variant": "SIZE",
    "variant_option": "MEDIUM",
    "image": "",
    "sku": "SHI-MED",
    "price": 1349,
    "quantity": 34
  },
  {
    "id": 9,
    "product_id": 2,
    "variant": "SIZE",
    "variant_option": "LARGE",
    "image": "",
    "sku": "SHI-LAR",
    "price": 1499,
    "quantity": 27
  },
  {
    "id": 10,
    "product_id": 3,
    "variant": "COLOR",
    "variant_option": "BLACK",
    "image": "https://m.media-amazon.com/images/I/71qE-R0wBnL._AC_SY500._SX._UX._SY._UY_.jpg",
    "sku": "PAN-BLA",
    "price": 1499,
    "quantity": 12
  },
  {
    "id": 11,
    "product_id": 3,
    "variant": "COLOR",
    "variant_option": "GREY",
    "image": "https://m.media-amazon.com/images/I/71fG-6otvlL._AC_SY500._SX._UX._SY._UY_.jpg",
    "sku": "PAN-GRE",
    "price": 1599,
    "quantity": 45
  },
  {
    "id": 12,
    "product_id": 3,
    "variant": "COLOR",
    "variant_option": "KHAKI",
    "image": "https://m.media-amazon.com/images/I/71S26A7Y1ZL._AC_SY500._SX._UX._SY._UY_.jpg",
    "sku": "PAN-KHA",
    "price": 1699,
    "quantity": 30
  },
  {
    "id": 13,
    "product_id": 4,
    "variant": "SIZE",
    "variant_option": "SMALL",
    "image": "",
    "sku": "SLE-SMA",
    "price": 599,
    "quantity": 9
  },
  {
    "id": 14,
    "product_id": 4,
    "variant": "SIZE",
    "variant_option": "MEDIUM",
    "image": "",
    "sku": "SLE-MED",
    "price": 699,
    "quantity": 17
  },
  {
    "id": 15,
    "product_id": 4,
    "variant": "SIZE",
    "variant_option": "LARGE",
    "image": "",
    "sku": "SLE-LAR",
    "price": 799,
    "quantity": 21
  },
  {
    "id": 16,
    "product_id": 5,
    "variant": "SIZE",
    "variant_option": "SMALL",
    "image": "",
    "sku": "SHO-SMA",
    "price": 499,
    "quantity": 10
  },
  {
    "id": 17,
    "product_id": 5,
    "variant": "SIZE",
    "variant_option": "MEDIUM",
    "image": "",
    "sku": "SHO-MED",
    "price": 499,
    "quantity": 32
  },
  {
    "id": 18,
    "product_id": 5,
    "variant": "SIZE",
    "variant_option": "LARGE",
    "image": "",
    "sku": "SHO-LAR",
    "price": 499,
    "quantity": 26
  },
  {
    "id": 19,
    "product_id": 6,
    "variant": "COLOR",
    "variant_option": "BLACK",
    "image": "https://m.media-amazon.com/images/I/81RlzzV4bWL._AC_SL1500_.jpg",
    "sku": "COL-ONE",
    "price": 399,
    "quantity": 42
  },
  {
    "id": 20,
    "product_id": 6,
    "variant": "COLOR",
    "variant_option": "BLUE",
    "image": "https://m.media-amazon.com/images/I/81+06KwfpPL._AC_SL1500_.jpg",
    "sku": "COL-BLU",
    "price": 399,
    "quantity": 1
  },
  {
    "id": 21,
    "product_id": 6,
    "variant": "COLOR",
    "variant_option": "GREY",
    "image": "https://m.media-amazon.com/images/I/811p2guzFUL._AC_SL1500_.jpg",
    "sku": "COL-GRE",
    "price": 399,
    "quantity": 19
  },
  {
    "id": 22,
    "product_id": 6,
    "variant": "COLOR",
    "variant_option": "PINK",
    "image": "https://m.media-amazon.com/images/I/81drXm25DNL._AC_SL1500_.jpg",
    "sku": "COL-PIN",
    "price": 399,
    "quantity": 40
  },
  {
    "id": 23,
    "product_id": 6,
    "variant": "COLOR",
    "variant_option": "RED",
    "image": "https://m.media-amazon.com/images/I/81L9ZaIENXL._AC_SL1500_.jpg",
    "sku": "COL-RED",
    "price": 399,
    "quantity": 18
  },
  {
    "id": 24,
    "product_id": 7,
    "variant": "SIZE",
    "variant_option": "250ML",
    "image": "",
    "sku": "DOG-250",
    "price": 749,
    "quantity": 24
  },
  {
    "id": 25,
    "product_id": 7,
    "variant": "SIZE",
    "variant_option": "475ML",
    "image": "https://m.media-amazon.com/images/I/81lwGpS+R2S._AC_SY606_.jpg",
    "sku": "DOG-475",
    "price": 999,
    "quantity": 14
  },
  {
    "id": 26,
    "product_id": 7,
    "variant": "SIZE",
    "variant_option": "750ML",
    "image": "",
    "sku": "DOG-750",
    "price": 249,
    "quantity": 43
  },
  {
    "id": 27,
    "product_id": 8,
    "variant": "SIZE",
    "variant_option": "11LB",
    "image": "",
    "sku": "DOG-11L",
    "price": 399,
    "quantity": 28
  },
  {
    "id": 28,
    "product_id": 8,
    "variant": "SIZE",
    "variant_option": "30LB",
    "image": "https://m.media-amazon.com/images/I/71Rogdhu44L._AC_SY550_.jpg",
    "sku": "DOG-30L",
    "price": 999,
    "quantity": 33
  },
  {
    "id": 29,
    "product_id": 8,
    "variant": "SIZE",
    "variant_option": "44LB",
    "image": "",
    "sku": "DOG-44L",
    "price": 1799,
    "quantity": 15
  },
  {
    "id": 30,
    "product_id": 9,
    "variant": "COLOR",
    "variant_option": "BROWN",
    "image": "https://m.media-amazon.com/images/I/61n8bwn1ixS._AC_SX679_.jpg",
    "sku": "BED-BRO",
    "price": 1299,
    "quantity": 16
  },
  {
    "id": 31,
    "product_id": 9,
    "variant": "COLOR",
    "variant_option": "GREY",
    "image": "https://m.media-amazon.com/images/I/61XEPyYofLL._AC_SL1500_.jpg",
    "sku": "BED-GRE",
    "price": 1299,
    "quantity": 22
  },
  {
    "id": 32,
    "product_id": 9,
    "variant": "COLOR",
    "variant_option": "NAVY BLUE",
    "image": "https://m.media-amazon.com/images/I/61BKDHVeIpS._AC_SL1500_.jpg",
    "sku": "BED-NAV",
    "price": 1299,
    "quantity": 33
  },
  {
    "id": 33,
    "product_id": 9,
    "variant": "COLOR",
    "variant_option": "WASHED BLUE",
    "image": "https://m.media-amazon.com/images/I/51B6FGbv6mS._AC_SL1500_.jpg",
    "sku": "BED-WAS",
    "price": 1299,
    "quantity": 30
  },
  {
    "id": 34,
    "product_id": 10,
    "variant": "SIZE",
    "variant_option": "ONE SIZE",
    "image": "https://m.media-amazon.com/images/I/61ZwZ9YLe7L._AC_SY450_.jpg",
    "sku": "BOW-ONE",
    "price": 299,
    "quantity": 22
  },
  {
    "id": 35,
    "product_id": 11,
    "variant": "SIZE",
    "variant_option": "64GB",
    "image": "",
    "sku": "IPH-64G",
    "price": 34999,
    "quantity": 21
  },
  {
    "id": 36,
    "product_id": 11,
    "variant": "SIZE",
    "variant_option": "128GB",
    "image": "",
    "sku": "IPH-128",
    "price": 37499,
    "quantity": 46
  },
  {
    "id": 37,
    "product_id": 11,
    "variant": "SIZE",
    "variant_option": "256GB",
    "image": "",
    "sku": "IPH-256",
    "price": 42999,
    "quantity": 6
  },
  {
    "id": 38,
    "product_id": 12,
    "variant": "COLOR",
    "variant_option": "ROSE GOLD",
    "image": "https://m.media-amazon.com/images/I/51PbyjVSxsL._AC_SX342_.jpg",
    "sku": "HEA-ROS",
    "price": 4499,
    "quantity": 28
  },
  {
    "id": 39,
    "product_id": 12,
    "variant": "COLOR",
    "variant_option": "BLACK",
    "image": "https://m.media-amazon.com/images/I/51QxA-98Q+L._AC_SX342_.jpg",
    "sku": "HEA-BLA",
    "price": 4499,
    "quantity": 6
  },
  {
    "id": 40,
    "product_id": 12,
    "variant": "COLOR",
    "variant_option": "RED",
    "image": "https://m.media-amazon.com/images/I/51-CdmhSPLL._AC_SX342_.jpg",
    "sku": "HEA-RED",
    "price": 8499,
    "quantity": 12
  },
  {
    "id": 41,
    "product_id": 13,
    "variant": "SIZE",
    "variant_option": "32-inch",
    "image": "",
    "sku": "TV-32I",
    "price": 22999,
    "quantity": 23
  },
  {
    "id": 42,
    "product_id": 14,
    "variant": "COLOR",
    "variant_option": "BLACK",
    "image": "https://m.media-amazon.com/images/I/716pf-ggZlL._AC_SX425_.jpg",
    "sku": "SPE-BLA",
    "price": 1999,
    "quantity": 19
  },
  {
    "id": 43,
    "product_id": 14,
    "variant": "COLOR",
    "variant_option": "WHITE",
    "image": "https://m.media-amazon.com/images/I/7180CTgB55L._AC_SX679_.jpg",
    "sku": "SPE-WHI",
    "price": 1999,
    "quantity": 3
  },
  {
    "id": 44,
    "product_id": 15,
    "variant": "SIZE",
    "variant_option": "1TB",
    "image": "",
    "sku": "HAR-1TB",
    "price": 1499,
    "quantity": 11
  },
  {
    "id": 45,
    "product_id": 15,
    "variant": "SIZE",
    "variant_option": "2TB",
    "image": "",
    "sku": "HAR-2TB",
    "price": 2199,
    "quantity": 32
  },
  {
    "id": 46,
    "product_id": 15,
    "variant": "SIZE",
    "variant_option": "4TB",
    "image": "",
    "sku": "HAR-4TB",
    "price": 3599,
    "quantity": 11
  },
  {
    "id": 47,
    "product_id": 16,
    "variant": "TYPE",
    "variant_option": "VEGETABLE",
    "image": "https://m.media-amazon.com/images/I/81wN1xqjYML._SL1500_.jpg",
    "sku": "SOU-VEG",
    "price": 2999,
    "quantity": 25
  },
  {
    "id": 48,
    "product_id": 16,
    "variant": "TYPE",
    "variant_option": "CHICKEN NOODLE",
    "image": "https://m.media-amazon.com/images/I/61TRbEavkJS._SL1000_.jpg",
    "sku": "SOU-CHI",
    "price": 2499,
    "quantity": 10
  },
  {
    "id": 49,
    "product_id": 16,
    "variant": "TYPE",
    "variant_option": "MINESTRONE",
    "image": "https://m.media-amazon.com/images/I/71bClMX-YvL._SL1000_.jpg",
    "sku": "SOU-MIN",
    "price": 2499,
    "quantity": 37
  },
  {
    "id": 50,
    "product_id": 17,
    "variant": "SIZE",
    "variant_option": "12 Oz.",
    "image": "",
    "sku": "PAS-12O",
    "price": 299,
    "quantity": 42
  },
  {
    "id": 51,
    "product_id": 17,
    "variant": "SIZE",
    "variant_option": "16 Oz.",
    "image": "https://m.media-amazon.com/images/I/61R3pJH7jGL._SX679_.jpg",
    "sku": "PAS-16O",
    "price": 499,
    "quantity": 36
  },
  {
    "id": 52,
    "product_id": 18,
    "variant": "TYPE",
    "variant_option": "ROBUSTA",
    "image": "",
    "sku": "COF-ROB",
    "price": 299,
    "quantity": 33
  },
  {
    "id": 53,
    "product_id": 18,
    "variant": "TYPE",
    "variant_option": "ARABICA",
    "image": "https://m.media-amazon.com/images/I/710WIeuN0mL._SX679_PIbundle-2,TopRight,0,0_AA679SH20_.jpg",
    "sku": "COF-ARA",
    "price": 299,
    "quantity": 44
  },
  {
    "id": 54,
    "product_id": 18,
    "variant": "TYPE",
    "variant_option": "HAZELNUT",
    "image": "",
    "sku": "COF-HAZ",
    "price": 299,
    "quantity": 7
  },
  {
    "id": 55,
    "product_id": 19,
    "variant": "SIZE",
    "variant_option": "5lbs",
    "image": "",
    "sku": "RIC-5LB",
    "price": 339,
    "quantity": 30
  },
  {
    "id": 56,
    "product_id": 19,
    "variant": "SIZE",
    "variant_option": "10lbs",
    "image": "",
    "sku": "RIC-10L",
    "price": 649,
    "quantity": 23
  },
  {
    "id": 57,
    "product_id": 20,
    "variant": "TYPE",
    "variant_option": "WHOLE GRAIN",
    "image": "https://m.media-amazon.com/images/I/4122psjbK7L.jpg",
    "sku": "BRE-WHO",
    "price": 119,
    "quantity": 29
  },
  {
    "id": 58,
    "product_id": 20,
    "variant": "TYPE",
    "variant_option": "WHEAT",
    "image": "",
    "sku": "BRE-WHE",
    "price": 119,
    "quantity": 19
  },
  {
    "id": 59,
    "product_id": 20,
    "variant": "TYPE",
    "variant_option": "RAISIN",
    "image": "",
    "sku": "BRE-RAI",
    "price": 119,
    "quantity": 44
  },
  {
    "id": 60,
    "product_id": 21,
    "variant": "COLOR",
    "variant_option": "RED",
    "image": "https://m.media-amazon.com/images/I/618JNkdWjwL._SX522_.jpg",
    "sku": "LIP-RED",
    "price": 399,
    "quantity": 42
  },
  {
    "id": 61,
    "product_id": 21,
    "variant": "COLOR",
    "variant_option": "PINK",
    "image": "",
    "sku": "LIP-PIN",
    "price": 399,
    "quantity": 45
  },
  {
    "id": 62,
    "product_id": 22,
    "variant": "SIZE",
    "variant_option": "3 fl oz",
    "image": "",
    "sku": "FAC-3FL",
    "price": 599,
    "quantity": 11
  },
  {
    "id": 63,
    "product_id": 23,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "",
    "sku": "WHI-REG",
    "price": 599,
    "quantity": 9
  },
  {
    "id": 64,
    "product_id": 24,
    "variant": "SIZE",
    "variant_option": "4ML",
    "image": "https://m.media-amazon.com/images/I/71NYlrUDfQS._SX466_.jpg",
    "sku": "NAI-4ML",
    "price": 999,
    "quantity": 7
  },
  {
    "id": 65,
    "product_id": 24,
    "variant": "SIZE",
    "variant_option": "10ML",
    "image": "",
    "sku": "NAI-10M",
    "price": 1499,
    "quantity": 14
  },
  {
    "id": 66,
    "product_id": 25,
    "variant": "SIZE",
    "variant_option": "50ML",
    "image": "",
    "sku": "PER-50",
    "price": 450,
    "quantity": 29
  },
  {
    "id": 67,
    "product_id": 25,
    "variant": "SIZE",
    "variant_option": "100ML",
    "image": "https://m.media-amazon.com/images/I/71qbVupjTzL._SX679_.jpg",
    "sku": "PER-100",
    "price": 700,
    "quantity": 23
  },
  {
    "id": 68,
    "product_id": 25,
    "variant": "SIZE",
    "variant_option": "250ML",
    "image": "",
    "sku": "PER-250",
    "price": 1050,
    "quantity": 50
  },
  {
    "id": 69,
    "product_id": 26,
    "variant": "COLOR",
    "variant_option": "BLUE",
    "image": "",
    "sku": "SOF-BLU",
    "price": 23000,
    "quantity": 16
  },
  {
    "id": 70,
    "product_id": 26,
    "variant": "COLOR",
    "variant_option": "BROWN",
    "image": "",
    "sku": "SOF-BRO",
    "price": 23000,
    "quantity": 32
  },
  {
    "id": 71,
    "product_id": 27,
    "variant": "TYPE",
    "variant_option": "1HP",
    "image": "",
    "sku": "AIR-1HP",
    "price": 16999,
    "quantity": 13
  },
  {
    "id": 72,
    "product_id": 27,
    "variant": "TYPE",
    "variant_option": "2HP",
    "image": "",
    "sku": "AIR-2HP",
    "price": 24999,
    "quantity": 14
  },
  {
    "id": 73,
    "product_id": 28,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "",
    "sku": "REF-REG",
    "price": 23999,
    "quantity": 28
  },
  {
    "id": 74,
    "product_id": 29,
    "variant": "COLOR",
    "variant_option": "BLUE",
    "image": "",
    "sku": "FAN-BLU",
    "price": 899,
    "quantity": 38
  },
  {
    "id": 75,
    "product_id": 29,
    "variant": "COLOR",
    "variant_option": "WHITE",
    "image": "https://m.media-amazon.com/images/I/81-bhwMdKAL._AC_SX569_.jpg",
    "sku": "FAN-WHI",
    "price": 899,
    "quantity": 22
  },
  {
    "id": 76,
    "product_id": 29,
    "variant": "COLOR",
    "variant_option": "YELLOW",
    "image": "",
    "sku": "FAN-YEL",
    "price": 899,
    "quantity": 34
  },
  {
    "id": 77,
    "product_id": 30,
    "variant": "COLOR",
    "variant_option": "GRAY",
    "image": "https://m.media-amazon.com/images/I/610eFWo8u-L._AC_SL1500_.jpg",
    "sku": "WAS-GRA",
    "price": 11999,
    "quantity": 34
  },
  {
    "id": 78,
    "product_id": 30,
    "variant": "COLOR",
    "variant_option": "WHITE",
    "image": "https://m.media-amazon.com/images/I/61ckarCl0aL._AC_SL1500_.jpg",
    "sku": "WAS-WHI",
    "price": 11999,
    "quantity": 6
  },
  {
    "id": 79,
    "product_id": 31,
    "variant": "TYPE",
    "variant_option": "4-Person",
    "image": "https://m.media-amazon.com/images/I/71yDp1JEKpL._AC_SL1500_.jpg",
    "sku": "TEN-RED",
    "price": 1049,
    "quantity": 12
  },
  {
    "id": 80,
    "product_id": 31,
    "variant": "TYPE",
    "variant_option": "6-Person",
    "image": "https://m.media-amazon.com/images/I/71lSBmA+nyL._AC_SL1500_.jpg",
    "sku": "TEN-GRA",
    "price": 1049,
    "quantity": 10
  },
  {
    "id": 81,
    "product_id": 31,
    "variant": "TYPE",
    "variant_option": "10-Person",
    "image": "https://m.media-amazon.com/images/I/71kIl0-LehL._AC_SL1500_.jpg",
    "sku": "TEN-BLU",
    "price": 1049,
    "quantity": 5
  },
  {
    "id": 82,
    "product_id": 32,
    "variant": "TYPE",
    "variant_option": "1 SET",
    "image": "https://m.media-amazon.com/images/I/81m3Qk2ginS._AC_SL1500_.jpg",
    "sku": "CAM-1SE",
    "price": 1499,
    "quantity": 21
  },
  {
    "id": 83,
    "product_id": 33,
    "variant": "COLOR",
    "variant_option": "BLACK",
    "image": "https://m.media-amazon.com/images/I/7130pVViqjS._AC_SL1500_.jpg",
    "sku": "BIK-BLA",
    "price": 23999,
    "quantity": 8
  },
  {
    "id": 84,
    "product_id": 33,
    "variant": "COLOR",
    "variant_option": "WHITE",
    "image": "https://m.media-amazon.com/images/I/71Cu39Uk4eS._AC_SL1500_.jpg",
    "sku": "BIK-WHI",
    "price": 23999,
    "quantity": 32
  },
  {
    "id": 85,
    "product_id": 33,
    "variant": "COLOR",
    "variant_option": "YELLOW",
    "image": "https://m.media-amazon.com/images/I/71nOfq-N0-S._AC_SL1500_.jpg",
    "sku": "BIK-YEL",
    "price": 27999,
    "quantity": 15
  },
  {
    "id": 86,
    "product_id": 34,
    "variant": "COLOR",
    "variant_option": "GREY",
    "image": "https://m.media-amazon.com/images/I/51UB72DpVuL._AC_SL1000_.jpg",
    "sku": "HEL-GRE",
    "price": 1499,
    "quantity": 42
  },
  {
    "id": 87,
    "product_id": 34,
    "variant": "COLOR",
    "variant_option": "RED",
    "image": "https://m.media-amazon.com/images/I/61l2vPsZE8L._AC_SL1000_.jpg",
    "sku": "HEL-RED",
    "price": 1499,
    "quantity": 49
  },
  {
    "id": 88,
    "product_id": 34,
    "variant": "COLOR",
    "variant_option": "BLACK",
    "image": "https://m.media-amazon.com/images/I/51A5MYXXxkL._AC_SL1000_.jpg",
    "sku": "HEL-BLA",
    "price": 1499,
    "quantity": 19
  },
  {
    "id": 89,
    "product_id": 34,
    "variant": "COLOR",
    "variant_option": "WHITE",
    "image": "https://m.media-amazon.com/images/I/51VB4dBLFzL._AC_SL1000_.jpg",
    "sku": "HEL-WHI",
    "price": 1499,
    "quantity": 31
  },
  {
    "id": 90,
    "product_id": 35,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "https://m.media-amazon.com/images/I/71igwEAJIQS._AC_SL1500_.jpg",
    "sku": "FLA-REG",
    "price": 299,
    "quantity": 17
  },
  {
    "id": 91,
    "product_id": 36,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "",
    "sku": "GAM-REG",
    "price": 1999,
    "quantity": 5
  },
  {
    "id": 92,
    "product_id": 37,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "https://m.media-amazon.com/images/I/71lmDFTt1tL._AC_SL1500_.jpg",
    "sku": "ROB-REG",
    "price": 1299,
    "quantity": 34
  },
  {
    "id": 93,
    "product_id": 38,
    "variant": "COLOR",
    "variant_option": "RED",
    "image": "https://m.media-amazon.com/images/I/81ymGAf0wsL._AC_SL1500_.jpg",
    "sku": "CAR-RED",
    "price": 999,
    "quantity": 27
  },
  {
    "id": 94,
    "product_id": 38,
    "variant": "COLOR",
    "variant_option": "GREEN",
    "image": "https://m.media-amazon.com/images/I/51MvjTJcvvS._AC_SL1000_.jpg",
    "sku": "CAR-GRE",
    "price": 999,
    "quantity": 24
  },
  {
    "id": 95,
    "product_id": 39,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "https://m.media-amazon.com/images/I/71PeknIreML._AC_SL1500_.jpg",
    "sku": "BOA-REG",
    "price": 999,
    "quantity": 7
  },
  {
    "id": 96,
    "product_id": 40,
    "variant": "TYPE",
    "variant_option": "REGULAR",
    "image": "https://m.media-amazon.com/images/I/91sjL7skP2S._AC_SL1500_.jpg",
    "sku": "BAL-REG",
    "price": 1499,
    "quantity": 27
  }
];
