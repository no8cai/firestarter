# Firestarter
## a Kickstarter Clone
## by Annika McPeek, Cory Bogert, Eric Chai, and Kirin Agcaoili

## Link to live site:
https://firestarter.onrender.com/

## Description:
Our clone of the Kickstarter site has create, read, update, and delete features for projects (store) rewards (inventory) and pledges (purchases). Users can search and filter for projects. There is also a profile feature for users to see and interact with their projects they created and rewards they pledged towards. Users can log in to access all these features. In the wiki is the API documentation of the backend routes that we created.

## Technologies used:
The backend uses SqlAlchemy and Flask in Python. The frontend uses React and Redux in Javascript. The live site is on Render and uses PostgreSQl and locally the database is SQLite.
## Usage description of features.

## Home Page:
Here a user can see one random projects extensive details, the latest 3 projects details, stats about the full site, and information about the creators of the site.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterHomePage.png)


## Single Project page:
This page shows information on a single project and shows different details based on what the user is authorized to see or do.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterSingleProjectPage.png)

## Search Feature Page:
After searching or filtering results, a user can see all projects that meet their criteria.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterSearchPage.png)

## Pledge Page:
Here a user can "purchase" a reward, or chose to edit their pledge, and chose a different reward.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterPledgePage.png)

## Create Project Page:
This form is where a user can create a project or edit their project. Users can create and edit rewards for their projects on a similar form.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterCreateProjectPage.png)

## Profile Page:
This is where a user can see all the projects they created, or click to see all the projects they have backed my pledging to those projects rewards.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterProfilePage.png)

## Profile Modal:
This modal is available in the top right corner for users to navigate the site.
![](https://github.com/no8cai/firestarter/blob/main/images/FireStarterProfileModal.png)


## Road Map
We included in our database schema the next features we want to take on: likes, comments, and updates.


## Getting Started
This is an instructions on setting up the project locally. To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repor
```
git clone https://github.com/no8cai/firestarter.git
```

2. Populate the .env file based in the root directory on the example below:
```
SECRET_KEY=<<<Your generated key>>>
DATABASE_URL=sqlite:///dev.db
SCHEMA=«custom_schema_name_here»
```
Please make your own schema name, then make new .flaskenv

```
FLASK_APP=app
FLASK_ENV=development
```
Then populate the .env in /react-app to connect frontend and backend

```
REACT_APP_BASE_URL=http://localhost:5000
```


3. Install Pipenv packages on /root directory and install npm packages on /react-app
```
#/root
pipenv install
```
```
#/react-app
npm install
```
4. Migrate and Seed the data for Sqlite3
```
#/root
pipenv run flask migrate
pipenv run flask upgrade
pipenv run flask seed all
```

5. Run the flask in root for backend and run npm for frontend server in /react-app

```
#/root
pipenv run flask run
```

```
#/react-app
npm start
```


## Contact Us:
Annika McPeek
ammcpeek@gmail.com
linkedin.com/in/annika-mcpeek/

Cory Bogert
https://www.linkedin.com/in/cory-bogert-754a7a230/
https://github.com/Cory-Bogert

Eric Chai
https://www.linkedin.com/in/eric-chai-b5b9b337/
https://github.com/no8cai

Kirin Agcaoili
https://www.linkedin.com/in/kirin-agcaoili-a84a10187/
https://github.com/kagc
