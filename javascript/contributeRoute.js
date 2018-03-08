var fireBaseRef = firebase.database().ref('routes');
var walkForm = document.querySelector("[data-walk='form']");
var userID = document.querySelector("[name='user']");
var title = document.querySelector("[name='contributer_title']");
var address = document.querySelector("[name='start_address']");
var city = document.querySelector("[name='walk_city']");
var state = document.querySelector("[name='walk_state']");
var description = document.querySelector("[name='contributer_description']");
var thumbnail = document.querySelector("[name='contributer_thumbnail']");

var recordWalk = function(event) {
    event.preventDefault();
    var currentWalk = {
        "userID": userID.value,
        "title": title.value,
        "address": address.value,
        "city": city.value,
        "state": state.value,
        "description": description.value,
        "thumbnail": thumbnail.value
    };
    fireBaseRef.push().set(currentWalk);
    walkForm.reset();
};
walkForm.addEventListener("submit", recordWalk);
