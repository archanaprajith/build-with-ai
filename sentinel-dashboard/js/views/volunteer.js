// js/views/volunteer.js - Citizen Reporter Logic

document.addEventListener('DOMContentLoaded', () => {
    // Wait for elements to load
    // Simulated default SF fallback
    let currentVolLat = 37.76 + (Math.random() * 0.04 - 0.02);
    let currentVolLng = -122.43 + (Math.random() * 0.04 - 0.02);

    setTimeout(() => {
        const btnSubmit = document.getElementById('btn-vol-submit');
        const btnLoc = document.getElementById('btn-vol-location');
        const locInput = document.getElementById('vol-loc-input');

        if (btnLoc) {
            btnLoc.addEventListener('click', () => {
                btnLoc.innerHTML = '<i data-lucide="loader" class="animate-pulse"></i>';
                lucide.createIcons();
                
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            currentVolLat = position.coords.latitude;
                            currentVolLng = position.coords.longitude;
                            locInput.value = `Verified: ${currentVolLat.toFixed(4)}, ${currentVolLng.toFixed(4)}`;
                            btnLoc.innerHTML = '<i data-lucide="check" class="text-green"></i>';
                            lucide.createIcons();
                        },
                        (error) => {
                            console.warn("Geolocation denied or failed. Using fallback.", error);
                            // Fallback pseudo-realistic address because file:// often blocks geolocation
                            locInput.value = "Market St & 5th Ave (Simulated GPS fallback)";
                            btnLoc.innerHTML = '<i data-lucide="crosshair"></i>';
                            lucide.createIcons();
                            alert("Native Geolocation blocked. Using fallback emergency tracking.");
                        },
                        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                    );
                } else {
                    locInput.value = "GPS Not Supported";
                }
            });
        }

        if (btnSubmit) {
            btnSubmit.addEventListener('click', async () => {
                let desc = document.getElementById('vol-desc').value;
                const locInputValue = document.getElementById('vol-loc-input').value;
                const successMsg = document.getElementById('vol-success-msg');
                const btn = document.getElementById('btn-vol-submit');
                
                if(!desc) {
                    alert("Please describe the emergency.");
                    return;
                }

                // If user manually typed an address instead of hitting GPS
                if (locInputValue && !locInputValue.includes("Verified") && !locInputValue.includes("GPS") && !locInputValue.includes("cross-street")) {
                    desc = `[Location: ${locInputValue}] ${desc}`;
                }

                btn.innerHTML = '<i data-lucide="loader" class="animate-pulse"></i> Transmitting Securely...';
                lucide.createIcons();
                btn.disabled = true;

                try {
                    // Use tracked geolocation instead of random loop
                    const lat = currentVolLat;
                    const lng = currentVolLng;
                    
                    // Simple NLP simulation: guess severity from text
                    let severity = 'green';
                    const text = desc.toLowerCase();
                    if(text.includes('bleed') || text.includes('unconscious') || text.includes('crash') || text.includes('fire')) severity = 'red';
                    else if(text.includes('broken') || text.includes('hurt') || text.includes('smoke')) severity = 'yellow';

                    const result = await window.API.addPatient({
                        name: 'Unknown Citizen Report',
                        severity: severity,
                        symptoms: desc,
                        lat, lng,
                        source: 'volunteer'
                    });

                    // UI Feedback
                    btn.style.display = 'none';
                    successMsg.style.display = 'block';

                    // Trigger alert to Authority View
                    if(typeof addTriageAlert === 'function') {
                        addTriageAlert({
                            id: `CIT-${result.id.slice(-4)}`,
                            full_id: result.id,
                            severity: result.severity,
                            desc: `Citizen Report: ${desc.substring(0,25)}...`,
                            time: new Date().toLocaleTimeString(),
                            type: 'volunteer'
                        });
                        
                        // Drop a map marker on Authority view
                        if(window.map && window.createHospitalIcon) {
                            let mColor = 'var(--color-green)';
                            if(severity==='red') mColor='var(--color-red)';
                            if(severity==='yellow') mColor='var(--color-yellow)';
                            
                            L.marker([lat, lng], {
                                icon: L.divIcon({
                                    className: 'custom-div-icon',
                                    html: `<div style="background-color: ${mColor}; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 10px ${mColor}"></div>`,
                                    iconSize: [12, 12]
                                })
                            }).addTo(window.map).bindPopup("<b>Citizen Report</b><br>" + desc);
                        }
                    }

                } catch(e) {
                    console.error(e);
                    alert("Failed to submit report. Ensure network connection.");
                    btn.innerHTML = '<i data-lucide="send"></i> Notify Emergency Network';
                    btn.disabled = false;
                    lucide.createIcons();
                }
            });
        }
    }, 500);
});
