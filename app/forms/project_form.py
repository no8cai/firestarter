from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Project

# class ProjectForm(FlaskForm):
#     title = StringField('title', validators=[DataRequired()])
#     category = StringField('category', validators=[DataRequired()])
#     city = StringField('city', validators=[DataRequired()])
#     state = StringField('state', validators=[DataRequired()])
#     country = StringField('country', validators=[DataRequired()])
#     imageUrl = StringField('imageUrl', validators=[DataRequired()])
#     videoUrl = StringField('videoUrl', validators=[DataRequired()])
#     fundingGoal = StringField('fundingGoal', validators=[DataRequired()])
#     startDate = StringField('startDate', validators=[DataRequired()])
#     endDate = StringField('endDate', validators=[DataRequired()])
#     description = StringField('description', validators=[DataRequired()])
#     risks = StringField('risks', validators=[DataRequired()])

class ProjectForm(FlaskForm):
    title = StringField('title')