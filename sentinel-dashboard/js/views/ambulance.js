// js/views/ambulance.js - Ambulance Staff Logic

function bindAmbulanceView() {
    const dispatchBtn = document.getElementById('btn-dispatch-ai');
    if (!dispatchBtn) return; // Prevent double bind

    const triageBtns = document.querySelectorAll('.triage-btn');
    const severityInput = document.getElementById('amb-severity-val');
    const pendingSelect = document.getElementById('amb-pending-select');
    const pendingBadge = document.getElementById('amb-pending-badge');
    
    // Triage Select Logic
    triageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
             // Reset styles
             triageBtns.forEach(b => {
                 b.style.background = 'transparent';
                 b.style.color = 'var(--text-main)';
             });
             
             // Activate selected
             btn.style.background = btn.style.borderColor;
             btn.style.color = 'black';
             severityInput.value = btn.getAttribute('data-val');
        });
    });

    // Default selection mock trigger
    document.querySelector('.triage-btn[data-val="yellow"]').click();

    // Pending Select Listener
    if(pendingSelect) {
        pendingSelect.addEventListener('change', () => {
             const selectedOpt = pendingSelect.options[pendingSelect.selectedIndex];
             if(selectedOpt && selectedOpt.value) {
                 document.getElementById('amb-symptoms').value = selectedOpt.getAttribute('data-symptoms') || "";
                 
                 // Pre-select severity if the volunteer guessed it
                 const guessSev = selectedOpt.getAttribute('data-sev');
                 if(guessSev) {
                     const tBtn = document.querySelector(`.triage-btn[data-val="${guessSev}"]`);
                     if(tBtn) tBtn.click();
                 }
             } else {
                 document.getElementById('amb-symptoms').value = "";
             }
        });
    }

    // AI Request Submission
    dispatchBtn.addEventListener('click', async () => {
        const sev = document.getElementById('amb-severity-val').value;
        const sym = document.getElementById('amb-symptoms').value;

        // Visual loading state
        dispatchBtn.innerHTML = '<i data-lucide="loader" class="animate-pulse"></i> Generating Neural Route...';
        lucide.createIcons();
        dispatchBtn.disabled = true;

        try {
            let resultPatient;
            const selectedPendingId = pendingSelect ? pendingSelect.value : "";
            
            if (selectedPendingId) {
                // Route the SPECIFIC patient reported by Citizen
                resultPatient = await window.API.requestAIRoutingForPatient(selectedPendingId, sev);
                
                // Immediately force refresh the pending queue so it disappears from the dropdown
                if(window._pollAmbulanceInterval) refreshPendingQueue();
                
            } else {
                // Freeform patient (Ambulance picked up someone directly)
                const lat = 37.77 + (Math.random() * 0.05 - 0.025);
                const lng = -122.42 + (Math.random() * 0.05 - 0.025);
                
                resultPatient = await window.API.addPatient({
                    name: 'Unknown Critical Patient',
                    severity: sev,
                    symptoms: sym,
                    lat, lng,
                    source: 'ambulance'
                });
            }

            // Handle output dynamically
            const routingDiv = document.getElementById('amb-routing-output');
            const idleDiv = document.getElementById('amb-routing-idle');
            
            const hospitals = window.API._get('sr_hospitals');
            const assignedHosp = hospitals.find(h => h.id === resultPatient.assignedHospitalId);

            if (assignedHosp) {
                document.getElementById('amb-assigned-hospital').innerText = assignedHosp.name;
                
                // Real data logic
                const distMiles = (resultPatient.distPenalty || (Math.random()*4+1)).toFixed(1);
                document.getElementById('amb-eta-text').innerHTML = `ETA: ${Math.floor(distMiles * 3.5)} Minutes &middot; ${distMiles} miles`;
                document.getElementById('amb-reason-desc').innerText = resultPatient.allocationReason || 'AI Assignment Matrix successful.';

                // Color formatting based on assigned tier
                let tColor = 'var(--color-green)';
                let iconStr = 'fast-forward';
                
                if (resultPatient.isRerouted) {
                     // REROUTE LOGIC
                     tColor = 'var(--color-yellow)';
                     iconStr = 'move-right';
                     document.getElementById('amb-reason-title').innerHTML = `<i data-lucide="${iconStr}" class="sm-icon" style="color:${tColor}"></i> Dynamic Reroute Initiated`;
                } else {
                     if (sev === 'red') {
                          tColor = 'var(--color-red)';
                          iconStr = 'triangle-alert';
                     } else if (sev === 'yellow') {
                          tColor = 'var(--color-yellow)';
                     }
                     document.getElementById('amb-reason-title').innerHTML = `<i data-lucide="check-circle" class="sm-icon" style="color:${tColor}"></i> Secure Allocation`;
                }

                routingDiv.querySelector('i').setAttribute('data-lucide', iconStr);
                routingDiv.querySelector('i').style.color = tColor;
                routingDiv.style.display = 'block';
                idleDiv.style.display = 'none';

                // Real-time Feel: Dispatch alert to Authority View global feed
                if(typeof addTriageAlert === 'function') {
                    addTriageAlert({
                        id: resultPatient.id,
                        severity: resultPatient.severity,
                        desc: resultPatient.isRerouted ? `REROUTE -> ${assignedHosp.name}` : `AI Route -> ${assignedHosp.name}`,
                        reqs: sym.length > 0 ? 'Trauma Prep' : null,
                        time: new Date().toLocaleTimeString()
                    });
                }
            } else {
                 alert("CRITICAL: ALL ROUTING SYSTEMS OVERLOADED OR MATCH FAILED. HOLD STATION.");
            }
        } catch(e) {
            console.error(e);
            alert("Network Error during allocation.");
        } finally {
            // Reset button
            dispatchBtn.innerHTML = '<i data-lucide="cpu"></i> Request AI Route Allocation';
            dispatchBtn.disabled = false;
            lucide.createIcons();
        }
    });
}

async function refreshPendingQueue() {
    const list = await window.API.getPendingDispatches();
    const select = document.getElementById('amb-pending-select');
    const badge = document.getElementById('amb-pending-badge');
    if(!select) return;

    // Save currently selected if possible
    const currentVal = select.value;
    
    // Repopulate
    select.innerHTML = '<option value="">-- No pending emergencies --</option>';
    
    if (list.length === 0) {
        badge.innerText = '0';
        badge.style.opacity = '0.5';
    } else {
        badge.innerText = list.length;
        badge.style.opacity = '1';
        badge.classList.add('animate-pulse');
        setTimeout(() => badge.classList.remove('animate-pulse'), 1000);
        
        list.forEach(p => {
             const opt = document.createElement('option');
             opt.value = p.id;
             opt.innerText = `${p.id} - ${p.symptoms.substring(0, 30)}...`;
             opt.setAttribute('data-symptoms', p.symptoms);
             opt.setAttribute('data-sev', p.severity);
             select.appendChild(opt);
        });
        
        // Restore selection if it still exists
        if(list.find(p => p.id === currentVal)) {
            select.value = currentVal;
        }
    }
}

function initAmbulanceView() {
    bindAmbulanceView();
    refreshPendingQueue();
    
    // Poll the DB for new Citizen reports every 3 seconds
    if(window._pollAmbulanceInterval) clearInterval(window._pollAmbulanceInterval);
    window._pollAmbulanceInterval = setInterval(refreshPendingQueue, 3000);
}

window.initAmbulanceView = initAmbulanceView;
