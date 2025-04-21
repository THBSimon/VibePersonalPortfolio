from flask import render_template, send_from_directory
from app import app
import os

# Route to serve the index.html from the root directory
@app.route('/')
def index():
    return send_from_directory('../', 'index.html')

# Route to serve static files (CSS, JS, etc.)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('../', filename)