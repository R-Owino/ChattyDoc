#!/usr/bin/env python3
""" Handles different routes for the app """

from app import app
from flask import render_template, request, jsonify, make_response
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token,create_refresh_token

@app.route('/')
@app.route('/index')
def index():
    """ Return the home page """
    user = {'username': 'Remmy'}
    return render_template('index.html', title='Home', user=user)


@app.route('/register', methods=['GET', 'POST'])
def register():
    """ Registers a new user """
    if request.method == 'POST':
        data = request.get_json()

        username = data.get("username")
        email = data.get('email')
        password = generate_password_hash(data.get('password'))

        if User.get_user_by_email(email):
            return jsonify({"message": f"User with email {email} already exists"})
        
        User.create_user(email, username, password)
        return make_response(jsonify({"message": "User created successfuly"}), 201)
        
    return make_response(jsonify({"message": "Not a POST request"}), 201)


@app.route('/login', methods=['GET', 'POST'])
def login():
    """ Logs in an existing user """
    if request.method == 'POST':
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        user = User.get_user_by_email(email)
        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.name)
            refresh_token = create_refresh_token(identity=user.name)

            return jsonify(
                {"access_token": access_token, "refresh_token": refresh_token}
            )

        else:
            return jsonify({"message": "Invalid username or password"})
    return make_response(jsonify({"message": "Not a POST request"}), 201)