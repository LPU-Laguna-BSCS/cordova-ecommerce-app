var storage = window.localStorage;
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);
var cartInLocalStorage = JSON.parse(storage.getItem("cart"));

var loggedInUser;

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));
  if (loggedInUser) {
    var profile_account = document.getElementById("header-account");
    profile_account.innerHTML =
      profile_account.innerHTML +
      `
      <a href="profile-edit.html" class="float-end"
          ><i class="material-icons md-edit text-white"></i
        ></a>
        <figure
          class="icontext align-items-center mr-4"
          style="max-width: 300px;"
        >
          <img class="icon icon-md rounded-circle" src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" />
          <figcaption class="text text-white">
            <p class="h5 title mb-1"> ${loggedInUser.first_name} ${loggedInUser.last_name}</p>
            <p class="text-white-50 lh-sm">
            ${loggedInUser.telephone} <br />
            ${loggedInUser.email}
            </p>
          </figcaption>
        </figure>
      `;

    var cart_products_is_ongoing = 0;
    var cart_products_is_completed = 0;

    for (const cart of cartInLocalStorage) {
      if (cart.account_id == loggedInUser.id && cart.is_ongoing == "TRUE") {
        cart_products_is_ongoing++;
      }
    }

    for (const cart of cartInLocalStorage) {
      if (cart.account_id == loggedInUser.id && cart.is_completed == "TRUE") {
        cart_products_is_completed++;
      }
    }

    var order_section = document.getElementById("order-section");
    order_section.innerHTML =
      order_section.innerHTML +
      `
      <h5 class="title-section pb-2">Orders</h5>
        <nav class="nav-list">
          <a class="btn-list" href="cart-ongoing-list.html">
            <span class="float-end badge bg-warning">${cart_products_is_ongoing}</span>
            <span class="text">On process</span>
          </a>
          <a class="btn-list" href="cart-completed-list.html">
            <span class="float-end badge bg-success">${cart_products_is_completed}</span>
            <span class="text">Shipped</span>
          </a>
        </nav>
      `;
  }
});