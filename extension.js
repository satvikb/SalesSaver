document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);

  var tabIDs = ["cartTab", "promotionsTab", "ordersTab"]

  function showTab(tabID){
    for(var i = 0; i < tabIDs.length; i++){
      if(tabIDs[i] == tabID){
        showDiv(tabID)
      }else{
        hideDiv(tabIDs[i])
      }
    }
  }

  function hideDiv(id) {
    var x = document.getElementById(id);
    // if (x.style.display === "none") {
    //   x.style.display = "block";
    // } else {
      x.style.display = "none";
    // }
  }

  function showDiv(id) {
    var x = document.getElementById(id);
    x.style.display = "inline";
  }

  document.getElementById('cartBtn').addEventListener('click', function() {
    showTab('cartTab')
  });
  document.getElementById('promoBtn').addEventListener('click', function() {
    showTab('promotionsTab')
  });
  document.getElementById('ordersBtn').addEventListener('click', function() {
    showTab('ordersTab')
  });

  showTab("cartTab")
}, false);
