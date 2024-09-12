#!/usr/bin/env python3
""" Main app module """

from app import app
from conn import socketio


if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)