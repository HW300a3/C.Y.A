/**
 * Announcement ticker functionality for Horizons West Digital Signage
 * Provides dot matrix style announcements for operations staff
 */

// DOM elements
const announcementTickerElement = document.getElementById('announcement-ticker');
const announcementInput = document.getElementById('announcement-input');
const sendAnnouncementButton = document.getElementById('send-announcement');

// Sample announcements (to be replaced with actual operational messages)
const sampleAnnouncements = [
    "STAFF MEETING TODAY AT 14:00 IN CONFERENCE ROOM A",
    "REMINDER: VEHICLE INSPECTIONS DUE BY END OF WEEK",
    "NEW SAFETY PROTOCOLS IN EFFECT - CHECK EMAIL FOR DETAILS"
];

// Current announcements array
let currentAnnouncements = [...sampleAnnouncements];

/**
 * Create dot matrix style ticker content
 */
function createDotMatrixTicker(messages) {
    if (!messages || messages.length === 0) {
        return '<div class="ticker-content">NO CURRENT ANNOUNCEMENTS</div>';
    }
    
    let tickerContent = '<div class="ticker-content">';
    
    messages.forEach(message => {
        tickerContent += `<div class="ticker-item">${message}</div>`;
    });
    
    tickerContent += '</div>';
    
    return tickerContent;
}

/**
 * Update the announcement ticker display
 */
function updateAnnouncementTicker() {
    announcementTickerElement.innerHTML = createDotMatrixTicker(currentAnnouncements);
    
    // Reset animation to ensure smooth scrolling
    const tickerContent = announcementTickerElement.querySelector('.ticker-content');
    if (tickerContent) {
        tickerContent.style.animation = 'none';
        // Force reflow
        void tickerContent.offsetWidth;
        tickerContent.style.animation = '';
    }
}

/**
 * Add a new announcement to the ticker
 */
function addAnnouncement(message) {
    if (!message || message.trim() === '') return;
    
    // Add the new announcement to the beginning of the array
    currentAnnouncements.unshift(message.toUpperCase());
    
    // Keep only the most recent 5 announcements
    if (currentAnnouncements.length > 5) {
        currentAnnouncements = currentAnnouncements.slice(0, 5);
    }
    
    // Update the ticker
    updateAnnouncementTicker();
    
    // Clear the input field
    if (announcementInput) {
        announcementInput.value = '';
    }
}

/**
 * Handle sending a new announcement
 */
function handleSendAnnouncement() {
    const message = announcementInput.value;
    addAnnouncement(message);
}

/**
 * Initialize announcement ticker functionality
 */
function initAnnouncementTicker() {
    // Display initial announcements
    updateAnnouncementTicker();
    
    // Add event listener to send button
    if (sendAnnouncementButton) {
        sendAnnouncementButton.addEventListener('click', handleSendAnnouncement);
    }
    
    // Add event listener for Enter key in input field
    if (announcementInput) {
        announcementInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleSendAnnouncement();
            }
        });
    }
    
    // Expose the addAnnouncement function globally for external use
    window.addAnnouncement = addAnnouncement;
}

// Start announcement ticker when the page loads
document.addEventListener('DOMContentLoaded', initAnnouncementTicker);
