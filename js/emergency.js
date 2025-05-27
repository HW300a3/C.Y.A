/**
 * Emergency override functionality for Horizons West Digital Signage
 * Provides emergency alert capability for hazardous situations
 */

// DOM elements
const emergencyModal = document.getElementById('emergency-modal');
const emergencyMessage = document.getElementById('emergency-message');
const closeEmergencyButton = document.getElementById('close-emergency');
const triggerEmergencyButton = document.getElementById('trigger-emergency');

// Emergency sound (will play when emergency is triggered)
let emergencySound;

/**
 * Show emergency alert with specified message
 */
function showEmergencyAlert(message) {
    // Set the emergency message
    emergencyMessage.textContent = message;
    
    // Show the modal
    emergencyModal.classList.add('active');
    
    // Play emergency sound if available
    if (emergencySound) {
        emergencySound.play();
    }
    
    // Add emergency announcement to the ticker
    if (window.addAnnouncement) {
        window.addAnnouncement(`⚠️ EMERGENCY: ${message} ⚠️`);
    }
    
    // Log the emergency
    console.log(`Emergency alert triggered: ${message}`);
}

/**
 * Hide emergency alert
 */
function hideEmergencyAlert() {
    // Hide the modal
    emergencyModal.classList.remove('active');
    
    // Stop emergency sound if playing
    if (emergencySound) {
        emergencySound.pause();
        emergencySound.currentTime = 0;
    }
    
    // Log the dismissal
    console.log('Emergency alert dismissed');
}

/**
 * Handle emergency trigger button click (for testing)
 */
function handleEmergencyTrigger() {
    const testMessages = [
        "HAZARDOUS MATERIAL SPILL ON MAIN ACCESS ROAD. USE ALTERNATE ROUTES.",
        "SEVERE WEATHER ALERT: SEEK SHELTER IMMEDIATELY.",
        "FACILITY EVACUATION REQUIRED. PROCEED TO DESIGNATED ASSEMBLY POINTS.",
        "VEHICLE ACCIDENT BLOCKING DEPOT ENTRANCE. USE SECONDARY ACCESS."
    ];
    
    // Select a random test message
    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
    
    // Show the emergency alert
    showEmergencyAlert(randomMessage);
}

/**
 * Initialize emergency functionality
 */
function initEmergency() {
    // Create emergency sound
    try {
        emergencySound = new Audio();
        emergencySound.src = 'assets/sounds/emergency-alert.mp3';
        emergencySound.loop = true;
    } catch (error) {
        console.warn('Emergency sound could not be initialized:', error);
    }
    
    // Add event listener to close button
    if (closeEmergencyButton) {
        closeEmergencyButton.addEventListener('click', hideEmergencyAlert);
    }
    
    // Add event listener to trigger button (for testing)
    if (triggerEmergencyButton) {
        triggerEmergencyButton.addEventListener('click', handleEmergencyTrigger);
    }
    
    // Add keyboard shortcut to dismiss emergency (Escape key)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && emergencyModal.classList.contains('active')) {
            hideEmergencyAlert();
        }
    });
    
    // Expose emergency functions globally for external use
    window.showEmergencyAlert = showEmergencyAlert;
    window.hideEmergencyAlert = hideEmergencyAlert;
}

// Initialize emergency functionality when the page loads
document.addEventListener('DOMContentLoaded', initEmergency);
