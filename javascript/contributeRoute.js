var fireBaseRef = firebase.database().ref('routes');
var walkForm = document.querySelector("[data-walk='form']");
var poiForm = document.querySelector("[data-poi='form']");
var poiAddress = document.querySelector("[name='next-poi']");
var userID = document.querySelector("[name='user']");
var title = document.querySelector("[name='contributer_title']");
var address = document.querySelector("[name='start_address']");
var city = document.querySelector("[name='walk_city']");
var state = document.querySelector("[name='walk_state']");
var description = document.querySelector("[name='contributer_description']");
var thumbnail = document.querySelector("[name='contributer_thumbnail']");
var mapContainer = document.querySelector(".map");
var map;
var localRoute;
var localRouteRef;
var localMarkersList = [];

var geoURL = function(str, cty, ste) {
    var geoURLResponse = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + str + ',' + cty + ',' + ste + '&key=AIzaSyDDFmtGsZQUblhJEuXo9YNrN6pFO_tfiW0';
    return geoURLResponse;
}

var initMap = function(location, zoomLevel) {
    map = new google.maps.Map(mapContainer, {
        center: location,
        zoom: zoomLevel
    });
    addPOIMarker(location, map);
}

var addPOIMarker = function(poi, map) {
    var marker = new google.maps.Marker({
        position: poi,
        map: map
    });
    return marker
}

var getGeoLocation = function(url) {
    return fetch(url, {
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        return data['results'][0].geometry.location;
    })
    .catch(function(error){
        console.log(error);
    })
}

var addPOI = function(event) {
    event.preventDefault();
    var markerLocation = getGeoLocation(geoURL(poiAddress, localRoute['city'], localRoute['state']));
    markerLocation.then(function(data){
        addPOIMarker(data, map);
        localRoute['pois'].push(data);
        localRouteRef.set(localRoute);
        poiForm.reset();
    });
}

var recordWalk = function(event) {
    event.preventDefault();
    var mapLocation = getGeoLocation(geoURL(address.value, city.value, state.value));
    mapLocation.then(function(data){
        initMap(data, 15);
        var currentWalk = {
            "userID": userID.value,
            "title": title.value,
            "address": address.value,
            "city": city.value,
            "state": state.value,
            "description": description.value,
            "thumbnail": thumbnail.value,
            "startLocation": data,
            "pois": [data]
        };
        var walkObject = fireBaseRef.push()
        walkObject.set(currentWalk);
        localRouteRef = walkObject;
        localRoute = currentWalk;
        walkForm.reset();
    })
};

walkForm.addEventListener("submit", recordWalk);
poiForm.addEventListener("submit", addPOI);