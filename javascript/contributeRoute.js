var fireBaseRef = firebase.database();
var fireBaseRoutes = fireBaseRef.ref('routes');
var walkForm = document.querySelector("[data-walk='form']");
var poiForm = document.querySelector("[data-poi='form']");
var poiAddress = document.querySelector("[name='next-poi']");
var poiTitle = document.querySelector("[name='poi_title']");
var poiContent = document.querySelector("[name='poi_content']");
var startTitle = document.querySelector("[name='start_title']");
var startContent = document.querySelector("[name='start_content']");
var userID = document.querySelector("[name='user']");
var title = document.querySelector("[name='contributer_title']");
var address = document.querySelector("[name='start_address']");
var city = document.querySelector("[name='walk_city']");
var state = document.querySelector("[name='walk_state']");
var description = document.querySelector("[name='contributer_description']");
var thumbnail = document.querySelector("[name='contributer_thumbnail']");
var mapContainer = document.querySelector(".map");
var boundsContainer = document.getElementById('mapBounds');
var localRoute;
var localRouteRef;
var map;

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
    google.maps.event.addListener(map, function() {
        addPOIMarker();
        });
        
    return map;
}

var addPOIMarker = function(poi) {
    var marker = new google.maps.Marker({
        position: poi,
        map: map,
    });
}

var getGeoLocation = function(googleUrl) {
    return fetch(googleUrl, {
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
    var markerLocation = getGeoLocation(geoURL(poiAddress.value, localRoute['city'], localRoute['state']));
    markerLocation.then(function(data){
        currentPOI = {
            "location": data,
            "title": poiTitle,
            "content": poiContent,
        }
        localRoute['pois'].push(currentPOI);
        fireBaseRef.ref('routes/' + localRouteRef['key'] + '/pois').set(localRoute['pois']);
        addPOIMarker(data);
        poiForm.reset();
    });
}

var recordWalk = function(event) {
    event.preventDefault();
    var mapLocation = getGeoLocation(geoURL(address.value, city.value, state.value));
    mapLocation.then(function(data){
        var currentWalk = {
            "userID": userID.value,
            "title": title.value,
            "address": address.value,
            "city": city.value,
            "state": state.value,
            "description": description.value,
            "thumbnail": thumbnail.value,
            "startLocation": data,
            "pois": [{
                "location": data,
                "title": startTitle.value,
                "content": startContent.value,
            },]
        };
        var walkObject = fireBaseRoutes.push()
        walkObject.set(currentWalk);
        localRouteRef = walkObject;
        localRoute = currentWalk;
        initMap(data, 15);
        walkForm.reset();
    })
};

walkForm.addEventListener("submit", recordWalk);
poiForm.addEventListener("submit", addPOI);