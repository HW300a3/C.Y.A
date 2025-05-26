# Horizons West Digital Signage Dashboard Layout Specification

## Overview
This document outlines the design specifications for the Horizons West digital signage dashboard, which will display live weather, traffic map, and incident alerts for depot operations.

## Design Philosophy
- **Driver-first**: Prioritize readability and quick information scanning
- **Visually iconic**: Utilize Horizons West branding and modern, curvy design elements
- **Dead simple**: Clear information hierarchy and intuitive layout
- **Stupidly effective**: Optimized for landscape TV screens and digital signage

## Layout Structure

### Header Section
- **Height**: 15% of screen height
- **Background**: Gradient using Horizons West orange (RGB: 236, 119, 0)
- **Elements**:
  - Horizons West logo (landscape reversed version) - left aligned
  - Current time and date - center aligned, large bold font
  - Current weather with icon - right aligned
  - Sunset wave graphic as decorative element along bottom edge

### Main Content Area
- **Height**: 70% of screen height
- **Layout**: Split into two sections
  - **Left Section (70% width)**: Main Roads Travel Map embedded iframe
  - **Right Section (30% width)**: 
    - Current weather details (temperature, humidity, wind)
    - Depot information and branding
    - Space for additional status information

### Footer/Ticker Section
- **Height**: 15% of screen height
- **Background**: Dark color (RGB: 0, 38, 62) for high contrast
- **Elements**:
  - Scrolling incident ticker with dot matrix styling
  - Color-coded incident indicators
  - Horizons West branding element

## Color Scheme
- **Primary**: Horizons West Orange (RGB: 236, 119, 0)
- **Secondary**: Dark Blue (RGB: 0, 38, 62)
- **Accent Colors**:
  - Yellow (RGB: 255, 198, 41)
  - Light Orange (RGB: 255, 158, 24)
- **Text**: White on dark backgrounds, Dark Blue on light backgrounds
- **Alert Colors**:
  - Red for closures
  - Yellow for cautions
  - Orange for specified conditions

## Typography
- **Headers**: Rubik Bold (fallback: Arial Bold)
- **Time & Weather**: Rubik Bold, extra large (minimum 48px)
- **Body Text**: Rubik Regular (fallback: Arial)
- **Ticker**: Custom styling with dot matrix appearance, bold and smooth

## Responsive Behavior
- Maintain 16:9 aspect ratio for optimal TV display
- Scale elements proportionally based on screen size
- Ensure minimum text size for readability from distance
- Adjust map zoom level based on available space

## Dark/Light Mode
- **Auto-switching** based on time of day:
  - Dark mode: 6PM - 6AM
  - Light mode: 6AM - 6PM
- **Dark Mode**:
  - Dark background (near black)
  - Light text and elements
  - Reduced brightness for nighttime viewing
- **Light Mode**:
  - Light background (off-white)
  - Dark text and elements
  - Full brightness for daytime visibility

## Animation and Transitions
- Smooth transitions between data updates
- Subtle animations for weather icon changes
- Smooth scrolling for incident ticker
- Fade transitions for mode switching

## Special Elements
- **Sunset Wave Graphic**: Incorporated as header accent
- **Depot Labels**: Prominently displayed with location names
- **Weather Icons**: Modern, high-contrast design
- **Incident Icons**: Clear, universally recognizable symbols

## Technical Considerations
- Ensure all text is minimum 24px for distance viewing
- Use vector graphics where possible for crisp display
- Optimize map embedding for performance
- Ensure ticker speed is readable but efficient
