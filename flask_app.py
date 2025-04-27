from flask import Flask, request, redirect, jsonify
import requests
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from datetime import datetime
import uuid
from werkzeug.security import generate_password_hash
from datetime import datetime
from pypdf import PdfReader
import json
from google import genai
import base64
import re


# Load environment variables
load_dotenv()

db_user = os.getenv("MONGO_DB_USER")
db_pass = os.getenv("MONGO_DB_PASS")
db_name = os.getenv("DB_NAME")
API_KEY = os.getenv("GEMINI_API")


URI = f"mongodb+srv://{db_user}:{db_pass}@lahack.65kpgbl.mongodb.net/?retryWrites=true&w=majority&appName=lahack"


from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)

access_token_global = None  # Save access_token after login

@app.route('/create_account', methods=['POST'])
def receive_data():
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    # Extract variables from the received data
    full_name = data.get('name')
    email = data.get('email_id')
    raw_password = data.get('password')
    password = generate_password_hash(raw_password)
    

    def insert_user_login(user_data):
        client = MongoClient(URI, server_api=ServerApi('1'))
        db = client[db_name]
        user_logins = db.user_logins

        try:
            # Insert the user
            result = user_logins.insert_one(user_data)
            print(f"✅ Successfully inserted user with _id: {result.inserted_id}")
        except Exception as e:
            print(f"❌ Error inserting user: {e}")
        finally:
            client.close()
            print("🔵 MongoDB connection closed.")

    up_data = {
        "user_id": str(uuid.uuid4()),
        "full_name": full_name,
        "email_id": email,
        "password_hash": password,
        "created_at": datetime.utcnow(),
        "last_login_at": datetime.utcnow(),
        "is_active": True
    }
    insert_user_login(up_data)

    # Store or process the variables as needed
    # For now, just return them as a response
    return jsonify({"message": "Account created successfully"}), 200


@app.route('/login', methods=['POST'])
def login():
    global access_token_global
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    email = data.get('email')
    password = data.get('password')
    password = generate_password_hash(password)

    def check_password_hash(stored_password, provided_password):
        return stored_password == provided_password
    
    def get_user_by_email(email):
        client = MongoClient(URI, server_api=ServerApi('1'))
        db = client[db_name]
        user_logins = db.user_logins

        try:
            user = user_logins.find_one({"email_id": email})
            return user
        except Exception as e:
            print(f"❌ Error fetching user: {e}")
        finally:
            client.close()
            print("🔵 MongoDB connection closed.")

    user = get_user_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user['password_hash'] ==  password:
        return jsonify({"message": "Login successful", "access_token": access_token_global}), 200

    
    access_token_global = str(uuid.uuid4())

    return jsonify({"message": "Login unsuccessful"}), 200


@app.route('/get_user_details', methods=['GET'])
def get_user_details():
    email = request.args.get('email_id')
    if not email:
        return jsonify({"error": "Email ID is required"}), 400

    def fetch_user_details_by_email(email):
        client = MongoClient(URI, server_api=ServerApi('1'))
        db = client[db_name]
        user_logins = db.user_logins

        try:
            user = user_logins.find_one({"email_id": email}, {"user_id": 1, "full_name": 1, "_id": 0})
            return user
        except Exception as e:
            print(f"❌ Error fetching user details: {e}")
        finally:
            client.close()
            print("🔵 MongoDB connection closed.")

    user = fetch_user_details_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user_id": user['user_id'], "full_name": user['full_name']}), 200



@app.route('/pdf_explain', methods=['POST'])
def analyze_pdf():
    data = request.json
    if not data or 'pdf_content' not in data:
        return jsonify({"error": "PDF content is required in the payload"}), 400

    pdf_content = data['pdf_content']

    try:
        # Extract text from the provided PDF content
        extracted_text = extract_text_from_pdf_content(pdf_content)

        # Send the extracted text to Gemini for analysis
        summary = send_to_gemini(extracted_text)

        if summary is None:
            return jsonify({"error": "Failed to analyze the PDF"}), 500

        return jsonify({"summary": summary}), 200
    except Exception as e:
        print(f"❌ Error processing PDF: {e}")
        return jsonify({"error": "An error occurred while processing the PDF"}), 500


def extract_text_from_pdf_content(pdf_content):
    reader = PdfReader(BytesIO(pdf_content.encode('latin1')))
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text


def send_to_gemini(extracted_text):
    GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

    SYSTEM_PROMPT = """You are a professional healthcare assistant specializing in analyzing patient medical records.

    When given a patient's medical record text, carefully extract and summarize:

    1. Diagnoses or known medical conditions.
    2. Current medications and dosages.
    3. Any noted blood sugar levels or diabetes-related observations.
    4. Any recommendations or treatment plans mentioned.
    5. Any warning signs or flags (such as uncontrolled diabetes, hypertension, etc.)

    Important:
    - Provide clear, concise, and organized output.
    - Maintain strict patient confidentiality.
    - Present the information professionally and understandably.

    At the end, gently remind the user that this analysis is informational and not a substitute for professional medical advice."""

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": f"{SYSTEM_PROMPT}\n\n{extracted_text}"}
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(GEMINI_URL, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        reply = data['candidates'][0]['content']['parts'][0]['text']
        return reply
    else:
        print(f"❌ Error {response.status_code}: {response.text}")
        return None


@app.route('/image_explain', methods=['POST'])
def analyze_image():
    import base64
    from google import genai
    import os
    from dotenv import load_dotenv
    from io import BytesIO

    load_dotenv()

    gem_api = os.getenv("GEMINI_API")
    client = genai.Client(api_key=gem_api)

    data = request.json
    if not data or 'image_base64' not in data:
        return jsonify({"error": "No image data provided"}), 400

    image_base64 = data['image_base64']

    try:
        # Decode the base64 image
        image_data = base64.b64decode(image_base64)
        temp_image_path = "temp_image.jpg"

        # Save the decoded image temporarily
        with open(temp_image_path, "wb") as image_file:
            image_file.write(image_data)

        # Upload the image file to the Gemini API
        my_file = client.files.upload(file=temp_image_path)

        # Generate content based on the image
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                my_file,
                "Based on the image, give me an overall calorie count for the food, along with a breakdown of the calories for each item. Also include the amount of sugar that is being consumed in the meal. Give the output in a JSON format similar to the example given below."
            ],
        )

        # Delete the temporary file after processing
        os.remove(temp_image_path)

        # Return the response text as JSON
        return jsonify({"analysis": response.text}), 200
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return jsonify({"error": "An error occurred while analyzing the image"}), 500

@app.route('/last_logged_in', methods=['GET'])
def last_logged_in_user():
    def fetch_last_logged_in_user():
        client = MongoClient(URI, server_api=ServerApi('1'))
        db = client[db_name]
        user_logins = db.user_logins

        try:
            # Find the user with the most recent last_login_at timestamp
            user = user_logins.find_one(
                sort=[("last_login_at", -1)],
                projection={"user_id": 1, "full_name": 1, "_id": 0}
            )
            return user
        except Exception as e:
            print(f"❌ Error fetching last logged in user: {e}")
        finally:
            client.close()
            print("🔵 MongoDB connection closed.")

    user = fetch_last_logged_in_user()
    if not user:
        return jsonify({"error": "No users found"}), 404

    return jsonify({"user_id": user['user_id'], "full_name": user['full_name']}), 200

if API_KEY:
    client = genai.Client(api_key=API_KEY)
else:
    print("API_KEY environment variable not set. Gemini API will not be initialized.")
    client = None


def meal_plan(reading, plan_type):
    prompt = f"""You are a diabetic nutrition AI. Based on:
- Current glucose reading: {reading} mg/dL
- Desired meal plan: {plan_type}

Generate a complete daily meal plan including:
- Breakfast
- Lunch
- Dinner
- Snacks (at least 2–3 options)

For each meal, output the following JSON structure:

[{{"meal_type": "", "estimated_glucose_impact": "", "meal_name": "", "meal_description": "", "nutritional_stats": {{"carbs": "", "protein": "", "fat": "", "calories": ""}}, "why_this_works": ""}}]

**Important style rules:**
- For meal_description, write 2–4 sentences describing the meal in an appetizing way.
- For why_this_works, explain in 2–3 sentences focused on glucose control.
- Meals should look realistic like doctor-designed plans.
- Output ONLY the JSON list without extra text.
"""
    if client:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents = prompt)
        raw_text = response.text.strip()
    else:
        raise ValueError("Gemini API client not initialized.")

    
    
    match = re.search(r'\[.*\]', raw_text, re.DOTALL)
    if match:
        json_str = match.group(0)
        data = json.loads(json_str)
        print("Meal plan data:", data)
        return data
    else:
        raise ValueError("No valid JSON list found in model response.")
    


def glucose_impact(meal_plan_json, glucose_reading):
    meals_summary = ""
    for meal in meal_plan_json:
        meals_summary += f"""
Meal Type: {meal['meal_type']}
Meal Name: {meal['meal_name']}
Carbs: {meal['nutritional_stats']['carbs']}, Protein: {meal['nutritional_stats']['protein']}, Fat: {meal['nutritional_stats']['fat']}, Calories: {meal['nutritional_stats']['calories']}
Meal Description: {meal['meal_description']}
"""
    analysis_prompt = f"""
You are a diabetes nutrition AI.

The user's glucose reading is {glucose_reading} mg/dL. Here is the user's full meal plan:

{meals_summary}

Generate a Glucose Impact Analysis in the following JSON format:

{{"personalized_for_patterns": "", "sections": [{{"title": "Carbohydrate Distribution", "description": ""}}, {{"title": "Protein Focus", "description": ""}}, {{"title": "Strategic Timing", "description": ""}}]}}

**Instructions:**
- Fill in personalized_for_patterns with 2–4 sentences.
- For each section, provide a 2–4 sentence clear description.
- Output ONLY the JSON, no extra commentary.
"""
    if client:
        response = client.models.generate_content(analysis_prompt)
        raw_text = response.text.strip()
    else:
        raise ValueError("Gemini API client not initialized.")

    match = re.search(r'\{.*\}', raw_text, re.DOTALL)
    if match:
        json_str = match.group(0)
        return json.loads(json_str)
    else:
        raise ValueError("No valid JSON found in model response.")


@app.route('/generate_meal_plan', methods=['POST'])
def generate_meal_plan():
    try:
        data = request.json
        glucose_reading = data.get('glucose_reading')
        plan_type = data.get('plan_type', 'Low Carb Plan')
        meal_plan_json = meal_plan(glucose_reading, plan_type)
        return meal_plan_json
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

@app.route('/glucose_impact_analysis', methods=['POST'])
def glucose_impact_analysis():
    try:
        data = request.json
        meal_plan_json = data.get('meal_plan')
        glucose_reading = data.get('glucose_reading')
        analysis_json = glucose_impact(meal_plan_json, glucose_reading)
        return analysis_json
    except Exception as e:
        return jsonify({'error': str(e)}), 400





if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
