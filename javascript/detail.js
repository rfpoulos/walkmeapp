var fireBaseRef = firebase.database().ref('routes');
var objectId = '-L7LE7Sokvs9dj9mTGmg';
var fireBaseObject = firebase.database().ref('routes/' + objectId);

var docTitle = document.getElementById('title');
var docDesc = document.getElementById('description');
var docAddress = document.getElementById('address');
var docCity = document.getElementById('city');
var docState = document.getElementById('state');
var docUserId = document.getElementById('userId');
var userImage = document.getElementById('user-image');
var mapContainer = document.querySelector(".map");

var navigate = document.getElementById('navigate');

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

var titleContentDOM = function(title, content) {
    var poiContainer = document.createElement('div');

    var contentDiv = document.createElement('h4');
    contentDiv.classList.add('poi-content');
    contentDiv.textContent = content;

    var titleDiv = document.createElement('h2');
    titleDiv.classList.add('poi-title');
    titleDiv.textContent = title;

    poiContainer.appendChild(titleDiv);
    poiContainer.appendChild(contentDiv);

    return poiContainer;
}

var addPOIMarker = function(poi, poiTitle, poiContent) {
    var marker = new google.maps.Marker({
        position: poi,
        map: map,
    });
    poiContainer = titleContentDOM(poiTitle, poiContent);
    var infowindow = new google.maps.InfoWindow({
        content: poiContainer.innerHTML,
      });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
var openGoogleMaps = function(pois) {
    var googleUrl = 'http://maps.google.com/maps?dirflg=w&saddr=' + pois[0]['location']['lat'] + ',' + pois[0]['location']['lng'] +
                         '&daddr=' + pois[1]['location']['lat'] + ',' + pois[1]['location']['lng'];
    for (var i = 2; i < pois.length; i++) {
        googleUrl = googleUrl + '+to:' + pois[i]['location']['lat'] + ',' + pois[i]['location']['lng'];
    }
    console.log(googleUrl);
    var win = window.open(googleUrl);
    win.focus();
}
fireBaseObject.on("value", function(snapshot) {
    var map;
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
    navigate.addEventListener("click", function(){
        openGoogleMaps(pois);
    });
});