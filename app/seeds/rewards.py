from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import Reward

with app.app_context():
    
    reward1 = Reward(title="Reward 1 For Project 1", price="1.00", description="Includes a reward. Nice!", projectId=1)
    reward2 = Reward(title="Reward 2 For Project 2", price="2.00", description="Includes a different reward. Wow!", projectId=1)
    reward3 = Reward(title="Reward 3 For Project 3", price="3.00", description="This reward is just feel-good fuzzies. Whoa!", projectId=1)
    
    db.session.add(reward1)
    db.session.add(reward2)
    db.session.add(reward3)
    db.session.commit()