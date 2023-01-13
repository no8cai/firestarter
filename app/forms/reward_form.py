from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired

class RewardForm(FlaskForm):
    title = StringField("Reward Title", validators=[DataRequired(message="Reward title cannot be blank.")])
    price = DecimalField("Price", validators=[DataRequired(message="Price for this reward must be set.")])
    description = StringField("Description", validators=[DataRequired(message="Reward description cannot be blank.")])
    