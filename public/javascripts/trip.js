     
     
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
                ['후쿠오카', 33.590166, 130.451451, 4, '일본'],
                ['오사카', 34.666849, 135.501580, 5, '오사카'],
            ];
            var zIdx = 0;
            var g_title="";
            for (var i = 0; i < tripsArr.length; i++) {
                var trips = tripsArr[i];

                var marker = new google.maps.Marker({
                    position: { lat: trips[1], lng: trips[2] },
                    map: map,
                    title: trips[0],
                    zIndex: trips[3],
                    animation: google.maps.Animation.DROP,
                    draggable:true,
                    title: trips[4]                
                });

               console.dir(marker);
                var infowindow = new google.maps.InfoWindow({
                    content: g_title
                });

                marker.addListener('click', function () {
                    console.log(this);
                    zIdx = this.zIndex;
                    g_title = this.title;
                    console.log(g_title);
                   // console.dir( tripsArr[zIdx-1][4] )
                    this.setPosition(new google.maps.LatLng(latitude, longitude));
                   infowindow.open();
                    //infowindow.open(map, marker);
                });

           
               
            }


        }