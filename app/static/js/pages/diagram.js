/////////////////////////
/**
 * Diagram / Chat :: Pages
 */
/////////////////////////

let script_diagram = document.currentScript;
let endpoint_diagram = script_diagram.getAttribute('data-endpoint');

/////////////////////////

/**
 * Sending UML code to backend to generate diagram
 */
async function send_code_uml(code_uml) {
    try {
        const response = await fetch(endpoint_diagram, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code_uml: code_uml })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        const img = document.querySelector('#img-display');
        img.src = `data:image/png;base64,${data.image_base64}`;
    } catch (err) {
        console.error('Error:', err);
    }
}

/////////////////////////

/**
 * Initializing the diagram on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    send_code_uml(textarea_editor.getValue());
});

/**
 * Debounce function to limit the rate of function calls
 */
function debounce(func, delay) {
    let flag;
    return function(...args) {
        if (flag) clearTimeout(flag);
        flag = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

/**
 * Updating diagram on code change with debounce
 */
const debounce_send = debounce(() => {
    send_code_uml(textarea_editor.getValue());
}, 500);
textarea_editor.on('change', debounce_send);

/////////////////////////
