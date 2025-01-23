
import Collections from './collections.js'
console.log(Collections);


/**
 * Here we render the collections
 */
Collections.collections.forEach(collection => {
    const collectionsDiv = document.querySelector('#collection-details');
    // Creation of the line
    const collectionRectangle = document.createElement('div');
    collectionRectangle.className = 'collection-rectangle';

    // creation of the block inside the line, the rectangle
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    // Creation of the title
    const effectName = document.createElement('h2')
    effectName.textContent = collection.name;
    effectName.className = 'effect-name';

    // Creation of the div which will hold the description and the icon
    const divEffectDescription = document.createElement('div');
    divEffectDescription.className = 'div-effect-description';

    // Creation of the description
    const effectDescription = document.createElement('p');
    effectDescription.innerHTML = collection.description;
    effectDescription.className = 'effect-description';

    // Creation of the icon
    const effectIcon = document.createElement('img');
    effectIcon.className = 'effect-icon';
    effectIcon.src = './img/settings.png';
    effectIcon.style.width = '2vh';
    effectIcon.style.height = '2vh';

    // Adding the icon and the description
    divEffectDescription.appendChild(effectIcon);
    divEffectDescription.appendChild(effectDescription);


    textContainer.appendChild(effectName);
    textContainer.appendChild(divEffectDescription);

    collectionRectangle.appendChild(textContainer);
    collectionsDiv.appendChild(collectionRectangle);
})

