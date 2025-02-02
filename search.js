let page = window.location.pathname.split("/").pop(); 

const searchIcon = document.querySelector('#search_img');
const searchHeader = document.querySelector('#search');
searchIcon.addEventListener('click', makeSearchBar);
searchHeader.addEventListener('click', makeSearchBar);

function makeSearchBar() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.classList.add('search_input');
    const navbarRight = document.querySelector('.navbar-right');
    navbarRight.insertBefore(searchInput, navbarRight.firstChild);
    searchInput.focus();
    searchIcon.style.display = 'none';
    searchHeader.style.display = 'none';
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchInput.remove();
            searchIcon.style.display = '';
            searchHeader.style.display = '';
            let allEffectsDiv;
            if (window.location.pathname.split("/").pop() === 'index.html') {
                allEffectsDiv = document.querySelectorAll('.collection-rectangle');
            } else if (window.location.pathname.split("/").pop() === 'effects.html') {
                allEffectsDiv = document.querySelectorAll('.effect-rectangle');
            }
            allEffectsDiv.forEach(effectDiv => {
                effectDiv.style.display = '';
            })
        }  
    })
    searchInput.addEventListener('input', () => {
        console.log("Est ce que c'est true???");
        console.log(window.location.pathname.split("/").pop() === 'index.html');
        let allEffectsDiv;
        if (window.location.pathname.split("/").pop() === 'index.html') {
            allEffectsDiv = document.querySelectorAll('.collection-rectangle');
        } else if (window.location.pathname.split("/").pop() === 'effects.html') {
            allEffectsDiv = document.querySelectorAll('.effect-rectangle');
        }
        if (searchInput.value === '') {
            allEffectsDiv.forEach(effectDiv => {
                effectDiv.style.display = '';
            })
        }
        allEffectsDiv.forEach(effectDiv => {
            const searchInput = document.querySelector('.search_input');
            if (searchInput) {
                if (effectDiv.firstChild.firstChild.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    
                } else {
                    effectDiv.style.display = 'none';
                }
            }
        })
        
    })
}

console.log('Name of the page: ' + page);


