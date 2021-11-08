// Storage variables
var storage = window.localStorage;
var productData;

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
  var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
  var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
  var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
  var categories_productFromLocalStorage = JSON.parse(
    storage.getItem("categories_product")
  );

  var atc = document.getElementById("add-to-cart-button");

  if (atc) {
    atc.addEventListener("click", addToCartHandler);
  }

  // Returns an array of all products in the database
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

  try {
    var id = parseInt(location.href.split("=")[1]);
    var similarItems = [];

    for (const product of data) {
      if (product.id == id) {
        productData = product;
      }
    }

    for (const item of data) {
      var cats = productData.categories;
      for (const c of cats) {
        if (item.id != productData.id) {
          if (item.categories.indexOf(c) > -1) {
            similarItems.push(item);
          }
        }
      }
    }

    // alert(JSON.stringify(productData));

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

    var product_title = document.getElementById("product-title");
    product_title.innerHTML = productData.name;
    var product_price = document.getElementById("product-price");
    product_price.innerHTML =
      "From " + formatter.format(parseInt(productData.price));

    var product_variant_section = document.getElementById("product_variant");
    product_variant_section.innerHTML = productData.variant;

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

    var product_category = document.getElementById("product-category");
    var category_links = [];
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
    var category_links_joined = category_links.join(",");
    product_category.innerHTML =
      product_category.innerHTML +
      `
      <dl class="dlist-align">
        <dt class="text-muted">Category</dt>
        <dd>${category_links_joined}</dd>
      </dl>`;

    var product_description = document.getElementById("product-description");
    product_description.innerHTML = productData.description;

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
    var id_parsed = parseInt(id);
    var primary = document.getElementById("primary-image");

    var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
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
    var chosen_variant = $('input[type="radio"]:checked').val();
    var chosen_variant_parsed = parseInt(chosen_variant);

    if (isNaN(chosen_variant_parsed)) {
      chosen_variant_parsed = productData.variant_options[0].id;
    }

    var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));
    if (loggedInUser) {
      var cartInLocalStorage = JSON.parse(storage.getItem("cart"));
      var cartData = {
        id: cartInLocalStorage.length + 1,
        account_id: loggedInUser.id,
        sku_id: chosen_variant_parsed,
        quantity: 1,
        is_ongoing: "FALSE",
        is_completed: "FALSE",
      };
      cartInLocalStorage.push(cartData);
      storage.setItem("cart", JSON.stringify(cartInLocalStorage));
    } else {
      location.href = "login.html";
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
