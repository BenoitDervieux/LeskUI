const arrow = document.querySelector('#arrow')
arrow.addEventListener('click', moveSheet);
import palettes from './palettes.js';
  
/**
 * Renders all the palettes to the DOM.
 * @param {Object} palettes An object where the keys are palette names and the
 * values are arrays of colors in the palette. The colors will be used to create
 * a gradient effect on a square.
 */
const renderPalettes = (palettes) => {
  const palettesContainer = document.getElementById("palettes");
  let rowDiv = document.createElement("div");
  rowDiv.className = "row";  // Add a CSS class to style the row if needed
  let squaresInRow = 0; // Track how many squares are in the current row

  for (const [paletteName, colors] of Object.entries(palettes)) {
      const paletteDiv = document.createElement("div");
      paletteDiv.className = `palette ${paletteName}`;
      
      const gradientStart = colors[0];
      const gradientMiddle1 = colors[Math.floor(colors.length / 4 * 2)];
      const gradientMiddle2 = colors[Math.floor(colors.length / 4 * 3)];
      const gradientEnd = colors[colors.length - 1];

      const squareDiv = document.createElement("div");
      squareDiv.className = `square ${paletteName}`;
      squareDiv.id = "square";
      squareDiv.style.background = `linear-gradient(45deg, ${gradientStart}, ${gradientMiddle1}, ${gradientMiddle2}, ${gradientEnd})`;
      
      squareDiv.addEventListener("click", () => {
          console.log("Supposed to change palette now: " + paletteName);
          changePalette(paletteName);
      });

      paletteDiv.appendChild(squareDiv);
      rowDiv.appendChild(paletteDiv);
      squaresInRow++;

      // Once there are 5 squares in the row, append the row to the container and reset
      if (squaresInRow === 5) {
          palettesContainer.appendChild(rowDiv);
          rowDiv = document.createElement("div"); // Start a new row
          rowDiv.className = "row";
          squaresInRow = 0;
      }
  }

  // Append any remaining squares (if total wasn't a multiple of 5)
  if (squaresInRow > 0) {
      palettesContainer.appendChild(rowDiv);
  }
};


const renderColorWheel = () => {
  // Create a new color wheel instance
let colorWheel = new iro.ColorPicker("#colorWheel", {
  width: 100, // Size of the color wheel
  color: "#ffffff" // Initial color
});

// Update the displayed color value when it changes
colorWheel.on('color:change', function(color) {
console.log("La couleur elle a changé" + color.hexString);
changeColor(color.hexString);
});

// Select the container that includes both the color wheel and squares
const elements = document.querySelectorAll('.square, #colorWheel'); // Adjust selector as needed
elements.forEach(element => {
element.addEventListener('click', () => {
// Remove 'selected' from all elements to ensure only one is selected
elements.forEach(el => el.classList.remove('selected'));
let wheels = document.querySelectorAll('.IroWheelHue'); // Use '.' if it's a class, no dot if it's a tag
// Loop through each element and add the 'selected' class
wheels.forEach(wheel => {
    wheel.classList.remove('selected');
    wheel.classList.remove('rotate90deg');
});

// Add the 'selected' class to the clicked element
element.classList.add('selected');


// Check for IroWheelHue elements and add 'selected' class if any are found
// let wheels = document.getElementsByClassName('IroWheelHue');
const elem = document.getElementById('colorWheel');
// console.log("La class list zeubi " + elem.classList[1]);
// console.log("Ca contient selected ? " + elem.classList.contains('selected'));
let wheel = document.querySelectorAll('.colorWheel');


  if (elem.classList.contains('selected')) {
    elem.classList.remove('selected');
    // Select all elements with the class or tag `IroWheelHue`
    let wheels = document.querySelectorAll('.IroWheelHue'); // Use '.' if it's a class, no dot if it's a tag
    // Loop through each element and add the 'selected' class
    wheels.forEach(wheel => {
        wheel.classList.add('selected');
        wheel.classList.add('rotate90deg');
    });
}    
});
});
console.log("Rendered Selected");

}

function fetcheffets() {
fetch(`http://192.168.1.236/api/effects`)
.then(response => {
  if(!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
    return response.json();
  })
.then(data => {
  const effectsDiv = document.getElementById('effects-details');
    data.effects.forEach(effect => {
      const effectDiv = document.createElement('div');
      effectDiv.className = 'card';
      effectDiv.innerHTML = `<h2 class="card-title" ">${effect.name}</h2>`;
      effectDiv.onclick = function() {
        changeEffect(effect.name);
        updateSettings();
      };
      const settingsDiv = document.createElement('p');
      settingsDiv.innerHTML = "Settings: "; // Initialize the content with a label

      effect.settings.forEach(setting => {
        settingsDiv.innerHTML += `${setting} `; // Concatenate each setting
      });

      // Append the settingsDiv to the effectDiv after the loop
      effectDiv.appendChild(settingsDiv);
     effectsDiv.appendChild(effectDiv);
    });
})
.catch(error => console.error('Error fetching collection details:', error));
}


function changeColor(colorName) {
fetch('/color', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'color=' + encodeURIComponent(colorName)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.text();
})
.then(data => {
  console.log(data);  // For debugging
})
.catch(error => console.error('Error:', error));
}

function changePalette(paletteName) {
fetch('/palette', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'palette=' + encodeURIComponent(paletteName)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.text();
})
.then(data => {
  console.log(data);  // For debugging
})
.catch(error => console.error('Error:', error));
}

// Function to handle the effect change
function changeEffect(effectName) {
fetch('/effects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'effect=' + encodeURIComponent(effectName)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.text();
})
.then(data => {
  console.log(data);  // For debugging
})
.catch(error => console.error('Error:', error));
}

function changeSetting(settingName, newValue) {
  fetch('/setSetting', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'setting=' + encodeURIComponent(settingName) + '&value=' + encodeURIComponent(newValue)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
  })
  .then(data => {
      console.log(data);  // Log the server response for debugging
  })
  .catch(error => console.error('Error:', error));
}


function updateSettings() {
clearSettingsDetails();
fetch(`http://192.168.1.236/api/settings`)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    const mainSettingsDiv = document.getElementById('settings-details');
    let number = 0;

    data.Settings.forEach(effect => {
        mainSettingsDiv.classList.add('grid-container');

        effect.settings.forEach(setting => {
            // Create a div for each individual setting
            const settingDiv = document.createElement('div');
            settingDiv.classList.add('setting-group', 'setting_name');

            // Alternating classes for left/right positioning
            if (number % 2 === 0) {
                settingDiv.classList.add('setting_item_left');
            } else {
                settingDiv.classList.add('setting_item_right');
            }
            number += 1;

            // Create a label element for the setting
            const settingLabel = document.createElement('label');
            settingLabel.classList.add('setting_name');
            settingLabel.setAttribute('for', `${setting.name}_range`);
            settingLabel.textContent = setting.name;

            // Create a div to hold the range slider and its value
            const rangeContainer = document.createElement('div');
            rangeContainer.classList.add('rangeAndNumber', 'setting_range');

            // Create an input element (range slider)
            const rangeInput = document.createElement('input');
            rangeInput.type = 'range';
            rangeInput.id = `${setting.name}_range`;
            rangeInput.name = setting.name;
            rangeInput.classList.add('setting_button');
            rangeInput.min = setting.minValue;  // Set minValue from the JSON
            rangeInput.max = setting.maxValue;  // Set maxValue from the JSON
            rangeInput.value = setting.values;  // Initialize to min value

            // Create a div to display the value of the range slider
            const valueDiv = document.createElement('div');
            valueDiv.classList.add('value_display');
            valueDiv.textContent = rangeInput.value; // Initial value (minValue)

            // Update the displayed value as the range slider changes
            rangeInput.addEventListener('input', () => {
                valueDiv.textContent = rangeInput.value;
            });

            // Trigger changeSetting when the user changes the range
            rangeInput.addEventListener('change', () => {
                changeSetting(setting.realNames, rangeInput.value);  // Call changeSetting when value changes
            });

            // Append the range slider and value to the container div
            rangeContainer.appendChild(rangeInput);
            rangeContainer.appendChild(valueDiv);

            // Append the label and range container to the setting div
            settingDiv.appendChild(settingLabel);
            settingDiv.appendChild(rangeContainer);

            // Append the setting div to the main container
            mainSettingsDiv.appendChild(settingDiv);
        });
    });
})
.catch(error => console.error('Error fetching settings details:', error));
}


function clearSettingsDetails() {
const settingsDetailsDiv = document.getElementById('settings-details');
// settingsDetailsDiv.innerHTML = ''; // Clears all child elements
while (settingsDetailsDiv.firstChild) {
  settingsDetailsDiv.removeChild(settingsDetailsDiv.firstChild); // Remove each child
}
}

function moveSheet() {
if (document.getElementById("modal-sheet").classList.contains("closed")){
  document.getElementById("modal-sheet").classList.remove("closed");
  document.getElementById("modal-sheet").classList.add("open");
  document.getElementById("modal-sheet").style.bottom = '0%';
  document.getElementById("arrow").style.transition = 'transform 150ms ease-in';
  document.getElementById("arrow").style.transform = 'rotate(90deg)';
} else {
  closePanel();
}
}

function closePanel() {
if (document.getElementById("modal-sheet").classList.contains("open")) {
  document.getElementById("modal-sheet").classList.remove("open");
  document.getElementById("modal-sheet").classList.add("closed");
  document.getElementById("modal-sheet").style.bottom = '-75%';
  document.getElementById("arrow").style.transition = 'transform 150ms ease-in';
  document.getElementById("arrow").style.transform = 'rotate(270deg)';
}
}


// const rangeInput = document.getElementById('brightness_range');
// // Listen for changes in the range input
// rangeInput.addEventListener('input', function() {
// console.log('Range value changed to:', rangeInput.value);
// });
// const sliderBrightness = document.getElementById('brightness_range');
// const sliderValueBrightness = document.querySelector(".value_bri")

// sliderBrightness.addEventListener("input", (event) => {
// console.log(sliderBrightness)
// const tempSliderValue = event.target.value; 
// sliderValueBrightness.textContent = tempSliderValue;

// const progress = (tempSliderValue / sliderBrightness.max) * 100;

// })

// const sliderMic = document.getElementById('mic_range');
// const sliderValueMicInput = document.querySelector(".value_mic_input")

// sliderMic.addEventListener("input", (event) => {
// console.log(sliderBrightness)
// const tempSliderValue = event.target.value; 
// sliderValueMicInput.textContent = tempSliderValue;
// const progress = (tempSliderValue / sliderMic.max) * 100;
// });

// Create a div for each individual setting
const settingDiv = document.createElement('div');
settingDiv.classList.add('setting-group', 'setting_name');

// Create a label element for the setting
const brightnessLabel = document.createElement('label');
brightnessLabel.classList.add('setting_name');
brightnessLabel.setAttribute('for', `brightness_range`);
brightnessLabel.textContent = 'brightness';

// // Create a div to hold the range slider and its value
const rangeContainer = document.createElement('div');
rangeContainer.classList.add('rangeAndNumber', 'brightness_range');

// Create an input element (range slider)
const rangeInput = document.createElement('input');
rangeInput.type = 'range';
rangeInput.id = `brightness_range_id`;
rangeInput.name = 'brightness_range';
rangeInput.classList.add('setting_button');
rangeInput.min = 0;  // Set minValue from the JSON
rangeInput.max = 250;  // Set maxValue from the JSON
rangeInput.value = 100;  // Initialize to min value

// Create a div to display the value of the range slider
const valueDiv = document.createElement('div');
valueDiv.classList.add('value_display');
valueDiv.textContent = rangeInput.value; // Initial value (minValue)

// Update the displayed value as the range slider changes
rangeInput.addEventListener('input', () => {
    valueDiv.textContent = rangeInput.value;
});

// Trigger changeSetting when the user changes the range
rangeInput.addEventListener('change', () => {
    changeSetting(setting.realNames, rangeInput.value);  // Call changeSetting when value changes
});

// Append the range slider and value to the container div
rangeContainer.appendChild(rangeInput);
rangeContainer.appendChild(valueDiv);

// Append the label and range container to the setting div
settingDiv.appendChild(brightnessLabel);
settingDiv.appendChild(rangeContainer);

// // Append the setting div to the main container
const mainSettingsDiv = document.querySelector('.inputs_settings');
mainSettingsDiv.appendChild(settingDiv);




// const brightnessRange = document.createElement('input');
// brightnessRange.type = 'range';
// brightnessRange.min = 0;
// brightnessRange.max = 255;
// brightnessRange.value = 50;
// const settingsWrapper = document.createElement('div'); 
// const rangesDiv = document.querySelector('inputs_settings')
// settingsWrapper.appendChild(rangesDiv);
// rangesDiv.appendChild(settingsWrapper);



renderColorWheel();
renderPalettes(palettes);
fetcheffets();
updateSettings();