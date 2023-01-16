from flask import Blueprint, request

from app.api.auth_routes import authenticate
from ..models import Reward, db, User, Project
from ..forms.reward_form import RewardForm

from flask_login import current_user, login_user, logout_user, login_required

from .auth_routes import validation_errors_to_error_messages

rewards_routes = Blueprint('rewards', __name__, url_prefix="/api")

# ALL REWARDS BASED ON PROJECT ID
@rewards_routes.route('/projects/<int:id>/rewards')
def all_rewards(id):
    return {"Rewards":[reward.to_dict_reward() for reward in Reward.query.filter(Reward.projectId == id).all()]}

# CREATE REWARD
@rewards_routes.route('/projects/<int:id>/rewards', methods=["POST"])
@login_required
def create_reward(id):
    form = RewardForm()
    # Authorization
    form['csrf_token'].data = request.cookies['csrf_token']
    project = Project.query.get(id)
    
    if not project:
        return {
           'message':'HTTP Error',
           "errors":["Project couldn't be found"],
           'statusCode': 404
           },404
        
    # Current user is project creator authentication
    if authenticate()['id'] == project.creatorId:
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
                "message": "Validation Error",
                "errors":validation_errors_to_error_messages(form.errors),
                "statusCode": 400,
            }, 400
    
    #current user is not project creator
    else:
        return {
            "message": "Forbidden Error",
            'errors': ['The project is not belongs to the current user'],
            "statusCode": 403
        }, 403
        
# UPDATE A REWARD
@rewards_routes.route('/rewards/<int:id>', methods=["PUT"])
@login_required
def update_reward(id):
    form = RewardForm()
    reward = Reward.query.get(id)
    
    if not reward:
        return {
            'message':'HTTP Error',
            "errors":["Reward couldn't be found"],
            'statusCode': 404
            },404
    
    form['csrf_token'].data = request.cookies['csrf_token']
    project = Project.query.get(reward.projectId)

    if authenticate()['id'] == project.creatorId:
        if form.validate_on_submit():
            form.populate_obj(reward)
            db.session.add(reward)
            db.session.commit()
            return reward.to_dict_reward()
            
        if form.errors:
            return {
                "message": "Validation error",
                "errors":validation_errors_to_error_messages(form.errors),
                "statusCode": 400
            }, 400
            
    else:
        return {
            "message": "Forbidden Error",
            'errors': ['The project is not belongs to the current user'],
            "statusCode": 403
        }, 403
        
# DELETE A REWARD
@rewards_routes.route('/rewards/<int:id>', methods=["DELETE"])
@login_required
def delete_reward(id):
    reward = Reward.query.get(id)
    
    if not reward:
        return {
            'message':'HTTP Error',
            "errors":["Reward couldn't be found"],
            'statusCode': 404
            },404
        
    project = Project.query.get(reward.projectId)

    if authenticate()['id'] == project.id:
        db.session.delete(reward)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200
        }, 200
        
    else:
        return {
            "message": "Forbidden Error",
            'errors': ['The project is not belongs to the current user'],
            "statusCode": 403
        }, 403