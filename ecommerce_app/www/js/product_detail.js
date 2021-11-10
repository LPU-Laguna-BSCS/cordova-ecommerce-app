// Storage variables
var storage = window.localStorage;
var productData;

// Additional storage variables
var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
var categories_productFromLocalStorage = JSON.parse(
  storage.getItem("categories_product")
);

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Finds the add to cart button in the page
  var atc = document.getElementById("add-to-cart-button");

  // Sets an event listener to the add to cart button
  if (atc) {
    atc.addEventListener("click", addToCartHandler);
  }

  // Returns an array of all products in the database
  var data = getProductsData();

  try {
    // Parses the query string and gets the product id to be displayed
    var id = parseInt(location.href.split("=")[1]);

    // Array to hold similar items in the same category as the product's
    var similarItems = [];

    // Finds the matching product in database
    for (const product of data) {
      // Finds the corresponding data of the product using the parsed ID
      if (product.id == id) {
        productData = product;
      }
    }

    // Finds the matching products in the database in terms of category
    for (const item of data) {
      // Temporarily gets the product's categories
      var cats = productData.categories;
      // Iterates through the product's categories
      for (const c of cats) {
        // Finds products with similar category
        if (item.id != productData.id) {
          if (item.categories.indexOf(c) > -1) {
            similarItems.push(item);
          }
        }
      }
    }

    // Displays a primary image
    var primary = document.getElementById("primary-image");
    primary.innerHTML =
      primary.innerHTML +
      `
      <a
        href="${productData.images[0]}"
        data-fancybox="gallery"
        class="img-big-wrap"
        ><img src="${productData.images[0]}"
      /></a>`;

    // Displays the rest of the images
    var extras = document.getElementById("extra-images");
    for (let i = 1; i < productData.images.length; i++) {
      extras.innerHTML =
        extras.innerHTML +
        `
      <a
        href="${productData.images[i]}"
        data-fancybox="gallery"
        class="item-thumb"
      >
        <img src="${productData.images[i]}"
      /></a>`;
    }

    // Displays the product title
    var product_title = document.getElementById("product-title");
    product_title.innerHTML = productData.name;
    // Displays the product price
    var product_price = document.getElementById("product-price");
    product_price.innerHTML =
      "From " + formatter.format(parseInt(productData.price));
    //Displays list of variants of the product
    var product_variant_section = document.getElementById("product_variant");
    product_variant_section.innerHTML = productData.variant;

    // Displays a button group of the variants of the product
    var product_variant_options_section = document.getElementById(
      "product-variant-options"
    );
    for (let i = 0; i < productData.variant_options.length; i++) {
      if (productData.variant_options[i].quantity > 0) {
        product_variant_options_section.innerHTML =
          product_variant_options_section.innerHTML +
          `
              <input type="radio" class="btn-check" name="btnradio" id="btnradio${
                i + 1
              }" autocomplete="off" value="${
            productData.variant_options[i].id
          }" onclick="changePrimary(${productData.variant_options[i].id});">
              <label class="btn btn-outline-primary" for="btnradio${i + 1}">${
            productData.variant_options[i].variant_option
          }</label>

            `;
      } else {
        // Disables the variant if quantity of the product is out of stock
        product_variant_options_section.innerHTML =
          product_variant_options_section.innerHTML +
          `
              <input type="radio" disabled class="btn-check" name="btnradio" id="btnradio${
                i + 1
              }" autocomplete="off" value="${
            productData.variant_options[i].id
          }" onclick="changePrimary(${productData.variant_options[i].id});">
              <label class="btn btn-outline-primary" for="btnradio${i + 1}">${
            productData.variant_options[i].variant_option
          }</label>

            `;
      }
    }

    // Finds the product category section in page
    var product_category = document.getElementById("product-category");

    // Variable that will hold the category links
    var category_links = [];

    // Creates HTML link tags to categories of the product
    for (const cat of productData.categories) {
      var id;
      for (const item of categoriesFromLocalStorage) {
        if (item.name == cat) {
          id = item.id;
        }
      }
      var html = `<a href="category-detail.html?id=${id}">${cat}</a>`;
      category_links.push(html);
    }

    // Joins the HTML link tags with a comma
    var category_links_joined = category_links.join(",");

    // Adds the HTML link tags to the page
    product_category.innerHTML =
      product_category.innerHTML +
      `
      <dl class="dlist-align">
        <dt class="text-muted">Category</dt>
        <dd>${category_links_joined}</dd>
      </dl>`;

    //Displays description of the product
    var product_description = document.getElementById("product-description");
    product_description.innerHTML = productData.description;

    // Displays similar items based on the product
    var similar_items_section = document.getElementById(
      "similar-items-section"
    );

    for (const similar_item of similarItems) {
      similar_items_section.innerHTML =
        similar_items_section.innerHTML +
        `
        <div class="item">
          <a href="product-detail.html?id=${similar_item.id}" class="product">
            <div class="img-wrap"><img src="${similar_item.images[0]}" /></div>
            <div class="text-wrap">
              <div class="price">${formatter.format(
                parseInt(similar_item.price)
              )}</div>
              <!-- price .// -->
              <p class="title">${similar_item.name.slice(0, 80)}</p>
            </div>
          </a>
        </div>
        `;
    }
  } catch (e) {
    alert(e);
  }
});

// Changes the primary image in the page to match the variant option when variant option is chosen
function changePrimary(id) {
  try {
    // Converts the string ID to an integer
    var id_parsed = parseInt(id);

    // Finds the primary image section in page
    var primary = document.getElementById("primary-image");

    // Fetches the skus table from local storage
    var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));

    // Changes the primary image to the sku's image if present
    for (const sku of skusFromLocalStorage) {
      if (sku.id == id_parsed) {
        if (sku.image != "") {
          primary.innerHTML = `
            <a
              href="${sku.image}"
              data-fancybox="gallery"
              class="img-big-wrap"
              ><img src="${sku.image}"
            /></a>`;
        }
      }
    }
  } catch (e) {
    alert(e);
  }
}

// Event handler for when the add to cart button is clicked
function addToCartHandler(element) {
  try {
    // Fetches the value of the selected variant
    var chosen_variant = $('input[type="radio"]:checked').val();

    // Converts the variant's id into an integer
    var chosen_variant_parsed = parseInt(chosen_variant);

    // Checks if the user has chosen a variant. If none, will resolve to default
    if (isNaN(chosen_variant_parsed)) {
      chosen_variant_parsed = productData.variant_options[0].id;
    }

    // Fetches the logged in user from local storage
    var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

    // Checks if user is logged in and adds item/sku to cart
    if (loggedInUser) {
      // Fetches the cart database from local storage
      var cartInLocalStorage = JSON.parse(storage.getItem("cart"));

      // Prepares the data to be pushed to database
      var cartData = {
        id: cartInLocalStorage.length + 1,
        account_id: loggedInUser.id,
        sku_id: chosen_variant_parsed,
        quantity: 1,
        is_ongoing: "FALSE",
        is_completed: "FALSE",
      };

      // Push to cart data array
      cartInLocalStorage.push(cartData);

      // Updates the cart database in local storage
      storage.setItem("cart", JSON.stringify(cartInLocalStorage));
    } else {
      // Redirects the user to login page if not signed in
      location.href = "login.html";
    }
  } catch (e) {
    alert(e);
  }
}

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

// Currency formatter to be Php XX.XX
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
