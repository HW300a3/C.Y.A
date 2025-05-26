/**
 * Main JavaScript file for Horizons West Digital Signage
 * Handles depot information and overall dashboard coordination
 */

// DOM elements
const depotButtons = document.querySelectorAll('.depot-button');
const depotDetailsElement = document.getElementById('depot-details');

// Depot information
const depotInfo = {
    jandakot: {
        name: "Jandakot Depot",
        address: "23 Cutler Road, Jandakot WA 6164",
        phone: "(08) 9417 4444",
        operatingHours: "24/7",
        notes: "Main operations hub for southern routes"
    },
    malaga: {
        name: "Malaga Depot",
        address: "15 Beringarra Avenue, Malaga WA 6090",
        phone: "(08) 9249 9700",
        operatingHours: "24/7",
        notes: "Main operations hub for northern routes"
    }
};

/**
 * Update depot details display
 */
function updateDepotDisplay(depotId) {
    const depot = depotInfo[depotId];
    
    if (!depot) {
        console.error(`Depot information not found for ID: ${depotId}`);
        return;
    }
    
    // Create depot details HTML
    const depotHTML = `
        <div class="depot-detail-item">
            <h3>${depot.name}</h3>
        </div>
        <div class="depot-detail-item">
            <span class="label">Address:</span>
            <span class="value">${depot.address}</span>
        </div>
        <div class="depot-detail-item">
            <span class="label">Phone:</span>
            <span class="value">${depot.phone}</span>
        </div>
        <div class="depot-detail-item">
            <span class="label">Hours:</span>
            <span class="value">${depot.operatingHours}</span>
        </div>
        <div class="depot-detail-item">
            <span class="label">Notes:</span>
            <span class="value">${depot.notes}</span>
        </div>
    `;
    
    // Update the DOM
    depotDetailsElement.innerHTML = depotHTML;
}

/**
 * Handle depot button clicks
 */
function handleDepotButtonClick(event) {
    // Remove active class from all buttons
    depotButtons.forEach(button => button.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Get depot ID from data attribute
    const depotId = event.target.getAttribute('data-depot');
    
    // Update depot display
    updateDepotDisplay(depotId);
}

/**
 * Initialize depot functionality
 */
function initDepotInfo() {
    // Add click event listeners to depot buttons
    depotButtons.forEach(button => {
        button.addEventListener('click', handleDepotButtonClick);
    });
    
    // Display default depot (Jandakot)
    updateDepotDisplay('jandakot');
}

/**
 * Initialize all dashboard components
 */
function initDashboard() {
    // Initialize depot information
    initDepotInfo();
    
    // Check if map is loaded correctly
    const travelMap = document.getElementById('travel-map');
    travelMap.addEventListener('load', () => {
        console.log('Travel map loaded successfully');
    });
    
    travelMap.addEventListener('error', () => {
        console.error('Error loading travel map');
        // Display fallback content
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-error">
                <h2>Map Temporarily Unavailable</h2>
                <p>Please check <a href="https://travelmap.mainroads.wa.gov.au/Home/Map" target="_blank">Main Roads Travel Map</a> directly.</p>
            </div>
        `;
    });
}

// Initialize dashboard when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);
