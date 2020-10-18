function refreshCarts() {
  carts = getCarts()
  console.log(carts.carts)



  var macys_div = document.getElementById("all-carts")
  macys_div.innerHTML = ""
  Object.values(carts.carts).forEach(item => addItemToDoc(item))
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

function getCarts() {
  var xhttp = new XMLHttpRequest();
  cart_url = "http://localhost:3000/carts/1"
  a =
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        res = JSON.parse(xhttp.responseText);
        a = res
      }
    }
  xhttp.open("GET", cart_url, false);
  xhttp.send();
  return a;

}

function postCheckout(body) {
  var xhttp = new XMLHttpRequest();

  cart_url = "http://localhost:3000/checkout"
  // a =
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //       // Typical action to be performed when the document is ready:
  //       res = JSON.parse(xhttp.responseText);
  //       a = res
  //     }
  //   }

  xhttp.open("POST", cart_url, false);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.onload = function (e) {
    if (xhttp.readyState === 4) {
      refreshCarts()
      console.log("tried refreshing")
    }
  };

  xhttp.send(JSON.stringify(body));
  return a;




//   26

// var xhr = new XMLHttpRequest();
//    xhr.open(method, url);
//    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
//    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//    xhr.onload = requestComplete;
//    xhr.send(JSON.stringify(params));
}

document.getElementsByClassName("remove-cart")[0].addEventListener("click", function () {


  items = document.getElementsByClassName("cart-item")
  console.log(items.length)
  text = ""
  Array.prototype.forEach.call(items, function (item) {
    checkbox = item.getElementsByTagName("input")[0]
    if (checkbox.checked) {
      console.log("CHECKED " + item.getAttribute("name"))
    }
    //need to make a call to backend here
    text += item.getAttribute("name")
    console.log(item.getAttribute("name"), item.getAttribute("price"))
  });

  console.log("text is", text)
  document.getElementById("remove-items-list").innerHTML = text



  console.log("clicked the button :)",)
});


document.getElementsByClassName("checkout-cart")[0].addEventListener("click", function () {


  items = document.getElementsByClassName("cart-item")

  var boxes = document.querySelectorAll('.checkboxxx')

  
  console.log(boxes)
  body = {
    "userId": "1",
    "items":[]
}
  for (i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      body.items.push(boxes[i].getAttribute("itemid"))
    }
  }
  console.log(body)


  // text = ""
  // Array.prototype.forEach.call(boxes, function (box) {
  //   //need to make a call to backend here
  //   text += item.getAttribute("name")
  //   console.log(item.getAttribute("name"), item.getAttribute("price"))

  // });
  
  if (body.items.length !== 0) {
    document.getElementById("checkout-items-list").innerHTML = `Just checked out with (${body.items.length}) items. See Orders for more.`
    postCheckout(body)
  }


  console.log("clicked the button :)",)
});

// TODO come back and fix this, needs to distribute items among store names
document.addEventListener(
  "DOMContentLoaded",
    function() {
      // do whatever you like here
      refreshCarts()
      
    
    
    
  }
  ,
  false
);



function addItemToDoc(item) {
  // var macys_div = document.getElementsByClassName("all-carts")[0]
  // var macys_div = document.getElementById("Macys")
  var macys_div = document.getElementById("all-carts")

  s = ""

  s += `

        <button class="accordion" active>${item.storeName}</button>
        <div class="accordion-panel" style='display: block'>`
  // macys_div.innerHTML += getThings(item.items)
  console.log(item.items, item.items.length)
  for (j = 0; j < item.items.length; j++) {
    console.log(item.items[j])
    s += `
    <div class=accordion-content>
      <div class="item-select squaredFour">
        <input type="checkbox" value="None" id="squaredFour" class="checkboxxx" itemid="${item.items[j].id}" name="check" />
        <label for="squaredFour"></label>
      </div>
    <!-- add icon -->
      <img src="${item.items[j].pictureURL}" class="item-icon"/>
      <p class="item-name">${item.items[j].itemName}</p>
      <p class="item-price">$${item.items[j].price}</p>
    <!-- make this part below a grid prob -->
      <button class="buy-now-button">Buy Now</button>
    </div>`
  }

  s += `</div>`
  macys_div.innerHTML += s;
  console.log(macys_div.innerHTML)
}



