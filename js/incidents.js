/**
 * Incident and accident list functionality for Horizons West Digital Signage
 * Fetches and displays real-time incident data from Main Roads WA
 */

// DOM elements
const incidentTickerElement = document.getElementById('incident-ticker');
const accidentsContainerElement = document.getElementById('accidents-container');

// Sample incident data (to be replaced with actual API data)
const sampleIncidents = [
    {
        type: 'closure',
        location: 'Tonkin Highway, Forrestfield',
        description: 'Road closed due to accident',
        icon: 'road-closed.svg',
        severity: 'severe',
        time: '10:15 AM'
    },
    {
        type: 'caution',
        location: 'Kwinana Freeway, Success',
        description: 'Exercise caution due to debris on road',
        icon: 'caution.svg',
        severity: 'minor',
        time: '09:45 AM'
    },
    {
        type: 'condition',
        location: 'Roe Highway, Midland',
        description: 'Reduced speed limit due to roadworks',
        icon: 'roadworks.svg',
        severity: 'moderate',
        time: '08:30 AM'
    },
    {
        type: 'caution',
        location: 'Great Eastern Highway, Belmont',
        description: 'Water over road',
        icon: 'water.svg',
        severity: 'moderate',
        time: '07:50 AM'
    },
    {
        type: 'signal',
        location: 'Leach Highway & Karel Avenue',
        description: 'Traffic signal outage',
        icon: 'signal-outage.svg',
        severity: 'minor',
        time: '06:20 AM'
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
 * Create accident list item HTML
 */
function createAccidentItem(incident) {
    return `
        <div class="accident-item ${incident.severity}">
            <div class="accident-location">${incident.location}</div>
            <div class="accident-description">${incident.description}</div>
            <div class="accident-time">Reported at ${incident.time}</div>
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
 * Update the accidents list display
 */
function updateAccidentsList(incidents) {
    if (!incidents || incidents.length === 0) {
        accidentsContainerElement.innerHTML = '<div class="no-accidents">No current accidents to report</div>';
        return;
    }
    
    // Create accident list content
    let accidentsContent = '';
    
    // Sort incidents by severity (severe first, then moderate, then minor)
    const sortedIncidents = [...incidents].sort((a, b) => {
        const severityOrder = { 'severe': 0, 'moderate': 1, 'minor': 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
    });
    
    sortedIncidents.forEach(incident => {
        accidentsContent += createAccidentItem(incident);
    });
    
    // Update the DOM
    accidentsContainerElement.innerHTML = accidentsContent;
}

/**
 * Initialize incident ticker and accident list functionality
 */
async function initIncidentTicker() {
    // Fetch and display incidents immediately
    const incidentData = await fetchIncidentData();
    updateIncidentTicker(incidentData);
    updateAccidentsList(incidentData);
    
    // Then update every 1 minute (60000 ms)
    setInterval(async () => {
        const refreshedData = await fetchIncidentData();
        updateIncidentTicker(refreshedData);
        updateAccidentsList(refreshedData);
    }, 60000);
}

// Start incident updates when the page loads
document.addEventListener('DOMContentLoaded', initIncidentTicker);
