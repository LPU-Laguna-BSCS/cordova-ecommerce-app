// Storage variables
var storage = window.localStorage;
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);
var cartInLocalStorage = JSON.parse(storage.getItem("cart"));
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Redirect user if not yet logged in
  if (!loggedInUser) {
    location.href = "login.html";
  }

  // Fetches all cart items that are still ongoing
  getCartProductsData();
});

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

      // Iterate through image and find relevant items connected to product
      for (const i of imagesFromLocalStorage) {
        if (i.product_id == id) {
          images.push(i.link);
        }
      }

      // Iterate through categories and find relevant items connected to product
      for (const cp of categories_productFromLocalStorage) {
        if (cp.product_id == id) {
          for (const category of categoriesFromLocalStorage) {
            if (cp.category_id == category.id) {
              categories.push(category.name);
            }
          }
        }
      }

      // Form json to be imported to data array
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

      // Push to data array
      data.push(d);
    }
  } catch (e) {
    alert(e);
  }

  return data;
}

// Fetches cart items and sets HTML
function getCartProductsData() {
  var data = getProductsData();

  // Get section from HTML
  var cart_ongoing_items_section = document.getElementById(
    "cart-ongoing-items-section"
  );

  // Make sure it's blank first
  cart_ongoing_items_section.innerHTML = "";

  // Array that will hold cart items
  var cart_products = [];

  // Iterate through cart database and find items that belong to user and are ongoing
  for (const cart of cartInLocalStorage) {
    if (cart.account_id == loggedInUser.id && cart.is_ongoing == "TRUE") {
      for (const sku of skusFromLocalStorage) {
        if (sku.id == cart.sku_id) {
          for (const item of data) {
            if (item.id == sku.product_id) {
              var cart_data = {
                id: item.id,
                name: item.name,
                variant: item.variant,
                variant_option: sku.variant_option,
                total: sku.price * cart.quantity,
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

  // Displays list of products ongoing
  if (cart_products.length > 0) {
    for (const c of cart_products) {
      cart_ongoing_items_section.innerHTML =
        cart_ongoing_items_section.innerHTML +
        `
      <article class="item-cart" id="${c.cart_id}">
        <figure class="itemside mb-3">
          <div class="aside">
            <img src="${c.image}" class="rounded border img-md" />
          </div>
          <figcaption class="info">
            <a href="product-detail.html?id=${
              c.id
            }" class="title text-truncate">${c.name.slice(0, 30)}...</a>
            <small class="text-muted">
              ${c.variant}: ${c.variant_option} <br />
              TOTAL: ${formatter.format(parseInt(c.total))}
            </small>
          </figcaption>
        </figure>
      </article>
      <!-- item-cart.// -->
    <hr/>
      `;
    }
  } else {
    // Displays "No items to display"
    cart_ongoing_items_section.innerHTML =
      cart_ongoing_items_section.innerHTML +
      `
        <div class="alert alert-light" role="alert">
          No items to display.
        </div>`;
  }
}
