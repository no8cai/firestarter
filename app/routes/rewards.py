from flask import Blueprint, request, jsonify
from flask.json import JSONEncoder

from app.api.auth_routes import authenticate
from ..models import Reward, db, User, Project
from ..forms.reward_form import RewardForm

from flask_login import current_user, login_user, logout_user, login_required

bp = Blueprint('rewards', __name__, url_prefix="/api")

# ALL REWARDS BASED ON PROJECT ID
@bp.route('/projects/<int:id>/rewards')
def all_rewards(id):
    rewards = Reward.query.filter(Reward.projectId == id).all()
    rwds = [reward.to_dict_reward() for reward in rewards]
    print('GET ALL REWARDS BY PROJECTID', rwds)
    # return str([reward.to_dict_reward() for reward in rewards])
    bp.json_encoder = JSONEncoder
    return jsonify(rwds)

# CREATE REWARD
@bp.route('/projects/<int:id>/rewards', methods=["POST"])
def create_reward(id):
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # bp.json_encoder = JSONEncoder
    # project = Project.query.get(id).to_dict()
    # print("PROOOOOOOOJECT", project)
    # return print('AAAAAAAAAAAAAAAAAUTH????????', authenticate()['id'])
    
    if authenticate()['id'] == id:
        if form.validate_on_submit():
            new_reward = Reward()
            form.populate_obj(new_reward)
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
    
    else:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }, 403
        
# UPDATE A REWARD
@bp.route('/rewards/<int:id>', methods=["PUT"])
def update_reward(id):
    form = RewardForm()
    reward = Reward.query.get(id)
    
    if not reward:
        return {
            "message": "Reward couldn't be found",
            "statusCode": 404
        }, 404
    
    project = Project.query.get(reward.projectId)
    form['csrf_token'].data = request.cookies['csrf_token']

    if authenticate()['id'] == project.id:
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
@bp.route('/rewards/<int:id>', methods=["DELETE"])
def delete_reward(id):
    reward = Reward.query.get(id)
    
    if not reward:
        return {
            "message": "Reward couldn't be found",
            "statusCode": 404
        }, 404
        
    project = Project.query.get(reward.projectId)

    if authenticate()['id'] == project.id:
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