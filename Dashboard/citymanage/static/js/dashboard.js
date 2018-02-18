window.onload = function initMap() {

    var stations_locations = new Array([]);

    $(document).ready(function () {

        $.getJSON("/templates/other/stationlocations.json", function (result) {
            $.each(result, function (i, line) {
                stations_locations[i] = [
                    line.No,
                    line.Name,
                    line.Latitude,
                    line.Longitude
                ];
            });
        });

    });
    var my_place = {
        lat: 53.342067,
        lng: -6.251720
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: my_place
    });

    setTimeout(function () {
        for (var i = 0; i < stations_locations.length; i++) {
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' +
                'No. ' +
                stations_locations[i][0] +
                '<br>' +
                stations_locations[i][1] +
                '</h1>';

            var info_window = new google.maps.InfoWindow({});

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(stations_locations[i][2], stations_locations[i][3]),
                map: map,
                title: stations_locations[i][1],
                contentString: contentString
            });

            marker.addListener('click', function () {
                info_window.setContent(this.contentString);
                info_window.open(map, this);
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
