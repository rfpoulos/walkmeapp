var getTitleValue = function(title) {
    var dbTitleRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/title');
    dbTitleRef.on('value', snap => title.textContent = snap.val());
};

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

var getNumberOfReviewsValue = function(reviews) {
    // Filled with placeholder values
    var dbReviewsRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/reviews');
    dbReviewsRef.on('value', snap => reviews.textContent = snap.val() + ' Reviews');
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

var getUserIdValue = function(user) {
    var dbRef = firebase.database().ref('routes/-L7Aa3dtKeXFFX8SLOTF/userID');
    dbRef.on('value', snap => user.innerText = snap.val());
};

var createRouteCardSkeleton = function() {
    //Creates route-container div
    var body = document.querySelector('body');
    var divRouteContainer = document.createElement('div');
    divRouteContainer.setAttribute("class", "route-container");
    body.appendChild(divRouteContainer);

    //Creates image-section div appened to route-container div
    var containerSelector = document.querySelector('.route-container');
    var divImageSection = document.createElement('div');
    divImageSection.setAttribute("class", "image-section");
    containerSelector.appendChild(divImageSection);

    //Creates info-section div appened to route-container div
    var divInfoSection = document.createElement('div');
    divInfoSection.setAttribute("class", "info-section");
    containerSelector.appendChild(divInfoSection);

    //Appends user img to image-section
    var imageSectionSelector = document.querySelector('.image-section');
    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', 'images/griff.jpg');
    imgTag.setAttribute('class', 'user-image');
    imageSectionSelector.appendChild(imgTag);

    //Appends favorite icon to image-section
    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', 'images/fav.png');
    imgTag.setAttribute('class', 'favorite-on');
    imageSectionSelector.appendChild(imgTag);

    //Appends row containers to info section
    var infoSectionSelector = document.querySelector('.info-section');
    var divTitleAndDistance = document.createElement('div');
    divTitleAndDistance.setAttribute("class", "title-and-distancefrom");
    infoSectionSelector.appendChild(divTitleAndDistance);

    var divReviews = document.createElement('div');
    divReviews.setAttribute("class", "reviews");
    infoSectionSelector.appendChild(divReviews);

    var divAddress = document.createElement('div');
    divAddress.setAttribute("class", "address");
    infoSectionSelector.appendChild(divAddress);

    var divRouteTimeAndLength = document.createElement('div');
    divRouteTimeAndLength.setAttribute("class", "route-time-and-length");
    infoSectionSelector.appendChild(divRouteTimeAndLength);

    var divContributer = document.createElement('div');
    divContributer.setAttribute("class", "contributer");
    infoSectionSelector.appendChild(divContributer);

    var titleAndDistanceSelector = document.querySelector('.title-and-distancefrom');
    var divRouteTitle = document.createElement('div');
    divRouteTitle.setAttribute("class", "route-title");
    titleAndDistanceSelector.appendChild(divRouteTitle);

    var distanceSelector = document.querySelector('.distancefrom-number');
    var divDistanceFrom = document.createElement('div');
    divDistanceFrom.setAttribute("class", "distancefrom");
    titleAndDistanceSelector.appendChild(divDistanceFrom);

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

    var ratingAndReviewsSelector = document.querySelector('.reviews');
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

    var reviewsSelector = ratingAndReviewsSelector.querySelector('.number-of-reviews');
    var userSelector = divContributer.querySelector('.contributer-name');
    var titleSelector = titleAndDistanceSelector.querySelector('.route-title');
    var addressSelector = document.querySelector('.address-info');
    var lengthAndTimeSelector = document.querySelector('.time-and-length-info');
    var distanceFromSelector = document.querySelector('.distancefrom-number');

    getTitleValue(titleSelector);
    getDistanceFromValue(distanceFromSelector); 
    // getAmountOfStars();
    getNumberOfReviewsValue(reviewsSelector);
    getAddressValue(addressSelector);
    getLengthAndTime(lengthAndTimeSelector); 
    getUserIdValue(userSelector);

};

createRouteCardSkeleton();







