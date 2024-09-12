#!/bin/bash

gnome-terminal -- bash -c "
  # Open a tab for the backend server
  gnome-terminal --tab -- bash -c '
    cd server/
    source env/bin/activate
    python3 main.py
    exec bash
  ';

  # Open a tab for the React frontend
  gnome-terminal --tab -- bash -c '
    cd client/
    npm start
    exec bash
  ';

  # Open a tab for MongoDB
  gnome-terminal --tab -- bash -c '
    mongod
    exec bash
  '
"


