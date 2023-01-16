from flask import Blueprint, redirect, request
from ..models import db, Project, Pledge, Reward
from app.forms.pledge_form import PledgeForm
from app.api.auth_routes import authenticate
from flask_login import current_user, login_user, logout_user, login_required

import json

pledge_routes = Blueprint('pledges', __name__)

# PL1: Get all pledge data
@pledge_routes.route('')
def all_pledges():
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all()]}

# # PL2: Get all current user's pledges
@pledge_routes.route("/current")
def all_backers_pledges_test():
    currentId=current_user.get_id()
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all() if int(pledge.backerId) == int(currentId)]}

# PL3: Get all pledges by project id
@pledge_routes.route('/project/<int:id>')
def all_pledges_by_project_id(id):
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all() if int(pledge.projectId) == int(id)]}

#PL4: Get one pledge by pledge id
@pledge_routes.route('/<int:id>')
def single_pledge3(id):
    onePledge = Pledge.query.get(id).to_dict_full()
    return onePledge

# PL5: Create pledge
@pledge_routes.route('', methods=['POST'])
@login_required
def add_pledge():
    form= PledgeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    currentId=current_user.get_id()

    if form.validate_on_submit():
        new_pledge = Pledge(backerId=currentId)
        form.populate_obj(new_pledge)
        new_pledge.rewardId = form.data['rewardId']
        new_pledge.backerId = currentId
        new_pledge.projectId = form.data['projectId']
        db.session.add(new_pledge)
        db.session.commit()
        return new_pledge.to_dict(), 201
    if form.errors:
        return {
            "errors": form.errors
        }, 400

# PL6: Edit pledge by pledge id
@pledge_routes.route('<int:id>', methods=['PUT'])
@login_required
def edit_pledge(id):
    current_pledge = Pledge.query.get(id)
    if not current_pledge:
        return {"errors": "Pledge not found"}, 404
    form = PledgeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('this is data ----------', list(form.data))
    currentId=current_user.get_id()
    if int(current_pledge.backerId) != int(currentId):
        return {"errors":['Unauthorized']}
    if form.validate_on_submit():
        edit_pledge=Pledge(id=id)
        form.populate_obj(edit_pledge)
        Pledge.query.filter(Pledge.id==id).update(edit_pledge.to_dict())
        return Pledge.query.get(id).to_dict(), 201
    if form.errors:
        return {
            "errors": form.errors
        }, 400

# PL7 Delete pledge by pledge id
@pledge_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_pledge(id):
    onePledge = Pledge.query.get(id)
    currentId=current_user.get_id()
    if int(onePledge.backerId) != int(currentId):
        return {"errors":['Unauthorized']}, 401
    if not onePledge:
        return {"errors": "Pledge not found"}, 404

    db.session.delete(onePledge)
    db.session.commit()
    return "delete successful", 200
