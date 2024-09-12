#!/usr/bin/env python3
""" The User module"""
from mongoengine import Document, StringField, EmailField, BinaryField


class User(Document):
    """
    The User base model
    """
    email = EmailField(required=True, unique=True)
    firstname = StringField(max_length=50, required=True)
    lastname = StringField(max_length=50, required=True)
    password = StringField(max_length=255, required=True)
    image = BinaryField()
    bio = StringField()

    meta = {'allow_inheritance': True}

    @staticmethod
    def is_authenticated():
        """ Checks whether a user is authenticated"""
        return True

    @staticmethod
    def is_active():
        """ Checks whether a user is active """
        return True
    
    def to_dict(self):
        return {
            'firstname': self.firstname,
            'lastname': self.lastname,
        }

    def get_user_by_email(email):
        """ Retrieves a user based on an email"""
        if email:
            user = User.objects(email=email).first()

            return user
        
    def get_user_by_kwargs(**kwargs):
        try:
            # Attempt to retrieve the user using the provided keyword arguments
            user = User.objects.get(**kwargs)
            return user
        except Exception as e:
            # Handle any other exceptions and print the error message
            print(f"An error occurred: {str(e)}")
            return None

    def create_user(email, firstname, lastname, password):
        """ Creates and adds a new user to the database """
        new_user = User(email=email, firstname=firstname, lastname=lastname, password=password)
        new_user.save()

        return new_user

    def remove_user(self):
        """ Removes a user from the database """
        self.delete()

    def is_anonymous():
        """ Checks whether a user is anonymous """
        return False

    def authenticate_user(email, password):
        """ Authenticates a user """
        user = User.get_user_by_email(email)
        if user and user.password == password:
            return user
        return None

