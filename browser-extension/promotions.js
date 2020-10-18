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

function addPromotionToDoc(ps, carts) {
  for (i = 0; i < ps.length; i++) {

    var utcSeconds = 1234567890;

    var promos_div = document.getElementById("promotions")
    promos_div.innerHTML += `<div class='item' style='display: flex; flex-direction: row; flex-flow: space-between'>
        <!-- should change to not a flexbox but im bad at css :] -->
        <header class='profile-details-icon'>
          <div>
            <img
              src=${carts.carts[ps[i].cartId].pfpURL}
              alt='' class='profile-img' />
          </div>
        </header> <div>
          <span class='item-label'>${ps[i].description}</span>
          <h3 class='item-msg'>${carts.carts[ps[i].cartId].storeName}</h3>
          <h4 class='item-msg'>${(new Date(parseInt(ps[i].expiryDate) * 1000)).toISOString().substring(0, 10)}</h4>
        </div>
      </div>`

  }

}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    url = "http://localhost:3000/promotions/1"
    // fecth(url)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        res = JSON.parse(xhttp.responseText);
        // document.getElementById("demo").innerHTML = xhttp.responseText;
        ps = res.promotions
        carts = getCarts()

        addPromotionToDoc(ps, carts)

        // res.promotions.forEach(p => addPromotionToDoc(p))
      }
    };
    xhttp.open("GET", url, false);
    xhttp.send();
  },
  false
);
