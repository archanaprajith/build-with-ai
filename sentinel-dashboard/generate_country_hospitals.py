import json
import random

# Major Indian Cities Coordinates (Approximate)
CITIES = [
    {"name": "Delhi", "lat": 28.6139, "lng": 77.2090},
    {"name": "Mumbai", "lat": 19.0760, "lng": 72.8777},
    {"name": "Bangalore", "lat": 12.9716, "lng": 77.5946},
    {"name": "Chennai", "lat": 13.0827, "lng": 80.2707},
    {"name": "Hyderabad", "lat": 17.3850, "lng": 78.4867},
    {"name": "Kolkata", "lat": 22.5726, "lng": 88.3639},
    {"name": "Pune", "lat": 18.5204, "lng": 73.8567},
    {"name": "Ahmedabad", "lat": 23.0225, "lng": 72.5714}
]

# Real / Realistic Hospital Chains and Govt Hospitals in India
HOSPITAL_NAMES = [
    "AIIMS", "Safdarjung Hospital", "Apollo Hospitals", "Fortis Healthcare", 
    "Max Super Speciality", "Manipal Hospitals", "Narayana Health", "Medanta - The Medicity",
    "Tata Memorial Hospital", "Christian Medical College", "Kokilaben Dhirubhai Ambani",
    "Aster CMI", "Sir Ganga Ram Hospital", "KIMS Hospitals", "Care Hospitals",
    "Global Hospitals", "Sanjeevani Hospital", "City Care Hospital", "Government Medical College"
]

hospitals = []

# Generate 100 Hospitals across the country
for i in range(1, 101):
    city = random.choice(CITIES)
    # Add slight random offset to scatter them around the city
    lat_val = float(city["lat"]) + random.uniform(-0.1, 0.1)
    lng_val = float(city["lng"]) + random.uniform(-0.1, 0.1)
    lat = float(f"{lat_val:.6f}")
    lng = float(f"{lng_val:.6f}")
    
    # Pick a realistic name
    base_name = random.choice(HOSPITAL_NAMES)
    h_name = f"{base_name} {city['name']}" if random.random() > 0.3 else f"{base_name} Branch {random.randint(1,5)}"
    
    h_id = f"IND-HOS-{i:03d}"
    
    # Vary capacity based on type (Govt/AIIMS is bigger)
    if "AIIMS" in h_name or "Government" in h_name or "Safdarjung" in h_name:
        max_cap = random.randint(800, 2500)
    else:
        max_cap = random.randint(100, 800)
        
    avail = random.randint(0, int(max_cap * 0.4)) # Usually mostly full
    
    icu_max = int(max_cap * 0.15)
    icu_total = random.randint(min(20, icu_max), icu_max if icu_max >= 20 else 20)
    icu_avail = random.randint(0, int(icu_total * 0.3)) # ICUs are often full
    
    doc_tot = random.randint(50, 400)
    doc_duty = random.randint(int(doc_tot*0.3), doc_tot)
    
    em_docs_max = int(doc_duty*0.2)
    em_docs = random.randint(2, em_docs_max) if em_docs_max >= 2 else random.randint(1, 2)
    
    hospitals.append({
        "hospital_id": h_id,
        "hospital_name": h_name,
        "city": city["name"],
        "location": {"lat": lat, "lng": lng},
        "total_beds": max_cap,
        "available_beds": avail,
        "ICU_beds_total": icu_total,
        "ICU_beds_available": icu_avail,
        "doctors_total": doc_tot,
        "doctors_on_duty": doc_duty,
        "emergency_doctors": em_docs,
        "nurses_on_duty": doc_duty * random.randint(2, 4),
        "operation_theatres": random.randint(4, 25),
        "ventilators": random.randint(15, 100),
        "trauma_care": random.choice(["yes", "yes", "no"]), # Most big hospitals have it
        "bloodbank_available": "yes",
        "max_capacity": max_cap
    })

dataset = {
    "country_hospitals": hospitals
}

with open("national_hospitals_dataset.json", "w") as f:
    json.dump(dataset, f, indent=4)

print("Successfully generated national_hospitals_dataset.json with 100 country-wide hospitals!")
