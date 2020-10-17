var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "AccessKey 861803bcb8434bdca07ab5cfe5f6665b:hUzLYINgcoP0xqQSs2Vqyy9TNgcK1LPArWDabK4o7ZcI1BZQSlGNxLDlQzd4vxThOj1q+XkIGQ5L1eK/nsMmNw=="
);
myHeaders.append("nep-organization", "92867e57744a432aa0c6abc51467e451");
myHeaders.append("nep-enterprise-unit", "080ee26f7e764b70bf6293f060274613");
myHeaders.append("Date", "Sat, 17 Oct 2020 22:19:50 GMT");

var raw = JSON.stringify({});

var requestOptions = {
  // mode: "no-cors",
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(
  "https://gateway-staging.ncrcloud.com/order/3/orders/1/find",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
