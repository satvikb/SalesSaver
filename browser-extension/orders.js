
function getOrders() {
  var xhttp = new XMLHttpRequest();
  cart_url = "http://localhost:3000/orders/1"
  a = 
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      res = JSON.parse(xhttp.responseText);
      a =  res
    }
  }
  xhttp.open("GET", cart_url, false);
  xhttp.send();
  return a;

}

function addOrderToDoc(p) {
  c = getCarts()
  for (i = 0; i < p.length; i++) {
    orderDate = new Date(parseInt(p[i].deliveryDate) * 1000)

    var div_to_insert;
    console.log(p[i].deliveryDate * 1000, Date.now())
    if (p[i].deliveryDate * 1000 < Date.now()) {
      div_to_insert = document.getElementById("delivered-orders")
    } else {
      div_to_insert = document.getElementById("scheduled-orders")
    }

    // s = ''
    for (j = 0; j < p[i].items.length; j++) {
      div_to_insert.innerHTML += `<div class='item' style='display: flex; flex-direction: row; flex-flow: space-between'>
      <!-- should change to not a flexbox but im bad at css :] -->
      <header class='profile-details'>
        <div class='profile-details-icon'>
          <img
            src=${p[i].items[j].pictureURL}
            alt='' class='profile-img' />
        </div>
      </header> <div class='profile-details-info'>
        <span class='item-label'>${p[i].items[j].itemName}</span>
        <h3 class='item-msg'>${carts.carts[p[i].items[j].cartId].storeName}</h3>
        <h3 class='item-msg'>Delivery Date: ${orderDate.toISOString().substring(0, 10)}</h3>
        <h3 class='item-msg'>$${p[i].items[j].price}</h3>
      </div>
    </div>`
    }
    
  }


}


document.addEventListener(
    "DOMContentLoaded",
    function () {

      var o = getOrders()




      console.log(o)
      addOrderToDoc(o.orders)











      // var orders = {
      //   "orders": [
      //     {
      //       "delivery_date": "9/19/20 at 2:30PM EST",
      //       "name": "Hoodies",
      //       "img_src": "data:image/jpeg;base64,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",
      //       "sold_by": "Macy's",
      //       "isDelivered": true,
      //     },
      //     {
      //       "delivery_date": "11/01/20 at 5:30PM EST",
      //       "name": "iPhone 12",
      //       "img_src": "https://media-exp1.licdn.com/dms/image/C560BAQHdAaarsO-eyA/company-logo_200_200/0?e=2159024400&v=beta&t=kOHl5gS-Y5YFdE8_rpf_zMOvO8Op1fX0xwguWgP1M5Y",
      //       "sold_by": "Apple",
      //       "isDelivered": false,
      //     }
      //   ]
      // }
  
      // console.log(orders, orders.orders[0].name)
  
      
      // orders.orders.forEach(p => addOrderToDoc(p))
    },
    false
  );
  