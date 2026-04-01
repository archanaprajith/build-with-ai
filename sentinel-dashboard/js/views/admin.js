// js/views/admin.js - Detailed Hospital Admin Dashboard Logic

let adminPoller = null;

async function initAdminView() {
    clearTimeout(adminPoller);
    
    // We will populate a dropdown to simulate which hospital the admin belongs to
    const selectBox = document.getElementById('admin-hospital-select');
    
    // Only populate if empty
    if (selectBox.options.length === 0) {
        const hList = await window.API.getHospitals();
        hList.forEach(h => {
             const opt = document.createElement('option');
             opt.value = h.id;
             opt.innerText = h.name;
             selectBox.appendChild(opt);
        });
        selectBox.addEventListener('change', () => renderAdminDashboard(selectBox.value));
    }
    
    // Initial Render
    await renderAdminDashboard(selectBox.value);

    // Sync Button Listener
    const btnSync = document.getElementById('btn-admin-sync');
    if (btnSync) {
        btnSync.addEventListener('click', async () => {
            btnSync.innerHTML = '<i data-lucide="loader" class="animate-pulse"></i> Transmitting...';
            btnSync.disabled = true;
            lucide.createIcons();
            
            await renderAdminDashboard(selectBox.value, false);
            
            setTimeout(() => {
                btnSync.innerHTML = '<i data-lucide="check" class="text-green"></i> Network Synced';
                lucide.createIcons();
                setTimeout(() => {
                    btnSync.innerHTML = '<i data-lucide="refresh-cw"></i> Sync Authority Network';
                    btnSync.disabled = false;
                    lucide.createIcons();
                }, 2000);
            }, 600);
        });
    }
    
    // Feature 10: Real-Time Updates (Polling)
    adminPoller = setInterval(async () => {
        // Only run if admin view is active
        if(document.getElementById('view-admin').classList.contains('active')) {
             await renderAdminDashboard(selectBox.value, true);
        } else {
             clearInterval(adminPoller);
        }
    }, 4500); // Poll every 4.5s
}

async function renderAdminDashboard(hospId, isBackgroundSync = false) {
    if(!isBackgroundSync) {
        document.getElementById('admin-hosp-name-header').innerText = 'Syncing...';
    }

    try {
        const hospitals = await window.API.getHospitals();
        const hosp = hospitals.find(h => h.id === hospId);
        if(!hosp) return;

        // Header Title
        document.getElementById('admin-hosp-name-header').innerText = hosp.name;

        // === Feature 1: Hospital Overview Panel & Feature 8: Accommodation Engine ===
        document.getElementById('ad-tot-cap').innerText = hosp.capacity;
        document.getElementById('ad-occ-bed').innerText = hosp.currentLoad;
        document.getElementById('ad-icu-avail').innerText = `${hosp.icu.total - hosp.icu.occupied} / ${hosp.icu.total}`;
        
        const loadPct = (hosp.currentLoad / hosp.capacity) * 100;
        const capBar = document.getElementById('ad-cap-bar');
        capBar.style.width = `${loadPct}%`;
        capBar.style.backgroundColor = loadPct >= 90 ? '#ef4444' : (loadPct >= 70 ? '#f59e0b' : '#10b981');
        
        let accomMsg = `Can accept ${hosp.capacity - hosp.currentLoad} more patients`;
        let accomColor = 'var(--text-muted)';
        if(loadPct >= 100) { accomMsg = '⚠ AT FULL CAPACITY. Redirecting network traffic.'; accomColor = '#ef4444'; }
        else if (loadPct >= 90) { accomMsg = '⚠ Near full capacity limit.'; accomColor = '#f59e0b'; }
        const accomEl = document.getElementById('ad-accom-msg');
        accomEl.innerText = accomMsg;
        accomEl.style.color = accomColor;

        // === Feature 2: Staff Availability Section ===
        const st = hosp.staff || { doctorsOnDuty: 0, emergency: 0, nurses: 0, specialists: 0};
        const stList = document.getElementById('ad-staff-list');
        let emergencyWarn = false;
        if(st.emergency < 3 && loadPct > 70) emergencyWarn = true; // Rules Engine alert
        
        stList.innerHTML = `
            <li style="display:flex; justify-content:space-between;"><span>Doctors On Duty</span> <b>${st.doctorsOnDuty}</b></li>
            <li style="display:flex; justify-content:space-between;" class="${emergencyWarn ? 'bg-error' : ''}">
                <span>Emergency Doctors</span> 
                <b>${st.emergency} ${emergencyWarn ? '⚠' : ''}</b>
            </li>
            <li style="display:flex; justify-content:space-between;"><span>Specialist Surgeons</span> <b>${st.specialists}</b></li>
            <li style="display:flex; justify-content:space-between;"><span>Nurses On Duty</span> <b>${st.nurses}</b></li>
        `;

        // === Feature 3: Facilities Panel ===
        const fac = hosp.facilities || {otReady: false, ventilators: 0, traumaReady: false};
        document.getElementById('ad-fac-ot').innerHTML = `<b>OT Ready:</b> ${fac.otReady ? '<span class="text-green">Yes</span>' : '<span class="text-red">⚠ Limited</span>'} (${fac.otTotal} total)`;
        document.getElementById('ad-fac-vent').innerHTML = `<b>Ventilators:</b> <span class="${fac.ventilators < 5 ? 'text-yellow' : 'text-green'}">${fac.ventilators} Avail</span>`;
        if(hosp.type.includes('Trauma')) {
             document.getElementById('ad-fac-trauma').innerHTML = `<b>Trauma Unit:</b> <span class="text-green">Active</span>`;
        } else {
             document.getElementById('ad-fac-trauma').style.display = 'none';
        }

        // === Feature 4: Resource Shortage & Blood Bank ===
        const blood = hosp.bloodBank || {};
        const bbContainer = document.getElementById('ad-blood-bank');
        bbContainer.innerHTML = '';
        Object.keys(blood).forEach(type => {
            let status = blood[type];
            let badgeCls = status === 'LOW' ? 'badge red' : 'badge';
            bbContainer.innerHTML += `<div class="${badgeCls}" style="display:flex; gap:0.5rem; border:1px solid ${status==='LOW' ? 'var(--color-red)' : 'var(--glass-border)'}">
                <b>${type}</b> <span>${status}</span>
            </div>`;
        });
        
        const sup = hosp.supplies || {};
        const supDiv = document.getElementById('ad-supplies');
        supDiv.innerHTML = `Oxygen: <span class="${sup.oxygen === 'LOW' ? 'text-red font-bold' : ''}">${sup.oxygen}</span> &middot; Emergency Kits: <span class="${sup.emergencyKits === 'LOW' ? 'text-yellow' : ''}">${sup.emergencyKits}</span>`;

        // === Feature 5: Incoming Patient Alert System (CORE FEATURE) & Feature 9: Prep Status ===
        const inboundPatients = await window.API.getIncomingPatients(hospId);
        const inbCount = document.getElementById('inbound-count');
        inbCount.innerText = inboundPatients.length;
        if(inboundPatients.length > 0) { inbCount.classList.add('animate-pulse'); } else { inbCount.classList.remove('animate-pulse'); }

        const feed = document.getElementById('admin-inbound-feed');
        if(!isBackgroundSync || feed.getAttribute('data-sync') !== JSON.stringify(inboundPatients.map(p => p.id+p.prepLevel))) { // prevent flicker if no change
            feed.setAttribute('data-sync', JSON.stringify(inboundPatients.map(p => p.id+p.prepLevel)));
            feed.innerHTML = '';
            
            if(inboundPatients.length === 0) {
                feed.innerHTML = '<div style="opacity:0.5; padding:2rem; text-align:center;">No active inbound routes</div>';
            } else {
                inboundPatients.forEach(p => {
                    const sevColor = `triage-${p.severity}`;
                    const prepVal = p.prepLevel || 'notstarted';
                    const prepCls = `badge-${prepVal}`;
                    
                    // Feature 7 routing insight mock
                    let distMock = (Math.random() * 4 + 1).toFixed(1);

                    feed.innerHTML += `
                        <div class="alert-card ${sevColor}">
                            <div class="alert-card-header">
                                <span class="alert-id">ID: ${p.id}</span>
                                <span class="alert-time">ETA: ~${Math.floor(distMock * 3)} mins</span>
                            </div>
                            <div class="alert-title">${p.symptoms || 'Dispatched for assessment'}</div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
                                <div style="font-size:0.75rem; color:var(--text-muted);"><i data-lucide="navigation" style="width:12px; height:12px; margin-right:2px"></i> ${distMock} mi away</div>
                                <select class="prep-select ${prepCls}" onchange="updatePatientPrep('${p.id}', this.value)">
                                    <option value="notstarted" ${prepVal==='notstarted'?'selected':''}>Not Started</option>
                                    <option value="preparing" ${prepVal==='preparing'?'selected':''}>Preparing ICU/OT</option>
                                    <option value="ready" ${prepVal==='ready'?'selected':''}>Ready for Arrival</option>
                                </select>
                            </div>
                        </div>
                    `;
                });
            }
            if(!isBackgroundSync) lucide.createIcons();
        }

        // === Feature 6: Hospital Comparison Panel ===
        const hTable = document.getElementById('ad-network-compare');
        if(!isBackgroundSync) {
             hTable.innerHTML = '';
             let sorted = [...hospitals].sort((a,b) => (b.capacity-b.currentLoad) - (a.capacity-a.currentLoad));
             sorted.forEach(sh => {
                 let sPct = (sh.currentLoad / sh.capacity) * 100;
                 let sCol = sPct >= 90 ? 'var(--color-red)' : (sPct >= 70 ? 'var(--color-yellow)' : 'var(--color-green)');
                 let rowHtml = `
                    <div style="display:flex; justify-content:space-between; padding:0.5rem; background:rgba(0,0,0,0.3); border-radius:4px; border-left:2px solid ${sCol};">
                        <div><div style="font-weight:600;">${sh.name} ${sh.id===hospId ? '(You)' : ''}</div><div style="font-size:0.7rem; color:var(--text-muted)">Dist: ${(Math.random() * 8 + 1).toFixed(1)} miles</div></div>
                        <div style="text-align:right"><div><b>${sh.capacity - sh.currentLoad}</b> beds free</div><div style="font-size:0.7rem; color:${sCol}">${sh.currentLoad}/${sh.capacity}</div></div>
                    </div>
                 `;
                 hTable.innerHTML += rowHtml;
             });
        }

        // === Feature 11: AI Suggestions (Rule Engine) ===
        if(!isBackgroundSync) {
            const aiList = document.getElementById('ad-ai-suggest');
            aiList.innerHTML = '';
            
            if(loadPct > 85) {
                aiList.innerHTML += `<li><span class="text-yellow"><b>Redirect Traffic:</b></span> Your facility load is critical. The Global Dispatch Engine is automatically redirecting non-trauma cases to UCSF Medical Center.</li>`;
            }
            if(emergencyWarn) {
                 aiList.innerHTML += `<li><span class="text-red"><b>Staff Shortage:</b></span> You have insufficient Emergency Doctors for the current high network load. <i>Suggest authorizing on-call backup page.</i></li>`;
            }
            if(blood['O-'] === 'LOW') {
                 aiList.innerHTML += `<li><span class="text-yellow"><b>Blood Bank:</b></span> O- Negative is critically low. <i>Suggest automated requisition from St. Mary's Clinic blood vault.</i></li>`;
            }
            if(inboundPatients.some(p => p.severity === 'red')) {
                 aiList.innerHTML += `<li><span class="text-blue"><b>Preparation:</b></span> Inbound Red Trauma active. <i>Suggest preparing Trauma Bay 1 and notifying neurosurgeon on duty.</i></li>`;
            }

            if(aiList.innerHTML === '') {
                 aiList.innerHTML = `<li><span class="text-green">All systems nominal.</span> Facility is balanced and ready.</li>`;
            }
        }

    } catch(e) {
        console.error("Admin render fault", e);
    }
}

window.updatePatientPrep = async function(pId, prepVal) {
    const patients = window.API._get('sr_patients');
    const p = patients.find(x => x.id === pId);
    if(p) {
        p.prepLevel = prepVal;
        window.API._set('sr_patients', patients);
        // Force sync ui
        const selectBox = document.getElementById('admin-hospital-select');
        await renderAdminDashboard(selectBox.value, false);
    }
}

window.initAdminView = initAdminView;
