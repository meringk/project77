     
     
     var initLat =  50.146703,
         initLng =87.462226
         initZoom = 3;
     
        if (skel.vars.mobile){
            initLat = 50.146703
            initLng = 87.462226
            initZoom = 1
        }


        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('googleMap'), {
                center: { lat: initLat, lng: initLng},
                zoom:initZoom
            });

            setMarkers(map);
        }



        function setMarkers(map) {

            var tripsArr = [
                ['상하이', 31.229787, 121.471683, 4, '상하이다'],
                ['후쿠오카', 33.590166, 130.451451, 5, '일본'],
                ['오사카', 34.666849, 135.501580, 3, '오사카'],
                ['홍콩', 22.294200, 114.171576, 2, '홍콩'],
                ['방콕', 13.747427, 100.495992, 1, '방콕곡']
            ];
            for (var i = 0; i < tripsArr.length; i++) {
                var trips = tripsArr[i];
                console.dir(trips);
                var marker = new google.maps.Marker({
                    position: { lat: trips[1], lng: trips[2] },
                    map: map,
                    title: trips[0],
                    zIndex: trips[3]
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

                var infowindow = new google.maps.InfoWindow({
                    content: trips[4]
                });
            }

        }