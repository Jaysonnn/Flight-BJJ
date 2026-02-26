/* assets/js/main.js */
// This ensures the icons are created once the page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
