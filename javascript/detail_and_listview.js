var listViewSelector = document.getElementById('listview');
var detailViewSelector = document.getElementById('modal');
var mapContainer = document.querySelector(".map");
var map;
var walkerLocation = null;

var createListView = function () {
    var dbRoutes = firebase.database().ref('routes');
    dbRoutes.on('value', function(data){
        data.forEach(function(child){
            var routeCard = createRouteCardSkeleton(child, walkerLocation);
            listViewSelector.appendChild(routeCard);
            routeCard.addEventListener('click', function(){
                listViewSelector.className = "viewable-off";
                var objectId = child.key;
                makeDetailView(objectId);
                detailViewSelector.className = "viewable-on"
            })
        })
    })
}

var getAmountOfStars = function(div) {
    var starAmount = 3;
    var imgReviewStars1 = document.createElement('img');
    imgReviewStars1.setAttribute('class', 'stars');
    var imgReviewStars2 = document.createElement('img');
    imgReviewStars2.setAttribute('class', 'stars');
    var imgReviewStars3 = document.createElement('img');
    imgReviewStars3.setAttribute('class', 'stars');
    var imgReviewStars4 = document.createElement('img');
    imgReviewStars4.setAttribute('class', 'stars');
    var imgReviewStars5 = document.createElement('img');
    imgReviewStars5.setAttribute('class', 'stars');
    
    if (starAmount === 1) {
        imgReviewStars1.setAttribute('src', 'images/fullstar.png');
        imgReviewStars2.setAttribute('src', 'images/emptystar.png');
        imgReviewStars3.setAttribute('src', 'images/emptystar.png');
        imgReviewStars4.setAttribute('src', 'images/emptystar.png');
        imgReviewStars5.setAttribute('src', 'images/emptystar.png');
    } else if (starAmount === 2) {
        imgReviewStars1.setAttribute('src', 'images/fullstar.png');
        imgReviewStars2.setAttribute('src', 'images/fullstar.png');
        imgReviewStars3.setAttribute('src', 'images/emptystar.png');
        imgReviewStars4.setAttribute('src', 'images/emptystar.png');
        imgReviewStars5.setAttribute('src', 'images/emptystar.png');
    } else if (starAmount === 3) {
        imgReviewStars1.setAttribute('src', 'images/fullstar.png');
        imgReviewStars2.setAttribute('src', 'images/fullstar.png');
        imgReviewStars3.setAttribute('src', 'images/fullstar.png');
        imgReviewStars4.setAttribute('src', 'images/emptystar.png');
        imgReviewStars5.setAttribute('src', 'images/emptystar.png');
    } else if (starAmount === 4) {
        imgReviewStars1.setAttribute('src', 'images/fullstar.png');
        imgReviewStars2.setAttribute('src', 'images/fullstar.png');
        imgReviewStars3.setAttribute('src', 'images/fullstar.png');
        imgReviewStars4.setAttribute('src', 'images/fullstar.png');
        imgReviewStars5.setAttribute('src', 'images/emptystar.png');
    } else if (starAmount === 5) {
        imgReviewStars1.setAttribute('src', 'images/fullstar.png');
        imgReviewStars2.setAttribute('src', 'images/fullstar.png');
        imgReviewStars3.setAttribute('src', 'images/fullstar.png');
        imgReviewStars4.setAttribute('src', 'images/fullstar.png');
        imgReviewStars5.setAttribute('src', 'images/fullstar.png');
    }    
    div.appendChild(imgReviewStars1);
    div.appendChild(imgReviewStars2);
    div.appendChild(imgReviewStars3);
    div.appendChild(imgReviewStars4);
    div.appendChild(imgReviewStars5);
};

var createRouteCardSkeleton = function(object, walkerLoc) {
    var dbTitleRef = object.val().title;
    var walkerLocationTemp = new google.maps.LatLng(32.7590136, -84.3296775);
    var dbStartLocationRef = new google.maps.LatLng(object.val().startLocation.lat,object.val().startLocation.lng);

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
    var distanceFromValue = google.maps.geometry.spherical.computeDistanceBetween(walkerLocationTemp, dbStartLocationRef);
    divDistanceNumber.textContent = (distanceFromValue*= 0.000621371192).toFixed(0) + ' mi';
    divDistanceFrom.appendChild(divDistanceNumber);
    
    var divReviewStars = document.createElement('div');
    divReviewStars.setAttribute("class", "review-stars");
    divReviews.appendChild(divReviewStars);

    getAmountOfStars(divReviewStars);

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
    var navigate = document.querySelector('.back-to-nav');
    var returnBtnSelector = document.querySelector(".back-to-list");
    var ratingSubmit = document.querySelector("[name='submit-rating']");
    var ratingForm = document.querySelector("[data-rating='form']")

    fireBaseObject.on("value", function(snapshot) {
        var walkObject = snapshot.val();
        docTitle.textContent = snapshot.val()['title'];
        docDesc.textContent = snapshot.val()['description'];
        docAddress.textContent = snapshot.val()['address'];
        docCity.textContent = snapshot.val()['city'];
        docState.textContent = snapshot.val()['state'];
        docUserId.textContent = snapshot.val()['userID'];
        userImage.src = snapshot.val()['thumbnail'];
        var startLocation = snapshot.val()['startLocation'];
        var pois = snapshot.val()['pois'];
        if (walkerLocation !== null){
            pois.pop({
                location: walkerLocation,
                title: 'You are here!',
                content: '',
            });
        }
        initMap(pois[0]['location'], pois, 15);
        adjustMap(pois);
        navigate.addEventListener("click", function(event){
            event.preventDefault();
            openGoogleMaps(pois);
        }); 
        ratingSubmit.addEventListener("click", function(event){
            event.preventDefault();
            addRating(walkObject, fireBaseObject);
        });
    });


    returnBtnSelector.addEventListener('click', function() {
        listViewSelector.className = "viewable-on";
        detailViewSelector.className = "viewable-off"
    })
};
var addRating = function(walkObject, database) {
    var checked = document.querySelector("[name='rating']:checked");
    checkedRating = parseInt(checked.value);
    var localWalk = walkObject;
    localWalk['rating'] = localWalk['rating'] + checkedRating;
    localWalk['raters'] = localWalk['raters'] + 1;
    database.set(localWalk);
    console.log(walkObject);
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
    })
    google.maps.event.addListener(map, function() {
        addPOIMarker();
        adjustMap();
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
var openGoogleMaps = function(pois) {
    var googleUrl = 'http://maps.google.com/maps?dirflg=w&saddr=' + pois[0]['location']['lat'] + ',' + pois[0]['location']['lng'] +
                         '&daddr=' + pois[1]['location']['lat'] + ',' + pois[1]['location']['lng'];
    for (var i = 2; i < pois.length; i++) {
        googleUrl = googleUrl + '+to:' + pois[i]['location']['lat'] + ',' + pois[i]['location']['lng'];
    }
    var win = window.open(googleUrl);
    win.focus();
}

var getWalkerLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        walkerLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            }
        })
    }
}

createListView();






