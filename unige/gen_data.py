from faker import Faker
import yaml
import random

faker = Faker()

# Define courses (magistrale)
courses = [
    "DIGITAL SIGNAL & IMAGE PROCESSING", "DISTRIBUTED COMPUTING", "MACHINE LEARNING",
    "AUGMENTED REALITY", "COMPUTATIONAL VISION", "DEEP LEARNING",
    "ADDITIONAL USEFUL KNOWLEDGE", "COMPUTATIONAL NEUROENGINEERING",
    "COMPUTER GRAPHICS", "TOPICS IN COMPUTER SCIENCE", "DATA WAREHOUSING",
    "INTERNET OF THINGS", "NETWORK ANALYSIS", "PREDICTIVE ANALYTICS PROJECT",
    "SOFTWARE ENGINEERING FOR DATA ANALYTICS", "HUMAN COMPUTER INTERACTION",
    "MACHINE LEARNING AND DATA ANALYSIS", "SOFTWARE SYSTEMS DESIGN AND MODELLING",
    "VIRTUALIZATION AND CLOUD COMPUTING", "FUNCTIONAL AND SECURITY TESTING TECHNIQUES",
    "IT PROJECT MANAGEMENT", "MOBILE DEVELOPMENT", "DATA PROTECTION & PRIVACY",
    "DIGITAL FORENSICS", "PRINCIPLES AND PARADIGMS OF PROGRAMMING LANGUAGES",
    "DATA VISUALIZATION", "HIGH PERFORMANCE COMPUTING", "MULTIAGENT SYSTEMS",
    "NATURAL LANGUAGE PROCESSING", "COMPUTER GAMES", "GEOMETRIC MODELING",
    "TRUSTWORTHY ARTIFICIAL INTELLIGENCE", "ADVANCED DATA MANAGEMENT", "FINAL DISSERTATION"
]

# Generate students
students = []
for _ in range(100):
    student_id = random.randint(4000000, 4999999)
    first_name = faker.first_name()
    last_name = faker.last_name()
    student_courses = random.sample(courses, k=random.randint(1, 10))
    password = faker.password(
        length=6, special_chars=False, digits=True, upper_case=True, lower_case=True)

    students.append({
        "id": student_id,
        "first_name": first_name,
        "last_name": last_name,
        "email": f"S{student_id}.@studenti.unige.it",
        "password": password,
        "courses": student_courses
    })


# Save to YAML
students_file_path = 'data.yml'
with open(students_file_path, 'w') as file:
    yaml.dump({"courses": courses}, file, sort_keys=False)
    yaml.dump({"students": students}, file, sort_keys=False)
