// simulation.js - The "Brain" of the operation. Phase 2 Logic & "Equity Algorithm"
let isSimulating = false;
let simulationInterval = null;
let currentRemainingCasualties = 0;
let baseDisasterLoc = null;

function performDispatchDecision(patientConfig) {
    // Basic Equity Algorithm (Dijkstra-Lite mockup)
    // Find the nearest hospital with capacity. If reaching > 85%, weigh distance against capacity (Load-balancing).
    
    let bestHospital = null;
    let bestScore = -Infinity; // Higher is better

    MOCK_HOSPITALS.forEach(hosp => {
        // Calculate raw distance (euclidean approximation since it's local)
        const dx = hosp.lat - patientConfig.lat;
        const dy = hosp.lng - patientConfig.lng;
        const squareDist = dx * dx + dy * dy;
        const distancePenalty = squareDist * 5000; // arbitrary weighting
        
        // Calculate Capacity Score
        const availBeds = hosp.capacity - hosp.currentLoad;
        const loadPct = hosp.currentLoad / hosp.capacity;
        
        let capacityScore = availBeds * 2;
        if (loadPct > 0.85) {
            capacityScore -= 100; // Strict penalty for near-overflow
        }
        if (loadPct >= 1) {
            capacityScore = -999999; // Reject completely
        }

        // Equity weighting (Favor Level I trauma if critical, otherwise community)
        let typeScore = 0;
        if (patientConfig.severity === 'red' && hosp.type.includes('Trauma')) typeScore = +50;
        if (patientConfig.severity === 'green' && !hosp.type.includes('Trauma')) typeScore = +20;

        const totalScore = capacityScore - distancePenalty + typeScore;

        if (totalScore > bestScore) {
            bestScore = totalScore;
            bestHospital = hosp;
        }
    });

    return bestHospital;
}

function tickSimulation() {
    if (currentRemainingCasualties <= 0) {
        clearInterval(simulationInterval);
        isSimulating = false;
        document.getElementById('btn-simulate').innerHTML = '<i data-lucide="play"></i> Initialise "War Room" Sim';
        lucide.createIcons();
        return;
    }

    // Process a batch of 1-4 patients per tick
    const batchSize = Math.min(Math.floor(Math.random() * 3) + 1, currentRemainingCasualties);
    currentRemainingCasualties -= batchSize;

    for(let i=0; i<batchSize; i++) {
        const severityArr = ['red', 'red', 'yellow', 'green', 'yellow'];
        const pSev = severityArr[Math.floor(Math.random()*severityArr.length)];
        const pLoc = getRandomLocationWithinRadius(baseDisasterLoc, 0.05);
        
        // Equity Algorithm Decision
        const assignedHosp = performDispatchDecision({
            severity: pSev,
            lat: pLoc.lat,
            lng: pLoc.lng
        });

        if (assignedHosp) {
            // Update hospital load
            const newLoad = assignedHosp.currentLoad + 1;
            updateHospitalMarker(assignedHosp.id, newLoad);
            updateHospitalPanelUI(assignedHosp.id, newLoad); // Defined in app.js
            
            // Push alert
            const alertId = `SIM-${Math.floor(Math.random() * 9000) + 1000}`;
            const timeStr = new Date().toLocaleTimeString();
            
            // Create "family link" string requirement for the demo
            let reqsList = ['Trauma Bay', 'ECG', 'Morphine', 'O2 Supply', 'Surgical Consult'];
            let req = reqsList[Math.floor(Math.random() * reqsList.length)];

            addTriageAlert({
                id: alertId,
                severity: pSev,
                desc: `${pSev.toUpperCase()} Triage -> ${assignedHosp.name}`,
                reqs: req,
                time: timeStr
            });
        } else {
             console.warn("SYSTEM OVERLOAD! No hospital can take patient.");
        }
    }
}

function startSimulation(type, casualtyCount) {
    if (isSimulating) return;
    
    isSimulating = true;
    currentRemainingCasualties = casualtyCount;
    
    const btn = document.getElementById('btn-simulate');
    btn.innerHTML = '<i data-lucide="loader" class="animate-pulse"></i> Distributing...';
    lucide.createIcons();
    
    // Choose epicenter (Hardcoded for demo: Financial district, Mission, etc)
    const epicenters = {
        'earthquake': {lat: 37.794, lng: -122.396}, // Downtown
        'fire': {lat: 37.732, lng: -122.385}, // Industrial
        'transit': {lat: 37.776, lng: -122.415} // Civic Center
    };
    
    baseDisasterLoc = epicenters[type] || CITY_CENTER;

    renderDisasterZone(type, baseDisasterLoc.lat, baseDisasterLoc.lng);
    
    // Start Ticking
    simulationInterval = setInterval(tickSimulation, 1500);
}
