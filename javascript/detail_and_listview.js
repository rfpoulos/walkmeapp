var listViewSelector = document.getElementById('listview')
var detailViewSelector = document.getElementById('modal')
var objectId = '';

var createListView = function () {
    var dbRoutes = firebase.database().ref('routes');
    dbRoutes.on('value', function(data){
        data.forEach(function(child){
            var routeCard = createRouteCardSkeleton(child);
            listViewSelector.appendChild(routeCard);
            routeCard.addEventListener('click', function(){
                listViewSelector.className = "viewable-off";
                objectId = child.key;
                makeDetailView(objectId);
                detailViewSelector.className = "viewable-on"
            })
        })
    })
}

var getDistanceFromValue = function() {
    // This function will need to calculate distance
    // between tour and user location in the future
};

var getAmountOfStars = function() {
    // Creates number of stars based on overall rating
    // Blocked on getting value out
    // var starAmount = 4;
    // for(var i =0;i <= starAmount;i++) {

    // }
};

var createRouteCardSkeleton = function(object) {
    var dbTitleRef = object.val().title;
    var dbDistanceFromRef = 1.2; // placeholder value

    var dbAddressRef = object.val().address;
    var dbCityRef = object.val().city;
    var dbStateRef = object.val().state;

    var dbRatingRef = object.val().rating;
    var dbReviewsRef = object.val().raters;

    var dbTimeRef = object.val().duration;
    var dbLengthRef = object.val().distance.toFixed(2);
    
    var dbUserIdRef = object.val().userID;

    var divRouteContainer = document.createElement('div');
    divRouteContainer.setAttribute("class", "route-container");

    var divImageSection = document.createElement('div');
    divImageSection.setAttribute("class", "image-section");
    divRouteContainer.appendChild(divImageSection);

    var divInfoSection = document.createElement('div');
    divInfoSection.setAttribute("class", "info-section");
    divRouteContainer.appendChild(divInfoSection);

    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', 'images/griff.jpg');
    imgTag.setAttribute('class', 'user-image');
    divImageSection.appendChild(imgTag);

    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', 'images/fav.png');
    imgTag.setAttribute('class', 'favorite-on');
    divImageSection.appendChild(imgTag);

    var divTitleAndDistance = document.createElement('div');
    divTitleAndDistance.setAttribute("class", "title-and-distancefrom");
    divInfoSection.appendChild(divTitleAndDistance);

    var divReviews = document.createElement('div');
    divReviews.setAttribute("class", "reviews");
    divInfoSection.appendChild(divReviews);

    var divAddress = document.createElement('div');
    divAddress.setAttribute("class", "address");
    divInfoSection.appendChild(divAddress);

    var divRouteTimeAndLength = document.createElement('div');
    divRouteTimeAndLength.setAttribute("class", "route-time-and-length");
    divInfoSection.appendChild(divRouteTimeAndLength);

    var divContributer = document.createElement('div');
    divContributer.setAttribute("class", "contributer");
    divInfoSection.appendChild(divContributer);

    var divRouteTitle = document.createElement('div');
    divRouteTitle.setAttribute("class", "route-title");
    divRouteTitle.textContent = dbTitleRef;
    divTitleAndDistance.appendChild(divRouteTitle);

    var divDistanceFrom = document.createElement('div');
    divDistanceFrom.setAttribute("class", "distancefrom");
    divTitleAndDistance.appendChild(divDistanceFrom);

    var divDistanceIcon = document.createElement('div');
    divDistanceIcon.setAttribute("class", "distancefrom-icon");
    divDistanceFrom.appendChild(divDistanceIcon);

    var imgDistanceIcon = document.createElement('img');
    imgDistanceIcon.setAttribute("class", "nearme");
    imgDistanceIcon.setAttribute("src", "images/nearme.png");
    divDistanceIcon.appendChild(imgDistanceIcon);

    var divDistanceNumber = document.createElement('div');
    divDistanceNumber.setAttribute("class", "distancefrom-number");
    divDistanceNumber.textContent = dbDistanceFromRef + ' mi';
    divDistanceFrom.appendChild(divDistanceNumber);

    var divReviewStars = document.createElement('div');
    divReviewStars.setAttribute("class", "review-stars");
    var imgReviewStars = document.createElement('img');
    imgReviewStars.setAttribute('src', 'images/fullstar.png');
    imgReviewStars.setAttribute('class', 'stars');
    divReviews.appendChild(divReviewStars);
    divReviewStars.appendChild(imgReviewStars);

    var divNumberOfReviews = document.createElement('div');
    divNumberOfReviews.setAttribute("class", "number-of-reviews");
    divNumberOfReviews.textContent = dbReviewsRef + " Reviews";
    divReviews.appendChild(divNumberOfReviews);

    var imgPlaceIcon = document.createElement('img');
    imgPlaceIcon.setAttribute('src', 'images/place_small.png');
    imgPlaceIcon.setAttribute('class', 'place-icon');
    divAddress.appendChild(imgPlaceIcon);

    var divAddressInfo = document.createElement('div');
    divAddressInfo.setAttribute('class', 'address-info');
    divAddressInfo.textContent = dbAddressRef + '\r\n';
    divAddressInfo.textContent += dbCityRef + ", " + dbStateRef;
    divAddress.appendChild(divAddressInfo);

    var imgRouteIcon = document.createElement('img');
    imgRouteIcon.setAttribute('src', 'images/route_small.png');
    imgRouteIcon.setAttribute('class', 'route-icon');
    divRouteTimeAndLength.appendChild(imgRouteIcon);

    var divTimeAndLengthInfo = document.createElement('div');
    divTimeAndLengthInfo.setAttribute('class', 'time-and-length-info');
    divTimeAndLengthInfo.textContent = dbTimeRef + " mins / " + dbLengthRef + " mi";
    divRouteTimeAndLength.appendChild(divTimeAndLengthInfo);

    var imgContributerIcon = document.createElement('img');
    imgContributerIcon.setAttribute('src', 'images/contributer_small.png');
    imgContributerIcon.setAttribute('class', 'contributer-icon');
    divContributer.appendChild(imgContributerIcon);

    var divContributerName = document.createElement('div');
    divContributerName.setAttribute('class', 'contributer-name');
    divContributerName.textContent = dbUserIdRef;
    divContributer.appendChild(divContributerName);

    return divRouteContainer;
};

var makeDetailView = function(id) {
    var fireBaseObject = firebase.database().ref('routes/' + id);

    var docTitle = document.getElementById('title');
    var docDesc = document.getElementById('description');
    var docAddress = document.getElementById('address');
    var docCity = document.getElementById('city');
    var docState = document.getElementById('state');
    var docUserId = document.getElementById('userId');
    var userImage = document.getElementById('user-image');
    var mapContainer = document.querySelector(".map");

    var navigate = document.getElementById('navigate');
    var returnBtnSelector = document.querySelector(".back-to-list");


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
        getWalkerLocation();
        navigate.addEventListener("click", function(){
            openGoogleMaps(pois);
        }); 
    });

    returnBtnSelector.addEventListener('click', function() {
        console.log('working');
    })
}

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
    var poiContainer = titleContentDOM(poiTitle, poiContent);
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

var getWalkerLocation = function() {
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        addPOIMarker(pos, 'You are here', '');
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

createListView();





