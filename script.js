let map;
let pickupMarker = null;
let dropoffMarker = null;
let isSelectingPickup = true; // Toggle between pickup and dropoff selection

function initMap() {
  // Get the user's current location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Initialize the map centered on the user's location
      map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 14,
      });

      // Add a click listener to the map
      map.addListener("click", (event) => {
        handleMapClick(event.latLng);
      });
    },
    () => {
      // Handle location access error
      updateInstructions("Unable to access your location. Please enable location services.");
    }
  );
}

// Handle map click to select pickup or dropoff location
function handleMapClick(latLng) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK" && results[0]) {
      const address = results[0].formatted_address;

      if (isSelectingPickup) {
        // Set pickup marker
        if (pickupMarker) pickupMarker.setMap(null); // Remove existing marker
        pickupMarker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Pickup Location",
        });

        updateInstructions(`Pickup location set to: ${address}`);
        document.getElementById("pickupLocation").textContent = address;
      } else {
        // Set dropoff marker
        if (dropoffMarker) dropoffMarker.setMap(null); // Remove existing marker
        dropoffMarker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Dropoff Location",
        });

        updateInstructions(`Dropoff location set to: ${address}`);
        document.getElementById("dropoffLocation").textContent = address;
      }

      // Toggle between pickup and dropoff selection
      isSelectingPickup = !isSelectingPickup;
    } else {
      updateInstructions("Unable to determine address for the selected location.");
    }
  });
}

function updateInstructions(message) {
  const instructions = document.getElementById("instructions");
  instructions.textContent = message;
  instructions.classList.add("highlight-instructions");
}

// Call the initMap function when the page loads
window.onload = initMap;