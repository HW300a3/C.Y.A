/**
 * Theme switching functionality for Horizons West Digital Signage
 * Handles automatic dark/light mode switching based on time of day
 */

// DOM elements
const themeToggleButton = document.getElementById('theme-switch');
const body = document.body;

// Time thresholds for auto switching (24-hour format)
const MORNING_HOUR = 6; // 6:00 AM
const EVENING_HOUR = 18; // 6:00 PM

/**
 * Check if dark mode should be active based on current time
 */
function shouldActivateDarkMode() {
    const currentHour = new Date().getHours();
    return currentHour < MORNING_HOUR || currentHour >= EVENING_HOUR;
}

/**
 * Set the theme based on time or manual toggle
 */
function setTheme(forceDark = null) {
    // If forceDark is provided, use that value
    // Otherwise, determine based on time
    const darkMode = forceDark !== null ? forceDark : shouldActivateDarkMode();
    
    if (darkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

/**
 * Toggle between light and dark mode manually
 */
function toggleTheme() {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(!isDarkMode);
}

/**
 * Initialize theme functionality
 */
function initTheme() {
    // Set initial theme based on time
    setTheme();
    
    // Add click event to theme toggle button
    themeToggleButton.addEventListener('click', toggleTheme);
    
    // Check and update theme every hour
    setInterval(() => {
        setTheme();
    }, 3600000); // 1 hour in milliseconds
}

// Start theme functionality when the page loads
document.addEventListener('DOMContentLoaded', initTheme);
