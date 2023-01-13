from app.models import db, Project, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_projects():
     project1=Project(creatorId=1,title="newproject01",category="art",city="houston",state="texas",country="usa",imageUrl="http://image.com/image01",fundingGoal=200000,startDate="05-02-2023",endDate="10-10-2023",description="this is a good place to start",risks="people dont like arts")

     project2=Project(creatorId=2,title="newproject02",category="music",city="houston",state="texas",country="usa",imageUrl="http://image.com/image01",fundingGoal=300000,startDate="05-02-2023",endDate="10-10-2023",description="this is a good place to start",risks="people dont like arts")

     project3=Project(creatorId=3,title="newproject03",category="tech",city="houston",state="texas",country="usa",imageUrl="http://image.com/image01",fundingGoal=400000,startDate="05-02-2023",endDate="10-10-2023",description="this is a good place to start",risks="people dont like arts")


     db.session.add(project1)
     db.session.add(project2)
     db.session.add(project3)
     db.session.commit()  


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")
        
    db.session.commit()