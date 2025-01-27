import nowPlaying from './nowplayingList.js'

const nowPlayingsDiv = document.querySelector('#nowplaying-details');
// Creation of the line
const nowPlayingRectangle = document.createElement('div');
nowPlayingRectangle.className = 'nowPlaying-rectangle';

// creation of the block inside the line, the rectangle
const textContainer = document.createElement('div');
textContainer.className = 'text-container';

// Creation of the title
const nowPlayingName = document.createElement('h2')
nowPlayingName.textContent = nowPlaying.name;
nowPlayingName.className = 'nowPlaying-name';

// Creation of the div which will hold the description and the icon
const divnowPlayingDescription = document.createElement('div');
divnowPlayingDescription.className = 'div-nowPlaying-description';

// Creation of the description
const nowPlayingDescription = document.createElement('p');
nowPlaying.settings.forEach(setting => {
    if (setting === nowPlaying.settings[nowPlaying.settings.length - 1]) {
        nowPlayingDescription.innerHTML += `${setting}.`;
    } else {
        nowPlayingDescription.innerHTML += `${setting} - `;
    }
    
})
nowPlayingDescription.className = 'nowPlaying-description';
// Creation of the icon
if (nowPlaying.settings.length > 0) {
    const nowPlayingIcon = document.createElement('img');
    nowPlayingIcon.className = 'nowPlaying-icon';
    nowPlayingIcon.src = './img/settings.png';
    nowPlayingIcon.style.width = '2vh';
    nowPlayingIcon.style.height = '2vh';
    divnowPlayingDescription.appendChild(nowPlayingIcon);
}

// Adding the icon and the description
divnowPlayingDescription.appendChild(nowPlayingDescription);


textContainer.appendChild(nowPlayingName);
textContainer.appendChild(divnowPlayingDescription);

nowPlayingRectangle.appendChild(textContainer);
nowPlayingsDiv.appendChild(nowPlayingRectangle);