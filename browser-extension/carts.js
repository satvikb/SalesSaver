

function getCarts() {
  var xhttp = new XMLHttpRequest();
  cart_url = "http://localhost:3000/carts/1"
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

document.getElementsByClassName("remove-cart")[0].addEventListener("click", function() {


  items = document.getElementsByClassName("cart-item")
  console.log(items.length)
  text = ""
  Array.prototype.forEach.call(items, function (item) {
    checkbox = item.getElementsByTagName("input")[0]
    if(checkbox.checked){
      console.log("CHECKED "+item.getAttribute("name"))
    }
    //need to make a call to backend here
    text += item.getAttribute("name")
    console.log(item.getAttribute("name"), item.getAttribute("price"))
  });

  console.log("text is", text)
  document.getElementById("remove-items-list").innerHTML = text



  console.log("clicked the button :)", )
});


document.getElementsByClassName("checkout-cart")[0].addEventListener("click", function() {


  items = document.getElementsByClassName("cart-item")

  text = ""
  Array.prototype.forEach.call(items, function (item) {
    //need to make a call to backend here
    text += item.getAttribute("name")
    console.log(item.getAttribute("name"), item.getAttribute("price"))

  });

  console.log("text is", text)
  document.getElementById("checkout-items-list").innerHTML = text



  console.log("clicked the button :)", )
});

// TODO come back and fix this, needs to distribute items among store names
document.addEventListener(
  "DOMContentLoaded",
  function () {

    carts = getCarts()
    console.log(carts.carts)

    function addItemToDoc(item) {
      // var macys_div = document.getElementsByClassName("all-carts")[0]
      // var macys_div = document.getElementById("Macys")
      var macys_div = document.getElementById("all-carts")
      console.log(macys_div)
      console.log("getting here items")
      console.log(item)
      // macys_div.innerHTML +=
      // `
      //   <button class="accordion">${item.storeName}</button>
      //   <div class="accordion-panel">
      //     <div class="accordion-content cart-item" name="" price="">
      //     fuck

      //       <div class="item-select squaredFour">
      //         <input type="checkbox" value="None" id="squaredFour" name="check" />
      //         <label for="squaredFour"></label>
      //       </div>
      //       <img class="item-icon" src=""></img>
      //       <p class="item-name"></p>
      //       <p class="item-price"><span class="old-price">$</span> $</p>
      //       <!-- make this part below a grid prob -->
      //       <button class="buy-now-button">Buy Now</button>
      //     </div>
      //   </div>


      // `
      // macys_div.innerHTML += `<button class="accordion">Hollister</button>
      // <div class="accordion-panel">
      //   <div class=accordion-content>
      //     <!-- add select button -->
      //     <div class="item-select squaredFour">
      //       <input type="checkbox" value="None" id="squaredFour" name="check" />
      //       <label for="squaredFour"></label>
      //     </div>
      //     <!-- add icon -->
      //     <div class="item-icon"></div>
      //     <p class="item-name">Lercitation ullamco la</p>
      //     <p class="item-price"><span class="old-price">$9.99</span> $5.00</p>
      //     <!-- make this part below a grid prob -->
      //     <button class="buy-now-button">Buy Now</button>
      //   </div>
      // </div>`
      s = ""
      s += `

            <button class="accordion active">${item.storeName}</button>
            <div class="accordion-panel" style='display: block'>`
      // macys_div.innerHTML += getThings(item.items)
      console.log(item.items, item.items.length)
      for (j = 0; j < item.items.length; j++) {
        console.log(item.items[j])
        s += `
        <div class=accordion-content>
          <div class="item-select squaredFour">
            <input type="checkbox" value="None" id="squaredFour" name="check" />
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
  },
  false
);



function addItemToDoc(item) {
  // var macys_div = document.getElementsByClassName("all-carts")[0]
  // var macys_div = document.getElementById("Macys")
  var macys_div = document.getElementById("all-carts")

  s = ""
  s += `

        <button class="accordion">${item.storeName}</button>
        <div class="accordion-panel">`
  // macys_div.innerHTML += getThings(item.items)
  console.log(item.items, item.items.length)
  for (j = 0; j < item.items.length; j++) {
    console.log(item.items[j])
    s += `
    <div class=accordion-content>
      <div class="item-select squaredFour">
        <input type="checkbox" value="None" id="squaredFour" name="check" />
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
