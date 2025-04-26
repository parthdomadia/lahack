from flask import Flask, request, redirect, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
CLIENT_ID = os.getenv("DEX_CLIENT_ID")
CLIENT_SECRET = os.getenv("DEX_SECRET")
REDIRECT_URI = "http://127.0.0.1:5000/authorize"

app = Flask(__name__)

access_token_global = None  # Save access_token after login

@app.route('/')
def home():
    dexcom_auth_url = (
        "https://sandbox-api.dexcom.com/v2/oauth2/login?"
        f"client_id={CLIENT_ID}&"
        f"redirect_uri={REDIRECT_URI}&"
        "response_type=code&"
        "scope=offline_access"
    )
    return f'<a href="{dexcom_auth_url}">Login with Dexcom</a>'

@app.route('/authorize')
def authorize():
    global access_token_global

    token_url = "https://sandbox-api.dexcom.com/v2/oauth2/token"

    token_data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "password",
        "username": "pdomadia",  # Dexcom Sandbox username
        "password": "3S6i*Aa*8aM2Gct0",  # Dexcom Sandbox password
        "scope": "offline_access"
    }

    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(token_url, data=token_data, headers=headers)

    print("🔵 Token endpoint response status:", response.status_code)
    print("🔵 Token endpoint response body:", response.text)

    if response.status_code == 200:
        tokens = response.json()
        access_token_global = tokens.get("access_token")
        print("🟢 Access token obtained:", access_token_global)

        if access_token_global:
            return "✅ Authorization successful! Access token saved. You can now call /get-egvs"
        else:
            return "❌ Authorization succeeded but no access token found.", 400
    else:
        return f"❌ Token exchange failed: {response.text}", 400




@app.route('/get-egvs')
def get_egvs():
    global access_token_global
    if not access_token_global:
        return "No access token found. Please login first.", 400

    # Fetch estimated glucose values (EGVs)
    egv_url = "https://sandbox-api.dexcom.com/v3/users/self/egvs"
    params = {
        "startDate": "2023-01-01T00:00:00",
        "endDate": "2023-01-02T00:00:00"
    }
    headers = {
        "Authorization": f"Bearer {access_token_global}",
        "Content-Type": "application/json"
    }
    response = requests.get(egv_url, headers=headers, params=params)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return f"Failed to fetch EGVs: {response.text}", 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
