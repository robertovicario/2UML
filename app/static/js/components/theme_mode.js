/////////////////////////
/**
 * Theme Mode :: Components
 */
/////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const light_icon = `
        <i class="bi bi-moon-stars-fill fs-5"></i>
        <span class="ms-3">Dark Mode</span>
    `;
    const dark_icon = `
        <i class="bi bi-sun-fill fs-5"></i>
        <span class="ms-3">Light Mode</span>
    `;
    const btn_theme_mode = document.getElementById('btn-theme-mode');
    const el = document.documentElement;

    function update_button(theme) {
        btn_theme_mode.innerHTML = theme === 'dark' ? dark_icon : light_icon;
    }

    /////////////////////////

    const saved_theme = localStorage.getItem('theme') || 'light';
    el.setAttribute('data-bs-theme', saved_theme);
    update_button(saved_theme);

    btn_theme_mode.addEventListener('click', (e) => {
        e.preventDefault();

        let current_theme = el.getAttribute('data-bs-theme');
        let new_theme = current_theme === 'dark' ? 'light' : 'dark';

        el.setAttribute('data-bs-theme', new_theme);
        localStorage.setItem('theme', new_theme);
        update_button(new_theme);
    });
});

/////////////////////////
