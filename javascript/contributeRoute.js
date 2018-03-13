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
var reviewButton = document.getElementById('review');
var localRoute;
var map;

var geoURL = function(str, cty, ste) {
    var geoURLResponse = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + str + ',' + cty + ',' + ste +
                            '&key=AIzaSyDDFmtGsZQUblhJEuXo9YNrN6pFO_tfiW0';
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
        title: poiTitle.value,
    });

    var poiContainer = titleContentDOM(poiTitle, poiContent);

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

var getGeoLocation = function(distanceURL) {
    return fetch(distanceURL, {
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
            "distance": null,
            "duration": null,
            "rating": 0,
            "raters": 0,
            "pois": [{
                "location": data,
                "title": startTitle.value,
                "content": startContent.value,
            }]
        };
        localRoute = currentWalk;
        initMap(data, startTitle.value, startContent.value, 15);
        walkForm.reset();
    })
};

var calcRoute = function(pois) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    newWaypoints = [];
    for (var i = 1; i < pois.length - 1; i++) {
        newWaypoints.push({
            location: pois[i]['location'],
            stopover: true,
        })
    };

    var request = {
      origin: pois[0]['location'],
      destination: pois[pois.length - 1]['location'],
      travelMode: 'WALKING',
      waypoints: newWaypoints,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    };
    directionsService.route(request, function(result, status) {
        var totalDistance = 0;
        var totalTime = 0;
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            result['routes'][0]['legs'].forEach(function(element){
                totalDistance += element['distance']['value'];
                totalTime += element['duration']['value'];
            })
        }
        localRoute['distance'] = metersToMiles(totalDistance);
        localRoute['duration'] = secondsToMinutes(totalTime);
        saveWalktoFirebase(localRoute);
    });
}

var saveWalktoFirebase = function(walk) {
    fireBaseRoutes.push().set(walk);
}

var metersToMiles = function(number) {
    return number / 1609.344;
}
var secondsToMinutes = function(number) {
    return Math.round(number / 60);
}

walkForm.addEventListener("submit", recordWalk);
poiForm.addEventListener("submit", addPOI);
reviewButton.addEventListener("click", function() {
    calcRoute(localRoute['pois']);
});
//image uploader
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('thumbnail');

fileButton.addEventListener('change', function(e) {
    var file = e.target.files[0];
    console.log("1 done")
    //telling firebase where to store the image
    var storageRef = firebase.storage().ref('test/' + file.name);
    //upload
    var task = storageRef.put(file);

    task.on('state_changed', 
      function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred / 
          snapshot.totalBytes) * 100;
          uploader.value = percentage;
  },
  function error(err) {

  },
  function complete() {

  }
  );
});