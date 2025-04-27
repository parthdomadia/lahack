from dotenv import load_dotenv
import os
import requests
import base64
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Read API Key from .env
API_KEY = os.getenv("GEMINI_API")

if not API_KEY:
    raise ValueError(" No GEMINI_API found in .env file!")

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

# System Prompt
SYSTEM_PROMPT = """You are a professional healthcare dietitian specializing in diabetes management and nutrition science.

When a user uploads a photo of food, carefully analyze the image and confidently provide:

1. An estimated total calorie count based on visual analysis.
2. A nutritional overview, including carbohydrates, proteins, fats, fiber, and sugar content.
3. Insights into the potential risk of a glucose spike based on the types of food and carbohydrate quality.
4. Thoughtful dietary guidance, gently suggesting options that might help diabetic patients manage their blood sugar better.

Important:
- Do not ask the user for portion sizes, ingredients, cooking methods, or additional details.
- Predict based only on the image and general food knowledge.
- Always offer a full estimation and guidance, even if it is an approximation.
- Kindly highlight any foods that may carry a higher glycemic index or could impact blood sugar levels.
- Maintain a warm, supportive, and understanding tone.
- Present facts in a neutral, encouraging way, avoiding commands or judgment.
- Focus on empowering users to make informed choices with kindness and respect.

If the image is unclear or difficult to analyze, acknowledge it politely but still do your best to offer helpful general advice.

At the end of every response, add this important note:

> ⚠️ Please remember: This analysis is based on visual estimation and is intended for educational purposes only.  
> For personalized advice, consider consulting a licensed dietitian, nutritionist, or healthcare provider.  
> You can find local professionals using healthcare directories like [Melissa Data](https://www.melissa.com/) or by searching for "Registered Dietitian near me."
"""

def get_base64_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def send_to_gemini(user_prompt, image_path=None):
    parts = [{"text": SYSTEM_PROMPT}]
    
    if user_prompt:
        parts.append({"text": user_prompt})
        
    if image_path:
        base64_img = get_base64_image(image_path)
        parts.append({
            "inline_data": {
                "mime_type": "image/jpeg",
                "data": base64_img
            }
        })

    payload = {
        "contents": [
            {
                "parts": parts
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
        print(f" Error {response.status_code}: {response.text}")
        return None

def save_to_json(user_input, ai_reply, image_path=None):
    output = {
        "timestamp": datetime.now().isoformat(),
        "user_input": user_input,
        "image_path": image_path if image_path else "None",
        "ai_analysis": ai_reply
    }

    filename = "analysis_output.json"

    # Check if file exists
    if os.path.exists(filename):
        with open(filename, "r+", encoding="utf-8") as f:
            existing_data = json.load(f)
            existing_data.append(output)
            f.seek(0)
            json.dump(existing_data, f, indent=4)
    else:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump([output], f, indent=4)

def main():
    print("🔵 Gemini 2.5 Flash Vision | Healthcare Dietitian Chatbot 🔵")
    print("Upload your food photo or type your question to get calories, nutrition, glucose risk analysis!\n(Type 'exit' to quit)\n")

    while True:
        user_input = input("\nYou: ")
        if user_input.lower() == "exit":
            print("👋 Goodbye! Stay healthy!")
            break

        attach_image = input("Attach a food image? (y/n): ").strip().lower()
        image_path = None

        if attach_image == 'y':
            image_path = input("Enter image file path: ").strip()
            if not os.path.exists(image_path):
                print(" Image file not found. Sending text only.")
                image_path = None

        reply = send_to_gemini(user_input, image_path)
        if reply:
            print(f"\n🩺 Gemini HealthBot:\n{reply}")
            save_to_json(user_input, reply, image_path)

if __name__ == "__main__":
    main()
