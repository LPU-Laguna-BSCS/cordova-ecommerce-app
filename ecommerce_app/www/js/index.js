document.addEventListener("deviceready", onDeviceReady, false);

var db;
var storage = window.localStorage;

// var categoriesSTRING = JSON.stringify(categories);
// storage.setItem("categories", categoriesSTRING);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
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

  // var img = new Image();
  // img.src = "../img/logo.png";
  // document.getElementById("image-testing").appendChild(img);
  // alert("this ran");

  // db = window.sqlitePlugin.openDatabase(
  //   {
  //     name: "app.db",
  //     location: "default",
  //   },
  //   function (db) {
  //     db.transaction(
  //       function (tx) {
  //         // ...
  //       },
  //       function (err) {
  //         alert("Open database ERROR: " + JSON.stringify(err));
  //       }
  //     );
  //   }
  // );

  // fetchDatabase();
}

function fetchDatabase() {
  db.transaction(function (tr) {
    tr.executeSql("SELECT upper('Test string') AS upperString", [], function (
      tr,
      rs
    ) {
      alert("Got upperString result: " + rs.rows.item(0).upperString);
    });
  });
}
