from .db import db, environment, SCHEMA, add_prefix_for_prod
from .reward import Reward
from .project import Project


class Pledge(db.Model):
    __tablename__ = 'pledges'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rewardId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("rewards.id")))
    projectId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("projects.id")))
    backerId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="pledges")
    project = db.relationship("Project", back_populates="pledges")
    reward = db.relationship("Reward", back_populates="pledges")

    def to_dict(self):
        return {
            'id': self.id,
            'rewardId': self.rewardId,
            'projectId': self.projectId,
            'backerId': self.backerId
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'rewardId': self.rewardId,
            'projectId': self.projectId,
            'backerId': self.backerId,
            "Reward": Reward.query.get(self.rewardId).to_dict_reward(),
            "Project": Project.query.get(self.projectId).to_dict()
        }
