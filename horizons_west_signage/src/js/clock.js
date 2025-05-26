/**
 * Clock functionality for Horizons West Digital Signage
 * Provides real-time clock and date display
 */

// DOM elements
const timeElement = document.getElementById('current-time');
const dateElement = document.getElementById('current-date');

// Date formatting options
const dateOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
};

/**
 * Update the clock display
 */
function updateClock() {
    const now = new Date();
    
    // Format time as HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const dateString = now.toLocaleDateString('en-AU', dateOptions);
    
    // Update DOM
    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

/**
 * Initialize the clock
 */
function initClock() {
    // Update immediately
    updateClock();
    
    // Then update every second
    setInterval(updateClock, 1000);
}

// Start the clock when the page loads
document.addEventListener('DOMContentLoaded', initClock);
