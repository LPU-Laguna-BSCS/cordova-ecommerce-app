document.addEventListener("deviceready", onDeviceReady, false);

var storage = window.localStorage;

// var selectedProduct, signedInAccount,
var loggedInUser;

// var categoriesSTRING = JSON.stringify(categories);
// storage.setItem("categories", categoriesSTRING);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  // checkLocalStorage();

  // try {
  //   loggedInUser = storage.getItem("loggedInUser");
  //   alert(JSON.stringify(loggedInUser));
  // } catch (e) {
  //   alert(e);
  // }

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
      var prices = [];
      var images = [];
      var categories = [];

      for (const s of skusFromLocalStorage) {
        if (s.product_id == id) {
          prices.push(s.price);
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
        price: Math.min(...prices),
        image: images[0],
        categories: categories,
      };

      data.push(d);
    }
  } catch (e) {
    alert(e);
  }

  // alert(JSON.stringify(data[0]));

  try {
    var category_section = document.getElementById("category_section");
    for (const c of categoriesFromLocalStorage) {
      if (c.name != "New Arrivals" && c.name != "Best Sellers") {
        category_section.innerHTML =
          category_section.innerHTML +
          `
          <li class="col-4">
            <a href="#" class="item-category-grid">
              <span class="icon-wrap">
                <img
                  class="icon"
                  height="32"
                  src="images/icons/category-blue/shirt.svg"
                  alt=""
                />
              </span>
              <small class="text">${c.name}</small>
            </a>
        `;
      }
    }
  } catch (e) {
    alert(e);
  }

  try {
    var new_arrival_section = document.getElementById("new-arrival");
    for (const d of data) {
      var c = d.categories;
      if (c.indexOf("New Arrivals") > -1) {
        new_arrival_section.innerHTML =
          new_arrival_section.innerHTML +
          `
        <div class="item">
            <a href="product-detail.html" class="product">
                <div class="img-wrap"><img src="${d.image}" /></div>
                <div class="text-wrap">
                    <div class="price">P${d.price}</div>
                    <p class="title">${d.name.slice(0, 80)}...</p>
                </div>
            </a>
        </div>
        `;
      }
    }
  } catch (e) {
    alert(e);
  }

  try {
    var best_seller_section = document.getElementById("best-sellers");
    for (const d of data) {
      var c = d.categories;
      if (c.indexOf("Best Sellers") > -1) {
        best_seller_section.innerHTML =
          best_seller_section.innerHTML +
          `
        <div class="item">
            <a href="product-detail.html" class="product">
                <div class="img-wrap"><img src="${d.image}" /></div>
                <div class="text-wrap">
                    <div class="price">P${d.price}</div>
                    <p class="title">${d.name.slice(0, 80)}...</p>
                </div>
            </a>
        </div>
        `;
      }
    }
  } catch (e) {
    alert(e);
  }

  // var img = new Image();
  // img.src =
  //   "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png";
  // document.getElementById("image-testing").appendChild(img);
  // alert("this ran");
}

function checkLocalStorage() {
  try {
    var productsFromLocalStorage = JSON.parse(storage.getItem("products"));
    alert(JSON.stringify(productsFromLocalStorage[0]));

    var skusFromLocalStorage = JSON.parse(storage.getItem("skus"));
    alert(JSON.stringify(skusFromLocalStorage[0]));

    var imagesFromLocalStorage = JSON.parse(storage.getItem("images"));
    alert(JSON.stringify(imagesFromLocalStorage[0]));

    var categoriesFromLocalStorage = JSON.parse(storage.getItem("categories"));
    alert(JSON.stringify(categoriesFromLocalStorage[0]));

    var categories_productFromLocalStorage = JSON.parse(
      storage.getItem("categories_product")
    );
    alert(JSON.stringify(categories_productFromLocalStorage[0]));

    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));
    alert(JSON.stringify(accountsFromLocalStorage[0]));

    var addressesFromLocalStorage = JSON.parse(storage.getItem("addresses"));
    alert(JSON.stringify(addressesFromLocalStorage[0]));

    var paymentsFromLocalStorage = JSON.parse(storage.getItem("payments"));
    alert(JSON.stringify(paymentsFromLocalStorage[0]));
  } catch (e) {
    alert(e);
  }
}
