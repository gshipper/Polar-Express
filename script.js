// script.js
document.getElementById("rideForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
  
    // Get form values
    const pickupLocation = document.getElementById("pickupLocation").value;
    const dropoffLocation = document.getElementById("dropoffLocation").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const passengers = document.getElementById("passengers").value;
  
    // Display ride details
    document.getElementById("displayPickup").textContent = pickupLocation;
    document.getElementById("displayDropoff").textContent = dropoffLocation;
    document.getElementById("displayDate").textContent = date;
    document.getElementById("displayTime").textContent = time;
    document.getElementById("displayPassengers").textContent = passengers;
  
    // Show the ride details section
    document.getElementById("rideDetails").classList.remove("hidden");
  
    // Optionally, clear the form
    document.getElementById("rideForm").reset();
  });