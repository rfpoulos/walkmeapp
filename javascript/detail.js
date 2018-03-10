// alert('connected');
var fireBaseRef = firebase.database().ref('routes');
var objectId = '-L7AaTEf_384qFSsm-OQ';
var fireBaseDescRef = firebase.database().ref('routes/' + objectId + '/description');
var fireBaseAddressRef = firebase.database().ref('routes/' + objectId + '/address');
var fireBaseCityRef = firebase.database().ref('routes/' + objectId + '/city');
var fireBaseStateRef = firebase.database().ref('routes/' + objectId + '/state');
var fireBaseTitleRef = firebase.database().ref('routes/' + objectId + '/title');
var fireBaseUserIdRef = firebase.database().ref('routes/' + objectId + '/userID');
var fireBaseThumbnailRef = firebase.database().ref('routes/' + objectId + '/thumbnail');
var fireBaseObject = firebase.database().ref('routes/' + '-L7BHy02U21wzEpofwxi');

var docTitle = document.getElementById('title');
fireBaseTitleRef.on('value', function(snapshot) {
    docTitle.textContent = snapshot.val();
});

var docDesc = document.getElementById('description');
fireBaseDescRef.on('value', function(snapshot) {
    docDesc.textContent = snapshot.val();
});

var docAddress = document.getElementById('address');
fireBaseAddressRef.on('value', function(snapshot) {
    docAddress.textContent = snapshot.val();
});

var docCity = document.getElementById('city');
fireBaseCityRef.on('value', function(snapshot) {
    docCity.textContent = snapshot.val();
});

var docState = document.getElementById('state');
fireBaseStateRef.on('value', function(snapshot) {
    docState.textContent = snapshot.val();
});

var docUserId = document.getElementById('userId');
fireBaseUserIdRef.on('value', function(snapshot) {
    docUserId.textContent = snapshot.val();
});

var userImage = document.getElementById('user-image');
fireBaseThumbnailRef.on('value', function(snapshot) {
    userImage.src = snapshot.val();
});

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
    var startLocation = snapshot.val()['startLocation'];
    var pois = snapshot.val()['pois'];
    initMap(startLocation, pois, 15);
});