window.onload = function initMap() {

    var stationsLocations = new Array([]);

    $(document).ready(function () {

        $.getJSON("/templates/other/stationlocations.json", function (result) {
            $.each(result, function (i, line) {
                stationsLocations[i] = [
                    line.No,
                    line.Name,
                    line.Latitude,
                    line.Longitude
                ];
            });
        });

    });
    var phoenixHouseLocation = {
        lat: 53.342067,
        lng: -6.251720
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: phoenixHouseLocation
    });

    setTimeout(function () {
        for (var i = 0; i < stationsLocations.length; i++) {
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' +
                'No. ' +
                stationsLocations[i][0] +
                '<br>' +
                stationsLocations[i][1] +
                '</h1>';

            var infoWindow = new google.maps.InfoWindow({});

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(stationsLocations[i][2], stationsLocations[i][3]),
                map: map,
                title: stationsLocations[i][1],
                contentString: contentString
            });

            marker.addListener('click', function () {
                infoWindow.setContent(this.contentString);
                infoWindow.open(map, this);
                map.panTo(this.getPosition())
            })
        }
    }, 100);
};

document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAN-k2Z0JpTVPPzGkt61YImxgxTf4PUzk0&callback=initMap"></script>')

function showDiv(targetID) {
    document.getElementById("container-stations").style.display = "none";
    document.getElementById("container-emission").style.display = "none";
    document.getElementById("container-monitor").style.display = "none";
    document.getElementById("container-about").style.display = "none";

    document.getElementById(targetID).style.display = "block";
    google.maps.event.trigger(map, 'resize')
}
