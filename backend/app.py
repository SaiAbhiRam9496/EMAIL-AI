from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/generate-email", methods=["POST"])
def generate_email():
    data = request.json
    gmail_prompt = data.get("prompt")

    if not gmail_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    response = model.generate_content(gmail_prompt)
    return jsonify({"email": response.text})

if __name__ == "__main__":
    app.run(debug=True)
