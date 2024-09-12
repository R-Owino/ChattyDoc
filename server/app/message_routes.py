#!/usr/bin/env python3
""" Routes for chat messages """

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from functools import wraps
from datetime import datetime
from models.message import Message
from models.user import User
from models.revoked_token import RevokedToken
from mongoengine import Q

message_bp = Blueprint('message_routes', __name__, url_prefix='/message')


# user must be logged in to access chatrooms
def logged_in(func):
    """
    Decorator function that checks if a user is logged in.
    
    Parameters:
    - func: The function to be decorated.
    
    Returns:
    - wrapper: The decorated function.
    """
    @wraps(func)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()

         # Check if the token JTI is in the revoked tokens
        jti = get_jwt()['jti']
        print(jti)
        if RevokedToken.is_token_blacklisted(jti):
            return jsonify({"error": "Token has been revoked. User is logged out"}), 401
        
        return func(current_user, *args, **kwargs)
    
    return wrapper


@message_bp.route('/get_messages/<recipient>', methods=['GET'])
@logged_in

def get_messages(current_user, recipient):
    try:
        print('get mesage')
        # Check if recipient is provided
        if not recipient:
            return jsonify({"error": "Recipient parameter is required"}), 400
        recipient_firstname, recipient_lastname = recipient.split('_')

        recipient_obj = User.get_user_by_kwargs(firstname=recipient_firstname, lastname=recipient_lastname)
        sender_obj = User.get_user_by_kwargs(email=current_user)


        # Query the Message model to get messages between current_user and recipient
        messages = Message.objects(
            (Q(sender=sender_obj) & Q(recipient=recipient_obj)) |
            (Q(sender=recipient_obj) & Q(recipient=sender_obj))
        ).order_by('timestamp')
        # Serialize the messages into a list of dictionaries
        messages_list = [message.to_dict() for message in messages]

        # Return the serialized messages as JSON
        return jsonify({"messages": messages_list})

    except Exception as e:
        # Log the exception (you can use a logging library for this)
        print(f"Error retrieving messages: {e}")
        # Return a 500 Internal Server Error response with an error message
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500


@message_bp.route('/send_message', methods=['GET'])
@logged_in
def send_message(recipient_username):
    data = request.json
    sender_username = "current_user"  # Replace with your user authentication logic

    sender = User.objects(username=sender_username).first()
    recipient = User.objects(username=recipient_username).first()

    if not sender or not recipient:
        return jsonify({"error": "User not found"}), 404

    message = Message(
        sender=sender,
        recipient=recipient,
        text=data.get('text')
    )
    message.save()

    return jsonify(message.to_dict()), 201