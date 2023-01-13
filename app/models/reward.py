from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()

class Reward(db.Model):
    __tablename__ = 'rewards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Decimal, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    estimatedDelivery = db.Column(db.String(255))

    project = db.relationship("Project", back_populates="rewards")
    pledges = db.relationship("Pledge", back_populates="rewards")



    def to_dict_reward(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'estimatedDelivery': self.estimatedDelivery
        }
