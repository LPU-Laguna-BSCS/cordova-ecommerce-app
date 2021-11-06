document.addEventListener("DOMContentLoaded", function () {
  var storage = window.localStorage;

  var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
  var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
  var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
  var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
  var categories_productFromLocalStorage = JSON.parse(
    storage.getItem("categories_product")
  );

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

  var id = parseInt(location.href.split("=")[1]);
  var categoryData;
  var categoryItems = [];

  for (const category of categoriesFromLocalStorage) {
    if (category.id == id) {
      categoryData = category;
    }
  }

  for (const item of data) {
    if (item.categories.indexOf(categoryData.name) > -1) {
      categoryItems.push(item);
    }
  }

  var category_title = document.getElementById("category-title");
  category_title.innerHTML = categoryData.name;

  try {
    var category_list_section = document.getElementById(
      "category-list-section"
    );
    for (const c of categoriesFromLocalStorage) {
      category_list_section.innerHTML =
        category_list_section.innerHTML +
        `
          <div class="item-xs">
            <a href="category-detail.html?id=${c.id}" class="item-category-sm">
              <div class="icon-wrap bg-primary-dark shadow-sm">
                <img
                  class="icon"
                  src="${c.icon}"
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
    var product_list_section = document.getElementById("product-list-section");
    for (const c of categoryItems) {
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
              <p class="title">${c.name.slice(0, 80)}</p>
              <div class="price mb-2">P${c.price}</div>
              <div>
                <a href="#" class="btn btn-sm btn-light"> Add to cart </a>
                <a href="#" class="btn btn-icon btn-sm btn-light">
                  <i class="material-icons md-favorite_border"></i>
                </a>
              </div>
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
