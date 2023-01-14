from .db import db, environment, SCHEMA, add_prefix_for_prod


class Pledge(db.Model):
    __tablename__ = 'pledges'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rewardId = db.Column(db.Integer, db.ForeignKey("rewards.id"))
    projectId = db.Column(db.Integer, db.ForeignKey("projects.id"))
    backerId = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="pledges")
    projects = db.relationship("Project", back_populates="pledges")
    reward = db.relationship("Reward", back_populates="pledges")
    

    def to_dict(self):
        return {
            'id': self.id,
            'rewardId': self.rewardId,
            'projectId': self.projectId,
            'backerId': self.backerId
        }
