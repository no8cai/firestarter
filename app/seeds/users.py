from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    kirin = User(
        username='Kirin', email='kirin@aa.io', password='passwordKirin')
    annika = User(
        username='Annika', email='annika@aa.io', password='passwordAnnika')
    brad = User(
        username='Brad', email='brad@aa.io', password='passwordBrad')
    cory = User(
        username='Cory', email='cory@aa.io', password='passwordCory')
    david = User(
        username='David', email='david@aa.io', password='passwordDavid')
    eric = User(
        username='Eric', email='eric@aa.io', password='passwordEric')

    db.session.add(kirin) #demo
    db.session.add(annika)
    db.session.add(brad)
    db.session.add(cory)
    db.session.add(david)
    db.session.add(eric)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
