var body = document.querySelector('body');

var createListView = function () {
    var dbRoutes = firebase.database().ref('routes');
    dbRoutes.on('value', function(data){
        data.forEach(function(child){
            var routeCard = createRouteCardSkeleton(child);
            body.appendChild(routeCard);

        })
    })
}

createListView();

var getDistanceFromValue = function(selector) {
    // This function will need to calculate distance
    // between tour and user location in the future
    var calculateDistance = '1.2 mi';
    selector.textContent = calculateDistance;
};

var getAmountOfStars = function() {
    // Creates number of stars based on overall rating
    // Blocked on getting value out

    // var dbRatingRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/rating');
    // dbRatingRef.on('value', snap => reviewsSelector.textContent = snap.val());

};

var getAddressValue = function(address) {
    var dbAddressRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/address');
    var dbCityRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/city');
    var dbStateRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/state');

    dbAddressRef.on('value', function(snapshot) {
        address.textContent = snapshot.val();
        address.textContent += '\r\n';
    });
    dbCityRef.on('value', function(snapshot) {
        address.textContent += snapshot.val();
        address.textContent += ', ';
    });
    dbStateRef.on('value', snap => address.textContent += snap.val());
};

var getLengthAndTime = function(timeAndLength) {
    // Filled with placeholder values
    var dbLengthRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/length');
    var dbTimeRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/time');
    
    dbLengthRef.on('value', function(snapshot) {
        timeAndLength.textContent = snapshot.val();
        timeAndLength.textContent += ' mins / ';
    });
    dbTimeRef.on('value', function(snapshot) {
        timeAndLength.textContent += snapshot.val();
        timeAndLength.textContent += ' mi';
    });
};

var createRouteCardSkeleton = function(object) {
    var dbTitleRef = object.val().title;
    var dbDistanceFromRef = 1.2; // placeholder value

    var dbAddressRef = object.val().address;
    var dbCityRef = object.val().city;
    var dbStateRef = object.val().state;

    var dbRatingRef = object.val().rating;
    var dbReviewsRef = object.val().reviews;

    var dbLengthRef = object.val().length;
    var dbTimeRef = object.val().time;

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
    divReviews.appendChild(divNumberOfReviews);

    var imgPlaceIcon = document.createElement('img');
    imgPlaceIcon.setAttribute('src', 'images/place_small.png');
    imgPlaceIcon.setAttribute('class', 'place-icon');
    divAddress.appendChild(imgPlaceIcon);

    var divAddressInfo = document.createElement('div');
    divAddressInfo.setAttribute('class', 'address-info');
    divAddress.appendChild(divAddressInfo);

    var imgRouteIcon = document.createElement('img');
    imgRouteIcon.setAttribute('src', 'images/route_small.png');
    imgRouteIcon.setAttribute('class', 'route-icon');
    divRouteTimeAndLength.appendChild(imgRouteIcon);

    var divTimeAndLengthInfo = document.createElement('div');
    divTimeAndLengthInfo.setAttribute('class', 'time-and-length-info');
    divRouteTimeAndLength.appendChild(divTimeAndLengthInfo);

    var imgContributerIcon = document.createElement('img');
    imgContributerIcon.setAttribute('src', 'images/contributer_small.png');
    imgContributerIcon.setAttribute('class', 'contributer-icon');
    divContributer.appendChild(imgContributerIcon);

    var divContributerName = document.createElement('div');
    divContributerName.setAttribute('class', 'contributer-name');
    divContributer.appendChild(divContributerName);

    return divRouteContainer;
};








