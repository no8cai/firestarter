from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import Project
from datetime import datetime

# reuseable validation
def valid_startDate(form, field):
    startdate = datetime.strptime(field.data,"%Y-%m-%d")
    current=datetime.now()
    if startdate<current:
        raise ValidationError('Start date can not be in the past.')

class ProjectForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[DataRequired()])
    videoUrl = StringField('videoUrl')
    fundingGoal = DecimalField('fundingGoal', validators=[DataRequired()])
    startDate = StringField('startDate', validators=[DataRequired(),valid_startDate])
    endDate = StringField('endDate', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    risks = StringField('risks', validators=[DataRequired()])

    #globle one time validation
    def validate(self, **kwargs):
        # Standard validators
        rv = FlaskForm.validate(self)
        # Ensure all standard validators are met
        if rv:
            # Ensure end date >= start date
            endingdate = datetime.strptime(self.endDate.data,"%Y-%m-%d")
            startingdate = datetime.strptime(self.startDate.data,"%Y-%m-%d")
            if startingdate >= endingdate:
                self.endDate.errors.append('End date must be after the starting date.')
                return False
            return True
        return False
