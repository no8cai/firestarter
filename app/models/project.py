from .db import db, environment, SCHEMA, add_prefix_for_prod
from .reward import Reward
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer,nullable=False)
    title = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    videoUrl = db.Column(db.String(50))
    fundingGoal = db.Column(db.Numeric,nullable=False)
    startDate = db.Column(db.String(50), nullable=False)
    endDate = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    risks = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    rewards = db.relationship("Reward", back_populates="project")

    def to_dict(self):
      return {
        'id': self.id,
        'title': self.title,
        'category': self.category,
        'city': self.city,
        'state': self.state,
        'country': self.country,
        'imageUrl': self.imageUrl,
        'videoUrl': self.videoUrl,
        'fundingGoal': self.fundingGoal,
        'startDate': self.startDate,
        'endDate': self.endDate,
        'description': self.description,
        'risks': self.risks,
        'createdAt': str(self.createdAt),
        'updatedAt': str(self.updatedAt)
      }
