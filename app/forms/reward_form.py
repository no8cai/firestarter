from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired,ValidationError
from datetime import datetime

#old way  %B %Y
#new way %Y %B
#final way
#"2023-10-01"


def valid_delivery(form, field):
    delivery = datetime.strptime(field.data,"%Y-%m-%d")
    current=datetime.now()
    if delivery<current:
        raise ValidationError('Delivery estimation can not be in the past.')

class RewardForm(FlaskForm):
    title = StringField("Reward Title", validators=[DataRequired(message="Reward title cannot be blank.")])
    price = DecimalField("Price", validators=[DataRequired(message="Price for this reward must be set.")])
    description = StringField("Description", validators=[DataRequired(message="Reward description cannot be blank.")])
    estimatedDelivery = StringField("Estimated Delivery", validators=[DataRequired(message="Reward estimated delivery cannot be blank."),valid_delivery])

