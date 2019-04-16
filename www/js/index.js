let scot0359 = {

    markers: [],

    init: function () {
        document.addEventListener("deviceready", scot0359.getPosition);
    },

    initMap: function (lat, long) {
        let map;

        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: lat, //45.3496711,
                lng: long //-75.7569551
            },

            disableDoubleClickZoom: true,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });


        map.addListener("dblclick", function (ev) {

            let label = scot0359.getLabel();
            
            if (label === null) {
                return;
            }

            let marker = new google.maps.Marker({
                position: {
                    lat: ev.latLng.lat(),
                    lng: ev.latLng.lng()
                },
                map: map,
                animation: google.maps.Animation.DROP,
                id: Date.now()
            })
            scot0359.markers.push(marker);

            console.log("marker id:" + marker.id);

            let infoWindow = new google.maps.InfoWindow({
                content: `<h1>${label}</h1><button onclick="scot0359.deleteMarker()">Remove</button>`
            });
            
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });

            let newMarker = {
                Lat: marker.position.lat(),
                Lng: marker.position.lng()
            };

            for (let i = 0; i < newMarker.length; i++) {
                localStorage["marker"] = JSON.stringify(newMarker[i]);
            }
            console.log(localStorage["marker"]);
        });
    },

    deleteMarker: function() {
        for (i = 0; i < scot0359.markers.length; i++) {
            scot0359.markers[i].setMap(null);
        }
    },

    getLabel: function () {
        let iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        let labelText = window.frames[0].window.prompt("Label for marker", "");
        iframe.parentNode.removeChild(iframe);
        return labelText;
    },

    getPosition: function () {
        if (navigator.geolocation) {
            let giveUp = 1000 * 30; //30 seconds
            let maxAge = 1000 * 60 * 60; //one hour
            options = {
                enableHighAccuracy: true,
                timeout: giveUp,
                maximumAge: maxAge,
            }
            navigator.geolocation.getCurrentPosition(scot0359.gotPos, scot0359.posFail, options);
        }
    },

    gotPos: function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat, long);
        scot0359.initMap(lat, long);

    },

};

scot0359.init();