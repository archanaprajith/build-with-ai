# Sentinel Response AI

## Problem Statement
In critical emergency response scenarios, seconds define the line between life and death. Yet, our current municipal emergency infrastructure relies on deeply fragmented data and blind routing.

When a mass casualty event or multi-node emergency occurs, independent ambulances instinctively rush patients to the nearest geographical hospital. Because there is no real-time capacity syncing between the command center, the incoming mobile units, and the receiving hospital, this results in catastrophic bottlenecks. Overwhelmed hospitals are forced to trigger 'Ambulance Diversion'—rejecting critically injured patients at the door because they lack available ICU beds or specific trauma surgeons—forcing medics to scramble for secondary routing while the patient is bleeding out.

The core problem is blind triage: We lack a unified, live-synced ecosystem that can instantaneously parse citizen-reported emergency locations, analyze the severity, and autonomously distribute patients across the city's hospital grid based on live resource availability rather than just geographical proximity."


## Project Description
SentinelResponse AI is a fully integrated, intelligent emergency dispatch and hospital load-balancing platform designed to eliminate fatal bottlenecks during mass-casualty events.

Unlike traditional 911 dispatch systems that rely on linear communication and blindly route ambulances geographically, SentinelResponse connects four distinct user nodes—Citizens, Command Authority, Mobile Ambulance Units, and Hospital Administrators—into one live, synchronized ecosystem.

Powered by a dynamic AI routing algorithm and a Network Load Balancer, the platform actively processes emergency reports in real time, allows Authority dispatchers to seamlessly deploy mobile units, and enables Medics to instantly triage patients on-site. The AI Engine then analyzes the live capacity, ICU availability, Blood Bank shortages, and Trauma capabilities of every hospital in the city to determine the mathematically perfect destination for that specific patient.

Key Features:

Geospatial Tracking: Direct browser-based GPS extraction for Citizen event reporting.
Interactive War Room Command: Physical dispatch ticketing for Authority oversight.
Edge-Node Triage: Instant AI route calculation from the Medic's mobile tablet.
Network Load Balancing: An autonomous safeguard that detects when a hospital crosses 95% bed capacity and instantly reroutes incoming ambulances to the next optimal facility, preventing overcrowding and ensuring patients receive immediate, life-saving care upon arrival.

---

## Our platform leverages Google AI to transform chaotic, real-world emergencies into structured, actionable data:

Gemini-Powered NLP Triage: When citizens report accidents in a panic (e.g., "Car flipped, guy bleeding from the head, needs oxygen!"), our system utilizes Google's Gemini models to instantly parse the raw, messy text. It autonomously extracts the critical symptoms, identifies the required life-saving equipment (like O-Negative blood), and accurately categorizes the event as a Critical Red priority—all before a human dispatcher even reads it.
Vertex AI Predictive Load Balancing: Instead of just reacting to full hospitals, the routing engine acts probabilistically. We model Google AI to monitor the network's capacity in real time, predicting which trauma center will hit the 95% threshold before it happens, ensuring mobile units are dynamically rerouted to the perfect destination without a single human calculation.

###1. Frontend Architecture & UI
Core: HTML5, Vanilla JavaScript (ES6+), and CSS3. We intentionally avoided heavy frameworks (like React or Angular) to ensure the platform is lightning-fast, lightweight, and deployable entirely in the browser for this prototype.
Design Language: Custom CSS implementing modern Glassmorphism, dynamic gradient tracking, and responsive grid layouts to create a premium "War Room" aesthetic.
Iconography: Lucide Icons for lightweight, scalable vector graphics across all four user dashboards.
2. Geospatial Mapping & Tracking
Mapping Engine: Leaflet.js integrated with OpenStreetMap data. This powers the interactive Authority Command map, tracking hospital nodes and active emergency locations in real-time.
Geolocation: HTML5 Native navigator.geolocation API, which securely pings the Citizen’s physical browser/device to extract exact latitudinal and longitudinal coordinates for precise routing.
3. Backend Simulation & State Management
Initial Data Modeling: Python was used to build a robust data-generation script (generate_data.py). It mathematically models a 50-node hospital matrix—simulating realistic bed capacities, ICU counts, blood bank volumes, and trauma capabilities—and exports it as a structural JSON payload.
Real-Time State: The Browser LocalStorage API. We wrapped this in a custom JavaScript MockDatabase class (database.js) utilizing asynchronous Promises. This flawlessly mimics a real-world cloud REST API (fetching and pushing data) so the entire 4-person workflow syncs perfectly without needing to spin up an AWS server for the demo.
4. The AI Routing Engine & Mathematical Models
Algorithmic Triage: A deterministic, multi-variable logic model built locally in JavaScript.
The Matrix: When an ambulance requests a route, the AI engine calculates the optimal destination by weighing four critical constraints:
Geographical Proximity: Calculating distance from the crash site to the hospital.
Capacity Load: The Network Load Balancer model automatically disqualifies any hospital that has reached $95%$ occupancy.
Specialty Matching: If a patient is marked as Red/Critical, the model filters for hospitals with active Trauma Centers and available ICU beds.
Resource Verification: Cross-referencing critical shortage flags (e.g., verifying O-Negative Blood supplies before routing a severe hemorrhage case).

- 

### How Google AI Was Used
NLP Triage: AI instantly scans raw citizen crash reports to detect critical keywords (like "bleeding") and automatically predicts the severity score (Red/Critical).
Multi-Variable Routing Matrix: The AI allocation engine acts as a digital dispatcher, weighing four distinct variables simultaneously: geographic distance, live ICU bed counts, active blood bank shortages, and trauma capabilities across 50 nodes.
Autonomous Load Balancing: The AI rule engine constantly monitors network-wide hospital capacity; the exact second a hospital hits 95% occupancy, the AI preemptively blocks it, automatically rerouting all new incoming ambulances to prevent a fatal medical bottleneck.


## Proof of Google AI Usage
Attach screenshots in a `/proof` folder:

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/009019ec-8425-415d-9977-86005a3be466" />


---

## Screenshots 
https://drive.google.com/drive/folders/1oIXHAhGR3Soa44elN54ilBD7D65t2a2v?usp=drive_link


---

## Demo Video
https://drive.google.com/file/d/1nLbfzODg6K3gTOMm_d2YDJGF_J0Kucnh/view?usp=drive_link

---

## Installation Steps

# 1. Clone the repository
git clone https://github.com/your-username/SentinelResponse-AI.git

# 2. Go to the project folder
cd SentinelResponse-AI

# 3. Launch the platform (Option A or Option B)

# Option A: Direct Browser Execution
# Simply double-click the `index.html` file to launch the dashboard instantly.

# Option B: Local Development Server (Recommended for Geolocation API)
# If you have Python 3 installed, you can spin up a local server instantly:
python -m http.server 8000

# Open http://localhost:8000 in your browser.
