     
     
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
                ['방콕', 13.747427, 100.495992, 1, '방콕곡'],
                ['홍콩', 22.294200, 114.171576, 2, '홍콩'],
                ['상하이', 31.229787, 121.471683, 3, '상하이다'],
                ['후쿠오카', 33.590166, 130.451451, 4, '후쿠오카에갔었다.'],
                ['오사카', 34.666849, 135.501580, 5, '오사카'],
                ['도쿄', 35.721528, 139.731760, 6, '도쿄'],
                ['영국', 51.515314, -0.128383, 7, '런던'],
                ['독일', 49.403864, 8.677218, 8, '하이델베트크'],
                ['독일', 49.793155, 9.936204, 9, '뷔르츠부르크'],
                ['독일', 49.452960, 11.082553, 10, '뉘른베르크'],
                ['스위스', 47.371126, 8.541049, 11, '취리히'],
                ['스위스', 47.049253, 8.313032, 12, '루체른'],

                

            ];
            var zIdx = 0;
            var prev;

            for (var i = 0; i < tripsArr.length; i++) {
                var trips = tripsArr[i];

                var marker = new google.maps.Marker({
                    position: { lat: trips[1], lng: trips[2] },
                    map: map,
                    title: trips[0],
                    zIndex: trips[3],
                    animation: google.maps.Animation.DROP,
                    title: trips[4]                
                });


                marker.addListener('click', function () {

                    var infowindow = new google.maps.InfoWindow({
                        content: this.title
                    });

                    zIdx = this.zIndex;
                    g_title = this.title;

                    this.setPosition(new google.maps.LatLng(this.position.lat(), this.position.lng()));
                    infowindow.open(map, this);
                    if(prev) prev.close();
                    prev = infowindow;

                });
               
            }


        }