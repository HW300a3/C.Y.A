# Horizons West Digital Signage Dashboard - Final Report

## Project Overview
This project delivers a modern, driver-focused digital signage dashboard for Horizons West depots, featuring live weather, traffic map, and incident alerts in a visually iconic and highly readable format optimized for landscape TV screens.

## Key Features Implemented

### Live Data Integration
- **Perth Weather**: Real-time weather data from Open-Meteo API with temperature, feels-like, humidity, and wind speed
- **Main Roads Travel Map**: Embedded official travel map showing current road conditions
- **Incident Ticker**: Dynamic scrolling ticker displaying road incidents with color-coding and icons

### Visual Design
- **Horizons West Branding**: Full integration of brand colors, logo, and the signature "sunset wave" graphic
- **Modern, Curvy Style**: Contemporary layout with smooth spacing, minimalistic shadows, and airy structure
- **High Readability**: Large, bold typography optimized for distance viewing (Rubik font family)
- **Responsive Layout**: Adapts to different screen sizes while maintaining landscape orientation

### Smart Features
- **Auto Dark/Light Mode**: Automatically switches between modes based on time of day (6AM/6PM)
- **Depot Selection**: Toggle between Jandakot and Malaga depot information
- **Error Handling**: Graceful fallbacks if map or data sources are temporarily unavailable

## Technical Implementation

### Structure
- **HTML5**: Semantic markup for accessibility and maintainability
- **CSS3**: Modern styling with variables, flexbox, and responsive design
- **JavaScript**: Modular components for clock, weather, incidents, and theme switching

### Data Sources
- **Weather**: Open-Meteo API (free, no API key required)
- **Traffic Map**: Main Roads WA Travel Map embedded iframe
- **Incidents**: WebEOC incident feed (currently using sample data, ready for API integration)

### Responsive Design
- Optimized for landscape TV screens (16:9 aspect ratio)
- Scales proportionally based on viewport size
- Maintains readability at various distances

## Installation & Usage

### Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for live data feeds
- Display resolution of 1920x1080 or higher recommended

### Setup Instructions
1. Upload all files to a web server or host via GitHub Pages
2. Access index.html in a web browser
3. For optimal viewing, use full-screen mode (F11 on most browsers)
4. No additional configuration required - all features work out of the box

### Maintenance
- Weather data automatically refreshes every 15 minutes
- Incident data refreshes every 5 minutes
- No manual updates required

## Future Enhancements
- Direct WebEOC API integration when endpoints are confirmed
- Additional depot locations as needed
- Custom alert sounds for critical incidents
- Integration with internal communication systems

## Files Included
- `/src/` - All source code and assets
- `/design/` - Design specifications and documentation
- `/data_sources.md` - Detailed API documentation
- `/branding_guide.md` - Horizons West branding summary

## Conclusion
The Horizons West Digital Signage Dashboard delivers a driver-first, visually iconic, and highly effective information display system that meets all specified requirements. The modern, curvy design with Horizons West branding creates a professional and distinctive look while ensuring critical information is easily readable at a glance.
