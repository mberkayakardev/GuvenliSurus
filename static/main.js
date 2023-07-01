// Haritanın türkiye başlangıç konumu enlem ve boylamdan veriri

var anlikKonum = null;
var kazaKonumlar = [];

var LatLng = {
    lat: 39.0578771,
    lng: 34.4999527
};

var mapOptions = {
    center: LatLng,
    zoom: 6.2,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var baslangicMarker = new google.maps.Marker({
    position: null,
    map: map

});
var bitisMarker = new google.maps.Marker({
    position: null,
    map: map
});


var ikonlar = {
    baslangicikon: new google.maps.MarkerImage(
        'http://maps.google.com/mapfiles/ms/micons/blue.png',

        new google.maps.Size(44, 32),

        new google.maps.Point(0, 0),

        new google.maps.Point(22, 32)),

    bitisikon: new google.maps.MarkerImage(
        'http://maps.google.com/mapfiles/ms/micons/green.png',
        new google.maps.Size(44, 32),

        new google.maps.Point(0, 0),

        new google.maps.Point(22, 32))
};


var anlikLatLng = {
    'lat': '',
    'lng': ''
};

document.getElementById("output").style.display = "none";


var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
const trafficLayer = new google.maps.TrafficLayer();



var directionsService = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true
});

directionsDisplay.setMap(map);

function yolhesapla() {
    baslangicMarker.setMap(null);
    bitisMarker.setMap(null);
    if (odaklama == true)
        kameraodakla()
    var request = {
        origin: document.getElementById("lokasyon-1").value,
        destination: document.getElementById("lokasyon-2").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    function markerKoy(position, icon, title, map) {
        return new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            var leg = result.routes[0].legs[0];
            baslangicMarker = markerKoy(leg.start_location, ikonlar.baslangicikon, "start", map);
            bitisMarker = markerKoy(leg.end_location, ikonlar.bitisikon, "end", map);

            $("#output").html("<div class='result-table'>  Sürüş Mesafesi: " + result.routes[0].legs[0].distance.text + ".<br />Süre: " + result.routes[0].legs[0].duration.text + ".</div>");
            document.getElementById("output").style.display = "block";
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({
                routes: []
            });
            map.setCenter(LatLng);


            alert("Rota oluşturulamadı lütfen daha sonra tekrar deneyin");
            clearRoute();
        }
    });
}


function rotayıtemizle() {

    document.getElementById("output").style.display = "none";
    document.getElementById("lokasyon-1").value = "";
    document.getElementById("lokasyon-2").value = "";

    directionsDisplay.setDirections({
        routes: []
    });
    baslangicMarker.setMap(null);
    bitisMarker.setMap(null);
}


var options = {
    types: ['(cities)']
}


var input1 = document.getElementById("lokasyon-1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("lokasyon-2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


//var x = document.getElementById("demo");
function anlikKonumAl() {
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
    anlikLatLng['lat'] = position.coords.latitude;
    anlikLatLng['lng'] = position.coords.longitude;

    document.getElementById("lokasyon-1").value = position.coords.latitude + ', ' + position.coords.longitude;
}

 

function showKazalar() {
    var kazaPoint = []
   
    var kazaIcon = {
        url: "https://i.hizliresim.com/C9hTed.png",
        scaledSize: new google.maps.Size(25, 20), // scaled size

    };
    var uyariIcon = {
        url: "https://i.hizliresim.com/VY2JOM.png",
        scaledSize: new google.maps.Size(20, 20), // scaled size

    };
    kazaKonumlar.forEach(kaza => {
        marker = {
            position: {
                'lat': parseFloat(kaza['lat']),
                'lng': parseFloat(kaza['lng'])
            },
            map: map
        }
        if (kaza['sorun'] == "Kaza")
            marker.icon = kazaIcon;
        else if (kaza['sorun'] == "Tehlike")
            marker.icon = uyariIcon;

        kazaPoint.push(new google.maps.Marker(marker))
    });
}

function kazaGoster(enlem, boylam) {
    console.log(parseFloat(enlem), parseFloat(boylam));


    map.setZoom(17)
    map.setCenter({
        'lat': parseFloat(enlem),
        'lng': parseFloat(boylam),
    });
    window.scrollTo(0, 0);
}

$(".toggle").click(function () {
    $('.kaza-container').toggleClass("expand");
});


function kilometreHesapla(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


var siraliKazalar = [];

function yakinlikHesapla() {
    $("#kazalar").empty()
    kazaKonumlar.forEach(kaza => {

        var mesafe = kilometreHesapla(anlikLatLng['lat'], anlikLatLng['lng'], kaza['lat'], kaza['lng']);

        siraliKazalar.push({
            'mesafe': mesafe.toFixed(2),
            'lat': kaza['lat'],
            'lng': kaza['lng'],
            'kazaTur': kaza['sorun'],
            'id': kaza['id'],
            'ana_unsur': kaza['ana_unsur'],
        });
        // console.log(mesafe.toFixed(3))

    });
    siraliKazalar.sort((a, b) => (a.mesafe > b.mesafe) ? 1 : -1);


    var yakindakiKazalarSayi = 0;
    var mesafeStringi;
    siraliKazalar.forEach(kaza => {
        if (kaza['mesafe'] < 10) {
            if (kaza['mesafe'] < 1) {
                mesafeStringi = (kaza['mesafe'] * 1000).toString() + " Metre";
            } else {
                mesafeStringi = (kaza['mesafe']).toString() + " Kilometre"
            }
            yakindakiKazalarSayi++;
            $("#kazalar").append(`
                <li id="${kaza['id']}">
                <button class="kaza-liste" onClick =" kazaGoster(${kaza['lat']}, ${kaza['lng']})">
                <div class="row" style="width: 100%;">
                    <div class="col-md-3">${mesafeStringi}</div>
                    <div class="col-md-3">${kaza['kazaTur']}</div>
                    <div class="col-md-3">${kaza['ana_unsur']}</div>
                </div>
                </button>
            </li>`);

        } else {
            //console.log(kaza);
        }
    });
    $('#kazaSayisiSpan').text(yakindakiKazalarSayi)
    siraliKazalar.length = 0
}

var kitlimi = false;

function haritakilitle() {
    if (kitlimi === true) {
        map.setOptions({
            draggable: true

        });
        document.getElementById("haritaKilitleBtn").classList.remove("fa-lock");
        document.getElementById("haritaKilitleBtn").classList.add("fa-unlock");
        kitlimi = false;
    } else {
        map.setOptions({
            draggable: false
        });
        document.getElementById("haritaKilitleBtn").classList.remove("fa-unlock");
        document.getElementById("haritaKilitleBtn").classList.add("fa-lock");
        kitlimi = true;
    }
}

var myVar;
var odaklama = false;

function kameraodakla() {


    if (odaklama === false) {
        map.setOptions({
            draggable: false,
            zoom: 17

        });

        map.panTo(anlikLatLng)
        document.getElementById("kamerakilitle").classList.remove("fa-camera");
        document.getElementById("kamerakilitle").classList.add("fa-map-marker");
        odaklama = true;
        myVar = setInterval(function () {
            map.panTo(anlikLatLng)
            map.setZoom(17)
        }, 2000);
    } else {
        map.setOptions({
            draggable: true
        });

        clearInterval(myVar);
        document.getElementById("kamerakilitle").classList.remove("fa-map-marker");
        document.getElementById("kamerakilitle").classList.add("fa-camera");
        odaklama = false;
    }
}


var trafikvarmı = false;

function trafikgoster() {
    if (trafikvarmı === false) {
        trafficLayer.setMap(map);
        document.getElementById("trafikGosterBtn").classList.remove("fa-road");
        document.getElementById("trafikGosterBtn").classList.add("fa-car");
        trafikvarmı = true;
    } else {
        trafficLayer.setMap(null);
        document.getElementById("trafikGosterBtn").classList.remove("fa-car");
        document.getElementById("trafikGosterBtn").classList.add("fa-road");
        trafikvarmı = false;
    }
}

$(document).ready(function () {
    kazalar.forEach(kaza => {
        kaza = kaza.split('|');
        kazaKonumlar.push({
            'id': kaza[1],
            'lat': kaza[3],
            'lng': kaza[5],

            'sorun': kaza[7],
            'ana_unsur': kaza[9]

        });
    });

    showKazalar();
    anlikKonumAl();

    setInterval(function () {
        anlikKonumAl();
        yakinlikHesapla();
        showKazalar();
    }, 2000);


});