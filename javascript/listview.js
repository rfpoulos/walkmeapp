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

// Info Section - Title and Distance Row
var titleAndDistanceSelector = document.querySelector('.title-and-distancefrom');
var divRouteTitle = document.createElement('div');
divRouteTitle.setAttribute("class", "route-title");
divRouteTitle.textContent = 'Graffiti';
titleAndDistanceSelector.appendChild(divRouteTitle);

var divDistanceFrom = document.createElement('div');
divDistanceFrom.setAttribute("class", "distancefrom");
var divDistanceIcon = document.createElement('div');
divDistanceIcon.setAttribute("class", "distancefrom-icon");
var divDistanceNumber = document.createElement('div');
divDistanceNumber.setAttribute("class", "distancefrom-number");
divDistanceNumber.textContent = '1.2 mi';
var imgDistanceIcon = document.createElement('img');
imgDistanceIcon.setAttribute("class", "nearme");
imgDistanceIcon.setAttribute("src", "images/nearme.png");

titleAndDistanceSelector.appendChild(divDistanceFrom);
divDistanceFrom.appendChild(divDistanceIcon);
divDistanceFrom.appendChild(divDistanceNumber);
divDistanceIcon.appendChild(imgDistanceIcon);

// Info Section - Review Row
var divReviewStars = document.createElement('div');
divReviewStars.setAttribute("class", "review-stars");
var imgReviewStars = document.createElement('img');
imgReviewStars.setAttribute('src', 'images/fullstar.png');
imgReviewStars.setAttribute('class', 'stars');
divReviews.appendChild(divReviewStars);
divReviewStars.appendChild(imgReviewStars);


var divNumberOfReviews = document.createElement('div');
divNumberOfReviews.setAttribute("class", "number-of-reviews");
divNumberOfReviews.textContent = "32 Reviews";
divReviews.appendChild(divNumberOfReviews);

// Info Section - Address Row
var imgPlaceIcon = document.createElement('img');
imgPlaceIcon.setAttribute('src', 'images/place_small.png');
imgPlaceIcon.setAttribute('class', 'place-icon');
divAddress.appendChild(imgPlaceIcon);

var divAddressInfo = document.createElement('div');
divAddressInfo.setAttribute('class', 'address-info')
divAddressInfo.textContent = "206 Rogers St NE \r\n";
divAddressInfo.textContent += "Atlanta, GA"
divAddress.appendChild(divAddressInfo)

// Info Section - Route Time and Length Row
var imgRouteIcon = document.createElement('img');
imgRouteIcon.setAttribute('src', 'images/route_small.png');
imgRouteIcon.setAttribute('class', 'route-icon');
divRouteTimeAndLength.appendChild(imgRouteIcon);

var divTimeAndLengthInfo = document.createElement('div');
divTimeAndLengthInfo.setAttribute('class', 'time-and-length-info');
divTimeAndLengthInfo.textContent = "23 mins / 1.4 mi";
divRouteTimeAndLength.appendChild(divTimeAndLengthInfo);

// Info Section - Contributer Row
var imgContributerIcon = document.createElement('img');
imgContributerIcon.setAttribute('src', 'images/contributer_small.png');
imgContributerIcon.setAttribute('class', 'contributer-icon');
divContributer.appendChild(imgContributerIcon);

var divContributerName = document.createElement('div');
divContributerName.setAttribute('class', 'contributer-name');
divContributerName.textContent = 'Ponchieponcho';
divContributer.appendChild(divContributerName);









