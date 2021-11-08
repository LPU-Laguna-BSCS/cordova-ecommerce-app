// Storage variables
var storage = window.localStorage;
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);
var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Redirect user if not yet logged in
  if (!loggedInUser) {
    location.href = "login.html";
  }

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

// Fetches cart items and sets HTML
function getCartProductsData() {
  var data = getProductsData();
  var cart_items_section = document.getElementById("cart-items-section");
  cart_items_section.innerHTML = "";
  var cart_products = [];
  var cart_products_prices = [];

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
            }
          }
        }
      }
    }
  }

  if (cart_products.length > 0) {
    for (const c of cart_products) {
      cart_products_prices.push(c.quantity * c.price);

      cart_items_section.innerHTML =
        cart_items_section.innerHTML +
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
              ${formatter.format(parseInt(c.price))} /per item
            </small>
          </figcaption>
        </figure>

        <div class="row align-items-center">
          <div class="col-auto">
            <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${
              c.cart_id
            })"> Remove </button>
          </div>
          <div class="col">
            <div class="input-group input-group-sm input-spinner">
              <button class="btn btn-light sub" type="button" onclick="subtractQuantity(${
                c.cart_id
              },1)">
                <i class="material-icons md-minus"></i>
              </button>
              <input type="text" class="form-control" value="${c.quantity}" />
              <button class="btn btn-light add" type="button" onclick="addQuantity(${
                c.cart_id
              },1)">
                <i class="material-icons md-plus"></i>
              </button>
            </div>
            <!-- input-group.// -->
          </div>
          <div class="col">
            <var class="float-end price">${
              c.quantity * 2
            }x = ${formatter.format(c.quantity * 2 * c.price)}</var>
          </div>
        </div>
      </article>
      <!-- item-cart.// -->
    <hr/>
      `;
    }
  } else {
    cart_items_section.innerHTML =
      cart_items_section.innerHTML +
      `
        <div class="alert alert-light" role="alert">
          No items to display.
        </div>`;
  }

  updateCartSummary(cart_products_prices);
}

function removeCartItem(cart_id) {
  var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
  var filtered = cartFromLocalStorage.filter(function (cart) {
    return cart.id != cart_id;
  });
  storage.setItem("cart", JSON.stringify(filtered));
  location.href = "cart.html";
}

function subtractQuantity(cart_id, n) {
  var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
  for (let i = 0; i < cartFromLocalStorage.length; i++) {
    var cart = cartFromLocalStorage[i];
    if (cart.id == cart_id) {
      cart.quantity = cart.quantity - n;
      cartFromLocalStorage[i] = cart;
      storage.setItem("cart", JSON.stringify(cartFromLocalStorage));
      break;
    }
  }
  location.href = "cart.html";
  // getCartProductsData();
}

function addQuantity(cart_id, n) {
  var cartFromLocalStorage = JSON.parse(storage.getItem("cart"));
  for (let i = 0; i < cartFromLocalStorage.length; i++) {
    var cart = cartFromLocalStorage[i];
    if (cart.id == cart_id) {
      cart.quantity = cart.quantity + n;
      cartFromLocalStorage[i] = cart;
      storage.setItem("cart", JSON.stringify(cartFromLocalStorage));
      break;
    }
  }
  location.href = "cart.html";
  // getCartProductsData();
}

function updateCartSummary(cart_products_prices) {
  var total = cart_products_prices.reduce(function (a, b) {
    return a + b;
  }, 0);
  var cart_summary = document.getElementById("cart-summary");
  cart_summary.innerHTML = "";
  cart_summary.innerHTML =
    cart_summary.innerHTML +
    `
    <dl class="dlist-align">
      <dt class="text-muted">Total price:</dt>
      <dd class="text-end">${formatter.format(total)}</dd>
    </dl>
    <dl class="dlist-align">
      <dt class="text-muted">Shipping:</dt>
      <dd class="text-end">${formatter.format(50)}</dd>
    </dl>
    <dl class="dlist-align">
      <dt class="text-muted"><strong>Total:</strong></dt>
      <dd class="text-end"><strong>${formatter.format(total + 50)}</strong></dd>
    </dl>
  `;
}
