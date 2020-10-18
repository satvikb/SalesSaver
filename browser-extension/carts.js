

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

  text = ""
  Array.prototype.forEach.call(items, function (item) {
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



    var macys_items = {
      "items": [
        {
          "store": "Macys",
          "name": "Red cotton hoodie",
          "old_price": 9.99,
          "new_price": 5,
          "img_src": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRcXFRUXFxUVFRcVFRcWFxUVFxUYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0eHR8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0rLS0rLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIDBAcFBgj/xABAEAACAQICBQgHBwMDBQAAAAAAAQIDEQQFBhIhMYEHEyJBUXFykVRhgqGisdIUMkJSkrLBI2LCFkTRJCVDY3P/xAAaAQEBAAMBAQAAAAAAAAAAAAAAAQIDBAYF/8QANBEBAAIBAgMFBAsAAwEAAAAAAAECAwQRBRIxIUFRcdETYaGxFSIyQlJTgZHB4fA0Q/Fi/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPl9KtM6GFi4wlGpW3KCd1H1za3d2/wCZrvkivTq+jo+G5M872ia18fR8xkfKbLXtiopwf4oJpx7436S9/ea65p730tRwSOXfDPb4T3uh5bmtDER1qNWFRf2tNrvW9cTfFonpL4OXBkxTtesw3CtQAAAYMXi6dKLnUnGEVvlJqK82SZiOrKlLXnlrG8+58DpFylwi9TCRU311Zp6vsx2N97txNNsv4X29LwW1vrZp290PQ0X5QKNdamIcaVTqd7U5dzf3X6n5mVMu/Vo1fCsmL62P61fi+0TNr5KQAAAAAAAAAAAAAAAAABrZhjqdCnKrVkoQirtv5Jdb9SJMxHbLZixXy2ilI3mXHtLNPq2Jbp0b0qO6ydpzXbKS3L+1cbnPfJM9HqtDwimKItk+tb4R5er47WNb7UVRci8q9OtKLUotxa3NNprua2lYWxxbsmHrUNKsbBWji6vGbl+65eafFy24dp7dccfs2oacZgv91LjGm/nEvPbxap4TpZ/6/n6qz03zCW/Ez4KC/bEc9vFY4VpY/wCuPj6tStpNjJb8VW4VJr5MnNPi214fgr0xx+0PNr15TetOTk+2Tcn5sjorirWNojZVSXWGfKqmE5X1OimmlfBtRu6lHrpye5dsH+Hu3fMzreavma3hePURvH1bePq7Hkmc0cXTVWjK63NPZKL/ACyXUzoraJjeHktRp8mC/Jkjafm9AyaAAAAAAAAAAAAAAADFisTCnCVSclGME5Sb3JLeJnZlStr2itY3mXDtNNKJ42p1xoxf9OH+cu2T927tvyXvzS9nw7QV09N57bT1n+PJ8wzF9WIVDJJBFyiUwIIBU2S2DYuFRcIsgLRkRNns6OZ7VwdVVab9U4fhnHri/wCH1GVbTWd4cOt0lNRj5bfpPg7tlGZU8TSjWpO8ZLin1xa6mnsOuJ3jeHiM2G2G80v1huFagAAAAAAAAAAAAAHNuVnOrKGFjLsnU/wi/n5GjNb7r0HBdN1zWj3R/Po5fNmh6qsMTZWQmBDIIZRKAMgWKABkAokA2ElanU22DGYffcludulXeHlLoVtye5VUui+KVv0mzFbadnwOM6Xnx+0rHbX5f16uvHS8qAAAAAAAAAAAABrZjjI0aU6s/uwi5Ph1d73Emdo3bMWO2S8Ur1l+fc9x0q9SdSb6U5Nv1X3JepbuBx77zvL3mnw1x0ilekPJp1bxv17n3osx2ujHO8IbDYuiARSwAIkABDAASgAAqsTdmmVrluYHFNNNNpp3TW9NbU/Mkw12rFo2l+g9Gs1WKw9Otsu1aa7JrZJee3uaOuluaN3g9Xp5wZrY+7u8u56hk5gAAAAAAAAAAAc95Vs31YQw0X97pz7lsgvO74I0Zrfdff4Jp97Tmnu7I/n/AHvcoqyNL1VYedhZbJeJmUteCftebYfURvWRBJFAAE2AAQBIAIIAVWGtuZYYX6L4R7ELMK/ZdL5Ks41KssPJ9Grtj6pxX8r5Izw22nZ8Djem5qRljrHydWOl5cAAAAAAAAAAK1JqKcm7JJtvsS3sLETM7Q4FpRmjxOIqVX+KXRXZFbIrySOKZ3nd7vRaeMOKtPD59/xeDMO+GnRVtbxv+DKWrFG0285ZmYt0rxAkipAASBAAAwIQQQVJRjqrY+5iGF+kr4ZbEWUjo9PLsVKnUjOLtKMlJP1p3Rj07WjPji9JrPSX6CyvGxr0YVY7pxUu5veuDuuB2xO8bvA5sc4rzSe6W0VrAAAAAAAAAHynKPmvM4VwT6VZ6i8C2zflZe0as1tq7eL6nCNP7XPzT0r2/r3OKVp3ZzQ9nSGvJlbWtS6/E/mWWGPv85ZGRmyRAlsioAASwoAsEQwIRUSiKkClRbH3FhLdJWoPYJYQ2qbIxs6vyU5rrU54aT2wevDwy2SXCVn7Zvw27nk+NYOW8ZY7+yf4+HyffG98QAAAAAAAAAcZ5Sc257FSin0aP9NeJbZvz2eycmW29nsOD6f2eCJnrbt9HxUzB9mGJsrNgw/3V3v5ssteKd6sq3kbF0QSBCABUgADAqwIRUWRFWComtjKkx2MeFldIstNJ3iG3BmKy+g0QzT7PiadRu0b6s/BLZLy38C0ttbd83iGD22G1e/u83dkzteJSAAAAAAAB5+f5isPh6lZ/gi2l2yeyK82jG07Ru36bDObLXH4z8O9+fcVVbbbd23dvrbe9nG99jrERtDUkw3KSewow4ZdGPcWerDD9iGSBGxcgIKBACUFQAYEMorFhGRIipCgRr4J9FGVnPinesNyJi2NilINN4dy0HzP7RhKbbvKC5uffDYm++Oq+J1Y7b1eJ4hh9lntHdPbH6vfNjiAAAAAAAc85W8ztClh0/vN1J9y2QXF636TRmnpD7/A8G9rZZ7uyP5/3vcpqM0PU1hibKzYa7tF9zLCXnasyUlaK7kCkbVhaJJZLIgkKgIMCyYEMKAQyiqCLoirBQqNTBuy8/mZS58XZVuwZg2M9NhjLoHJVmmpWlQb2VY3j44Xfvjf9KNuG207PO8a0++OMkfd+U/383VDpeaAAAAAAMDg+mua/aMVVqJ3inqQ8MNi89r4nHed7bvccO0/scFaz16z5y+amyPpQqFa+LfRfd8yw15p2xyyw3EbISwqUBJBAEMolEAKloCsiisQjJEgsGSAjUpPf4n8zNz1nr5tujIxlnDPGRCXpZRjZUasKsd8JKS4Pdx3cRE7Tu5NTijJSaz3w/QGFrxqQjOLvGUVJP1NXR3RO/a8Jes0tNZ6wyhiAAAADwNOM0+z4OpJO05f04eKextdyu+BhkttV3cOwe21FYnpHbP6OEVZnI9xSGvJlbVArVxj2JdrRlDTn+zEeMw2ImLclgTFgSyCEAkUTHcBJFGBVlFIhGREFrhRso8+k+lPvM3Jj+1bzb0DFuZYMg2abIwvHY7HyZ5nzuF5tvpUZavsS2x/yXA6cVt42eO4th5M/NHS3zfXm18sAAAAHK+VvM9arTw6eynHWl4p7r90V8RzZp7dnpuB4NqWyT3ztHlH++DnE2a3o4Y2wyUYVpYt7Yr1/wDBnDmzz9ase9uIwdKQCAlgQBLAmIEsioYESKKRKjIQEwEgrQoy6cvEZuPHb69o97egYuhmiRGWEiJL7Tk0zPmsWoN2jVTg/Fvg/NW9o2Yp2s+JxfBz4ZtHWvb6uxHU8mAAAESdlcD896SZhz+Iq1fzzbXh3R+FI4pned3vdHh9lirTwj/34vGkHbCgVVlVfLMpliazirqNOlUrTl2QpRcn5tRj3yRnEPm63LyWr4zMRHnMsaMH0kogmIEgAJmAiwJIowKSLAiJUXuQRcABfO8pdBUKqu4Ymjrpv88JONSPCyftI2dz5eLLzajJXvif/GChMxl3xLYRiyZYMjFuYKu4SjOLs4yUk+xxd0/NBozUi1Zie9+hMuxarUoVY7pwjJcVex2xO8bvBZKTS80nulsFYAADw9NMw5jB1pp7XHUj4qnR912+Bhknasuzh+L2uorX9f27XA6zOR7mkMLK2qhVbFJl0/RjI1QyrHYiS6dahVjH1U4QlFectZ91jbEbUmXldVqPa8Qx0jpW0fvvDmDNT1MICkQLEZCCJkFREIlhQKrIJKsSouiCLASgkukzyX7XkFJxV6mHdWpDttCpUU48YX2dqRviN6PL5c3seKTv0ttH7xDltNWZrl6KOxtwkYyzZUyDNTZGu0Oy8mGP5zCaje2lNx9mXSj85LgdOGd67PH8Xxcmfm/FH9Prza+WAAOc8r2PtGjQT3t1JcOjH5y8jRmnpD7/AAPFva2T9P59HKZs0vUQowzQU3evorlUsTiadNdbu32JbW/54CI3nZzazPGHFa89ztOl1GNPLcRCCtGOHlGK7Eo2SOm/ZWXi9FabaulrdZtEvz7NHM93CAy3RALCzZGSIBFmwIiBIUQVWYSVYFYwumFTcgkJLuPJXty6mv76v75f8nTi+y8Txr/l28o+UOU6dZF9kxk4JWpy6dPwS6l3O64Gq0bS9Dw7Ve3wxaevSfN4UTB9BlgyKywZEl0Dkox2riJ0m9lSGzxQ2r3ORtwz9bZ5/jeLfHF/Cfn/AKHWDpeZAAHEOUXH87jatndQtTXsfe+JyOTJO9nseFYvZ6evv7f3/p8jIxfWhQrISCTLrvJNkmpTliZLbPow7vxP5Lgzdir3vLcb1XNMYY85/h9Ppuv+gxP/AMZ/Izv9mXy9B/ycfnD881Dme6rPYxphnErRYWJJsM0xYEsioiVEsigVE9xUlSmxLGFrhRMJuyIJMu48la/7fDx1P3s6MX2XiuNf8ufKPkwcquR8/hediunQet63B/eXDY+DGSN43OE6n2eXknpb5uJGh66s7skWRmywIPa0ax/MYmlV3KE4uXheyXwtlrO0xLh1uL2uG1fGH6AOx4cAxYquqcJTe6MXJ90U3/BJnaN2VK81orHe/OePrucpTlvk3J98nd/M43vcVYrWKx3NFlb0Bd27lOBlWqQpxV5Tkopetuy4DrOzRnyxSk2npD9FZbg40aUKUd0IqK9dt74vbxOuI2jZ4PLlnLebz3tPSunrYLExW90Ktu/UlYluktmknbPSf/qPm/ONTecz3dOij2BsIPaJWqaj2EhsnoJhIWT2BlCseoIuQRcqpe4gxQKwXYZKlYyzU95GMy71yb0dXL6Pr5yXnUm17rHRi+y8Rxa3Nq7/AKfKH0lWmpJxkrpppp7mnsaNj58TMTvD87aW5Q8LiqlLqUrxfbB7Yvyfnc5pjadntNHqIzYou8qDMJd8SyRZGTYosjXeOx3/AEWxvPYSjUvdumlLxR6MvemdlJ3rDwurx+zzWr73qmTnfM8ouP5rBVO2o1TXtbZfCma8s7Vd/DcXPqI93b/v1cKqyOd66kzDDrF2budMCHPDpvJPk2tUliZLZTWrDxyW18I/uNmKvbu+BxrU7UjFHf18o9Z+TqZ0PNsGOpa9OcPzQlHzTRJ6MqTtaJfmatG2/f1o5Ie/pbsUaDfG0sMN5lKdJZKi2EbJ6IQITFkWERexBI6J1gu63UFRF7AQxxKwWIqUisZbFCO0ksLTtD9DaJUNTB4eP/qi/NX/AJOnH9mHg9bbm1F598vXM3K5zyv5Lr04YqK2w6E/DJ9Fvuls9s1ZY732eEajltOOe/thySLsaZemreF9ZkZ87JBhrtaXYOSbH6+GnSb2053XhmtnvjI3YZ7Nnl+L49skX8Y+T7o3PkviOU7KcTiIUlQpucYazmota13ZReq9+y+7tNWWsz0fW4XnxYptzztM7OPY3Czpy1akJU32Ti4vgmjS9JjvW8b1mJ8mtYNm7YwVBykkle73dr7gwtO0P0No5liw2Hp0utK8/XN7ZPz2cEdNY2jZ4zVZpzZZv+3k9Myc4wPzjpFh9TEVoflq1I8FN291jknsl7XTZN8dZ90fJ5Ng64tKrQZc0gWLSrYHNImFi8jBzSBeaVkF5pLheaVGgxmy0Qc8rBjNpbWETbSJLXe3Z2v0thaWrCMfyxS8kkdcdHgr25rTPiylYtbMcHGtSnSmrxnFxfFb+/rExuzx3mlotHWH5zzbL5UK06U10oScX67Pf3PfxOWY27HsMGSL1i0dJasUR1RLYwtCU3qwjKb7Ixcn5JEY3tFY3tO0e/sdM5MsmxdGtKpUoyhSlTaetaLvdONovb1Pq6zbjrMS+BxTPhyUitbbzE9zpZvfDAMdehGa1ZxjJPqklJeTC1tNZ3idnzuYaBZfV/28YPtpN0/hj0fNGE0q7cfEtTT7+/n2/NpZTydYbD14Vo1KklB6yhPVautzuktzs+BIxxE7tuXiuXJjmkxEb98bvszY+YAAOO6XaJ4upja8qeHnKE560ZLVs7xi319tznvWd+j0mj1uGuGsWvETEPEnoRj/AEWp5w+ox5LeDsjiOm/HHx9FP9EZh6LU+D6hy28GX0jpvzI+Poh6E5h6JU+D6i8s+B9I6b8yPj6H+hsw9En50/qHLbwJ4lpvxx8fRL0DzD0Wf6qf1Dlt4EcS0344+Poo9Bcx9En50/qHLbwZfSWl/Mj4+gtBMx9En+qn9Q5beB9J6X8yPj6H+hsx9EqedP6hyT4MvpPS/mR8fRD0HzH0Sp5w+ocs+B9JaX8yPj6KPQfMfRKnnD6hyz4JHEtL+ZHx9BaFZj6JU+H6hyz4L9I6X8yGWOg+Y9eEqecPqHLbwYfSWl/Mj4+j08m0KxqrU3PDSUechrNuFlFSV397suSKW36NOfiOn5J5b9u0+Po7edTyQAA+V0j0Fw+Mq89OdSEmknqatnq7Lu8XttZcEYWpEzu7tPxDJgryRETHvXy7QHL6X/gVR9tVup8L6PuEY6rk4lqb/e28uz+30WHw8Ka1YQjBLqilFeSM9tnFa02ne07soYgAAAAAAAAAAAAAAAAAsAsAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z"
        },
        {
          "name": "Blue cotton hoodie",
          "old_price": 900.99,
          "new_price": 500,
          "img_src": "data:image/jpeg;base64,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"
        }
      ]
    }
  
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

