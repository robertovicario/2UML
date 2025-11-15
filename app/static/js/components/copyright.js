/////////////////////////
/**
 * Copyright :: Components
 */
/////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    copyright = document.querySelector('#copyright');
    copyright.innerHTML = copyright.innerHTML.replace('YYYY', new Date().getFullYear());
});

/////////////////////////
