let cartCount = 0;

const addItemToCart = (itemID) => {
  const storeID = 100;
  const userID = 1;
  console.log("Adding item");
  cartCount += 1;
  document.getElementById("cart-count").innerHTML = cartCount;
};
