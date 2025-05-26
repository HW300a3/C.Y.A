# Live Data Sources for Horizons West Digital Signage

## 1. Weather Data Source
- **Provider**: Open-Meteo
- **API Type**: Free, no API key required
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Perth Coordinates**: Latitude: -31.9523, Longitude: 115.8613
- **Example Request**: 
  ```
  https://api.open-meteo.com/v1/forecast?latitude=-31.9523&longitude=115.8613&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Australia%2FPerth
  ```
- **Response Format**: JSON
- **Update Frequency**: Real-time
- **Integration Method**: Direct API call from JavaScript
- **Notes**: 
  - Free for non-commercial use
  - Provides current weather conditions including temperature, humidity, wind speed
  - Weather code can be mapped to appropriate weather icons

## 2. Traffic Map
- **Provider**: Main Roads Western Australia
- **Source**: Travel Map
- **URL**: `https://travelmap.mainroads.wa.gov.au/Home/Map`
- **Integration Method**: iFrame embed or direct link
- **Features**:
  - Live traffic conditions
  - Road closures
  - Incidents
  - Roadworks
- **Notes**:
  - Official government source for WA road conditions
  - May require testing for embedding permissions
  - Alternative approach: use as direct link if embedding is restricted

## 3. Incident Feed
- **Provider**: Main Roads Western Australia
- **Source**: WebEOC Road Incidents dataset
- **Dataset URL**: `https://catalogue.data.wa.gov.au/dataset/mrwa-webeoc-road-incidents`
- **Data Format**: Likely JSON or GeoJSON
- **Update Frequency**: Real-time (used by the official Travel Map)
- **Integration Options**:
  1. If direct API access is available: Make API calls to fetch incident data
  2. If no direct API: Create a proxy service to fetch and format the data
  3. Alternative: Screen scrape from the Travel Map if necessary
- **Incident Types**:
  - Road closures
  - Road open with caution
  - Road open with specified conditions
  - Traffic signal outages
  - Detours
  - Various incident types (Break Down, Tow Away, Bushfire, etc.)
- **Notes**:
  - Official dataset used by Main Roads Travel Map
  - May require further investigation for direct API access
  - Creative Commons Attribution 4.0 license

## Implementation Strategy
1. **Weather**: Direct API calls to Open-Meteo
2. **Traffic Map**: Embed via iframe if permitted, or provide direct link
3. **Incident Feed**: 
   - Attempt direct API access if endpoints are discovered
   - Create proxy service if needed
   - Consider screen scraping as fallback option

## Next Steps
- Test embedding of Main Roads Travel Map
- Further investigate WebEOC API access options
- Design dashboard layout to accommodate all three data sources
- Implement refresh mechanisms for real-time updates
