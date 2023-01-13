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
    project = db.relationship("Project", back_populates="reward")
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    
    def to_dict_reward(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }