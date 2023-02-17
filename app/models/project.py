from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .reward import Reward

class Project(db.Model):
    __tablename__ = 'projects'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(1000), nullable=False)
    videoUrl = db.Column(db.String(1000))
    fundingGoal = db.Column(db.DECIMAL(50,2),nullable=False)
    startDate = db.Column(db.String(50), nullable=False)
    endDate = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(4000), nullable=False)
    risks = db.Column(db.String(4000), nullable=False)

    user = db.relationship("User", back_populates="projects")
    rewards = db.relationship("Reward", back_populates="project", cascade="all, delete")
    pledges = db.relationship("Pledge", back_populates="project")

    def to_dict(self):
      return {
        'id': self.id,
        'creatorId':self.creatorId,
        'title': self.title,
        'category': self.category,
        'city': self.city,
        'state': self.state,
        'country': self.country,
        'imageUrl': self.imageUrl,
        'videoUrl': self.videoUrl,
        'fundingGoal': str(self.fundingGoal),
        'startDate': self.startDate,
        'endDate': self.endDate,
        'description': self.description,
        'risks': self.risks
      }

    def to_dict_full(self):
      return {
        'id': self.id,
        'creatorId':self.creatorId,
        'title': self.title,
        'category': self.category,
        'city': self.city,
        'state': self.state,
        'country': self.country,
        'imageUrl': self.imageUrl,
        'videoUrl': self.videoUrl,
        'fundingGoal': str(self.fundingGoal),
        'startDate': self.startDate,
        'endDate': self.endDate,
        'description': self.description,
        'risks': self.risks,
        'creator':User.query.get(self.creatorId).to_dict(),
        "rewards":[reward.to_dict_reward() for reward in Reward.query.all() if int(reward.projectId)==int(self.id)]
      }