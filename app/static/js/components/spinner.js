/////////////////////////
/**
 * Spinner :: Components
 */
/////////////////////////

function show_spinner(el, text = '') {
    el.disabled = true;
    el.innerHTML = `
        <!-- Spinner -->
        <div class="spinner-border spinner-border-sm me-3 text-white"></div>
        ${text ? `<span>${text}</span>` : ''}
    `;
}

/////////////////////////