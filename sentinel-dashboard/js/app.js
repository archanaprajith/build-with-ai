// app.js - Main Application Entrypoint

document.addEventListener('DOMContentLoaded', () => {
    
    // (Map & Hospital Panel are now lazily loaded by AuthController to prevent Leaflet bounds bug on hidden divs)
    
    // Load empty state (awaiting real Citizen Inputs)

});


// Hospital Load Balancer Panel Rendering
function initialRenderHospitalsPanel() {
    const list = document.getElementById('hospitals-list');
    list.innerHTML = ''; // Clear

    MOCK_HOSPITALS.forEach(hosp => {
        const pct = (hosp.currentLoad / hosp.capacity) * 100;
        let colorClass = 'bg-green-500';
        let borderColor = '#10b981';
        let cardClass = '';

        if (pct >= 90) { colorClass = 'bg-red-500'; borderColor = '#ef4444'; cardClass = 'critical'; }
        else if (pct >= 70) { colorClass = 'bg-yellow-500'; borderColor = '#f59e0b'; }

        let badgesHtml = '';
        if(hosp.facilities && hosp.facilities.traumaReady) badgesHtml += '<span class="hosp-badge trauma">TRAUMA</span> ';
        if(hosp.icu && hosp.icu.total >= 10) badgesHtml += '<span class="hosp-badge icu">ICU</span> ';
        if(hosp.bloodBank && hosp.bloodBank['O-'] !== 'LOW') badgesHtml += '<span class="hosp-badge blood">BLOOD</span> ';

        list.innerHTML += `
            <div class="hospital-card ${cardClass}" id="panel-hosp-${hosp.id}">
                <div class="hospital-header">
                    <span class="hospital-name"><i data-lucide="building" style="width:14px; margin-right:5px"></i> <span class="name-text">${hosp.name}</span></span>
                    <span class="hospital-eta">ETA: ${Math.floor(Math.random() * 8) + 3}m</span>
                </div>
                <div>${badgesHtml}</div>
                <div class="capacity-info">
                    <span>Active Load</span>
                    <span id="label-hosp-${hosp.id}">${hosp.currentLoad} / ${hosp.capacity} Beds</span>
                </div>
                <div class="capacity-bar-container">
                    <div id="bar-hosp-${hosp.id}" class="capacity-bar" style="width: ${pct}%; background-color: ${borderColor}"></div>
                </div>
            </div>
        `;
    });

    lucide.createIcons();
}

// Global update function for the sidebar
window.updateHospitalPanelUI = function(hospitalId, newLoad) {
    const hosp = MOCK_HOSPITALS.find(h => h.id === hospitalId);
    if (!hosp) return;

    hosp.currentLoad = newLoad;
    const pct = (hosp.currentLoad / hosp.capacity) * 100;
    
    const card = document.getElementById(`panel-hosp-${hosp.id}`);
    const bar = document.getElementById(`bar-hosp-${hosp.id}`);
    const label = document.getElementById(`label-hosp-${hosp.id}`);
    
    if(!card || !bar || !label) return;

    label.innerText = `${hosp.currentLoad} / ${hosp.capacity} Beds`;
    bar.style.width = `${pct}%`;

    let color = '#10b981'; // Green
    card.classList.remove('critical');

    if (pct >= 90) {
        color = '#ef4444';
        card.classList.add('critical');
    } else if (pct >= 70) {
        color = '#f59e0b';
    }

    bar.style.backgroundColor = color;
};
