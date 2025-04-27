from flask import Flask, request, redirect, jsonify
import requests
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from datetime import datetime
import uuid
from werkzeug.security import generate_password_hash

# Load environment variables
load_dotenv()

db_user = os.getenv("MONGO_DB_USER")
db_pass = os.getenv("MONGO_DB_PASS")
db_name = os.getenv("DB_NAME")


URI = f"mongodb+srv://{db_user}:{db_pass}@lahack.65kpgbl.mongodb.net/?retryWrites=true&w=majority&appName=lahack"


from flask_cors import CORS

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
    raw_password = data.get('password_hash')
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
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    email = data.get('email_id')
    password = data.get('password_hash')
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

    if not check_password_hash(user['password_hash'], password):
        return jsonify({"error": "Invalid password"}), 401

    global access_token_global
    access_token_global = str(uuid.uuid4())

    return jsonify({"message": "Login successful", "access_token": access_token_global}), 200



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
