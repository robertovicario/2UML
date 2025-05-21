/////////////////////////
/**
 * Copyright :: Components
 */
/////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const span_year = document.getElementById('span-year');
    if (span_year) {
        span_year.innerHTML = new Date().getFullYear();
    }
});

/////////////////////////
