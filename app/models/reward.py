from .db import db, environment, SCHEMA, add_prefix_for_prod


class Reward(db.Model):
    __tablename__ = 'rewards'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    price = db.Column(db.DECIMAL(50,2), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    estimatedDelivery = db.Column(db.String(255))

    project = db.relationship("Project", back_populates="rewards")
    pledges = db.relationship("Pledge", back_populates="reward", cascade="all, delete")



    def to_dict_reward(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': str(self.price),
            'description': self.description,
            'estimatedDelivery': self.estimatedDelivery,
            'projectId':self.projectId
        }
