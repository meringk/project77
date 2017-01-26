var map;

function initMap() {
    // INIT CENTER OF MAP
    var initLat = 50.146703,
        initLng = 87.462226
    initZoom = 3;

    // INIT MOBILE CENTER OF MAP
    if (skel.vars.mobile) {
        initZoom = 1
    }

    //CREATE MAP
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: initLat, lng: initLng },
        zoom: initZoom
    });

    // ACTION MARKER BUG _ TIMEOUT 300
    window.setTimeout(function () {
        setMarkers(map);
    }, 300);
}



var markers = [];
function setMarkers(map) {


    var tripsArr = []
    $.get('/trip/selectTripData', function (data) {
        console.log(data);
        tripsArr = data;
        clearMarkers();

        for (var i = 0; i < tripsArr.length; i++) {
            addMarkerWithTimeout(tripsArr[i], i * 350);
        }

    });

    // var tripsArr = [
    //     ['방콕', 13.747427, 100.495992, 1, '첫여행지 방콕'],
    //     ['홍콩', 22.294200, 114.171576, 2, '홍콩'],
    //     ['상하이', 31.229787, 121.471683, 3, '상하이다'],
    //     ['후쿠오카', 33.590166, 130.451451, 4, '후쿠오카에갔었다.'],
    //     ['오사카', 34.666849, 135.501580, 5, '오사카'],
    //     ['도쿄', 35.721528, 139.731760, 6, '도쿄'],
    //     ['영국', 51.515314, -0.128383, 7, '런던은춥다'],
    //     ['독일', 49.403864, 8.677218, 8, '하이델베트크'],
    //     ['독일', 49.793155, 9.936204, 9, '뷔르츠부르크'],
    //     ['독일', 49.452960, 11.082553, 10, '뉘른베르크'],
    //     ['스위스', 47.371126, 8.541049, 11, '취리히'],
    //     ['스위스', 47.049253, 8.313032, 12, '루체른'],
    // ];


}

var prev;
var prev2;

function addMarkerWithTimeout(trips, timeout) {
    var myIcon = new google.maps.MarkerImage("/images/marker5.png", null, null, null, new google.maps.Size(40, 40));

    var infowindow = new google.maps.InfoWindow({
        content: this.title
    });


    window.setTimeout(function () {
        console.log("----------------------------")
        console.log(trips)
        console.log(trips.t_lat)
        console.log(trips.t_lng)

         var lat = trips.t_lat *1,
       lng = trips.t_lng *1


        var marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            title: trips.t_contry,
            zIndex: trips.t_idx,
            icon: myIcon,
            animation: google.maps.Animation.DROP,
            content: trips.t_content
        });
        markers.push(marker);

        marker.addListener('click', function () {

            var infowindow = new google.maps.InfoWindow({
                content: this.content
            });

            this.setPosition(new google.maps.LatLng(this.position.lat(), this.position.lng()));
            infowindow.open(map, this);

            if (prev) {
                prev.close();
                prev2.setAnimation(null);
            }

            this.setAnimation(google.maps.Animation.BOUNCE);
            prev2 = this;
            prev = infowindow;

        });


    }, timeout);
}


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
