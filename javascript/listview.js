// alert('connected');
// var fireBaseRef = firebase.database().ref('routes');
// var docAddress = document.getElementById('address');
// var objectId = '-L763yP2Gv0-nU4jlWAp';
// var fireBaseAddressRef = firebase.database().ref('routes/' + objectId + '/address');
// var fbPath = fireBaseRef + 
// fireBaseAddressRef.on('value', function(snapshot) {
//     docAddress.textContent = snapshot.val();
// });

// var userImage = document.getElementById('user-image');
// var userImageSource = "http://www.unit2fitness.com/wp-content/uploads/2013/01/Graffiti-Wallpaper-027.jpg";
// userImage.src = userImageSource;

// var mapImg = document.getElementById('mapImg');
// mapImg.src = 'https://www.google.com/permissions/images/maps-att.png';

// var thumbnail
// var favorite
// var title
// var stars
// var number of reviews

// var address
// var city
// var state

// var routeLength
// var routeTime

// var userID

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
divRouteTitle.textContent = 'Graffiti'
titleAndDistanceSelector.appendChild(divRouteTitle);

var divDistanceFrom = document.createElement('div');
divDistanceFrom.setAttribute("class", "distancefrom");
titleAndDistanceSelector.appendChild(divDistanceFrom);









