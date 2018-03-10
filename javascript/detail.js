var fireBaseRef = firebase.database().ref('routes');
var objectId = '-L7AaTEf_384qFSsm-OQ';
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

var initMap = function(location, pois, zoomLevel) {
    map = new google.maps.Map(mapContainer, {
        center: location,
        zoom: zoomLevel,
    });
    pois.forEach(function(element){
        addPOIMarker(element['location']);
    });
    return map;
}

var addPOIMarker = function(poi) {
    var marker = new google.maps.Marker({
        position: poi,
        map: map,
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
});