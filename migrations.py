from app import app, db
from app.models.message_model import ContactMessage

# This script creates the database tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")