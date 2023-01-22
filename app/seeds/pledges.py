from app.models import db, Pledge, environment, SCHEMA

def seed_pledges():

    rewardId = 0
    for project in range (1,19):
        for reward in range(1,4):
            rewardId +=1
            for backer in range(1,3):
                if reward  ==2:
                    backer = backer + 2
                elif reward == 3:
                    backer = backer + 4
                db.session.add(Pledge(rewardId=rewardId, projectId=project, backerId=backer))


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_pledges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pledges")

    db.session.commit()
