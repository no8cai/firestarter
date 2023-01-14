from flask import Blueprint, request, jsonify
from flask.json import JSONEncoder

from app.api.auth_routes import authenticate
from ..models import Reward, db, User, Project
from ..forms.reward_form import RewardForm

from flask_login import current_user, login_user, logout_user, login_required

rewards_routes = Blueprint('rewards', __name__, url_prefix="/api")

# ALL REWARDS BASED ON PROJECT ID
@rewards_routes.route('/projects/<int:id>/rewards')
def all_rewards(id):
    rewards = Reward.query.filter(Reward.projectId == id).all()
    rwds = [reward.to_dict_reward() for reward in rewards]
    rewards_routes.json_encoder = JSONEncoder
    return jsonify(rwds)

# CREATE REWARD
@rewards_routes.route('/projects/<int:id>/rewards', methods=["POST"])
def create_reward(id):
    form = RewardForm()
    # Authorization
    form['csrf_token'].data = request.cookies['csrf_token']
    project = Project.query.get(id)
    
    if not project:
        return {
            "message": "Project couldn't be found",
            "statusCode": 404
        }, 404
    
    # Current user is project creator authentication
    if not authenticate()['errors'] and authenticate()['id'] == project.creatorId:
        if form.validate_on_submit():
            new_reward = Reward()
            form.populate_obj(new_reward)
            # assign projectId
            new_reward.projectId = id
            
            db.session.add(new_reward)
            db.session.commit()
            return new_reward.to_dict_reward()
        
        if form.errors:
            return {
                "message": "Validation error",
                "statusCode": 400,
                "errors": form.errors
            }, 400
    
    #current user is not project creator
    else:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }, 403
        
# UPDATE A REWARD
@rewards_routes.route('/rewards/<int:id>', methods=["PUT"])
def update_reward(id):
    form = RewardForm()
    reward = Reward.query.get(id)
    
    if not reward:
        return {
            "message": "Reward couldn't be found",
            "statusCode": 404
        }, 404
    
    form['csrf_token'].data = request.cookies['csrf_token']
    project = Project.query.get(reward.projectId)

    if not authenticate()['errors'] and authenticate()['id'] == project.creatorId:
        if form.validate_on_submit():
            form.populate_obj(reward)
            db.session.add(reward)
            db.session.commit()
            return reward.to_dict_reward()
            
        if form.errors:
            return {
                "message": "Validation error",
                "statusCode": 400,
                "errors": form.errors
            }, 400
            
    else:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }, 403
        
# DELETE A REWARD
@rewards_routes.route('/rewards/<int:id>', methods=["DELETE"])
def delete_reward(id):
    reward = Reward.query.get(id)
    
    if not reward:
        return {
            "message": "Reward couldn't be found",
            "statusCode": 404
        }, 404
        
    project = Project.query.get(reward.projectId)

    if not authenticate()['errors'] and authenticate()['id'] == project.id:
        db.session.delete(reward)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200,
            "id": id
        }, 200
        
    else:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }, 403