let cartCount = 0;

const addItemToCart = async (itemID) => {
  const storeID = 100;
  const userID = 1;
  console.log("Adding item");
  cartCount += 1;
  document.getElementById("cart-count").innerHTML = cartCount;

  const proxy = "http://localhost:3000";
  const response = await fetch(`${proxy}/addItem`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      cartId: storeID,
      userId: userID,
      itemId: itemID,
    }),
  });
  const data = await response.json();
  console.log(data);
};
