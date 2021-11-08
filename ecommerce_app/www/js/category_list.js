// Storage variables
var storage = window.localStorage;

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));
  var last_item = document.getElementById("home-menu-bar-last-item");

  if (loggedInUser) {
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="profile.html" class="nav-link">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Profile</span>
      </a>`;
  } else {
    last_item.innerHTML =
      last_item.innerHTML +
      `<a href="login.html" class="nav-link">
        <i class="icon material-icons md-account_circle"></i
        ><span class="text">Login</span>
      </a>`;
  }

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
      var images = [];
      var categories = [];

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
        image: images[0],
        categories: categories,
      };

      data.push(d);
    }
  } catch (e) {
    alert(e);
  }

  var categories_count = [];

  for (const category of categoriesFromLocalStorage) {
    var name = category.name;
    var count = 0;
    for (const product of data) {
      if (product.categories.indexOf(name) > -1) {
        count = count + 1;
      }
    }
    categories_count.push({
      name: name,
      count: count,
    });
  }

  //Displays the list of category of products and the number of items
  var category_list_section = document.getElementById("category_list_section");
  for (const c of categoriesFromLocalStorage) {
    var count;

    for (const productCount of categories_count) {
      if (productCount.name == c.name) {
        count = productCount.count;
      }
    }
    category_list_section.innerHTML =
      category_list_section.innerHTML +
      `
          <a href="category-detail.html?id=${c.id}">
            <article class="card card-banner bg-primary mb-2">
              <img
                src="${c.link}"
                class="card-img opacity"
                style="height: 140px;"
              />
              <div class="card-img-overlay text-white">
                <div class="text-bottom">
                  <h5 class="mb-0">${c.name}</h5>
                  <span>${count} items</span>
                </div>
              </div>
            </article>
          </a>
            `;
  }
});
