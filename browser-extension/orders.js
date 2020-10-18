
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
  document.getElementById("delivered-orders").innerHTML = ""
  document.getElementById("scheduled-orders").innerHTML = ""

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
    refreshOrders,
    false
  );
  
  function refreshOrders() {

      var o = getOrders()




      console.log(o)
      addOrderToDoc(o.orders)








  }
  function yourFunction2(){
    // do whatever you like here
  
    setTimeout(refreshOrders(), 1000);
  }
  
  yourFunction2();