/**
 * Main JavaScript file for Horizons West Digital Signage
 * Handles depot information and overall dashboard coordination
 */

// DOM elements
const depotButtons = document.querySelectorAll('.depot-button');
const depotDetailsElement = document.getElementById('depot-details');

// Depot information
const depotInfo = {
    welshpool: {
        name: "Welshpool Depot",
        address: "Welshpool WA 6106",
        phone: "(08) 9000 0000",
        operatingHours: "24/7",
        notes: "Main operations hub for southern routes"
    },
    landsdale: {
        name: "Landsdale Depot",
        address: "Landsdale WA 6065",
        phone: "(08) 9000 0001",
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
    
    // Display default depot (Welshpool)
    updateDepotDisplay('welshpool');
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
    
    // Log system information
    console.log('Horizons West Digital Signage Dashboard');
    console.log('Version: 2.0.0');
    console.log('Depots: Welshpool, Landsdale');
    console.log('Weather refresh: 5 minutes');
    console.log('Incident refresh: 1 minute');
    console.log('Screens linked via Ablesign system');
    
    // Add a welcome announcement
    if (window.addAnnouncement) {
        setTimeout(() => {
            window.addAnnouncement('WELCOME TO HORIZONS WEST DIGITAL SIGNAGE SYSTEM');
        }, 2000);
    }
}

// Initialize dashboard when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);
