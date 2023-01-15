from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Project,User
from app.forms import ProjectForm
from .auth_routes import validation_errors_to_error_messages
import json

project_routes = Blueprint('projects', __name__)

# Get all project data
@project_routes.route('')
def all_projects():
    return {"projects":[project.to_dict_full() for project in Project.query.join(User).all()]}

# Get all project data by the current user
@project_routes.route('/current')
@login_required
def all_current_projects():
    currentId=current_user.get_id()
    return {"projects":[project.to_dict_full() for project in Project.query.all() if int(project.creatorId) == int(currentId)]}

# Get project data by Id
@project_routes.route('/<int:id>')
def single_project(id):
    oneProject = Project.query.get(id)
    if oneProject:
      return oneProject.to_dict_full()
    return {"error":["Project couldn't be found"]},404

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
        return new_project.to_dict(),201
    
    return {"errors":validation_errors_to_error_messages(form.errors)},400

# Edit a project
@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_project(id):
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the project is in the database
    oneProject = Project.query.get(id)
    if not oneProject:
        return {"error":["Project couldn't be found"]},404
    # check if the current user is the project owner
    currentId=current_user.get_id()
    if int(oneProject.creatorId) != int(currentId):
        return {"error":['Unauthorized']}
    
    if form.validate_on_submit():
        edit_project=Project(id=id)
        form.populate_obj(edit_project)

        Project.query.filter(Project.id==id).update(edit_project.to_dict())
        db.session.commit()
        return Project.query.get(id).to_dict()

    return {"errors":validation_errors_to_error_messages(form.errors)},400


# Delete a project
@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    oneProject = Project.query.get(id)
    if not oneProject:
        return {"error":["Project couldn't be found"]},404
    db.session.delete(oneProject)
    db.session.commit()
    return "delete succeful"