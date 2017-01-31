var map;
var animation;
var init;
function initMap() {
    // INIT CENTER OF MAP
    var initLat = 50.146703,
        initLng = 87.462226
    initZoom = 3;
    animation = google.maps.Animation.BOUNCE;

    // INIT MOBILE CENTER OF MAP
    if (skel.vars.mobile) {
        initLat = 30.146703;
        initLng = 70.462226;
        initZoom = 1;
        animation = "";
    }

    //CREATE MAP
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: initLat, lng: initLng },
        zoom: initZoom
    });

    // ACTION MARKER BUG _ TIMEOUT 300
    window.setTimeout(function () {
        // fnc(map, t_zoom);  
        loadInitData(map, 1);
    }, 400);

    // ZOOM CHANGE ACTION
    map.addListener('zoom_changed', function () {
        clearMarkers();
        resetMap(map);
    });

    // ZOOM CHANGE ACTION
    map.addListener('dragend', function () {
        clearMarkers();
        resetMap(map);
    });


}

var markers = [];
var prev_info;
var prev_marker;
var tripsArr = [];
var tripsArr2 = [];
var fin;

function loadInitData(map, zoom) {
    init=true;
    $.ajax({
        url: '/trip/selectTripDataInit',
        type: 'post',
        dataType: 'json',
        data: { zoom: zoom },
        success: function (data) {
            drawMarker(data);
        }
    });
}
function loadData(map, zoom) {
    
    var mapBound = getMapBounds(map),
        startLat = mapBound.slat,
        startLng = mapBound.slng,
        endLat = mapBound.elat,
        endLng = mapBound.elng;

    $.ajax({
        url: '/trip/selectTripData',
        type: 'post',
        dataType: 'json',
        data: { zoom: zoom, startLat: startLat, endLat: endLat, startLng: startLng, endLng: endLng },
        success: function (data) {
            drawMarker(data);
        }
    });
}
function resetMap(map) {

    if (map.getZoom() < 5) {
        clearMarkers();
        console.log(markers);
        // fnc(map, t_zoom);  
        loadData(map, 1);
    }

    if (map.getZoom() > 4) {
        clearMarkers();
        // fnc(map, t_zoom);  
        console.log(markers);
        loadData(map, 2);
    }
}

function drawMarker(tripsArr) {
    var fin;
    if(init) timeFlg=100;
    else timeFlg=1;
    window.setTimeout(function () {
        for (var i = 0; i < tripsArr.length; i++) {
            if (i == tripsArr.length - 1) fin = "on";
            addMarkerWithTimeout(tripsArr[i], i * timeFlg, fin);
        }
    }, 400);
    init=false;
}

function addMarkerWithTimeout(trips, timeout, fin) {
    var myIcon = new google.maps.MarkerImage("/images/marker4.png", null, null, null, new google.maps.Size(35, 35));

    window.setTimeout(function () {

        //console.log(trips);

        var lat = trips.t_lat * 1,
            lng = trips.t_lng * 1;

        //CREATE MARKER SPACING TIME 350
        var marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            title: trips.t_contry,
            zIndex: trips.t_idx,
            icon: myIcon,
           // animation: animation,
            content: trips.t_content
        });


        //MARKER CLICK ACTION
        marker.addListener('click', function () {

            var infowindow = new google.maps.InfoWindow({
                content: this.content,
                maxWidth: 200
            });

            this.setPosition(new google.maps.LatLng(this.position.lat(), this.position.lng()));
            infowindow.open(map, this);

            if (prev_info) {
                prev_info.close();
                prev_marker.setAnimation(null);
            }

            this.setAnimation(animation);
            prev_marker = this;
            prev_info = infowindow;

        });

        markers.push(marker);

        if (fin == "on") {
            for (var i = 0; i < markers.length; i++) {
                clearAnimation(markers[i], i * 170);
            }
        }

    }, timeout);
}

//CLEAR ANIMATION
function clearAnimation(mark, timeout) {
    window.setTimeout(function () {
        mark.setAnimation(null);
    }, timeout);
};

//CLEAR MARKERS
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function getMapBounds(map) {
    var mapBound = {};
    mapBound.slat = map.getBounds().getSouthWest().lat();
    mapBound.slng = map.getBounds().getSouthWest().lng();
    mapBound.elat = map.getBounds().getNorthEast().lat();
    mapBound.elng = map.getBounds().getNorthEast().lng();

    if (mapBound.elng > -179 && mapBound.elng < 0) {
        mapBound.elng = 360 + mapBound.elng;
    }

    return mapBound;
};