from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, IntegerField
from app.models import pledge #why lowercase?

class PledgeForm(FlaskForm):
    rewardId = IntegerField('rewardId', validators=[DataRequired()])
