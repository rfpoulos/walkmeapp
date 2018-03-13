var fireBaseRef = firebase.database();
var fireBaseRoutes = fireBaseRef.ref('routes');
var walkForm = document.querySelector("[data-walk='form']");
var poiForm = document.querySelector("[data-poi='form']");
var poiAddress = document.querySelector("[name='poi-address']");
var poiTitle = document.querySelector("[name='poi-title']");
var poiContent = document.querySelector("[name='poi-content']");
var userID = document.querySelector("[name='user']");
var title = document.querySelector("[name='contributer_title']");
var poiCity = document.querySelector("[name='poi-city']");
var poiState = document.querySelector("[name='poi-state']");
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
    var markerLocation = getGeoLocation(geoURL(poiAddress.value, poiCity.value, poiState.value));
    markerLocation.then(function(data){
        currentPOI = {
            "location": data,
            "title": poiTitle.value,
            "content": poiContent.value,
        }
        if (localRoute['pois'] === null) {
            localRoute['pois'] = [];
            localRoute['pois'].push(currentPOI);
            initMap(currentPOI['location'], currentPOI['title'], currentPOI['content'], 15);
        } else{
            localRoute['pois'].push(currentPOI);
            adjustMap(localRoute['pois']);
            addPOIMarker(data, currentPOI['title'], currentPOI['content']);
        }
        poiForm.reset();
        });
    };

var checkForUserUpload = function(value) {
    if (value) {
        return (value).match(/[-_\w]+[.][\w]+$/i)[0]
    }
    else{
        return null;
    }
}

var recordWalk = function(event) {
    event.preventDefault();
        var currentWalk = {
            "userID": userID.value,
            "title": title.value,
            "description": description.value,
            "thumbnail": checkForUserUpload(thumbnail.value),
            "public": false,
            "distance": null,
            "duration": null,
            "rating": 0,
            "raters": 0,
            "pois": null,
        };
        localRoute = currentWalk;
        walkForm.reset();
        poiForm.addEventListener("submit", addPOI);
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

var preview_image = function(event) 
{
 var reader = new FileReader();
 reader.onload = function()
 {
  var output = document.getElementById('output_image');
  output.src = reader.result;
 }
 reader.readAsDataURL(event.target.files[0]);
}

walkForm.addEventListener("submit", recordWalk);
reviewButton.addEventListener("click", function() {
    calcRoute(localRoute['pois']);
});