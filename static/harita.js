var anlikKonum = null;
 
var myLatLng = {
    lat: 39.0578771,
    lng: 34.4999527
};
var mapOptions = {
    center: myLatLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    draggable: false

};

var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  
  function getLoc() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPos);
      } else {
          //x.innerHTML = "Geolocation is not supported by this browser.";
          console.log("Geolocation is not supported by this browser.");
      }
  }
  
  var anlikKonumIcon = {
      url: "https://i.hizliresim.com/8O2iHy.png",
      scaledSize: new google.maps.Size(30, 30), // scaled size
  };
  
  function showPos(position) {
      if (anlikKonum != null)
          anlikKonum.setMap(null);
      anlikKonum = new google.maps.Marker({
          position: {
              'lat': position.coords.latitude,
              'lng': position.coords.longitude
          },
          map: map,
          icon: anlikKonumIcon
      })
      map.setCenter({
        'lat': position.coords.latitude,
        'lng': position.coords.longitude
    });
 
  }
  
  $(document).ready(function () {
      getLoc();
      const konumAl = setInterval(function () {
        getLoc();
    }, 5000);
  });
  