#!/usr/bin/env python3
"""Chat Module"""

from datetime import datetime
from mongoengine import DateTimeField, StringField, ListField, ReferenceField, Document, EmbeddedDocumentField
from .user import User


from datetime import datetime

class Message(Document):
    """
    The Class embedded document
    """
    sender = ReferenceField(User, required=True)
    recipient = ReferenceField(User, required=True)
    text = StringField(required=True)
    timestamp = DateTimeField(required=True)

    def to_dict(self):
        return {
            "sender": {
                "firstname": self.sender.firstname,
                "lastname": self.sender.lastname,
            },
            "recipient": {
                "firstname": self.recipient.firstname,
                "lastname": self.recipient.lastname,
            },
            "text": self.text,
            "timestamp": self.timestamp.isoformat()
        }
    
    @staticmethod
    def create_message(sender, recipient, text, timestamp_str):
        # Parse the timestamp from the string (ensure it handles UTC)
        try:
            timestamp = datetime.fromisoformat(timestamp_str.replace("Z", "+00:00"))
        except ValueError:
            # If timestamp is invalid, fall back to the current time
            timestamp = datetime.utcnow()

        # Create and save the new message
        new_message = Message(sender=sender, recipient=recipient, text=text, timestamp=timestamp)
        new_message.save()

        return new_message

    