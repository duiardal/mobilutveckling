var map;

function ZoomControl(controlDiv, map) {
  controlDiv.style.padding = '1em';

  // Set CSS for the control wrapper
  var controlWrapper = document.createElement('div');
  controlWrapper.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  controlWrapper.style.borderStyle = 'solid';
  controlWrapper.style.borderColor = 'gray';
  controlWrapper.style.borderWidth = '1px';
  controlWrapper.style.borderRadius = '5px';
  controlWrapper.style.cursor = 'pointer';
  controlWrapper.style.textAlign = 'center';
  controlWrapper.style.width = '4em'; 
  controlWrapper.style.height = '8em';
  controlDiv.appendChild(controlWrapper);

  var zoomInButton = document.createElement('div');
  zoomInButton.style.borderBottom = '1px solid grey'
  zoomInButton.innerHTML = zoomInButton.innerHTML + "<img src='http://aminoapps.com/static/bower/emojify.js/images/emoji/heavy_plus_sign.png' style='width: 100%;'/>";
  controlWrapper.appendChild(zoomInButton);

  var zoomOutButton = document.createElement('div');
  zoomOutButton.innerHTML = zoomOutButton.innerHTML + "<img src='http://aminoapps.com/static/bower/emojify.js/images/emoji/heavy_minus_sign.png' style='width: 100%;'/>";
  controlWrapper.appendChild(zoomOutButton);

  google.maps.event.addDomListener(zoomInButton, 'click', function() {
    map.setZoom(map.getZoom() + 1);
  });

  google.maps.event.addDomListener(zoomOutButton, 'click', function() {
    map.setZoom(map.getZoom() - 1);
  });
}

function icon(controlDiv2, map) {

  controlDiv2.style.padding = '1em';

  var controlWrapper2 = document.createElement("div");
  controlWrapper2.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  controlWrapper2.style.display = "inline-block";
  controlWrapper2.style.xoom = "1";
  controlWrapper2.style.textAlign = "center";
  controlWrapper2.style.width = "16em";
  controlWrapper2.style.height = "6em";
  controlWrapper2.style.borderRadius = "5px";

  controlDiv2.appendChild(controlWrapper2);

  var logo = document.createElement("h1");
  logo.style.fontFamily = "futura";
  logo.innerHTML = logo.innerHTML + "Our Map App";
  //logo.style.backgroundColor = "white";
  //logo.style.width = "50px";
  //logo.style.height = "50px";
  controlWrapper2.appendChild(logo);

}

function initialize() {
	var mapOptionsWatertemp = {
		center: new google.maps.LatLng(59.347448, 18.073795),
		zoom: 19,
		tilt: 45,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: true
	}
    // Coordinates
	var dui = new google.maps.LatLng(59.337973, 18.054460);
	var patrik = new google.maps.LatLng(59.318011, 18.054418);
	var gustav = new google.maps.LatLng(59.344952, 18.078635);

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptionsWatertemp);
    
    marker = new google.maps.Marker( {position: dui, map: map} );
    marker2 = new google.maps.Marker( {position: patrik, map: map} );
    marker3 = new google.maps.Marker( {position: gustav, map: map} );
    

    var zoomControlDiv = document.createElement('div');
	var zoomControl = new ZoomControl(zoomControlDiv, map);

	zoomControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

	var controlDiv2 = document.createElement("div");
	var iconControl = new icon(controlDiv2, map);

	controlDiv2.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv2);
}

google.maps.event.addDomListener(window,'load',initialize);