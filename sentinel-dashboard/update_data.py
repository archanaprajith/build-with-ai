import json
import os

data_path = "c:/Users/USER/Desktop/buildwithAI/sentinel-dashboard/dummy_datasets.json"
js_path = "c:/Users/USER/Desktop/buildwithAI/sentinel-dashboard/js/data.js"

with open(data_path, "r") as f:
    datasets = json.load(f)

hospitals_json = json.dumps(datasets["hospitals"], indent=4)

js_content = f"""// data.js - Mocked data for the simulation (Extended 50 Nodes)

const CITY_CENTER = [37.7749, -122.4194]; // San Francisco as base

const RAW_DUMMY_HOSPITALS = {hospitals_json};

// Adapter: Maps the flat Python dummy schema to the nested Mock schema expected by the frontend
const MOCK_HOSPITALS = RAW_DUMMY_HOSPITALS.map(h => ({{
    id: h.hospital_id,
    name: h.hospital_name,
    lat: h.location.lat,
    lng: h.location.lng,
    capacity: h.max_capacity,
    currentLoad: h.max_capacity - h.available_beds,
    type: h.trauma_care === 'yes' ? 'Trauma Level I' : 'General Hospital',
    icu: {{ total: h.ICU_beds_total, occupied: h.ICU_beds_total - h.ICU_beds_available }},
    staff: {{
        doctorsTotal: h.doctors_total,
        doctorsOnDuty: h.doctors_on_duty,
        emergency: h.emergency_doctors,
        specialists: Math.floor(h.doctors_on_duty * 0.1),
        nurses: h.nurses_on_duty
    }},
    facilities: {{
        otReady: h.operation_theatres > 0,
        otTotal: h.operation_theatres,
        ventilators: h.ventilators,
        traumaReady: h.trauma_care === 'yes'
    }},
    bloodBank: h.bloodbank_available === 'yes' ? {{ 'O-': 'NORMAL', 'A+': 'NORMAL', 'B-': 'NORMAL' }} : {{ 'O-': 'LOW', 'A+': 'LOW', 'B-': 'LOW' }},
    supplies: {{ oxygen: 'NORMAL', emergencyKits: 'NORMAL' }}
}}));

window.MOCK_HOSPITALS = MOCK_HOSPITALS;

// Helper to generate random coordinates within a radius (for simulation bursts)
function getRandomLocationWithinRadius(center, radiusInDegrees = 0.02) {{
    const r = radiusInDegrees * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    return {{
        lat: center.lat + r * Math.cos(theta),
        lng: center.lng + r * Math.sin(theta)
    }};
}}
"""

with open(js_path, "w") as f:
    f.write(js_content)

print("Successfully injected 50 hospitals into data.js")
