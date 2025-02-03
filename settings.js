import Effects from './effectList.js'

document.getElementById("wifiForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(this); // Get form data
    const jsonObject = {}; 
    
    // Convert FormData to JSON
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // sendWiFiData(jsonObject); // Call custom function
    console.log("Sending informations to ESP32...")
    console.log(jsonObject);
});

function sendWiFiData(data) {
    fetch("http://your-esp32-ip-or-server.com/wifi", { // Change to your ESP32 or server endpoint
        method: "POST", // You can use PUT, PATCH, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));
}

const formEffectAtStart = document.getElementById("effectAS")

// Here it simulates the fact of fetching an effect
const effectAlreadyHere = {
        "name": "Michel Effect",
        "FX_MODE": "FX_MODE_RAINBOW_CYCLE",
        "settings": ["setting1", "setting2", "setting3"],
        "min_values": [5, 10, 0],
        "max_values": [50, 100, 1],
        "number_of_settings": 3
      }
const option = document.createElement("option");
option.value = effectAlreadyHere.name;
option.textContent = effectAlreadyHere.name;
formEffectAtStart.appendChild(option);
Effects.effects.forEach(effect => {
    const option = document.createElement("option");
    option.value = effect.name;
    option.textContent = effect.name;
    option.className = "effect-option-at-start";
    formEffectAtStart.appendChild(option);
});

formEffectAtStart.addEventListener("change", function() {
    console.log("Here we should be sending the effect to the ESP32");
});