/////////////////////////
/**
 * Flash :: Components
 */
/////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.alert').forEach(alert => {
        const timeout = alert.getAttribute('data-timeout') || 5000;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 1000);
        }, timeout);
    });
});

/////////////////////////
