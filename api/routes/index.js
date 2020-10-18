var express = require("express");
var request = require("request");
const fs = require("fs");
var path = require("path");
const { randomInt } = require("crypto");
var router = express.Router();

/*
 {
    "storeId1":[{item1}, {item2}]

 }


*/
// users[userId].carts[cartId].items.filter (function(e){
//   return itemId != e.itemID
// });

var storeIDs = [100, 200, 300];
// Yellow Jackets, Home Depot, Target Logo
var storeNames = ["Burdell's Boutique", "House Depot", "Bullseye"];
var itemNames = [
  "White Scarf",
  "Pink Dress",
  "Blue Necklace",
  "Sapphire Pearl",
  "Diamond Ring",
  "Wooden Chair",
  "Garden Hose",
  "Large Container",
  "Steel Grill",
  "Blue Paint Bucket",
  "Black Dress Shoes",
  "White Sneakers",
  "Blue Sweatpants",
  "Gray Shorts",
  "Yellow Jacket",
];

var itemPrices = [29.99, 79.99, 53.99, 119.99, 399.99, 24.99, 8.99, 16.99, 229.99, 21.99, 64.99, 74.99, 24.99, 19.99, 29.99]
var imageURLs = [
  "https://i.imgur.com/cfroVp9.png",
  "https://i.imgur.com/Gn08n71.jpg",
  "https://i.imgur.com/rywZ2D3.jpg",
  "https://i.imgur.com/1E1rRrX.jpg",
  "https://i.imgur.com/LxykNoG.jpg",

  "https://i.imgur.com/GvC2XNF.jpg",
  "https://i.imgur.com/wu0ZxrU.jpg",
  "https://i.imgur.com/8RRiUht.jpg",
  "https://i.imgur.com/akCUAjp.jpg",
  "https://i.imgur.com/ZfEnR9r.jpg",

  "https://i.imgur.com/jx6hPvO.jpg",
  "https://i.imgur.com/VWkfy7F.jpg",
  "https://i.imgur.com/xarfBgY.jpg",
  "https://i.imgur.com/9zeiCRi.jpg",
  "https://i.imgur.com/Hjzqvr8.jpg"

];

var storePfpURLs = ["https://i.imgur.com/71DpWsC.png", "https://i.imgur.com/rZkTOOJ.png", "https://i.imgur.com/XVBufQ6.jpg"]

var AllItemsAvailable = {};

let categoryrawdata = fs.readFileSync(
  path.resolve(__dirname, "./categories.json")
);
let itemtemplaterawdata = fs.readFileSync(
  path.resolve(__dirname, "./itemtemplate.json")
);

requestToNCRAPI(
  "PUT",
  "catalog/2/category-nodes/2/",
  function (res) {
    console.log("Created categories");
  },
  categoryrawdata
);

for (var i = 0; i < 3; i++) {
  var storeId = storeIDs[i];

  var items = [];
  for (var j = 0; j < 5; j++) {
    var itemId = i * 5 + j;
    var item = itemObject(
      itemId,
      itemNames[i * 5 + j],
      itemPrices[i * 5 + j],
      imageURLs[itemId],
      storeId,
      true
    );
    var itemTemplateCopy = (" " + itemtemplaterawdata).slice(1);
    var itemTemplateObj = JSON.parse(itemTemplateCopy);
    itemTemplateObj.packageIdentifiers[0].value = "" + itemId;
    itemTemplateObj.longDescription.values[0].value = "" + item.itemName;
    itemTemplateObj.shortDescription.values[0].value = "" + item.itemName;
    // TODO merchandise category?
    // console.log(JSON.stringify(itemTemplateObj, null, 2))
    requestToNCRAPI(
      "PUT",
      "catalog/2/items/2/" + itemId,
      function (res) {
        // console.log("Created item "+JSON.stringify(res))
      },
      JSON.stringify(itemTemplateObj)
    );

    items.push(item);
  }

  AllItemsAvailable[storeId] = items;
}

function getRandomExistingItem() {
  return AllItemsAvailable[storeIDs[getRandomInt(3)]][getRandomInt(5)];
}

function orderObject(orderId, items, deliveryDate) {
  return {
    id: orderId,
    items: items,
    deliveryDate: deliveryDate,
  };
}

function itemObject(itemId, name, price, pictureURL, cartId, isStocked) {
  return {
    id: itemId,
    itemName: name,
    price: price,
    pictureURL: pictureURL,
    cartId: cartId,
    isStocked: isStocked,
  };
}

function cartObject(cartId, items, pfpURL, storeName) {
  return { id: cartId, items: items, pfpURL: pfpURL, storeName: storeName};
}

function userObject(userId, carts, orders, promotions) {
  return { id: userId, carts: carts, orders: orders, promotions: promotions };
}

function promotionObject(promotionId, cartId, description, expiryDate) {
  return {
    id: promotionId,
    cartId: cartId,
    description: description,
    expiryDate: expiryDate,
  };
}

var carts = {};
for (var i = 0; i < 3; i++) {
  carts[storeIDs[i]] = cartObject(storeIDs[i], [], storePfpURLs[i], storeNames[i]);
}

var orders = [];
orders.push(orderObject(getRandomInt(100), [getRandomExistingItem(), getRandomExistingItem()], Math.round(randomDate(true) / 1000)));
orders.push(orderObject(getRandomInt(100), [getRandomExistingItem()], Math.round(randomDate(true) / 1000)));
orders.push(orderObject(getRandomInt(100), [getRandomExistingItem(), getRandomExistingItem(), getRandomExistingItem()], Math.round(randomDate(false) / 1000)));

// add items to user's carts at random
var duplicateCheck = [];
for (var i = 0; i < 12; i++) {
  var storeIndex = getRandomInt(3);
  var randomStore = storeIDs[storeIndex];
  var randomItem = getRandomExistingItem();

  var dC = "" + storeIndex + "" + randomItem;
  if (duplicateCheck.includes(randomItem.id) == false) {
    carts[randomStore].items.push(randomItem);
    duplicateCheck.push(randomItem.id);
  }
}

// function createRandomItem(){
//   var id = getRandomInt(1000);
//   var storeId = getRandomInt(5)
//   var item = itemObject(id, "Item "+id, getRandomInt(10), "http://pic.url", storeId, true)
//   carts[storeId].items.push(item)
//   return item
// }

// var items = []
// for(var i = 0; i < 10; i++){
//   items.push(createRandomItem())
// }

var promotions = [];
for (var i = 0; i < 5; i++) {
  var storeId = storeIDs[getRandomInt(3)];
  var promotion = promotionObject(
    getRandomInt(100),
    storeId,
    getRandomInt(30) + "% off",
    Math.round(randomDate() / 1000)
  );
  // if(promotions[storeId] == null){
  //   promotions[storeId] = []
  // }
  promotions /*[storeId]*/
    .push(promotion);
}

var user1 = userObject("1", carts, orders, promotions);
var users = {};
users["1"] = user1;

router.get("/carts/:userId", function (req, res, next) {
  // res.send(req.params);
  // res.send(user1.id);
  res.json({ carts: users[req.params.userId].carts });
});

router.get("/promotions/:userId", function (req, res, next) {
  // const userCarts = users[req.params.userId].carts;
  // allPromos = []
  // for(ct in userCarts){
  //   ctStore = ct.storeId;
  //   //given the store name, find all promotions\
  //   allPromos.push(promotions[ctStore]);
  // }
  res.json({ promotions: users[req.params.userId].promotions });
});

router.get("/orders/:userId", function (req, res, next) {
  const userOrders = users[req.params.userId].orders;
  // allOrders = []
  // for(order in userOrders){
  //   allOrders.push(order); // no processing needed
  // }
  res.json({ orders: userOrders });
});

// after confirm on frontend
router.post("/checkout", function (req, res, next) {
  var userID = req.body.userId;
  var itemIDs = req.body.items;
  console.log(JSON.stringify(req.body));

  var user = users[userID]; //users[key] lol
  if (user != null) {
    for (var i = 0; i < user.carts; i++) {
      user.carts[i].items.filter(function (e) {
        return !itemIDs.contains(e.id); //removing items to be checked out
      });
    }
  }

  createNewCart(function (newCartRes) {
    var newCartLocation = newCartRes.headers.location;
    console.log("NEW CART LOCATION: " + newCartLocation);
    var itemsAddedToCart = 0;
    for (var i = 0; i < itemIDs.length; i++) {
      addItemToCart(newCartLocation, itemIDs[i], function () {
        itemsAddedToCart += 1;

        if (itemsAddedToCart == itemIDs.length) {
          // all items added to cart
          // PATCH - Update Cart Status - Total (body has status: total)
          console.log("run total patch");
          var totalBody = {
            status: "Total",
          };
          requestToNCRAPI(
            "PATCH",
            "emerald/selling-service/v1" + newCartLocation,
            function () {
              // PATCH - Update Cart Status - Tender (body has status: tender)
              console.log("run tender patch");
              var tenderBody = {
                status: "Tender",
              };
              requestToNCRAPI(
                "PATCH",
                "emerald/selling-service/v1" + newCartLocation,
                function () {
                  console.log("run get balance");
                  // get balance due
                  requestToNCRAPI(
                    "GET",
                    "emerald/selling-service/v1" + newCartLocation,
                    function (balanceResponse) {
                      var balanceDue = JSON.parse(balanceResponse.body).totals
                        .balanceDue;

                      var postTenderBody = {
                        tenderId: "2",
                        amount: balanceDue,
                        status: "authorized",
                        authorization: {
                          authorizationType: "local",
                          authorizationCode: "OK200",
                          referenceNumber: "36787687687",
                        },
                      };

                      // POST - Add Tender (VISA)
                      var addTenderPath =
                        "emerald/selling-service/v1" +
                        newCartLocation +
                        "/tenders";
                      console.log("run add tender: " + addTenderPath);
                      requestToNCRAPI(
                        "POST",
                        addTenderPath,
                        function (postTenderResponse) {
                          var finalBody = {
                            status: "Finalization",
                          };
                          requestToNCRAPI(
                            "PATCH",
                            addTenderPath,
                            function (postTenderResponse) {
                              console.log("run closed patch");
                              var closedBody = {
                                status: "Closed",
                              };
                              requestToNCRAPI(
                                "PATCH",
                                "emerald/selling-service/v1" + newCartLocation,
                                function () {
                                  // cart is now closed
                                  requestToNCRAPI(
                                    "DELETE",
                                    "emerald/selling-service/v1" +
                                      newCartLocation,
                                    function () {
                                      //deleted.

                                    }
                                  );
                                },
                                JSON.stringify(closedBody)
                              );
                            },
                            JSON.stringify(finalBody)
                          );
                          res.json({ res: postTenderResponse });
                        },
                        JSON.stringify(postTenderBody)
                      );
                    }
                  );
                },
                JSON.stringify(tenderBody)
              );
            },
            JSON.stringify(totalBody)
          );
        }
      });
    }
  });
});

// /PUT addItem(storeID, itemID, userID)
router.put("/addItem", function (req, res, next) {
  console.log(req.body);
  var cartId = req.body.cartId;
  var userId = req.body.userId;
  var itemId = req.body.itemId;
  //should price be an input?

  var store = AllItemsAvailable[cartId];
  if (store != null) {
    // TODO this only works bc the itemIDs correspond to array indicies
    if (itemId > 0 && itemId < AllItemsAvailable[cartId].length) {
      var item = AllItemsAvailable[cartId][itemId];
      users[userId].carts[cartId].items.push(item);
    }
  } else {
    console.log("STORE NULL");
  }
  // items.push(newItem);
  res.json({ carts: users[userId].carts });
});

// /PUT addItem(storeID, itemID, userID)
router.put("/removeItem", function (req, res, next) {
  var cartId = req.body.cartId;
  var userId = req.body.userId;
  var itemId = req.body.itemId;
  //should price be an input?

  //itemObject(itemId, name, price, pictureURL, storeId, isStocked)
  if (users[userId] != null) {
    removeItemFromUserCart(userId, cartId, itemId);
  }
  // items.push(newItem);
  res.json({ carts: users[userId].carts });
});

router.get("/getCart/:cartId", function (req, res, next) {
  requestToNCRAPI(
    "GET",
    "emerald/selling-service/v1/carts/" + req.params.cartId,
    function (cartRes) {
      res.json({ cart: cartRes });
    }
  );
});

function removeItemFromUserCart(userId, cartId, itemId) {
  users[userId].carts[cartId].items = users[userId].carts[cartId].items.filter(
    function (e) {
      return itemId != e.id;
    }
  );
  users[userId].carts[cartId].items = newItems;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createNewCart(callback) {
  requestToNCRAPI("POST", "emerald/selling-service/v1/carts", callback);
}

function addItemToCart(cartLocation, itemID, callback) {
  console.log("ADD ITEM " + itemID);
  var body = {
    scanData: itemID,
    quantity: {
      unitOfMeasure: "EA",
      value: 1,
    },
  };
  requestToNCRAPI(
    "POST",
    "emerald/selling-service/v1" + cartLocation,
    callback,
    JSON.stringify(body)
  );
}

function requestToNCRAPI(method, endpoint, completion, postBody) {
  var username = "241497cc-e915-4366-a079-a256175b95a6";
  var password = "Satvik321!";
  var auth =
    "Basic " + Buffer.from(username + ":" + password).toString("base64");

  // var day = dateFormat(new Date(), "ddd, d mmm yyyy HH:MM:ss");

  var options = {
    method: method,
    url: "https://gateway-staging.ncrcloud.com/" + endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth, //'AccessKey 4f3c6a1cd2e5471aa4eb0add352c434e:Hg8EFh1v4rztvSrCvSb5tYKBnDekyEW+AX5Pd4uxftvdILWLmSBcy8wjf80o8wyr+mRcUYSG71o7x0vwRz7l0w==',
      "nep-organization": "6df906a55b2d469fafe15f8c1db16d63",
      "nep-enterprise-unit": "ffdd296de1c5441994c8788c0b3b3bcf",
      Date: "Sun, 18 Oct 2020 07:09:40 GMT", // TODO
    },
  };
  if (
    (method == "POST" || method == "PATCH" || method == "PUT") &&
    postBody != null
  ) {
    options.body = postBody;
  }
  request(options, function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
    completion(response);
  });
}

// get a random date up to 10 days in the future
function randomDate(future) {
  var end = new Date(
    Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10
  );
  var start = new Date();
  return new Date(
    start.getTime() + (Math.random() * (end.getTime() - start.getTime())*(future == true ? 1 : -1))
  );
}

module.exports = router;
