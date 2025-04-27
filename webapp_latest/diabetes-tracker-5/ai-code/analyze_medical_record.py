from dotenv import load_dotenv
import os
import requests
import json
from datetime import datetime
from pypdf import PdfReader

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GEMINI_API")

if not API_KEY:
    raise ValueError(" No GEMINI_API found in .env file!")

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

# System Prompt for Medical Record Analysis
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

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def send_to_gemini(extracted_text):
    parts = [{"text": SYSTEM_PROMPT}, {"text": extracted_text}]
    
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

def save_summary_to_json(summary, pdf_path):
    output = {
        "timestamp": datetime.now().isoformat(),
        "analyzed_pdf": pdf_path,
        "summary": summary
    }

    filename = "medical_record_analysis.json"

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
    print("🔵 Medical Record Analyzer (Gemini 2.5 Flash) 🔵")
    pdf_path = input("Enter path to the medical record PDF: ").strip()

    if not os.path.exists(pdf_path):
        print(" PDF file not found. Please check the path.")
        return

    print(" Extracting text from PDF...")
    extracted_text = extract_text_from_pdf(pdf_path)

    print(" Sending text to Gemini for analysis...")
    summary = send_to_gemini(extracted_text)

    if summary:
        print("\n🩺 Medical Record Summary:\n")
        print(summary)
        save_summary_to_json(summary, pdf_path)
        print("\n Summary saved to 'medical_record_analysis.json'")

if __name__ == "__main__":
    main()
