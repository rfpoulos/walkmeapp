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
var localRoute;
var localRouteRef;
var map;

var geoURL = function(str, cty, ste) {
    var geoURLResponse = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + str + ',' + cty + ',' + ste + '&key=AIzaSyDDFmtGsZQUblhJEuXo9YNrN6pFO_tfiW0';
    return geoURLResponse;
}

var initMap = function(location, title, content, zoomLevel) {
    map = new google.maps.Map(mapContainer, {
        center: location,
        zoom: zoomLevel,
    });
    addPOIMarker(location, title, content);
    google.maps.event.addListener(map, function() {
        addPOIMarker();
        fitBounds();
        });
        
    return map;
}

var addPOIMarker = function(poi, poiTitle, poiContent) {
    var marker = new google.maps.Marker({
        position: poi,
        map: map,
        title: poiTitle.value,
    });
    var poiContainer = document.createElement('div');

    var contentDiv = document.createElement('h4');
    contentDiv.classList.add('poi-content');
    contentDiv.textContent = poiContent;

    var titleDiv = document.createElement('h2');
    titleDiv.classList.add('poi-title');
    titleDiv.textContent = poiTitle;

    poiContainer.appendChild(titleDiv);
    poiContainer.appendChild(contentDiv);

    var infowindow = new google.maps.InfoWindow({
        content: poiContainer.innerHTML,
      });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

var adjustMap = function(locationsArray){
    var bounds = new google.maps.LatLngBounds();
    locationsArray.forEach(function(element){
        bounds.extend(element['location']);
    })
    map.fitBounds(bounds);
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
            "title": poiTitle.value,
            "content": poiContent.value,
        }
        localRoute['pois'].push(currentPOI);
        fireBaseRef.ref('routes/' + localRouteRef['key'] + '/pois').set(localRoute['pois']);
        adjustMap(localRoute['pois']);
        addPOIMarker(data, currentPOI['title'], currentPOI['content']);
        poiForm.reset();
        });
    };

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
            "public": false,
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
        initMap(data, startTitle.value, startContent.value, 15);
        walkForm.reset();
    })
};

walkForm.addEventListener("submit", recordWalk);
poiForm.addEventListener("submit", addPOI);