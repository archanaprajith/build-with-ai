import json
import random

# Geofence for San Francisco
LAT_MIN, LAT_MAX = 37.70, 37.81
LNG_MIN, LNG_MAX = -122.51, -122.38

def random_location():
    return {
        "lat": float(f"{random.uniform(LAT_MIN, LAT_MAX):.6f}"),
        "lng": float(f"{random.uniform(LNG_MIN, LNG_MAX):.6f}")
    }

name_prefixes = ["Bayview", "Sutter", "Presidio", "Golden Gate", "Mission", "Pacific", "St. Jude", "Mercy", "General", "Metropolitan", "Valley", "City", "Memorial", "County", "Trinity", "Hope", "Pioneer", "Grace", "Samaritan", "Sunrise"]
name_suffixes = ["Medical Center", "Health System", "Hospital", "Trauma Unit", "Clinic", "Healthcare", "Regional Center", "Surgical Institute"]

hospitals = []
patients = []
staff_list = []
blood_bank = []

# Generate 50 Hospitals
for i in range(1, 51):
    h_id = f"HOS-{i:03d}"
    max_cap = random.randint(50, 500)
    avail = random.randint(0, max_cap)
    
    icu_total = random.randint(5, int(max_cap * 0.15))
    icu_avail = random.randint(0, icu_total)
    
    doc_tot = random.randint(20, 150)
    doc_duty = random.randint(int(doc_tot*0.3), doc_tot)
    
    em_docs_max = int(doc_duty*0.2)
    em_docs = random.randint(1, em_docs_max) if em_docs_max >= 1 else 1
    
    
    # Generate authentic name
    h_name = f"{random.choice(name_prefixes)} {random.choice(name_suffixes)}"
    
    hospitals.append({
        "hospital_id": h_id,
        "hospital_name": h_name,
        "location": random_location(),
        "total_beds": max_cap,
        "available_beds": avail,
        "ICU_beds_total": icu_total,
        "ICU_beds_available": icu_avail,
        "doctors_total": doc_tot,
        "doctors_on_duty": doc_duty,
        "emergency_doctors": em_docs,
        "nurses_on_duty": doc_duty * random.randint(2, 4),
        "operation_theatres": random.randint(2, 12),
        "ventilators": random.randint(5, 40),
        "trauma_care": random.choice(["yes", "no"]),
        "bloodbank_available": random.choice(["yes", "no", "yes"]), # bias to yes
        "max_capacity": max_cap
    })

# Generate 50 Patients
symptoms_list = ["Chest Pain", "Blunt Trauma", "Laceration", "Burns", "Difficulty Breathing", "Unconscious", "Fracture"]
severities = ["Red", "Yellow", "Green"]
treatments = ["ICU", "Surgery", "General Ward", "First Aid"]

for i in range(1, 51):
    patients.append({
        "patient_id": f"PAT-{i:04d}",
        "name": f"Patient {i}",
        "location": random_location(),
        "symptoms": random.choice(symptoms_list),
        "severity": random.choice(severities),
        "required_treatment": random.choice(treatments),
        "assigned_hospital_id": f"HOS-{random.randint(1, 50):03d}" if random.random() > 0.3 else None,
        "status": random.choice(["pending", "assigned", "in-progress", "treated"])
    })

# Generate 50 Staff
roles = ["doctor", "nurse", "paramedic"]
specs = ["Cardiologist", "Surgeon", "General", "Emergency", "Pediatrician"]

for i in range(1, 51):
    role = random.choice(roles)
    staff_list.append({
        "staff_id": f"STF-{i:04d}",
        "hospital_id": f"HOS-{random.randint(1, 50):03d}",
        "role": role,
        "specialization": random.choice(specs) if role == "doctor" else "N/A",
        "on_duty": random.choice(["yes", "no"])
    })

# Generate 50 Blood Bank entries
blood_types = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

for i in range(1, 51):
    units = random.randint(0, 100)
    blood_bank.append({
        "resource_id": f"RES-{i:04d}",
        "hospital_id": f"HOS-{random.randint(1, 50):03d}",
        "blood_group": random.choice(blood_types),
        "units_available": units,
        "shortage_flag": "yes" if units < 10 else "no"
    })

dataset = {
    "hospitals": hospitals,
    "patients": patients,
    "staff": staff_list,
    "blood_bank_resources": blood_bank
}

with open("dummy_datasets.json", "w") as f:
    json.dump(dataset, f, indent=4)

print("Successfully generated dummy_datasets.json")
