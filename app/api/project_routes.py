from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Project,User
from app.forms import ProjectForm
from .auth_routes import validation_errors_to_error_messages


project_routes = Blueprint('projects', __name__)

# Get all project data
@project_routes.route('')
def all_projects():
    return {"Projects":[project.to_dict_full() for project in Project.query.all()]}

# Get all project data by the current user
@project_routes.route('/current')
@login_required
def all_current_projects():
    currentId=current_user.get_id()
    return {"Projects":[project.to_dict_full() for project in Project.query.all() if int(project.creatorId) == int(currentId)]}

# Get project data by Id
@project_routes.route('/<int:id>')
def single_project(id):
    oneProject = Project.query.get(id)
    if oneProject:
      return oneProject.to_dict_full()
    return {
        'message':'HTTP Error',
        "errors":["Project couldn't be found"],
        'statusCode': 404
        },404

# Create a project
@project_routes.route('', methods=['POST'])
@login_required
def add_project():
    #use form to validate post data
    form = ProjectForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    currentId=current_user.get_id()
    
    if form.validate_on_submit():
        new_project=Project(creatorId=currentId)
        form.populate_obj(new_project)
        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict_full(),201
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

# Edit a project
@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_project(id):
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the project is in the database
    oneProject = Project.query.get(id)
    if not oneProject:
        return {
            'message':'HTTP Error',
            'errors':["Project couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the project owner
    currentId=current_user.get_id()
    if int(oneProject.creatorId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The project is not belongs to the current user'],
          'statusCode': 403
          },403
    
    if form.validate_on_submit():
        form.populate_obj(oneProject)
        db.session.add(oneProject)
        db.session.commit()
        return oneProject.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# Delete a project
@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    oneProject = Project.query.get(id)
    if not oneProject:
        return {
            'message':'HTTP Error',
            "errors":["Project couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(oneProject.creatorId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The project is not belongs to the current user'],
          'statusCode': 403
          },403
    
    db.session.delete(oneProject)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        'statusCode': 200
        },200