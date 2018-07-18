var global_auth_ID = "DEFAULT_ID";

var url = "http://159.122.178.244:31090/api/Sneaker/";
var id = window.location.href.split('?')[1];
var currentState

setInterval(function() {
  getBCInfo("0000");
}, 300);




//document.getElementById("u1712_img").src = "none";
//document.getElementById("u1720_img").style.visible = "hidden";



/*
function startroutine() {

}
*/

function getBCInfo(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(xhttp.responseText);
      var sneakerId = json.sneakerId;
      var color = json.attributes.color;
      var gender = json.attributes.gender;
      var sizeUS = json.attributes.sizeUS;
      var designedDate = json.attributes.design.designedDate;
      var designName = json.attributes.design.name;
      var designer = json.attributes.design.designer;
      var currentOwner = json.currentOwner;
      var status = json.lifecycle.status;
      var timestamp = json.lifecycle.timestamp;


      newDate = new Date(timestamp);

      document.getElementById("df_productid2").innerHTML = "Sneaker " + sneakerId;
      document.getElementById("df_productid").innerHTML = "Thank your for shopping with us. You ordered with the ID &quot;Sneaker " + sneakerId + "&quot;. We'll send a confirmation to your email address.";
      //document.getElementById("df_price").innerHTML = "";
      document.getElementById("df_size").innerHTML = sizeUS;
      document.getElementById("df_date").innerHTML = "Your order arrived at " + newDate.toISOString().slice(0, 10);

      switch (status) {
        case "DESIGNED":
          if (currentState != "DESIGNED") {
            console.log("moving to ordering");
            currentState = "DESIGNED";
            goTo("orderdate");
          }
          break;
        case "PLASTIC_COLLECTED":
          if (currentState != "PLASTIC_COLLECTED") {
            console.log("moving to PLASTIC_COLLECTED");
            currentState = "PLASTIC_COLLECTED";
            document.getElementById("u1712_img").src = "images/before3%202_2x.jpg?crc=198303772"
            document.getElementById("u1720_img").src = "images/before3%203_2x.jpg?crc=529384658"
            document.getElementById("df_cleanDate1").innerHTML = newDate.toISOString().slice(0, 10);
            document.getElementById("df_cleanDate2").innerHTML = newDate.toISOString().slice(0, 10);
            document.getElementById("df_cleanTime1").innerHTML = "12:10";
            document.getElementById("df_cleanTime2").innerHTML = "17:14";
            goTo("pickupofplastic");
          }
          break;
        case "MANUFACTURED":
          if (currentState != "MANUFACTURED") {
            console.log("moving to MANUFACTURED");
            currentState = "MANUFACTURED";
            document.getElementById("df_manufactureDate").innerHTML = newDate.toISOString().slice(0, 10);
            document.getElementById("df_factoryName").innerHTML = "Adidas Speedfactory";
            document.getElementById("df_factoryAddress1").innerHTML = "Gottlieb-Daimler-Straße 8,";
            document.getElementById("df_factoryAddress2").innerHTML = "91522 Ansbach, Deutschland";
            goTo("manufacturing");
          }
          break;
        case "AT_WAREHOUSE":
          if (currentState != "AT_WAREHOUSE") {
            console.log("moving to AT_WAREHOUSE");
            currentState = "AT_WAREHOUSE";
            document.getElementById("df_orderDate").innerHTML = newDate.toISOString().slice(0, 10);
            document.getElementById("df_DHL").innerHTML = "DHL";
            document.getElementById("df_shippingAddress").innerHTML = "Mies-van-der-Rohe-Straße 6, 80807 München";
            goTo("delivered");
          }
          break;
        case "RECYCLED":
          if (currentState != "RECYCLED") {
            {
              console.log("moving to RECYCLED");
              currentState = "RECYCLED";
              document.getElementById("df_recycleDate").innerHTML = newDate.toISOString().slice(0, 10);
              document.getElementById("df_recycleAddress").innerHTML = "Zeil 118, Frankfurt am Main";
              goTo("recycled");
            }
            break;
          }

      }



    }
  };
  xhttp.open("GET", url + id, true);
  xhttp.send();

}

function goTo(anchor) {
  var elmnt = document.getElementById(anchor);
  elmnt.scrollIntoView({
    behavior: 'smooth',
    block: "start"
  });
}
