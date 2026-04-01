// data.js - Mocked data for the simulation (Extended 50 Nodes)

const CITY_CENTER = [37.7749, -122.4194]; // San Francisco as base

const RAW_DUMMY_HOSPITALS = [
    {
        "hospital_id": "HOS-001",
        "hospital_name": "Hope Surgical Institute",
        "location": {
            "lat": 37.767929,
            "lng": -122.461823
        },
        "total_beds": 400,
        "available_beds": 87,
        "ICU_beds_total": 35,
        "ICU_beds_available": 17,
        "doctors_total": 46,
        "doctors_on_duty": 18,
        "emergency_doctors": 1,
        "nurses_on_duty": 54,
        "operation_theatres": 3,
        "ventilators": 10,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 400
    },
    {
        "hospital_id": "HOS-002",
        "hospital_name": "Presidio Surgical Institute",
        "location": {
            "lat": 37.804522,
            "lng": -122.482184
        },
        "total_beds": 210,
        "available_beds": 183,
        "ICU_beds_total": 22,
        "ICU_beds_available": 20,
        "doctors_total": 144,
        "doctors_on_duty": 119,
        "emergency_doctors": 15,
        "nurses_on_duty": 357,
        "operation_theatres": 11,
        "ventilators": 32,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 210
    },
    {
        "hospital_id": "HOS-003",
        "hospital_name": "Pioneer Surgical Institute",
        "location": {
            "lat": 37.72268,
            "lng": -122.491207
        },
        "total_beds": 462,
        "available_beds": 232,
        "ICU_beds_total": 44,
        "ICU_beds_available": 4,
        "doctors_total": 26,
        "doctors_on_duty": 21,
        "emergency_doctors": 2,
        "nurses_on_duty": 63,
        "operation_theatres": 2,
        "ventilators": 8,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 462
    },
    {
        "hospital_id": "HOS-004",
        "hospital_name": "Presidio Surgical Institute",
        "location": {
            "lat": 37.75373,
            "lng": -122.442806
        },
        "total_beds": 80,
        "available_beds": 3,
        "ICU_beds_total": 11,
        "ICU_beds_available": 6,
        "doctors_total": 22,
        "doctors_on_duty": 22,
        "emergency_doctors": 3,
        "nurses_on_duty": 66,
        "operation_theatres": 5,
        "ventilators": 15,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 80
    },
    {
        "hospital_id": "HOS-005",
        "hospital_name": "Presidio Clinic",
        "location": {
            "lat": 37.786097,
            "lng": -122.447939
        },
        "total_beds": 116,
        "available_beds": 61,
        "ICU_beds_total": 7,
        "ICU_beds_available": 3,
        "doctors_total": 74,
        "doctors_on_duty": 24,
        "emergency_doctors": 4,
        "nurses_on_duty": 96,
        "operation_theatres": 8,
        "ventilators": 19,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 116
    },
    {
        "hospital_id": "HOS-006",
        "hospital_name": "Bayview Health System",
        "location": {
            "lat": 37.737202,
            "lng": -122.421028
        },
        "total_beds": 377,
        "available_beds": 237,
        "ICU_beds_total": 56,
        "ICU_beds_available": 2,
        "doctors_total": 133,
        "doctors_on_duty": 86,
        "emergency_doctors": 4,
        "nurses_on_duty": 258,
        "operation_theatres": 8,
        "ventilators": 26,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 377
    },
    {
        "hospital_id": "HOS-007",
        "hospital_name": "Trinity Healthcare",
        "location": {
            "lat": 37.788808,
            "lng": -122.500103
        },
        "total_beds": 197,
        "available_beds": 38,
        "ICU_beds_total": 15,
        "ICU_beds_available": 11,
        "doctors_total": 54,
        "doctors_on_duty": 23,
        "emergency_doctors": 2,
        "nurses_on_duty": 46,
        "operation_theatres": 2,
        "ventilators": 14,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 197
    },
    {
        "hospital_id": "HOS-008",
        "hospital_name": "Metropolitan Clinic",
        "location": {
            "lat": 37.765337,
            "lng": -122.44232
        },
        "total_beds": 454,
        "available_beds": 22,
        "ICU_beds_total": 22,
        "ICU_beds_available": 8,
        "doctors_total": 60,
        "doctors_on_duty": 30,
        "emergency_doctors": 1,
        "nurses_on_duty": 90,
        "operation_theatres": 10,
        "ventilators": 29,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 454
    },
    {
        "hospital_id": "HOS-009",
        "hospital_name": "Memorial Health System",
        "location": {
            "lat": 37.723965,
            "lng": -122.390163
        },
        "total_beds": 305,
        "available_beds": 161,
        "ICU_beds_total": 29,
        "ICU_beds_available": 26,
        "doctors_total": 124,
        "doctors_on_duty": 42,
        "emergency_doctors": 1,
        "nurses_on_duty": 84,
        "operation_theatres": 6,
        "ventilators": 8,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 305
    },
    {
        "hospital_id": "HOS-010",
        "hospital_name": "General Healthcare",
        "location": {
            "lat": 37.803122,
            "lng": -122.424583
        },
        "total_beds": 85,
        "available_beds": 68,
        "ICU_beds_total": 8,
        "ICU_beds_available": 5,
        "doctors_total": 98,
        "doctors_on_duty": 56,
        "emergency_doctors": 4,
        "nurses_on_duty": 168,
        "operation_theatres": 10,
        "ventilators": 38,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 85
    },
    {
        "hospital_id": "HOS-011",
        "hospital_name": "Sunrise Medical Center",
        "location": {
            "lat": 37.723493,
            "lng": -122.436488
        },
        "total_beds": 185,
        "available_beds": 47,
        "ICU_beds_total": 15,
        "ICU_beds_available": 1,
        "doctors_total": 120,
        "doctors_on_duty": 100,
        "emergency_doctors": 13,
        "nurses_on_duty": 300,
        "operation_theatres": 11,
        "ventilators": 30,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 185
    },
    {
        "hospital_id": "HOS-012",
        "hospital_name": "General Regional Center",
        "location": {
            "lat": 37.80156,
            "lng": -122.43646
        },
        "total_beds": 478,
        "available_beds": 241,
        "ICU_beds_total": 66,
        "ICU_beds_available": 52,
        "doctors_total": 36,
        "doctors_on_duty": 21,
        "emergency_doctors": 1,
        "nurses_on_duty": 84,
        "operation_theatres": 7,
        "ventilators": 35,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 478
    },
    {
        "hospital_id": "HOS-013",
        "hospital_name": "City Surgical Institute",
        "location": {
            "lat": 37.789197,
            "lng": -122.417532
        },
        "total_beds": 139,
        "available_beds": 99,
        "ICU_beds_total": 11,
        "ICU_beds_available": 9,
        "doctors_total": 23,
        "doctors_on_duty": 10,
        "emergency_doctors": 2,
        "nurses_on_duty": 40,
        "operation_theatres": 6,
        "ventilators": 13,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 139
    },
    {
        "hospital_id": "HOS-014",
        "hospital_name": "Bayview Hospital",
        "location": {
            "lat": 37.713845,
            "lng": -122.50251
        },
        "total_beds": 259,
        "available_beds": 168,
        "ICU_beds_total": 15,
        "ICU_beds_available": 14,
        "doctors_total": 99,
        "doctors_on_duty": 55,
        "emergency_doctors": 7,
        "nurses_on_duty": 165,
        "operation_theatres": 2,
        "ventilators": 19,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 259
    },
    {
        "hospital_id": "HOS-015",
        "hospital_name": "Valley Medical Center",
        "location": {
            "lat": 37.752036,
            "lng": -122.414635
        },
        "total_beds": 412,
        "available_beds": 315,
        "ICU_beds_total": 22,
        "ICU_beds_available": 15,
        "doctors_total": 59,
        "doctors_on_duty": 23,
        "emergency_doctors": 4,
        "nurses_on_duty": 46,
        "operation_theatres": 12,
        "ventilators": 39,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 412
    },
    {
        "hospital_id": "HOS-016",
        "hospital_name": "Mission Surgical Institute",
        "location": {
            "lat": 37.757889,
            "lng": -122.398676
        },
        "total_beds": 261,
        "available_beds": 63,
        "ICU_beds_total": 34,
        "ICU_beds_available": 28,
        "doctors_total": 113,
        "doctors_on_duty": 99,
        "emergency_doctors": 9,
        "nurses_on_duty": 396,
        "operation_theatres": 11,
        "ventilators": 22,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 261
    },
    {
        "hospital_id": "HOS-017",
        "hospital_name": "Hope Healthcare",
        "location": {
            "lat": 37.704879,
            "lng": -122.453743
        },
        "total_beds": 126,
        "available_beds": 11,
        "ICU_beds_total": 5,
        "ICU_beds_available": 2,
        "doctors_total": 40,
        "doctors_on_duty": 18,
        "emergency_doctors": 3,
        "nurses_on_duty": 54,
        "operation_theatres": 11,
        "ventilators": 35,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 126
    },
    {
        "hospital_id": "HOS-018",
        "hospital_name": "Mercy Health System",
        "location": {
            "lat": 37.7502,
            "lng": -122.482829
        },
        "total_beds": 168,
        "available_beds": 51,
        "ICU_beds_total": 8,
        "ICU_beds_available": 2,
        "doctors_total": 119,
        "doctors_on_duty": 119,
        "emergency_doctors": 6,
        "nurses_on_duty": 357,
        "operation_theatres": 11,
        "ventilators": 39,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 168
    },
    {
        "hospital_id": "HOS-019",
        "hospital_name": "Sutter Regional Center",
        "location": {
            "lat": 37.747466,
            "lng": -122.413575
        },
        "total_beds": 392,
        "available_beds": 288,
        "ICU_beds_total": 19,
        "ICU_beds_available": 11,
        "doctors_total": 83,
        "doctors_on_duty": 57,
        "emergency_doctors": 5,
        "nurses_on_duty": 114,
        "operation_theatres": 7,
        "ventilators": 25,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 392
    },
    {
        "hospital_id": "HOS-020",
        "hospital_name": "Presidio Surgical Institute",
        "location": {
            "lat": 37.788851,
            "lng": -122.489793
        },
        "total_beds": 179,
        "available_beds": 25,
        "ICU_beds_total": 18,
        "ICU_beds_available": 8,
        "doctors_total": 127,
        "doctors_on_duty": 62,
        "emergency_doctors": 9,
        "nurses_on_duty": 248,
        "operation_theatres": 5,
        "ventilators": 40,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 179
    },
    {
        "hospital_id": "HOS-021",
        "hospital_name": "Valley Surgical Institute",
        "location": {
            "lat": 37.787908,
            "lng": -122.482858
        },
        "total_beds": 73,
        "available_beds": 10,
        "ICU_beds_total": 9,
        "ICU_beds_available": 2,
        "doctors_total": 36,
        "doctors_on_duty": 27,
        "emergency_doctors": 3,
        "nurses_on_duty": 54,
        "operation_theatres": 8,
        "ventilators": 27,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 73
    },
    {
        "hospital_id": "HOS-022",
        "hospital_name": "Golden Gate Hospital",
        "location": {
            "lat": 37.749566,
            "lng": -122.43877
        },
        "total_beds": 407,
        "available_beds": 175,
        "ICU_beds_total": 28,
        "ICU_beds_available": 21,
        "doctors_total": 41,
        "doctors_on_duty": 20,
        "emergency_doctors": 2,
        "nurses_on_duty": 60,
        "operation_theatres": 10,
        "ventilators": 40,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 407
    },
    {
        "hospital_id": "HOS-023",
        "hospital_name": "Grace Regional Center",
        "location": {
            "lat": 37.784845,
            "lng": -122.439393
        },
        "total_beds": 66,
        "available_beds": 59,
        "ICU_beds_total": 9,
        "ICU_beds_available": 0,
        "doctors_total": 41,
        "doctors_on_duty": 24,
        "emergency_doctors": 4,
        "nurses_on_duty": 72,
        "operation_theatres": 5,
        "ventilators": 21,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 66
    },
    {
        "hospital_id": "HOS-024",
        "hospital_name": "Hope Healthcare",
        "location": {
            "lat": 37.700604,
            "lng": -122.495093
        },
        "total_beds": 494,
        "available_beds": 96,
        "ICU_beds_total": 31,
        "ICU_beds_available": 12,
        "doctors_total": 33,
        "doctors_on_duty": 30,
        "emergency_doctors": 1,
        "nurses_on_duty": 120,
        "operation_theatres": 9,
        "ventilators": 32,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 494
    },
    {
        "hospital_id": "HOS-025",
        "hospital_name": "Grace Medical Center",
        "location": {
            "lat": 37.793749,
            "lng": -122.500797
        },
        "total_beds": 212,
        "available_beds": 158,
        "ICU_beds_total": 10,
        "ICU_beds_available": 6,
        "doctors_total": 133,
        "doctors_on_duty": 98,
        "emergency_doctors": 2,
        "nurses_on_duty": 294,
        "operation_theatres": 10,
        "ventilators": 34,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 212
    },
    {
        "hospital_id": "HOS-026",
        "hospital_name": "Valley Trauma Unit",
        "location": {
            "lat": 37.752595,
            "lng": -122.396701
        },
        "total_beds": 94,
        "available_beds": 47,
        "ICU_beds_total": 10,
        "ICU_beds_available": 3,
        "doctors_total": 40,
        "doctors_on_duty": 23,
        "emergency_doctors": 2,
        "nurses_on_duty": 92,
        "operation_theatres": 8,
        "ventilators": 6,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 94
    },
    {
        "hospital_id": "HOS-027",
        "hospital_name": "Trinity Clinic",
        "location": {
            "lat": 37.736643,
            "lng": -122.478586
        },
        "total_beds": 320,
        "available_beds": 276,
        "ICU_beds_total": 15,
        "ICU_beds_available": 8,
        "doctors_total": 21,
        "doctors_on_duty": 14,
        "emergency_doctors": 2,
        "nurses_on_duty": 42,
        "operation_theatres": 5,
        "ventilators": 13,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 320
    },
    {
        "hospital_id": "HOS-028",
        "hospital_name": "Valley Clinic",
        "location": {
            "lat": 37.725919,
            "lng": -122.407813
        },
        "total_beds": 333,
        "available_beds": 56,
        "ICU_beds_total": 31,
        "ICU_beds_available": 14,
        "doctors_total": 119,
        "doctors_on_duty": 83,
        "emergency_doctors": 3,
        "nurses_on_duty": 166,
        "operation_theatres": 6,
        "ventilators": 8,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 333
    },
    {
        "hospital_id": "HOS-029",
        "hospital_name": "City Healthcare",
        "location": {
            "lat": 37.744827,
            "lng": -122.454847
        },
        "total_beds": 384,
        "available_beds": 7,
        "ICU_beds_total": 56,
        "ICU_beds_available": 17,
        "doctors_total": 80,
        "doctors_on_duty": 59,
        "emergency_doctors": 9,
        "nurses_on_duty": 236,
        "operation_theatres": 2,
        "ventilators": 37,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 384
    },
    {
        "hospital_id": "HOS-030",
        "hospital_name": "Pacific Regional Center",
        "location": {
            "lat": 37.746588,
            "lng": -122.382779
        },
        "total_beds": 211,
        "available_beds": 162,
        "ICU_beds_total": 16,
        "ICU_beds_available": 14,
        "doctors_total": 87,
        "doctors_on_duty": 85,
        "emergency_doctors": 8,
        "nurses_on_duty": 255,
        "operation_theatres": 9,
        "ventilators": 34,
        "trauma_care": "yes",
        "bloodbank_available": "no",
        "max_capacity": 211
    },
    {
        "hospital_id": "HOS-031",
        "hospital_name": "Memorial Regional Center",
        "location": {
            "lat": 37.734112,
            "lng": -122.502179
        },
        "total_beds": 492,
        "available_beds": 253,
        "ICU_beds_total": 48,
        "ICU_beds_available": 40,
        "doctors_total": 57,
        "doctors_on_duty": 37,
        "emergency_doctors": 6,
        "nurses_on_duty": 111,
        "operation_theatres": 8,
        "ventilators": 16,
        "trauma_care": "yes",
        "bloodbank_available": "no",
        "max_capacity": 492
    },
    {
        "hospital_id": "HOS-032",
        "hospital_name": "Metropolitan Surgical Institute",
        "location": {
            "lat": 37.777864,
            "lng": -122.45849
        },
        "total_beds": 70,
        "available_beds": 56,
        "ICU_beds_total": 8,
        "ICU_beds_available": 3,
        "doctors_total": 105,
        "doctors_on_duty": 68,
        "emergency_doctors": 12,
        "nurses_on_duty": 272,
        "operation_theatres": 2,
        "ventilators": 24,
        "trauma_care": "yes",
        "bloodbank_available": "no",
        "max_capacity": 70
    },
    {
        "hospital_id": "HOS-033",
        "hospital_name": "Presidio Hospital",
        "location": {
            "lat": 37.783204,
            "lng": -122.418577
        },
        "total_beds": 91,
        "available_beds": 60,
        "ICU_beds_total": 13,
        "ICU_beds_available": 9,
        "doctors_total": 78,
        "doctors_on_duty": 37,
        "emergency_doctors": 2,
        "nurses_on_duty": 74,
        "operation_theatres": 10,
        "ventilators": 30,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 91
    },
    {
        "hospital_id": "HOS-034",
        "hospital_name": "Grace Medical Center",
        "location": {
            "lat": 37.784568,
            "lng": -122.461368
        },
        "total_beds": 483,
        "available_beds": 167,
        "ICU_beds_total": 64,
        "ICU_beds_available": 29,
        "doctors_total": 123,
        "doctors_on_duty": 37,
        "emergency_doctors": 3,
        "nurses_on_duty": 74,
        "operation_theatres": 3,
        "ventilators": 24,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 483
    },
    {
        "hospital_id": "HOS-035",
        "hospital_name": "Pioneer Medical Center",
        "location": {
            "lat": 37.708548,
            "lng": -122.48923
        },
        "total_beds": 98,
        "available_beds": 23,
        "ICU_beds_total": 11,
        "ICU_beds_available": 9,
        "doctors_total": 117,
        "doctors_on_duty": 37,
        "emergency_doctors": 2,
        "nurses_on_duty": 148,
        "operation_theatres": 8,
        "ventilators": 33,
        "trauma_care": "yes",
        "bloodbank_available": "no",
        "max_capacity": 98
    },
    {
        "hospital_id": "HOS-036",
        "hospital_name": "Valley Hospital",
        "location": {
            "lat": 37.737503,
            "lng": -122.41866
        },
        "total_beds": 275,
        "available_beds": 141,
        "ICU_beds_total": 36,
        "ICU_beds_available": 13,
        "doctors_total": 96,
        "doctors_on_duty": 95,
        "emergency_doctors": 4,
        "nurses_on_duty": 380,
        "operation_theatres": 8,
        "ventilators": 14,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 275
    },
    {
        "hospital_id": "HOS-037",
        "hospital_name": "Samaritan Health System",
        "location": {
            "lat": 37.80658,
            "lng": -122.412629
        },
        "total_beds": 321,
        "available_beds": 94,
        "ICU_beds_total": 46,
        "ICU_beds_available": 41,
        "doctors_total": 146,
        "doctors_on_duty": 71,
        "emergency_doctors": 8,
        "nurses_on_duty": 213,
        "operation_theatres": 7,
        "ventilators": 8,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 321
    },
    {
        "hospital_id": "HOS-038",
        "hospital_name": "Golden Gate Clinic",
        "location": {
            "lat": 37.762882,
            "lng": -122.496025
        },
        "total_beds": 127,
        "available_beds": 5,
        "ICU_beds_total": 5,
        "ICU_beds_available": 4,
        "doctors_total": 79,
        "doctors_on_duty": 55,
        "emergency_doctors": 3,
        "nurses_on_duty": 165,
        "operation_theatres": 2,
        "ventilators": 19,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 127
    },
    {
        "hospital_id": "HOS-039",
        "hospital_name": "County Regional Center",
        "location": {
            "lat": 37.736679,
            "lng": -122.438063
        },
        "total_beds": 484,
        "available_beds": 230,
        "ICU_beds_total": 57,
        "ICU_beds_available": 15,
        "doctors_total": 117,
        "doctors_on_duty": 113,
        "emergency_doctors": 18,
        "nurses_on_duty": 452,
        "operation_theatres": 12,
        "ventilators": 17,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 484
    },
    {
        "hospital_id": "HOS-040",
        "hospital_name": "Sunrise Surgical Institute",
        "location": {
            "lat": 37.755637,
            "lng": -122.5073
        },
        "total_beds": 126,
        "available_beds": 102,
        "ICU_beds_total": 7,
        "ICU_beds_available": 4,
        "doctors_total": 131,
        "doctors_on_duty": 75,
        "emergency_doctors": 5,
        "nurses_on_duty": 225,
        "operation_theatres": 12,
        "ventilators": 34,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 126
    },
    {
        "hospital_id": "HOS-041",
        "hospital_name": "Golden Gate Clinic",
        "location": {
            "lat": 37.784448,
            "lng": -122.416042
        },
        "total_beds": 58,
        "available_beds": 13,
        "ICU_beds_total": 5,
        "ICU_beds_available": 1,
        "doctors_total": 40,
        "doctors_on_duty": 27,
        "emergency_doctors": 4,
        "nurses_on_duty": 81,
        "operation_theatres": 5,
        "ventilators": 18,
        "trauma_care": "yes",
        "bloodbank_available": "yes",
        "max_capacity": 58
    },
    {
        "hospital_id": "HOS-042",
        "hospital_name": "Samaritan Regional Center",
        "location": {
            "lat": 37.784073,
            "lng": -122.399514
        },
        "total_beds": 336,
        "available_beds": 46,
        "ICU_beds_total": 38,
        "ICU_beds_available": 10,
        "doctors_total": 110,
        "doctors_on_duty": 61,
        "emergency_doctors": 6,
        "nurses_on_duty": 122,
        "operation_theatres": 6,
        "ventilators": 25,
        "trauma_care": "yes",
        "bloodbank_available": "no",
        "max_capacity": 336
    },
    {
        "hospital_id": "HOS-043",
        "hospital_name": "Sutter Hospital",
        "location": {
            "lat": 37.714604,
            "lng": -122.508981
        },
        "total_beds": 407,
        "available_beds": 4,
        "ICU_beds_total": 9,
        "ICU_beds_available": 4,
        "doctors_total": 64,
        "doctors_on_duty": 34,
        "emergency_doctors": 2,
        "nurses_on_duty": 68,
        "operation_theatres": 8,
        "ventilators": 28,
        "trauma_care": "yes",
        "bloodbank_available": "no",
        "max_capacity": 407
    },
    {
        "hospital_id": "HOS-044",
        "hospital_name": "Samaritan Medical Center",
        "location": {
            "lat": 37.7487,
            "lng": -122.501573
        },
        "total_beds": 493,
        "available_beds": 125,
        "ICU_beds_total": 18,
        "ICU_beds_available": 5,
        "doctors_total": 52,
        "doctors_on_duty": 18,
        "emergency_doctors": 2,
        "nurses_on_duty": 72,
        "operation_theatres": 9,
        "ventilators": 38,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 493
    },
    {
        "hospital_id": "HOS-045",
        "hospital_name": "Trinity Hospital",
        "location": {
            "lat": 37.712394,
            "lng": -122.380792
        },
        "total_beds": 432,
        "available_beds": 113,
        "ICU_beds_total": 26,
        "ICU_beds_available": 9,
        "doctors_total": 100,
        "doctors_on_duty": 84,
        "emergency_doctors": 8,
        "nurses_on_duty": 336,
        "operation_theatres": 10,
        "ventilators": 17,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 432
    },
    {
        "hospital_id": "HOS-046",
        "hospital_name": "City Medical Center",
        "location": {
            "lat": 37.721448,
            "lng": -122.488095
        },
        "total_beds": 356,
        "available_beds": 105,
        "ICU_beds_total": 9,
        "ICU_beds_available": 0,
        "doctors_total": 44,
        "doctors_on_duty": 31,
        "emergency_doctors": 4,
        "nurses_on_duty": 93,
        "operation_theatres": 6,
        "ventilators": 9,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 356
    },
    {
        "hospital_id": "HOS-047",
        "hospital_name": "Pioneer Surgical Institute",
        "location": {
            "lat": 37.749817,
            "lng": -122.393715
        },
        "total_beds": 461,
        "available_beds": 426,
        "ICU_beds_total": 13,
        "ICU_beds_available": 9,
        "doctors_total": 116,
        "doctors_on_duty": 71,
        "emergency_doctors": 6,
        "nurses_on_duty": 213,
        "operation_theatres": 5,
        "ventilators": 27,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 461
    },
    {
        "hospital_id": "HOS-048",
        "hospital_name": "Mercy Healthcare",
        "location": {
            "lat": 37.716605,
            "lng": -122.448949
        },
        "total_beds": 399,
        "available_beds": 19,
        "ICU_beds_total": 35,
        "ICU_beds_available": 4,
        "doctors_total": 34,
        "doctors_on_duty": 17,
        "emergency_doctors": 1,
        "nurses_on_duty": 68,
        "operation_theatres": 11,
        "ventilators": 17,
        "trauma_care": "no",
        "bloodbank_available": "yes",
        "max_capacity": 399
    },
    {
        "hospital_id": "HOS-049",
        "hospital_name": "Memorial Clinic",
        "location": {
            "lat": 37.735751,
            "lng": -122.434347
        },
        "total_beds": 374,
        "available_beds": 214,
        "ICU_beds_total": 54,
        "ICU_beds_available": 20,
        "doctors_total": 120,
        "doctors_on_duty": 55,
        "emergency_doctors": 2,
        "nurses_on_duty": 165,
        "operation_theatres": 6,
        "ventilators": 15,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 374
    },
    {
        "hospital_id": "HOS-050",
        "hospital_name": "Hope Healthcare",
        "location": {
            "lat": 37.763197,
            "lng": -122.421011
        },
        "total_beds": 426,
        "available_beds": 141,
        "ICU_beds_total": 56,
        "ICU_beds_available": 46,
        "doctors_total": 113,
        "doctors_on_duty": 37,
        "emergency_doctors": 5,
        "nurses_on_duty": 111,
        "operation_theatres": 6,
        "ventilators": 9,
        "trauma_care": "no",
        "bloodbank_available": "no",
        "max_capacity": 426
    }
];

// Adapter: Maps the flat Python dummy schema to the nested Mock schema expected by the frontend
const MOCK_HOSPITALS = RAW_DUMMY_HOSPITALS.map(h => ({
    id: h.hospital_id,
    name: h.hospital_name,
    lat: h.location.lat,
    lng: h.location.lng,
    capacity: h.max_capacity,
    currentLoad: h.max_capacity - h.available_beds,
    type: h.trauma_care === 'yes' ? 'Trauma Level I' : 'General Hospital',
    icu: { total: h.ICU_beds_total, occupied: h.ICU_beds_total - h.ICU_beds_available },
    staff: {
        doctorsTotal: h.doctors_total,
        doctorsOnDuty: h.doctors_on_duty,
        emergency: h.emergency_doctors,
        specialists: Math.floor(h.doctors_on_duty * 0.1),
        nurses: h.nurses_on_duty
    },
    facilities: {
        otReady: h.operation_theatres > 0,
        otTotal: h.operation_theatres,
        ventilators: h.ventilators,
        traumaReady: h.trauma_care === 'yes'
    },
    bloodBank: h.bloodbank_available === 'yes' ? { 'O-': 'NORMAL', 'A+': 'NORMAL', 'B-': 'NORMAL' } : { 'O-': 'LOW', 'A+': 'LOW', 'B-': 'LOW' },
    supplies: { oxygen: 'NORMAL', emergencyKits: 'NORMAL' }
}));

window.MOCK_HOSPITALS = MOCK_HOSPITALS;

// Helper to generate random coordinates within a radius (for simulation bursts)
function getRandomLocationWithinRadius(center, radiusInDegrees = 0.02) {
    const r = radiusInDegrees * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    return {
        lat: center.lat + r * Math.cos(theta),
        lng: center.lng + r * Math.sin(theta)
    };
}
