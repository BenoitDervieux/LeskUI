window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;

    if (scrollY > 100) { // Adjust the scroll threshold as needed
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // Reduce opacity on scroll
    } else {
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Initial opacity at the top
    }
});
const btnHamburger = document.querySelector('#btnHamburger_id');
const overlay = document.querySelector("#overlay_id");
const elements = []
elements.push(document.getElementById("home"));
// elements.push(document.getElementById("now_playing"));
elements.push(document.getElementById("effects"));
elements.push(document.getElementById("settings"));
function displayNone(element) {
  element.style.display = 'none';
}
function fadeAnim(element) {
  element.style.animation = "fade_background 300ms forwards";
  setTimeout( function() {
    displayNone(element);
  }, 300);
}
btnHamburger.addEventListener('click', function(){
  if (btnHamburger.classList.contains('hamb_open')) {
    btnHamburger.classList.remove('hamb_open');
    btnHamburger.classList.add('hamb_close1');
    fadeAnim(overlay);
    for (let i = 0; i < elements.length; i++) {
      fadeAnim(elements[i]);
    }
    
  } else if (btnHamburger.classList.contains('hamb_close') || btnHamburger.classList.contains('hamb_close1') ){
    btnHamburger.classList.add('hamb_open');
    btnHamburger.classList.remove('hamb_close');
    btnHamburger.classList.remove('hamb_close1');
    overlay_id.style.display = "block";
    overlay_id.style.animation = "show_background 300ms forwards";
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
      elements[i].style.animation = "show_background 300ms forwards";
    }
    
  }          
})

