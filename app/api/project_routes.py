from flask import Blueprint, redirect, request
from ..models import db,Project
from app.forms import ProjectForm

import json


project_routes = Blueprint('projects', __name__)

# Get all project data
@project_routes.route('')
def all_projects():
    return {"projects":[project.to_dict() for project in Project.query.all()]}

# Get project data by Id
@project_routes.route('/<int:id>')
def single_project(id):
    oneProject = Project.query.get(id).to_dict()
    return oneProject

# Create a project
@project_routes.route('', methods=['POST'])
def add_project():
    data01=json.loads(request.data)
    form01 = ProjectForm()
    form01["title"].data= data01['title']

    print(form01.validate())
    print(form01.validate_on_submit())
    print(data01["title"])
    print(form01.data["title"])
    if form01.validate_on_submit():
        return "good"
    return "bad"

    # data=json.loads(request.data)
    # newproject=Project(**data)
    # db.session.add(newproject)
    # db.session.commit()
    # return newproject.to_dict()

# Edit a project
@project_routes.route('/<int:id>', methods=['PUT'])
def edit_project(id):
    
    data=json.loads(request.data)
    Project.query.filter(Project.id==id).update(data)
    db.session.commit()
    return Project.query.get(id).to_dict()

# Delete a project
@project_routes.route('/<int:id>', methods=['DELETE'])
def delete_project(id):
    oneProject = Project.query.get(id)
    db.session.delete(oneProject)
    db.session.commit()
    return "delete succeful"