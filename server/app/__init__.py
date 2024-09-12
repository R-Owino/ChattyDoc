
#!/usr/bin/env python3
""" Makes the app folder a package"""

import os
from flask import Flask
from config import DevConfig, ProdConfig, TestConfig
from db import init_mongodb
from flask_jwt_extended import JWTManager
from . import auth, chat_room_routes, message_routes, user_routes


app = Flask(__name__, instance_relative_config=True)

# Use the appropriate config based on the environment variable
if os.environ.get("FLASK_ENV") == "development":
    app.config.from_object(DevConfig)
elif os.environ.get("FLASK_ENV") == "production":
    app.config.from_object(ProdConfig)
else:  # Default to testing environment
    app.config.from_object(TestConfig)

# app routes
app.register_blueprint(auth.bp)
app.register_blueprint(chat_room_routes.room_bp)
app.register_blueprint(message_routes.message_bp)
app.register_blueprint(user_routes.user_bp)

# database initialization
init_mongodb(app)

# JWT
JWTManager(app)

from app import auth, chat_room_routes, message_routes
