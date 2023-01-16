from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Pledge

class PledgeForm(FlaskForm):
    rewardId = IntegerField('rewardId', validators=[DataRequired()])
