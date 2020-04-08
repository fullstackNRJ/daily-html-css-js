const nightMode = document.getElementById('night');
const body = document.body;

// Apply the cached theme on reload



//button event handler
let count = 0;
nightMode.addEventListener('click', () => {
    count++;
    if (count % 2 == 0) {
        body.classList.replace('dark', 'light');
        nightMode.innerText = `Night Mode 🌑`;

    } else {
        body.classList.replace('light', 'dark');
        nightMode.innerText = `Normal Mode 🌞`;
    }




});