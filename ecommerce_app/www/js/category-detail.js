// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var storage = window.localStorage;

  // Storage variables
  var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
  var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
  var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
  var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
  var categories_productFromLocalStorage = JSON.parse(
    storage.getItem("categories_product")
  );

  // Data variable of all the products in the database
  var data = getProductsData();

  // Parses the query string to get the category id to display
  var id = parseInt(location.href.split("=")[1]);

  // Category variable to be displayed
  var categoryData;

  // Category items to display
  var categoryItems = [];

  // Iterate through categories and find item that matches id
  for (const category of categoriesFromLocalStorage) {
    if (category.id == id) {
      categoryData = category;
    }
  }

  // Iterate through data containing products and find relevant to category
  for (const item of data) {
    if (item.categories.indexOf(categoryData.name) > -1) {
      categoryItems.push(item);
    }
  }

  // Find the title section on the page
  var category_title = document.getElementById("category-title");

  // Set the category name on the html
  category_title.innerHTML = categoryData.name;

  try {
    // Find the section to display the list of categories
    var category_list_section = document.getElementById(
      "category-list-section"
    );

    // Iterate through categories
    for (const c of categoriesFromLocalStorage) {
      // List out all the categories
      category_list_section.innerHTML =
        category_list_section.innerHTML +
        `
          <div class="item-xs">
            <a href="category-detail.html?id=${c.id}" class="item-category-sm">
              <div class="icon-wrap bg-primary-light shadow-sm">
                <img
                  class="icon"
                  src="${c.icon_white}"
                  alt=""
                />
              </div>
              <small class="title text-white">${c.name}</small>
            </a>
          </div>
          `;
    }
  } catch (e) {
    alert(e);
  }

  try {
    // Finds the section to display category products
    var product_list_section = document.getElementById("product-list-section");

    // Iterate through category items
    for (const c of categoryItems) {
      // Display items on the
      product_list_section.innerHTML =
        product_list_section.innerHTML +
        `
        <li class="col-12 col-sm-12 col-md-6">
          <article class="product-list mb-2">
            <div>
              <a href="product-detail.html?id=${c.id}" class="img-wrap">
                <img src="${c.images[0]}" />
              </a>
            </div>
            <div class="info-wrap">
              <p class="title">${c.name.slice(0, 80)}...</p>
              <div class="price mb-2">${formatter.format(
                parseInt(c.price)
              )}</div>
            </div>
          </article>
          <!-- product-list end// -->
        </li>
        <!-- col.// -->
          `;
    }
  } catch (e) {
    alert(e);
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
