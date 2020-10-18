var express = require("express");
var request = require('request');
var router = express.Router();

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
  carts[storeNum].items.push(item)
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

router.post("/checkout", function (req, res, next) {
  var userID = req.body.userId
  var itemIDs = req.body.items
  
  for (var key in users) {
    // check if the property/key is defined in the object itself, not in parent
    if (users.hasOwnProperty(key)) {           
      var user = users[key]
      if(key == userID){
        for(var i = 0; i < user.carts; i++){
          user.carts[i].items.filter(function (e){
            return !itemIDs.contains(e.id)
          })
        }
      }
    }
  }

  res.json({ test: "test3" });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function requestToNCRAPI(method, endpoint, completion){
  var options = {
    'method': method,
    'url': 'https://gateway-staging.ncrcloud.com/'+endpoint,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'AccessKey 4f3c6a1cd2e5471aa4eb0add352c434e:sp8QfFgn/jNqHOs98sC2f4BQk2cXaJUIVl30p6SuwYR+usxQ+XnGpeP1ga7bx3idxLKcHyyzX/v5p0fEhS04gA==',
      'nep-organization': '6df906a55b2d469fafe15f8c1db16d63',
      'nep-enterprise-unit': 'ffdd296de1c5441994c8788c0b3b3bcf',
      'Date': 'Sat, 17 Oct 2020 22:19:50 GMT' // TODO
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    completion(body.completion)
  });
}



module.exports = router;
