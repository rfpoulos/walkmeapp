var fireBaseRef = firebase.database().ref('routes');
var objectId = '-L7HAst3wa6jy74QFb5m';
var fireBaseObject = firebase.database().ref('routes/' + objectId);

var docTitle = document.getElementById('title');
var docDesc = document.getElementById('description');
var docAddress = document.getElementById('address');
var docCity = document.getElementById('city');
var docState = document.getElementById('state');
var docUserId = document.getElementById('userId');
var userImage = document.getElementById('user-image');
var mapContainer = document.querySelector(".map");
var map;

var adjustMap = function(locationsArray){
    var bounds = new google.maps.LatLngBounds();
    locationsArray.forEach(function(element){
        bounds.extend(element['location']);
    })
    map.fitBounds(bounds);
}

var initMap = function(location, pois, zoomLevel) {
    map = new google.maps.Map(mapContainer, {
        center: location,
        zoom: zoomLevel,
    });
    pois.forEach(function(element){
        addPOIMarker(element['location'], element['title'], element['content']);
    });
    return map;
}

var addPOIMarker = function(poi, poiTitle, poiContent) {
    var marker = new google.maps.Marker({
        position: poi,
        map: map,
    });
    var poiContainer = document.createElement('div');

    var contentDiv = document.createElement('div');
    contentDiv.classList.add('poi-content');
    contentDiv.textContent = poiContent;

    var titleDiv = document.createElement('div');
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
fireBaseObject.on("value", function(snapshot) {
    docTitle.textContent = snapshot.val()['title'];
    docDesc.textContent = snapshot.val()['description'];
    docAddress.textContent = snapshot.val()['address'];
    docCity.textContent = snapshot.val()['city'];
    docState.textContent = snapshot.val()['state'];
    docUserId.textContent = snapshot.val()['userID'];
    userImage.src = snapshot.val()['thumbnail'];
    var startLocation = snapshot.val()['startLocation'];
    var pois = snapshot.val()['pois'];
    initMap(startLocation, pois, 15);
    adjustMap(pois);
});