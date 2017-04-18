var map;

function icon(controlDiv, map) {

  controlDiv.style.padding = '1em';

  var controlWrapper = document.createElement("div");
  controlWrapper.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  controlWrapper.style.display = "inline-block";
  controlWrapper.style.xoom = "1";
  controlWrapper.style.textAlign = "center";
  controlWrapper.style.width = "16em";
  controlWrapper.style.height = "6em";
  controlWrapper.style.borderRadius = "5px";

  controlDiv.appendChild(controlWrapper);

  var logo = document.createElement("h1");
  logo.style.fontFamily = "futura";
  logo.innerHTML = logo.innerHTML + "Our Map App";
  //logo.style.backgroundColor = "white";
  //logo.style.width = "50px";
  //logo.style.height = "50px";
  controlWrapper.appendChild(logo);

}

function initMap() {
  var kth = {lat: 59.334654, lng: 18.063033};
  map = new google.maps.Map(document.getElementById('map'), {
    center: kth,
    zoom: 19,
    mapTypeId: 'satellite',
    tilt: 45,
    disableDefaultUI: true
  });
  //map.setZoom(20);
  //map.setTilt(45);
  console.log(map.getTilt());
  var marker = new google.maps.Marker({
    position: kth,
    map: map
  });

  var controlDiv = document.createElement("div");
  var iconControl = new icon(controlDiv, map);

  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
}



