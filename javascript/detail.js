// alert('connected');
var fireBaseRef = firebase.database().ref('routes');
var docAddress = document.getElementById('address');
var objectId = '-L763yP2Gv0-nU4jlWAp';
var fireBaseAddressRef = firebase.database().ref('routes/' + objectId + '/address');
var fbPath = fireBaseRef + 
fireBaseAddressRef.on('value', function(snapshot) {
    docAddress.textContent = snapshot.val();
});

var userImage = document.getElementById('user-image');
var userImageSource = "http://www.unit2fitness.com/wp-content/uploads/2013/01/Graffiti-Wallpaper-027.jpg";
userImage.src = userImageSource;

var mapImg = document.getElementById('mapImg');
mapImg.src = 'https://www.google.com/permissions/images/maps-att.png';