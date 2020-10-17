var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "AccessKey 4f3c6a1cd2e5471aa4eb0add352c434e:R60kPy1H4ZcJRgQFxIEYVw1fbGoB38henpw6nFRpO5kX5c9EFcZeu9MO6z2Y1sBhG7QhJ1fYjAtCGtyGwtE2Sw==");
myHeaders.append("nep-organization", "6df906a55b2d469fafe15f8c1db16d63");
myHeaders.append("nep-enterprise-unit", "ffdd296de1c5441994c8788c0b3b3bcf");
myHeaders.append("Date", "Sat, 17 Oct 2020 22:10:03 GMT");

var raw = JSON.stringify({});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
var request = "https://gateway-staging.ncrcloud.com/order/3/orders/1/find"//"https://gateway-staging.ncrcloud.com/order/3/orders/1/10862693151177614444"
fetch(proxyUrl + request, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
