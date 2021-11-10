// Storage variables
var storage = window.localStorage;
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
var ordersFromLocalStorage = JSON.parse(storage.getItem("orders"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);
var loggedInUser;

// Stores the query string parameters that will be used in the processing of
// data in an array params
var s = location.href;
var parametersString = s.slice(s.indexOf("?") + 1);
var parameters = parametersString.split("&");
var params = [];

for (const p of parameters) {
  params.push(parseInt(p.split("=")[1]));
}

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fetches the logged in user from local storage
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

  // Checks whether user is logged in or not
  if (loggedInUser) {
    // Find the upper order section
    var order_account_detail = document.getElementById("order-account-details");

    // Sets the html of the upper order section
    order_account_detail.innerHTML =
      order_account_detail.innerHTML +
      `
      <svg width="116px" height="116px" viewBox="0 0 116 116" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
		        <g transform="translate(-122.000000, -113.000000)">
		            <g id="check" transform="translate(122.000000, 113.000000)">
		                <circle  fill="#CEFFCF" cx="58" cy="58" r="58"></circle>
		                <circle  fill="#00D803" cx="58" cy="58" r="44"></circle>
		                <g transform="translate(45.000000, 47.000000)" fill="#FFFFFF">
		                    <path d="M8.625,17.325 L2.9375,11.6375 C2.30375,11.00375 1.29625,11.00375 0.6625,11.6375 C0.02875,12.27125 0.02875,13.27875 0.6625,13.9125 L7.47125,20.72125 C8.105,21.355 9.12875,21.355 9.7625,20.72125 L26.9875,3.5125 C27.62125,2.87875 27.62125,1.87125 26.9875,1.2375 C26.35375,0.60375 25.34625,0.60375 24.7125,1.2375 L8.625,17.325 Z"></path>
		                </g>
		            </g>
		        </g>
		    </g>
		</svg>
		<br><br>
		<h6 class="text-success">${loggedInUser.first_name}, <br> Thanks for your purchase.</h6>
		<p class="text-muted">You will get tracking number to email: ${loggedInUser.email}</p>
      `;

    try {
      // Fetches all the products from the database
      var data = getProductsData();

      // Array that will contain all cart products
      var cart_products = [];

      // Array that will contain all cart products' id's
      var cart_ids = [];

      // Iterate through items in cart that are of the user and are not yet ongoing and completed
      for (const cart of cartFromLocalStorage) {
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
                  cart_ids.push(cart_data.id);
                }
              }
            }
          }
        }
      }

      // Preparation of data to be added to orders database
      var orderData = {
        id: ordersFromLocalStorage.length + 1,
        account_id: loggedInUser.id,
        cart_ids: cart_ids,
        payment_id: params[1],
        address_id: params[0],
        create_date: new Date(),
      };

      // Pushes the new data to orders table
      ordersFromLocalStorage.push(orderData);

      // Updates the orders table in local storage
      storage.setItem("orders", JSON.stringify(ordersFromLocalStorage));

      //Displays details about the product ordered
      var order_product_details = document.getElementById(
        "order-product-details"
      );

      // Adds five days from now as estimated delivery date
      var d = new Date();
      var numberOfDaysToAdd = 5;
      d.setDate(d.getDate() + numberOfDaysToAdd);

      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var y = d.getFullYear();

      var d_formatted = mm + "/" + dd + "/" + y;

      order_product_details.innerHTML =
        order_product_details.innerHTML +
        `
        <b>Order ID:</b> ${orderData.id} <br>
        <b>Estimate delivery:</b> ${d_formatted}<br>
        `;

      //Diplays list of products ordered
      var order_products = document.getElementById("order-products");
      for (const cart_product of cart_products) {
        order_products.innerHTML =
          order_products.innerHTML +
          `
        <tr>
          <td width="70"><img src="${cart_product.image}" class="img-md" /></td>
          <td>
            <p>${cart_product.name.slice(0, 30)}...</p>
            ${cart_product.quantity}x = ${formatter.format(
            parseInt(cart_product.quantity * cart_product.price)
          )}
          </td>
        </tr>
        `;

        // Changes the cart item's ongoing state from FALSE to TRUE
        for (let i = 0; i < cartFromLocalStorage.length; i++) {
          var cart = cartFromLocalStorage[i];
          if (cart.id == cart_product.cart_id) {
            cart.is_ongoing = "TRUE";
            cartFromLocalStorage[i] = cart;
            storage.setItem("cart", JSON.stringify(cartFromLocalStorage));
            break;
          }
        }

        // Updates the quantity of the sku's
        for (let i = 0; i < skusFromLocalStorage.length; i++) {
          var sku = skusFromLocalStorage[i];
          if (sku.sku == cart_product.sku) {
            sku.quantity = sku.quantity - cart_product.quantity;
            skusFromLocalStorage[i] = sku;
            storage.setItem("skus", JSON.stringify(skusFromLocalStorage));
            break;
          }
        }
      }
    } catch (e) {
      alert(e);
    }
  }
});

// Returns an array of all products in the database
function getProductsData() {
  var data = [];

  try {
    // Iterate through products from database
    for (const p of productsFromLocalStorage) {
      var id = p.id;
      var name = p.name;
      var description = p.description;
      var variant;
      var variant_options = [];
      var prices = [];
      var images = [];
      var categories = [];

      // Iterate through skus and find relevant items connected to product
      for (const s of skusFromLocalStorage) {
        if (s.product_id == id) {
          prices.push(s.price);
          variant_options.push(s);
          variant = s.variant;
        }
      }

      // Iterate through images and find relevant items connected to product
      for (const i of imagesFromLocalStorage) {
        if (i.product_id == id) {
          images.push(i.link);
        }
      }

      // Iterate through categories_product and find relevant items connected to product
      for (const cp of categories_productFromLocalStorage) {
        if (cp.product_id == id) {
          for (const category of categoriesFromLocalStorage) {
            if (cp.category_id == category.id) {
              categories.push(category.name);
            }
          }
        }
      }

      // Prepares the data to be pushed to the database
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

// Currency formatter to be Php XX.XX
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
