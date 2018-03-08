var fireBaseRef = firebase.database().ref('routes');
var walkForm = document.querySelector("[data-walk='form']");
var userID = document.querySelector("[name='user']");
var title = document.querySelector("[name='contributer_title']");
var address = document.querySelector("[name='start_address']");
var city = document.querySelector("[name='walk_city']");
var state = document.querySelector("[name='walk_state']");
var description = document.querySelector("[name='contributer_description']");
var thumbnail = document.querySelector("[name='contributer_thumbnail']");
var mapContainer = document.querySelector(".map")


var geoURL = function(str, cty, ste) {
    var geoURLResponse = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + str.value + ',' + cty.value + ',' + ste.value + '&key=AIzaSyDDFmtGsZQUblhJEuXo9YNrN6pFO_tfiW0';
    return geoURLResponse;
}

var initMap = function(location, zoomLevel) {
    console.log("I ran! ... so far away")
    var map = new google.maps.Map(mapContainer, {
        center: location,
        zoom: zoomLevel
});
}
var getGeoLocation = function(URL) {
    return fetch(URL, {
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

var recordWalk = function(event) {
    event.preventDefault();
    console.log(geoURL(address, city, state));
    var mapLocation = getGeoLocation(geoURL(address, city, state));
    mapLocation.then(function(data){
        initMap(data, 17);
        var currentWalk = {
            "userID": userID.value,
            "title": title.value,
            "address": address.value,
            "city": city.value,
            "state": state.value,
            "description": description.value,
            "thumbnail": thumbnail.value,
            "startLocation": data
        };
        fireBaseRef.push().set(currentWalk);
        walkForm.reset();
    })
};

walkForm.addEventListener("submit", recordWalk);
