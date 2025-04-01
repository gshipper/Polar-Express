function initMap() {
  // Create a map centered at a default location
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  // Create Autocomplete for the pickup location
  const pickupInput = document.getElementById("pickupContainer");
  const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
  pickupAutocomplete.bindTo("bounds", map);

  // Create Autocomplete for the dropoff location
  const dropoffInput = document.getElementById("dropoffContainer");
  const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput);
  dropoffAutocomplete.bindTo("bounds", map);

  // Add event listener for the schedule button
  document.getElementById("scheduleButton").addEventListener("click", () => {
    const pickup = pickupInput.value;
    const dropoff = dropoffInput.value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const passengers = document.getElementById("passengers").value;

    if (!pickup || !dropoff || !date || !time || !passengers) {
      alert("Please fill in all fields.");
      return;
    }

    // Display ride details
    document.getElementById("displayPickup").textContent = pickup;
    document.getElementById("displayDropoff").textContent = dropoff;
    document.getElementById("displayDate").textContent = date;
    document.getElementById("displayTime").textContent = time;
    document.getElementById("displayPassengers").textContent = passengers;

    document.getElementById("rideDetails").classList.remove("hidden");
  });
}