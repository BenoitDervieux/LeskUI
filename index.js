
import Collections from './collections.js'
console.log(Collections);


Collections.collections.forEach(collection => {
    const collectionsDiv = document.querySelector('#collection-details');
    const collectionRectangle = document.createElement('div');
    collectionRectangle.className = 'collection-rectangle';

    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    const effectName = document.createElement('h2')
    effectName.textContent = collection.name;
    effectName.className = 'effect-name';

    const effectList = document.createElement('ul');
    effectList.className = 'effect-list';

    collection.settings.forEach(effect => {
        const effectItem = document.createElement('li');
        effectItem.textContent = effect.name;
        effectList.appendChild(effectItem);
    });

    textContainer.appendChild(effectName);
    textContainer.appendChild(effectList);

    collectionRectangle.appendChild(textContainer);
    collectionsDiv.appendChild(collectionRectangle);
})

