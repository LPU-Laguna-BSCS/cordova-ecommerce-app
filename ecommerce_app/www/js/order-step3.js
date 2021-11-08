// Storage variables
var storage = window.localStorage;

var loggedInUser;
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);
var cartInLocalStorage = JSON.parse(storage.getItem("cart"));
var addressesFromLocalStorage = JSON.parse(storage.getItem("addresses"));
var paymentsFromLocalStorage = JSON.parse(storage.getItem("payments"));
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

var address_id = parseInt(location.href.split("=")[1]);

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  getCartProductsData();
});

// Onclick function ran when the next button is pressed in the order steps
function moveToStepFour() {
  try {
    var name = document.getElementById("order-step3-name").value;
    var card = document.getElementById("order-step3-card").value;
    var month = $("#order-step3-month :selected").val();
    var year = $("#order-step3-year :selected").val();
    var cvv = document.getElementById("order-step3-cvv").value;

    var createPayment = true;
    if (name == "") {
      alert("Please provide a name.");
      createAddress = false;
    }
    if (card == "") {
      alert("Please provide a card number.");
      createPayment = false;
    }
    if (month == "") {
      alert("Please provide a month.");
      createPayment = false;
    }
    if (year == "") {
      alert("Please provide a year.");
      createPayment = false;
    }
    if (cvv == "") {
      alert("Please provide your cvv.");
      createPayment = false;
    }

    if (createPayment) {
      var data = {
        id: paymentsFromLocalStorage.length + 1,
        account_id: loggedInUser.id,
        name: name,
        provider: "Visa",
        card_number: card,
        expiration_date: month + "/" + year,
        cvv: cvv,
      };

      paymentsFromLocalStorage.push(data);
      // alert(JSON.stringify(paymentsFromLocalStorage));
      storage.setItem("payments", JSON.stringify(paymentsFromLocalStorage));

      location.href = `order-success.html?address_id=${address_id}&payment_id=${data.id}`;
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
        images: images,
        categories: categories,
      };

      data.push(d);
    }
  } catch (e) {
    alert(e);
  }

  return data;
}

// Fetches all items in the cart of the user
function getCartProductsData() {
  var data = getProductsData();
  var cart_products = [];
  var cart_products_prices = [];

  for (const cart of cartInLocalStorage) {
    if (
      cart.account_id == loggedInUser.id &&
      cart.is_ongoing == "FALSE" &&
      cart.is_completed == "FALSE"
    ) {
      for (const sku of skusFromLocalStorage) {
        if (sku.id == cart.sku_id) {
          for (const item of data) {
            if (item.id == sku.product_id) {
              var cart_data = {
                id: item.id,
                name: item.name,
                variant: item.variant,
                variant_option: sku.variant_option,
                price: sku.price,
                quantity: cart.quantity,
                cart_id: cart.id,
                sku: sku.sku,
              };

              if (sku.image != "") {
                cart_data.image = sku.image;
              } else {
                cart_data.image = item.images[0];
              }
              cart_products.push(cart_data);
            }
          }
        }
      }
    }
  }
  if (cart_products.length > 0) {
    for (const c of cart_products) {
      cart_products_prices.push(c.quantity * c.price);
    }
  }

  updateCartSummary(cart_products_prices);
}

// Displays the total amount including shipping costs in the HTML
function updateCartSummary(cart_products_prices) {
  var total = cart_products_prices.reduce(function (a, b) {
    return a + b;
  }, 0);
  var order_summary = document.getElementById("order-summary");
  order_summary.innerHTML = "";
  order_summary.innerHTML =
    order_summary.innerHTML +
    `
    <p class="mb-0">
      Subtotal price: ${formatter.format(total)} <br />
      Shipping: ${formatter.format(50)} <br />
    </p>
    <h6 class="mt-2">Total pay: <var>${formatter.format(total + 50)}</var></h6>
  `;

  addButton(total);
}

// Dynamically displays the total amount to be paid on the text of the button
function addButton(total) {
  var order_step3_button = document.getElementById("order-step3-button");
  order_step3_button.innerHTML =
    order_step3_button.innerHTML +
    `
  <button class="btn btn-success w-100" onclick="moveToStepFour();">
    Pay ${formatter.format(total + 50)}
  </button>
  `;
}
