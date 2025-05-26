/**
 * Incident ticker functionality for Horizons West Digital Signage
 * Fetches and displays real-time incident data from Main Roads WA
 */

// DOM elements
const incidentTickerElement = document.getElementById('incident-ticker');

// Sample incident data (to be replaced with actual API data)
const sampleIncidents = [
    {
        type: 'closure',
        location: 'Tonkin Highway, Forrestfield',
        description: 'Road closed due to accident',
        icon: 'road-closed.svg'
    },
    {
        type: 'caution',
        location: 'Kwinana Freeway, Success',
        description: 'Exercise caution due to debris on road',
        icon: 'caution.svg'
    },
    {
        type: 'condition',
        location: 'Roe Highway, Midland',
        description: 'Reduced speed limit due to roadworks',
        icon: 'roadworks.svg'
    },
    {
        type: 'caution',
        location: 'Great Eastern Highway, Belmont',
        description: 'Water over road',
        icon: 'water.svg'
    },
    {
        type: 'signal',
        location: 'Leach Highway & Karel Avenue',
        description: 'Traffic signal outage',
        icon: 'signal-outage.svg'
    }
];

/**
 * Fetch incident data from Main Roads WebEOC API
 * Note: This is a placeholder function that will need to be implemented
 * with the actual API endpoint once available
 */
async function fetchIncidentData() {
    try {
        // In a real implementation, this would fetch from the WebEOC API
        // For now, we'll use the sample data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return sampleIncidents;
    } catch (error) {
        console.error('Failed to fetch incident data:', error);
        return [];
    }
}

/**
 * Create ticker item HTML for an incident
 */
function createTickerItem(incident) {
    const alertClass = incident.type === 'closure' ? 'alert-closure' : 
                      incident.type === 'caution' ? 'alert-caution' : 
                      incident.type === 'condition' ? 'alert-condition' : '';
    
    return `
        <div class="ticker-item ${alertClass}">
            <img src="assets/icons/${incident.icon}" class="ticker-icon" alt="${incident.type}">
            <span><strong>${incident.location}:</strong> ${incident.description}</span>
        </div>
    `;
}

/**
 * Update the incident ticker display
 */
function updateIncidentTicker(incidents) {
    if (!incidents || incidents.length === 0) {
        incidentTickerElement.innerHTML = '<div class="ticker-content">No current incidents to report</div>';
        return;
    }
    
    // Create ticker content with all incidents
    let tickerContent = '<div class="ticker-content">';
    
    incidents.forEach(incident => {
        tickerContent += createTickerItem(incident);
    });
    
    tickerContent += '</div>';
    
    // Update the DOM
    incidentTickerElement.innerHTML = tickerContent;
}

/**
 * Initialize incident ticker functionality
 */
async function initIncidentTicker() {
    // Fetch and display incidents immediately
    const incidentData = await fetchIncidentData();
    updateIncidentTicker(incidentData);
    
    // Then update every 5 minutes (300000 ms)
    setInterval(async () => {
        const refreshedData = await fetchIncidentData();
        updateIncidentTicker(refreshedData);
    }, 300000);
}

// Start incident updates when the page loads
document.addEventListener('DOMContentLoaded', initIncidentTicker);
