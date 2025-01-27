import Effects from './effectList.js'
console.log(Effects);


/**
 * Here we render the effects
 */
Effects.effects.forEach(effect => {
    const effectsDiv = document.querySelector('#effects-details');
    // Creation of the line
    const effectRectangle = document.createElement('div');
    effectRectangle.className = 'effect-rectangle';

    // creation of the block inside the line, the rectangle
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    // Creation of the title
    const effectName = document.createElement('h2')
    effectName.textContent = effect.name;
    effectName.className = 'effect-name';

    // Creation of the div which will hold the description and the icon
    const divEffectDescription = document.createElement('div');
    divEffectDescription.className = 'div-effect-description';

    // Creation of the description
    const effectDescription = document.createElement('p');
    effect.settings.forEach(setting => {
        if (setting === effect.settings[effect.settings.length - 1]) {
            effectDescription.innerHTML += `${setting}.`;
        } else {
            effectDescription.innerHTML += `${setting} - `;
        }
      
    })
    effectDescription.className = 'effect-description';
    // Creation of the icon
    if (effect.settings.length > 0) {
        const effectIcon = document.createElement('img');
        effectIcon.className = 'effect-icon';
        effectIcon.src = './img/settings.png';
        effectIcon.style.width = '2vh';
        effectIcon.style.height = '2vh';
        divEffectDescription.appendChild(effectIcon);
    }

    // Adding the icon and the description
    divEffectDescription.appendChild(effectDescription);


    textContainer.appendChild(effectName);
    textContainer.appendChild(divEffectDescription);

    effectRectangle.appendChild(textContainer);
    effectsDiv.appendChild(effectRectangle);
})