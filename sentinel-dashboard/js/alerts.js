// alerts.js - UI controller for Phase 1 & 4 Triage Alerts
const ALERTS_FEED_ID = 'alerts-feed';
let testAlertsCount = 0;

function addTriageAlert(alertData) {
    const feed = document.getElementById(ALERTS_FEED_ID);
    if (!feed) return;

    // alertData format: { severity: 'red'|'yellow'|'green', id: 'T-8012', desc: 'Blunt Force Trauma', reqs: 'Ventilator', time: '14:23:05' }
    const colorClass = `triage-${alertData.severity}`;
    
    // Auto-scroll logic setup
    const isScrolledToBottom = feed.scrollHeight - feed.clientHeight <= feed.scrollTop + 50;

    const card = document.createElement('div');
    card.className = `alert-card ${colorClass}`;
    
    // SVG Icons
    let iconStr = 'stethosope';
    if(alertData.severity === 'red') iconStr = 'triangle-alert';
    if(alertData.severity === 'yellow') iconStr = 'shield-alert';
    if(alertData.severity === 'green') iconStr = 'activity';

    card.innerHTML = `
        <div class="alert-card-header">
            <span class="alert-id">ID: ${alertData.id} <i data-lucide="radio" style="width:12px; height:12px; margin-left: 2px;"></i></span>
            <span class="alert-time">${alertData.time}</span>
        </div>
        <div class="alert-title">${alertData.desc}</div>
        ${alertData.reqs ? `<div class="alert-reqs"><i data-lucide="zap" style="width:12px; height:12px"></i> ${alertData.reqs} Required</div>` : ''}
        ${alertData.type === 'volunteer' ? `
        <div class="alert-actions" style="margin-top: 0.8rem">
            <button class="btn-primary" style="width:100%; padding:0.4rem; font-size:0.8rem;" id="btn-dispatch-${alertData.full_id}" onclick="dispatchUnitToScene('${alertData.full_id}')">
                <i data-lucide="ambulance" style="width:14px; margin-right:4px;"></i> Dispatch Ambulance Unit
            </button>
        </div>` : ''}
    `;

    // Add to top of feed
    feed.prepend(card);

    // Render new lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Keep feed trimmed to max 50 items
    while (feed.children.length > 50) {
        feed.removeChild(feed.lastChild);
    }
}

window.dispatchUnitToScene = async function(pId) {
    const btn = document.getElementById(`btn-dispatch-${pId}`);
    if(btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="animate-pulse" data-lucide="loader" style="width:14px; margin-right:4px;"></i> Dispatching...';
        lucide.createIcons();
    }
    
    // update backend
    const patients = window.API._get('sr_patients') || [];
    const p = patients.find(x => x.id === pId);
    if(p) {
        p.status = 'dispatched_to_ambulance';
        window.API._set('sr_patients', patients);
    }
    
    setTimeout(() => {
        if(btn) {
            btn.innerHTML = '<i data-lucide="check-circle" class="text-yellow" style="width:14px; margin-right:4px;"></i> Awaiting Medic AI Triage';
            btn.style.background = 'rgba(245, 158, 11, 0.2)'; // yellow glass
            btn.style.color = '#fcd34d';
            btn.style.border = '1px solid #f59e0b';
            lucide.createIcons();
        }
    }, 600);
}

// Simulated real-time NLP stream for idle state
function generateRandomAlert() {
    const severities = ['green', 'yellow', 'red'];
    const severityIdx = Math.random() > 0.8 ? 2 : (Math.random() > 0.5 ? 1 : 0);
    const severity = severities[severityIdx];
    
    const descriptions = {
        'red': ['Severe Hemorrhage', 'Cardiac Arrest', 'Respiratory Failure', '3rd Degree Burns > 40%'],
        'yellow': ['Fractured Femur', 'Concussion', 'Smoke Inhalation', 'Laceration requiring sutures'],
        'green': ['Minor cuts/abrasions', 'Contusion', 'Sprained Ankle', 'Mild shock']
    };
    
    const reqsList = {
        'red': ['Ventilator', 'O-Neg Blood', 'Trauma Bay 1', 'Cardio Surgeon'],
        'yellow': ['X-Ray Tech', 'Suture Kit', 'Oxygen mask'],
        'green': [null, null, 'Bandages']
    };

    const desc = descriptions[severity][Math.floor(Math.random() * descriptions[severity].length)];
    const reqListArray = reqsList[severity];
    const req = reqListArray[Math.floor(Math.random() * reqListArray.length)];
    
    testAlertsCount++;
    const id = `TRG-${new Date().getFullYear().toString().slice(2)}${Math.floor(Math.random() * 9000) + 1000}`;
    
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');

    addTriageAlert({
        severity,
        id,
        desc,
        reqs: req,
        time: timeStr
    });
}

// Expose public method to kick off random background feed
window.startRandomAlertsTicker = function() {
    setInterval(generateRandomAlert, 4500);
};
