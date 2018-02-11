export default class Geolocation {

  init() {

  },
  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

}
