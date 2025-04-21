from flask import request, jsonify
from app import app, db
from app.models.message_model import ContactMessage

# API endpoint to handle contact form submissions
@app.route('/api/contact', methods=['POST'])
def submit_contact_form():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({'success': False, 'error': f'{field} is required'}), 400
        
        # Create new contact message
        new_message = ContactMessage(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )
        
        # Save to database
        db.session.add(new_message)
        db.session.commit()
        
        return jsonify({
            'success': True, 
            'message': 'Your message has been sent successfully!',
            'data': new_message.to_dict()
        }), 201
        
    except Exception as e:
        # Log the error (in a real application)
        print(f"Error: {str(e)}")
        db.session.rollback()
        return jsonify({'success': False, 'error': 'An error occurred. Please try again.'}), 500

# API endpoint to get all contact form submissions (for admin purposes)
@app.route('/api/contact', methods=['GET'])
def get_contact_messages():
    try:
        messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
        return jsonify({
            'success': True,
            'data': [message.to_dict() for message in messages]
        })
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'error': 'An error occurred while fetching messages'}), 500