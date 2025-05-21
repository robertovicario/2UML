/////////////////////////
/**
 * Tooltip :: Components
 */
/////////////////////////

document.addEventListener('DOMContentLoaded', () => {
	const tooltip_list = [].slice.call(document.querySelectorAll('[data-bss-tooltip]'));
	tooltip_list.map(function (tooltip_el) {
		return new bootstrap.Tooltip(tooltip_el);
	})
}, false);

/////////////////////////
