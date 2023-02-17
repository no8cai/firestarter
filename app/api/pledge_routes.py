from flask import Blueprint, redirect, request
from ..models import db, Project, Pledge, Reward
from app.forms.pledge_form import PledgeForm
from app.api.auth_routes import authenticate
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages
# from sqlalchemy.orm import sessionmaker, relationship

pledge_routes = Blueprint('pledges', __name__,url_prefix="/api")

# PL1: Get all pledge data - DONE (no error needed)
@pledge_routes.route('/pledges')
def all_pledges():
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all()]}


# # PL2: Get all current user's pledges - Needs backerId passed in, error message done
@pledge_routes.route("/pledges/current")
@login_required
def all_backers_pledges_test():
    currentId=current_user.get_id()
    return {"Pledges":[pledge.to_dict_full() for pledge in db.session.query(Pledge).all() if int(pledge.backerId)==int(currentId)]}


# PL3: Get all pledges by project id - DONE, error message done
@pledge_routes.route('/projects/<int:id>/pledges')
def all_pledges_by_project_id(id):
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all() if int(pledge.projectId) == int(id)]}


#PL4: Get one pledge by pledge id - DONE, error message done
@pledge_routes.route('/pledges/<int:id>')
def single_pledge3(id):
    onePledge = Pledge.query.get(id)
    if onePledge:
        return onePledge.to_dict_full()
    return {
        'message':'HTTP Error',
        "errors":["Pledge couldn't be found"],
        'statusCode': 404
        },404


# PL5: Create pledge - DONE, error messages done
@pledge_routes.route('/pledges', methods=['POST'])
@login_required
def add_pledge():
    form = PledgeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('---------------------------')
        reward=Reward.query.get(form.data["rewardId"])
        if not reward:
            return {
              'message':'HTTP Error',
              "errors": "Reward couldn't be found",
              'statusCode': 404
            }, 404
        project_Id=reward.projectId
        currentId=current_user.get_id()

        user_Pledges=Pledge.query.filter(Pledge.projectId==project_Id).filter(Pledge.backerId==currentId).all()
        if user_Pledges:
            return {
              'message':'Validation Error',
              "errors": "One user can only back one project",
              'statusCode': 400
            }, 400

        new_pledge = Pledge(backerId=currentId,projectId=project_Id)
        form.populate_obj(new_pledge)
        db.session.add(new_pledge)
        db.session.commit()
        return new_pledge.to_dict_full(),201


    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# PL6: Edit pledge by pledge id - DONE, error messages done,
@pledge_routes.route('/pledges/<int:id>', methods=['PUT'])
@login_required
def edit_pledge(id):

    current_pledge = Pledge.query.get(id)
    if not current_pledge:
        return {
            'message':'HTTP Error',
            "errors": "Pledge couldn't be found",
            'statusCode': 404
            }, 404

    form = PledgeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    currentId=current_user.get_id()
    if int(current_pledge.backerId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The pledge is not belongs to the current user'],
          'statusCode': 403
          },403

    if form.validate_on_submit():
        reward=Reward.query.get(form.data["rewardId"])
        if not reward:
            return {
              'message':'HTTP Error',
              "errors": "Reward couldn't be found",
              'statusCode': 404
            }, 404
        if current_pledge.projectId != reward.projectId:
            return {
              'message':'Forbidden Error',
              'errors': ['The reward is not belongs to the project'],
              'statusCode': 403
              },403
        form.populate_obj(current_pledge)
        db.session.add(current_pledge)
        db.session.commit()
        return current_pledge.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# PL7 Delete pledge by pledge id - DONE, error messages done
@pledge_routes.route('/pledges/<int:id>', methods=['DELETE'])
@login_required
def delete_pledge(id):
    onePledge = Pledge.query.get(id)
    if not onePledge:
        return {
            'message':'HTTP Error',
            "errors":["Pledge couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(onePledge.backerId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The pledge is not belongs to the current user'],
          'statusCode': 403
          },403

    db.session.delete(onePledge)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        'statusCode': 200
        },200
