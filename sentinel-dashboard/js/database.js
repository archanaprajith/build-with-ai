// js/database.js - Simulated API Backend using LocalStorage and Promises

const MOCK_DELAY = 400; // ms to simulate API latency

class MockDatabase {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('sr_users')) {
            localStorage.setItem('sr_users', JSON.stringify([]));
        }
        if (!localStorage.getItem('sr_patients')) {
            localStorage.setItem('sr_patients', JSON.stringify([]));
        }
        
        // Force reset hospitals to pick up expanded Admin UI fields from data.js
        if (!localStorage.getItem('sr_hospitals_v3')) {
            localStorage.setItem('sr_hospitals_v3', 'true');
            localStorage.setItem('sr_hospitals', JSON.stringify(window.MOCK_HOSPITALS || []));
        }
    }

    // Helper functions
    _delay(val) {
        return new Promise(resolve => setTimeout(() => resolve(val), MOCK_DELAY));
    }
    _get(key) { return JSON.parse(localStorage.getItem(key)); }
    _set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

    // --- Authentication --- //
    async registerUser(email, password, role, name) {
        const users = this._get('sr_users');
        if (users.find(u => u.email === email)) {
            throw new Error("Email already registered.");
        }
        const newUser = { id: 'u_' + Date.now(), email, password, role, name };
        users.push(newUser);
        this._set('sr_users', users);
        return this._delay({ success: true, user: { id: newUser.id, email, role, name } });
    }

    async login(email, password) {
        const users = this._get('sr_users');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error("Invalid credentials.");
        return this._delay({ success: true, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    }

    // --- Hospitals (Admin/Authority) --- //
    async getHospitals() {
        return this._delay(this._get('sr_hospitals'));
    }

    async updateHospitalCapacity(id, newCapacity, newLoad) {
        let hospitals = this._get('sr_hospitals');
        const idx = hospitals.findIndex(h => h.id === id);
        if (idx > -1) {
            hospitals[idx].capacity = newCapacity;
            hospitals[idx].currentLoad = newLoad;
            this._set('sr_hospitals', hospitals);
            
            // Phase 3: Dynamic Rerouting Module Trigger!
            // If the hospital is now maxed or near maxed, sweep patients and reroute
            if((newLoad / newCapacity) >= 0.95) {
                this._calculateDynamicReroutes(id);
            }
        }
        return this._delay(hospitals[idx]);
    }

    // --- Patients / Triage (Ambulance/Volunteer) --- //
    async addPatient(patientData) {
        // patientData: { name, severity, symptoms, lat, lng, source: 'ambulance'|'volunteer' }
        const patients = this._get('sr_patients');
        const newPatient = {
            id: 'P-' + Math.floor(Math.random() * 90000 + 10000),
            createdAt: new Date().toISOString(),
            status: patientData.source === 'volunteer' ? 'reported' : 'assigned',
            assignedHospitalId: null,
            allocationReason: '',
            isRerouted: false,
            ...patientData
        };
        
        // AI Logic Engine Trigger for Allocation (Only for Direct Ambulance Inputs)
        if (patientData.severity && patientData.source !== 'volunteer') {
            const allocation = this._runAIAllocationEngine(patientData);
            if (allocation && allocation.id) {
                newPatient.assignedHospitalId = allocation.id;
                newPatient.allocationReason = allocation.reason;
                
                // Increment the hospital's load
                let hospitals = this._get('sr_hospitals');
                const h = hospitals.find(x => x.id === allocation.id);
                if(h) {
                    h.currentLoad++;
                    this._set('sr_hospitals', hospitals);
                }
            }
        }
        
        patients.push(newPatient);
        this._set('sr_patients', patients);
        return this._delay(newPatient);
    }
    
    async getPatients() {
        return this._delay(this._get('sr_patients'));
    }

    async getIncomingPatients(hospitalId) {
        const patients = this._get('sr_patients');
        return this._delay(patients.filter(p => p.assignedHospitalId === hospitalId && p.status !== 'treated'));
    }

    async getPendingDispatches() {
        const patients = this._get('sr_patients');
        // Return latest dispatched (requires Authority physical button press)
        return this._delay(patients.filter(p => p.status === 'dispatched_to_ambulance').reverse().slice(0, 5));
    }

    async requestAIRoutingForPatient(patientId, finalizedSeverity) {
        const patients = this._get('sr_patients');
        const p = patients.find(x => x.id === patientId);
        if (!p) throw new Error("Patient not found in dispatch queue");

        p.severity = finalizedSeverity;
        p.status = 'assigned';

        const allocation = this._runAIAllocationEngine(p);
        if (allocation && allocation.id) {
            p.assignedHospitalId = allocation.id;
            p.allocationReason = allocation.reason;
            
            let hospitals = this._get('sr_hospitals');
            const h = hospitals.find(x => x.id === allocation.id);
            if(h) {
                h.currentLoad++;
                this._set('sr_hospitals', hospitals);
            }
        }

        this._set('sr_patients', patients);
        return this._delay(p);
    }

    async updatePatientStatus(patientId, newStatus) {
        const patients = this._get('sr_patients');
        const p = patients.find(x => x.id === patientId);
        if(p) {
            p.status = newStatus;
            this._set('sr_patients', patients);
        }
        return this._delay(p);
    }

    // --- Engine Internals --- //
    
    _calculateDynamicReroutes(overloadedHospitalId) {
        let patients = this._get('sr_patients');
        let hospitals = this._get('sr_hospitals');
        let rerouteCount = 0;
        
        // Find all patients currently routed to the overloaded node who are NOT treated
        let affected = patients.filter(p => p.assignedHospitalId === overloadedHospitalId && p.status !== 'treated');
        
        affected.forEach(p => {
             // Run AI ignoring the overloaded hospital implicitly (since it's at 95% capacity, the engine will naturally bypass it in RED/YELLOW or heavily penalize it)
             const newAllocation = this._runAIAllocationEngine(p, true);
             if(newAllocation && newAllocation.id && newAllocation.id !== overloadedHospitalId) {
                 // Move them!
                 p.assignedHospitalId = newAllocation.id;
                 p.allocationReason = "⚠ Original Hospital overloaded. Reassigned to " + newAllocation.reason;
                 p.isRerouted = true;
                 
                 // Fix loads
                 const oldH = hospitals.find(h => h.id === overloadedHospitalId);
                 if(oldH) oldH.currentLoad--;
                 
                 const newH = hospitals.find(h => h.id === newAllocation.id);
                 if(newH) newH.currentLoad++;
                 
                 rerouteCount++;
             }
        });
        
        if(rerouteCount > 0) {
            this._set('sr_hospitals', hospitals);
            this._set('sr_patients', patients);
            // Optionally dispatch a global window event for the UI
            window.dispatchEvent(new CustomEvent('AI_REROUTE_FIRED', { detail: rerouteCount }));
        }
    }

    _runAIAllocationEngine(patient, isReroute=false) {
        const hospitals = this._get('sr_hospitals');
        let bestHospital = null;
        let bestScore = -Infinity;
        let matchingReason = "";

        hospitals.forEach(hosp => {
            const availBeds = hosp.capacity - hosp.currentLoad;
            let loadPct = hosp.currentLoad / hosp.capacity;
            
            // Global failure: absolutely cannot go here
            if (availBeds <= 0 || loadPct >= 1.0) return; 
            
            // Capability checks
            const hasIcu = hosp.icu && (hosp.icu.total - hosp.icu.occupied > 0);
            const hasEmergDocs = hosp.staff && hosp.staff.emergency > 0;
            const hasOT = hosp.facilities && hosp.facilities.otReady;

            // Distance Calc
            const dx = hosp.lat - patient.lat;
            const dy = hosp.lng - patient.lng;
            // Mock Distance (Pythagorean)
            const dist = Math.sqrt(dx*dx + dy*dy);
            const distPenalty = dist * 800; // Multiplier

            let score = 0;
            let currentReason = "";

            if (patient.severity === 'red') {
                 // RED: Rule 1: Must prioritize Capability over distance
                 if(loadPct > 0.90) return; // Cannot send Red to dangerous load
                 
                 if (!hasIcu || !hasEmergDocs || !hasOT) {
                     return; // Strict rejection
                 }
                 
                 score = 1000 - distPenalty; // Capability met, now just find closest capable
                 currentReason = `Level 1 matched. ICU Available & Emergency Docs present. Closest capable node.`;
                 
            } else if (patient.severity === 'yellow') {
                 // YELLOW: Rule 2: Balance load and distance
                 if(loadPct > 0.95) return; // Avoid near-full
                 
                 let capacityScore = (1 - loadPct) * 500; // Prefer empty hospitals
                 score = capacityScore - distPenalty;
                 currentReason = `Moderate load balance. Selected based on optimal capacity vs ETA.`;
                 
            } else {
                 // GREEN: Rule 3: Distance above all
                 score = 500 - (distPenalty * 2); // Heavy distance penalty
                 currentReason = `Lowest ETA. Nearest hospital with available general capacity.`;
            }

            if (score > bestScore) {
                bestScore = score;
                bestHospital = hosp;
                matchingReason = currentReason;
            }
        });

        return bestHospital ? {
            id: bestHospital.id,
            reason: matchingReason,
            score: bestScore
        } : null;
    }
}

// Global reference
window.API = new MockDatabase();
