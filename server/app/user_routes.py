#!/usr/bin/env python3
""" Routes for user related request """

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from functools import wraps
from datetime import datetime
from models.chat_message import ChatMessage
from models.chat_room import ChatRoom
from models.user import User
from models.revoked_token import RevokedToken
from bson import Binary
import base64

user_bp = Blueprint('user_routes', __name__, url_prefix='/user')

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


@user_bp.route('/get_user_info', methods=['GET'])
@logged_in
def get_user_info(current_user):
    """ Gets the information of the current user """
    firstname = User.objects(email=current_user).first().firstname
    lastname = User.objects(email=current_user).first().lastname
    bio = User.objects(email=current_user).first().bio
    email = current_user

    user_info = {
            "firstName": firstname,
            "lastName": lastname,
            "email": email,
            "bio": bio
            }
    return make_response(jsonify(user_info), 201)


@user_bp.route('/update_user_info', methods=['POST'])
@logged_in
def update_user_info(current_user):
    """Update the information of the current user"""
    print(request)
    print(request.json)
    print(request.form)
    data = request.json
    new_firstname = data.get('firstName')
    new_lastname = data.get('lastName')
    new_bio = data.get('bio')

    # Update the user information in the database
    user = User.objects(email=current_user).first()
    if user:
        user.firstname = new_firstname
        user.lastname = new_lastname
        user.bio = new_bio
        user.save()  # Save the changes
        return make_response(jsonify({"message": "User information updated successfully"}), 200)
    else:
        return make_response(jsonify({"error": "User not found"}), 404)

@user_bp.route('/get_image', methods=['GET'])
@logged_in
def get_image(current_user):
    """ Gets the image of the current user """
    user = User.objects(email=current_user).first()
    if user and user.image:
        response = make_response(user.image)
        response.headers['Content-Type'] = 'image/*'

        return response
    return 'Image not found', 404


@user_bp.route('/upload_image', methods=['POST'])
@logged_in
def upload_image(current_user):
    """ Saves the image of the current user """
    print(request.form )


    if 'image' not in request.form:
        print('no image')
        return 'No image uploaded'
    
    image = request.form['image']
    
    image_data = image.split(',')[1]

    # Decode the base64 encoded string to binary
    binary_image_data = base64.b64decode(image_data)
    

    print("image updating")


    user = User.objects(email=current_user).first()
    user.image = binary_image_data
    user.save()
    return make_response(
        jsonify({"message": 'Upload successful'}),
        201)

@user_bp.route('/get_users', methods=['GET'])
def get_users():
    users = User.objects()
    users_list = [user.to_dict() for user in users]
    return jsonify({"users": users_list})