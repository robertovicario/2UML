/////////////////////////
/**
 * Dropdown :: Components
 */
/////////////////////////

document.querySelectorAll('.dropdown-menu').forEach(dropdown_menu => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const dropdown_bugs = document.querySelectorAll('.dropdown-bug');
                if (dropdown_menu.classList.contains('show')) {
                    dropdown_bugs.forEach(bug => {
                        bug.style.zIndex = '-1';
                    });
                } else {
                    dropdown_bugs.forEach(bug => {
                        bug.style.zIndex = 'auto';
                    });
                }
            }
        });
    });
    observer.observe(dropdown_menu, { attributes: true });
});

/////////////////////////
