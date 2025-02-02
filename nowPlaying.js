import nowPlayingModule from './nowplayingList.js'
import palettes from './palettes.js';

const nowPlayingsDiv = document.querySelector('#nowplaying-details');
// Creation of the line
const nowPlayingRectangle = document.createElement('div');
nowPlayingRectangle.className = 'nowPlaying-rectangle';

// creation of the block inside the line, the rectangle
const textContainer = document.createElement('div');
textContainer.className = 'effect-name-container';

// Creation of the title
const nowPlayingName = document.createElement('h2')
console.log(nowPlayingModule.effect['name'])
nowPlayingName.textContent = nowPlayingModule.effect.name;
nowPlayingName.className = 'nowPlaying-name';

// Creation of the div which will hold the description and the icon
const divnowPlayingDescription = document.createElement('div');
divnowPlayingDescription.className = 'div-nowPlaying-description';

// Creation of the description
const nowPlayingDescription = document.createElement('p');
nowPlayingModule.effect.settings.forEach(setting => {
    if (setting === nowPlayingModule.effect.settings[nowPlayingModule.effect.settings.length - 1]) {
        nowPlayingDescription.innerHTML += `${setting}.`;
    } else {
        nowPlayingDescription.innerHTML += `${setting} - `;
    } 
})

// nowPlayingDescription.className = 'nowPlaying-description';
// // // Creation of the icon
// if (nowPlayingModule.effect.settings.length > 0) {
//     const nowPlayingIcon = document.createElement('img');
//     nowPlayingIcon.className = 'nowPlaying-icon';
//     nowPlayingIcon.src = './img/settings.png';
//     nowPlayingIcon.style.width = '2vh';
//     nowPlayingIcon.style.height = '2vh';
//     divnowPlayingDescription.appendChild(nowPlayingIcon);
// }

// // Adding the icon and the description
// divnowPlayingDescription.appendChild(nowPlayingDescription);

// This is the div holding ranges here
const divHoldingRanges = document.createElement('div');
divHoldingRanges.className = 'div-holding-ranges';
let index = 0
nowPlayingModule.effect.settings.forEach(setting => {
    // Create a div to hold the range slider and its value
    const rangeContainer = document.createElement('div');
    rangeContainer.classList.add('rangeAndNumber', `${setting}_container`);

    // Create the range
    const rangeInput = document.createElement('input');
    rangeInput.type = 'range';
    rangeInput.id = `${setting}_range_id`;
    rangeInput.name = `${setting}_range`;
    rangeInput.classList.add('setting_range');
    rangeInput.min = nowPlayingModule.effect.min_values[index];  // Set minValue from the JSON
    rangeInput.max = nowPlayingModule.effect.max_values[index];  // Set maxValue from the JSON
    rangeInput.value = 100;  // Initialize to min value
    console.log(setting)
    index++;

    // Update the displayed value as the range slider changes
    rangeInput.addEventListener('input', () => {
        valueDiv.textContent = rangeInput.value;
    });

    // Trigger changeSetting when the user changes the range
    rangeInput.addEventListener('change', () => {
        changeSetting(setting.realNames, rangeInput.value);  // Call changeSetting when value changes
    });

    // Create a div to display the value of the range slider
    const valueDiv = document.createElement('div');
    valueDiv.classList.add('value_display');
    valueDiv.textContent = rangeInput.value; // Initial value (minValue)

    // Append the range and value divs to the range container
    rangeContainer.appendChild(rangeInput);
    rangeContainer.appendChild(valueDiv);

    // Here is the div for input + setting name
    const divRangeAndName = document.createElement('div');
    divRangeAndName.className = 'div-range-and-name';
    const nameRange = document.createElement('h3');
    nameRange.textContent = setting;
    nameRange.className = 'name-range';
    divRangeAndName.appendChild(nameRange);
    divRangeAndName.appendChild(rangeContainer);
    divHoldingRanges.appendChild(divRangeAndName);
})



textContainer.appendChild(nowPlayingName);
textContainer.appendChild(divnowPlayingDescription);

nowPlayingRectangle.appendChild(textContainer);
nowPlayingRectangle.appendChild(divHoldingRanges);

// Now we're gonna build the round, palettes and other inputs
const triplet_container = document.createElement('div');
triplet_container.className = 'triplet_container';

// The color wheel
const wheel_container = document.createElement('div');
wheel_container.className = 'colorWheel';
wheel_container.id = 'colorWheel';



// The palette
const palette_container = document.createElement('div');
palette_container.className = 'palette_container';

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
        palette_container.appendChild(rowDiv);
        rowDiv = document.createElement("div"); // Start a new row
        rowDiv.className = "row";
        squaresInRow = 0;
    }
}

// Append any remaining squares (if total wasn't a multiple of 5)
if (squaresInRow > 0) {
    palette_container.appendChild(rowDiv);
}

// The other inputs
const other_inputs_container = document.createElement('div');
other_inputs_container.className = 'other_inputs_container';




nowPlayingsDiv.appendChild(nowPlayingRectangle);

triplet_container.appendChild(wheel_container);
triplet_container.appendChild(palette_container);
triplet_container.appendChild(other_inputs_container);

const bodyContainer = document.querySelector('body');
bodyContainer.appendChild(triplet_container);


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

let colorWheel = new iro.ColorPicker("#colorWheel", {
width: 150, // Size of the color wheel
color: "#ffffff" // Initial color
});

// Update the displayed color value when it changes
colorWheel.on('color:change', function(color) {
console.log("La couleur elle a changé" + color.hexString);
changeColor(color.hexString);
});

// Select the container that includes both the color wheel and squares
const elements = document.querySelectorAll('.square, #colorWheel'); // Adjust selector as needed
wheel_container.addEventListener('click', () => {
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

// Create a div for each individual setting
const settingDiv = document.createElement('div');
settingDiv.classList.add('setting-group', 'setting_name');

// Create a label element for the setting
const brightnessLabel = document.createElement('label');
brightnessLabel.classList.add('setting_name');
brightnessLabel.setAttribute('for', `brightness_range`);
brightnessLabel.textContent = 'Brightness';

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

rangeContainer.appendChild(rangeInput);
rangeContainer.appendChild(valueDiv);

// Append the label and range container to the setting div
settingDiv.appendChild(brightnessLabel);
settingDiv.appendChild(rangeContainer);

other_inputs_container.appendChild(settingDiv);
