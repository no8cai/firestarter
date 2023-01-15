from flask import Blueprint, redirect, request
from ..models import db, Project, Pledge, Reward
from app.forms.pledge_form import PledgeForm
# from sqlalchemy.orm import sessionmaker, relationship

import json

pledge_routes = Blueprint('pledges', __name__)

# PL1: Get all pledge data - DONE (no error needed)
# but since we will probably never use this route that might be okay
@pledge_routes.route('')
def all_pledges():
    #version 1:
    #return {"pledges":[pledge.to_dict() for pledge in db.session.query(Pledge).join(Reward, Pledge.rewardId == Reward.id).all()]} #this one works

    #version 2:
    # results = db.session.query(Pledge, Project, Reward).select_from(Pledge).join(Reward).join(Project).all() #can add filter(Pledge.backerId == id) before the all
    # listOfDict = []
    # for pledge, project, reward in results:
    #     listOfDict.append(

    #         {"id": pledge.id, 'backerId': pledge.backerId, 'projectId': pledge.projectId,'rewardId':pledge.rewardId,
    #         "Reward":{"id": reward.id, 'title': reward.title},
    #         'Project':{"id": project.id, 'creatorId': project.creatorId, "title": project.title}
    #         }
    #         )
    # return {'Pledges':listOfDict}

    #version 3:
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all()]}



# # PL2: Get all current user's pledges - Needs backerId passed in, error message done
@pledge_routes.route("/current")
def all_backers_pledges_test():
    return {"Pledges":[pledge.to_dict() for pledge in db.session.query(Pledge).filter(Pledge.backerId==2).all()]}

 #with backerId
# @pledge_routes.route('/current')
# def all_backers_pledges(backerId):
    #version 1:
    #return {"Pledges":[pledge.to_dict() for pledge in db.session.query(Pledge).filter(Pledge.backerId==backerId).all()]}
    #version 2:
    # testing = db.session.query(Project).filter(Pledge.backerId==backerId).all()
    # if not testing:
    #     return {'errors': "Needs projectId"}, 400
    # else:
        # results = db.session.query(Pledge, Project, Reward).select_from(Pledge).join(Reward).join(Project).filter(Pledge.backerId==backerId).all()
        # listOfDict = []
        # for pledge, project, reward in results:
        #     listOfDict.append(

        #         {"id": pledge.id, 'backerId': pledge.backerId, 'projectId': pledge.projectId,'rewardId':pledge.rewardId,
        #         "Reward":{"id": reward.id, 'title': reward.title},
        #         'Project':{"id": project.id, 'creatorId': project.creatorId, "title": project.title}
        #         }
        #         )
        # return {'Pledges':listOfDict}
    #version 3: #includes current_user info, but I don't know where it comes from
    # currentId=current_user.get_id() #not sure where current_user is coming from
    # return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all() if int(pledge.backerId) == int(currentId)]}



# PL3: Get all pledges by project id - DONE, error message done
@pledge_routes.route('/project/<int:id>')
def all_pledges_by_project_id(id):
    #version 1
    #return {"Pledges":[pledge.to_dict() for pledge in db.session.query(Pledge).filter(Pledge.projectId==id).all()]}
    #version 2
    # testing = db.session.query(Project).filter(Project.id==id).all()
    # if not testing:
    #     return {'errors': "Needs projectId"}, 400
    # else:
    #     results = db.session.query(Pledge, Project, Reward).select_from(Pledge).join(Reward).join(Project).filter(Project.id==id).all()
    #     listOfDict = []
    #     for pledge, project, reward in results:
    #         listOfDict.append(

    #             {"id": pledge.id, 'backerId': pledge.backerId, 'projectId': pledge.projectId,'rewardId':pledge.rewardId,
    #             "Reward":{"id": reward.id, 'title': reward.title},
    #             'Project':{"id": project.id, 'creatorId': project.creatorId, "title": project.title}
    #             }
    #             )
    #     return {'Pledges':listOfDict}
    #version 3 #doesnt work
    # onePledge = Pledge.query.get(id)
    # if onePledge:
    #     return onePledge.to_dict_full()
    # return {"errors":["Pledge couldn't be found"]}, 404
    return {"Pledges":[pledge.to_dict_full() for pledge in Pledge.query.all() if int(pledge.projectId) == int(id)]}


#PL4: Get one pledge by pledge id - DONE, error message done
@pledge_routes.route('/<int:id>')
def single_pledge3(id):
    #version 1
    # onePledge = Pledge.query.get(id).to_dict()
    # return onePledge
    #version 2
    testing = db.session.query(Pledge).filter(Pledge.id==id).all()
    if not testing:
        return {'errors': "Needs pledgeId"}, 400
    else:
        results = db.session.query(Pledge, Project, Reward).select_from(Pledge).join(Reward).join(Project).filter(Pledge.id==id).all()
        listOfDict = []
        for pledge, project, reward in results:
            return {"id": pledge.id, 'backerId': pledge.backerId, 'projectId': pledge.projectId,'rewardId':pledge.rewardId,
                "Reward":{"id": reward.id, 'title': reward.title},
                'Project':{"id": project.id, 'creatorId': project.creatorId, "title": project.title}
                }



# PL5: Create pledge - DONE, error messages done
@pledge_routes.route('', methods=['POST'])
def add_pledge():
    #data=json.loads(request.data) #not needed?
    form= PledgeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_pledge = Pledge()
        form.populate_obj(new_pledge)
        if not form.data['projectId']: #this should be removed once we fix the db and take out the connection to the project
            return {'errors': "Needs projectId"}, 400
        if not form.data['rewardId']:
            return {'errors': "Needs rewardId"}, 400
        if not form.data['backerId']:
            return {'errors': "Needs backerId"}, 400
        new_pledge.rewardId = form.data['rewardId']
        new_pledge.backerId = form.data['backerId']
        new_pledge.backerId = form.data['projectId'] #need to get rid of this
        db.session.add(new_pledge)
        db.session.commit()
        return new_pledge.to_dict(), 201
    if form.errors:
        return {
            "errors": form.errors
        }, 400

# PL6: Edit pledge by pledge id - DONE, error messages done,
# should we make it so you don't have to give a new value for each field?
# take out project id?
# I think both ways work below, wit hte .update, and with the doing it line by line with form.data['rewardId']
@pledge_routes.route('<int:id>', methods=['PUT'])
def edit_pledge(id):
    current_pledge = Pledge.query.get(id)
    if not current_pledge:
        return {"errors": "Pledge not found"}, 404
    form = PledgeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('this is data ----------', list(form.data))
    if form.validate_on_submit():
        edit_pledge=Pledge(id=id)
        form.populate_obj(edit_pledge)
        Pledge.query.filter(Pledge.id==id).update(edit_pledge.to_dict())
        # if not form.data['projectId']: #this should be removed once we fix the db and take out the connection to the project
        #     return {'errors': "Needs projectId"}, 400
        # if not form.data['rewardId']:
        #     return {'errors': "Needs rewardId"}, 400
        # if not form.data['backerId']:
        #     return {'errors': "Needs backerId"}, 400
        #current_pledge.rewardId = form.data['rewardId'] #can change
        # current_pledge.backerId = form.data['backerId'] #can't change
        # current_pledge.backerId = form.data['projectId'] #need to get rid of this, can't change
        return Pledge.query.get(id).to_dict(), 201
    if form.errors:
        return {
            "errors": form.errors
        }, 400


# PL7 Delete pledge by pledge id - DONE, error messages done
@pledge_routes.route('/<int:id>', methods=['DELETE'])
def delete_pledge(id):
    onePledge = Pledge.query.get(id)
    if not onePledge:
        return {"errors": "Pledge not found"}, 404

    db.session.delete(onePledge)
    db.session.commit()
    return "delete successful", 200
