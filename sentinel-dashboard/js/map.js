// map.js - Handles map initialization, hospital markers, and map updates

let map;
let hospitalMarkers = {};
let disasterLayerGroup = null;
let ambulanceLayerGroup = null;

// Initialize standard map
function initMap() {
    // SF Coordinates
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([37.765, -122.435], 13);
    
    // Add dark theme base layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        minZoom: 10,
        maxZoom: 19
    }).addTo(map);

    // Add zoom controls back to a different position
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Init custom layer groups
    disasterLayerGroup = L.layerGroup().addTo(map);
    ambulanceLayerGroup = L.layerGroup().addTo(map);

    // Initial render of hospital markers
    renderHospitals();
}

// Custom Icons
const createHospitalIcon = (color) => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}"></div>`,
    iconSize: [18, 18]
});

const createDisasterIcon = (type) => {
    let htmlContent = '<div style="background-color: rgba(239, 68, 68, 0.4); width: 60px; height: 60px; border-radius: 50%; border: 1px solid #ef4444; animation: pulse 2s infinite; display:flex; justify-content:center; align-items:center;">';
    htmlContent += `<div style="background: #ef4444; padding:5px; border-radius:5px; transform: scale(0.6)"><i data-lucide="flame" style="color:white; width: 15px;"></i></div></div>`;
    
    return L.divIcon({
        className: 'disaster-div-icon',
        html: htmlContent,
        iconSize: [60, 60]
    });
};

function renderHospitals() {
    MOCK_HOSPITALS.forEach(hosp => {
        const capacityPct = (hosp.currentLoad / hosp.capacity) * 100;
        
        let color = '#10b981'; // Green (Safe)
        if (capacityPct >= 90) color = '#ef4444'; // Red (Critical)
        else if (capacityPct >= 70) color = '#f59e0b'; // Yellow (Warning)

        const marker = L.marker([hosp.lat, hosp.lng], { icon: createHospitalIcon(color) })
            .addTo(map)
            .bindPopup(`
                <div class="popup-title">${hosp.name}</div>
                <div class="popup-detail">Type: ${hosp.type}</div>
                <div class="popup-detail" style="margin-top: 5px;">
                   Load: <b style="color:${color}">${hosp.currentLoad} / ${hosp.capacity}</b> (${Math.round(capacityPct)}%)
                </div>
            `);
        
        hospitalMarkers[hosp.id] = marker;
    });

    // We must call lucide to render icons that were dynamically injected into the Leaflet DOM
    setTimeout(() => {
        if(window.lucide) window.lucide.createIcons();
    }, 100);
}

function updateHospitalMarker(hospitalId, newLoad) {
    const hosp = MOCK_HOSPITALS.find(h => h.id === hospitalId);
    if (!hosp) return;
    
    hosp.currentLoad = newLoad;
    
    // Recalculate color
    const capacityPct = (hosp.currentLoad / hosp.capacity) * 100;
    let color = '#10b981'; // Green
    if (capacityPct >= 90) color = '#ef4444'; // Red
    else if (capacityPct >= 70) color = '#f59e0b'; // Yellow

    const marker = hospitalMarkers[hospitalId];
    marker.setIcon(createHospitalIcon(color));
    
    // Update Popup content if it's open
    marker.setPopupContent(`
        <div class="popup-title">${hosp.name}</div>
        <div class="popup-detail">Type: ${hosp.type}</div>
        <div class="popup-detail" style="margin-top: 5px;">
           Load: <b style="color:${color}">${hosp.currentLoad} / ${hosp.capacity}</b> (${Math.round(capacityPct)}%)
        </div>
    `);
}

function renderDisasterZone(type, lat, lng) {
    disasterLayerGroup.clearLayers(); // For simplicity, one disaster at a time in hackathon MVP
    const disasterMarker = L.marker([lat, lng], { icon: createDisasterIcon(type) })
        .addTo(disasterLayerGroup);
    
    map.flyTo([lat, lng], 13, {
        animate: true,
        duration: 1.5
    });

    document.getElementById('critical-zones-count').innerText = "1";
    setTimeout(() => { if(window.lucide) window.lucide.createIcons(); }, 100);
}
