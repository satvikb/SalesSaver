var express = require("express");
var request = require('request');
var router = express.Router();

var AllItemsAvailable = []

function orderObject(orderId, items, deliveryDate, storeName){
  return {"id": orderId, "items": items, "storeName": storeName, "deliveryDate":deliveryDate}
}

function itemObject(itemId, name, price, pictureURL, storeName, isStocked){
  return {"id": itemId, "itemName": name, "price": price, "pictureURL": pictureURL, "storeName": storeName, "isStocked":isStocked}
}

function cartObject(cartId, storeName, items){
  return {"id": cartId, "storeName": storeName, "items":items}
}

function userObject(userId, carts, orders){
  return {"id": userId, "carts": carts, "orders": orders}
}

function promotionObject(promotionId, storeName, description, expiryDate){
  return {"id": promotionId, "storeName": storeName, "description": description, "expiryDate": expiryDate}
}


var carts = []
function createCart(storeName){
  carts.push(cartObject(getRandomInt(1000), storeName, []))
}
for(var i = 0; i < 5; i++){
  createCart(i)
}

var orders = []
function createOrder(storeName){
  // TODO: orders should be from existing items in carts
  orders.push(orderObject(getRandomInt(1000), [createRandomItem(), createRandomItem()], "Date", storeName))
}
for(var i = 0; i < 3; i++){
  createOrder(i)
}

function createRandomItem(){
  var id = getRandomInt(1000);
  var storeNum = getRandomInt(5)
  var item = itemObject(id, "Item "+id, getRandomInt(10), "http://pic.url", "Example store "+storeNum, true)
  carts[""+storeNum].items.push(item)
  return item
}

var items = []
for(var i = 0; i < 10; i++){
  items.push(createRandomItem())
}

var promotions = {}
for(var i = 0; i < 5; i++){
  var storeNum = getRandomInt(5)
  var storeName = "Example store "+storeNum
  var promotion = promotionObject(getRandomInt(1000), storeName, getRandomInt(30)+"% off", "Date")
  if(promotions[storeName] == null){
    promotions[storeName] = []
  }
  promotions[storeName].push(promotion)
}

var user1 = userObject("1", carts, orders)
var users = {}
users["1"] = user1


router.get("/carts/:userId", function (req, res, next) {
  // res.send(req.params);
  // res.send(user1.id);
  res.json({ carts: users[req.params.userId].carts });
});

router.get("/promotions/:userId", function (req, res, next) {
  const userCarts = users[req.params.userId].carts;
  allPromos = []
  for(ct in userCarts){
    ctStore = ct.storeName;
    //given the store name, find all promotions\
    allPromos.push(promotions[ctStore]);
  }
  res.json({ promotions: allPromos });
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
  var userID = req.body.userId
  var itemIDs = req.body.items
  console.log(JSON.stringify(req.body))

  var user = users[userID] //users[key] lol
  if(user != null){
    for(var i = 0; i < user.carts; i++){
      user.carts[i].items.filter(function (e){
        return !itemIDs.contains(e.id) //removing items to be checked out
      })
    }
  }


  createNewCart(function(newCartRes){
    var newCartLocation = newCartRes.headers.location;
    console.log("NEW CART LOCATION: "+newCartLocation)
    var itemsAddedToCart = 0
    for(var i = 0; i < itemIDs.length; i++){
      addItemToCart(newCartLocation, itemIDs[i], function(){
        itemsAddedToCart += 1

        if(itemsAddedToCart == itemIDs.length){
          // all items added to cart
          // PATCH - Update Cart Status - Total (body has status: total)
          console.log("run total patch");
          var totalBody = {
            "status": "Total"
          }
          requestToNCRAPI("PATCH", "emerald/selling-service/v1"+newCartLocation, function(){
            // PATCH - Update Cart Status - Tender (body has status: tender)
            console.log("run tender patch");
            var tenderBody = {
              "status": "Tender"
            }
            requestToNCRAPI("PATCH", "emerald/selling-service/v1"+newCartLocation, function(){
              console.log("run get balance");
              // get balance due
              requestToNCRAPI("GET", "emerald/selling-service/v1"+newCartLocation, function(balanceResponse){
                var balanceDue = JSON.parse(balanceResponse.body).totals.balanceDue;

                var postTenderBody = {
                  "tenderId": "2",
                  "amount": balanceDue,
                  "status": "authorized",
                  "authorization": {
                    "authorizationType": "local",
                    "authorizationCode": "OK200",
                    "referenceNumber": "36787687687"
                  }
                }

                // POST - Add Tender (VISA)
                var addTenderPath =  "emerald/selling-service/v1"+newCartLocation+"/tenders"
                console.log("run add tender: "+addTenderPath);
                requestToNCRAPI("POST", addTenderPath, function(postTenderResponse){
                  var finalBody = {
                    "status": "Finalization"
                  }
                  requestToNCRAPI("PATCH", addTenderPath, function(postTenderResponse){
                    
                    console.log("run closed patch");
                    var closedBody = {
                      "status": "Closed"
                    }
                    requestToNCRAPI("PATCH", "emerald/selling-service/v1"+newCartLocation, function(){
                      // cart is now closed
                      requestToNCRAPI("DELETE", "emerald/selling-service/v1"+newCartLocation, function(){
                        //deleted.
                      });
                    }, JSON.stringify(closedBody));
                    
                  }, JSON.stringify(finalBody))
                  res.json({ "res": postTenderResponse });

                }, JSON.stringify(postTenderBody))
              })
            }, JSON.stringify(tenderBody))
          }, JSON.stringify(totalBody))
        }
      })
    }
    
  })

  // res.json({ test: "test3" });
});


// /PUT addItem(storeID, itemID, userID)
router.put("/addItem", function (req, res, next) {
  var cartId = req.body.cartId
  var userId = req.body.userId
  var itemId = req.body.itemId
  //should price be an input?

  //itemObject(itemId, name, price, pictureURL, storeName, isStocked)
  newItem = itemObject(itemId, "Item "+itemId, getRandomInt(10), "http://pic.url", cartId, true);
  users[userId].carts[cartId].items.push(newItem);
  // items.push(newItem);
  res.json({ "userItems": (users[userId].carts[cartId].items) });
});

// /PUT addItem(storeID, itemID, userID)
router.put("/removeItem", function (req, res, next) {
  var cartId = req.body.cartId
  var userId = req.body.userId
  var itemId = req.body.itemId
  //should price be an input?

  //itemObject(itemId, name, price, pictureURL, storeName, isStocked)
  users[userId].carts[cartId].items.filter (function(e){
    return itemId != e.itemID
  });
  // items.push(newItem);
  res.json({ "userItems": (users[userId].carts[cartId].items) });
});

router.get("/getCart/:cartId", function (req, res, next) {
  requestToNCRAPI("GET", "emerald/selling-service/v1/carts/"+req.params.cartId, function(cartRes){
    res.json({ cart: cartRes });
  })
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createNewCart(callback){
  requestToNCRAPI("POST", "emerald/selling-service/v1/carts", callback)
}

function addItemToCart(cartLocation, itemID, callback){
  console.log("ADD ITEM "+itemID)
  var body = {
    "scanData": itemID,
    "quantity": {
      "unitOfMeasure":"EA",
      "value": 1
    }
  }
  requestToNCRAPI("POST", "emerald/selling-service/v1"+cartLocation, callback, JSON.stringify(body))
}

// var raw = JSON.stringify({"scanData":"101","quantity":{"unitOfMeasure":"EA","value":1}});

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://gateway-staging.ncrcloud.com/emerald/selling-service/v1/carts/{{cart-id}}/items", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

function requestToNCRAPI(method, endpoint, completion, postBody){
  var username = '241497cc-e915-4366-a079-a256175b95a6';
  var password = 'Satvik321!';
  var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  // var day = dateFormat(new Date(), "ddd, d mmm yyyy HH:MM:ss");

  var options = {
    'method': method,
    'url': 'https://gateway-staging.ncrcloud.com/'+endpoint,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': auth,//'AccessKey 4f3c6a1cd2e5471aa4eb0add352c434e:Hg8EFh1v4rztvSrCvSb5tYKBnDekyEW+AX5Pd4uxftvdILWLmSBcy8wjf80o8wyr+mRcUYSG71o7x0vwRz7l0w==',
      'nep-organization': '6df906a55b2d469fafe15f8c1db16d63',
      'nep-enterprise-unit': 'ffdd296de1c5441994c8788c0b3b3bcf',
      'Date': 'Sun, 18 Oct 2020 03:25:09 GMT' // TODO
    },
  };
  if((method == "POST" || method == "PATCH") && postBody != null){
    options.body = postBody
  }
  request(options, function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
    completion(response)
  });
}



module.exports = router;
