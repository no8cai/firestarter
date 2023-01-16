## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### U1-All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### U2-All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### U3-Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Superman",
      "email": "john.smith@gmail.com"
    }
    ```

### U4-Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "John",
      "email": "john.smith@gmail.com",
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### U5-Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "John",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "John",
      "email": "john.smith@gmail.com",
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```


* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "name": "Name is required",
      }
    }
    ```

### U6: Log out


Logs out a current user with valid credentials and returns the current user's
information.


## PROJECTS

### PR1-Get all projects - DONE

Returns all the projects.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/projects
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Projects": [
        {
          "id": 1,
          "creatorId": 1,
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-07-10",
          "description": "This sourcebook is designed for all Nightfell fans and newcomers.",
          "risks": "People may not like arts",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Rewards": {
           "id": 1,
           "projectId": 1,
           "title": "The super cool project",
           "price": 100,
           "description": "The most fun thing ever"
           },
           "Creator": {
            "id":1,
            "name": "Kirin"
           }

        }
      ]
    }
    ```

### PR2-Get all Projects owned by the Current User - DONE

Returns all the Projects owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/projects/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
     {
      "Projects": [
        {
          "id": 1,
          "creatorId": 1,
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-07-10",
          "description": "This sourcebook is designed for all Nightfell fans and newcomers.",
          "risks": "People may not like arts",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Rewards": {
           "id": 1,
           "projectId": 1,
           "title": "The super cool project",
           "price": 100,
           "description": "The most fun thing ever"
           },
           "Creator": {
            "id":1,
            "name": "Kirin"
           }

        }
      ]
    }
    ```

### PR3-Get details of a project from an id  - DONE

Returns the details of a project specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/projects/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "creatorId": 1,
        "category": "Art",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "title": "App Academy",
        "imageUrl": "image.url",
        "videoUrl": "video.url",
        "fundingGoal": 30000,
        "startDate": "2022-01-10",
        "endDate": "2022-05-04",
        "description": "This sourcebook is designed for all Nightfell fans and all newcomer",
        "risks": "People may not like arts",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "creator": {
          "id": 1,
          "name": "John"
        }
    }
    ```

* Error response: Couldn't find a project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found",
      "statusCode": 404
    }
    ```

### PR4-Create a Project  - // need to add end date validations like booking feature

Creates and returns a new project.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/projects
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-05-04",
          "description": "This sourcebook is designed for all Nightfell fans and all newcomer",
          "risk": "People may not like arts"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json

        {
          "id": 1,
          "creatorId": 1,
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-07-10",
          "description": "This sourcebook is designed for all Nightfell fans and newcomers.",
          "risks": "People may not like arts",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Rewards": {
           "id": 1,
           "projectId": 1,
           "title": "The super cool project",
           "price": 100,
           "description": "The most fun thing ever"
           },
           "Creator": {
            "id":1,
            "name": "Kirin"
           }
        }

    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
          "category": "category is required",
          "city": "city is required",
          "state": "state is required",
          "country": "country is required",
          "title": "title is required",
          "fundingGoal": "fundingGoal is required",
          "startDate": "startDate is required",
          "endDate": "endDate is required",
          "description": "description is required",
          "risks": "risk is required"
      }
    }
    ```


### PR5-Edit a Project - need to add end date validations like booking feature

Updates and returns an existing project.

* Require Authentication: true
* Require proper authorization: Project must belong to the current user
* Request
  * Method: PUT
  * URL: /api/projects/:projectId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-05-04",
          "description": "This sourcebook is designed for all Nightfell fans and all newcomer",
          "risks": "People may not like arts"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "id": 1,
          "creatorId": 1,
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-07-10",
          "description": "This sourcebook is designed for all Nightfell fans and newcomers.",
          "risks": "People may not like arts",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Rewards": {
           "id": 1,
           "projectId": 1,
           "title": "The super cool project",
           "price": 100,
           "description": "The most fun thing ever"
           },
           "Creator": {
            "id":1,
            "name": "Kirin"
           }
        }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
          "category": "category is required",
          "city": "city is required",
          "state": "state is required",
          "country": "country is required",
          "title": "title is required",
          "fundingGoal": "fundingGoal is required",
          "startDate": "startDate is required",
          "endDate": "endDate is required",
          "description": "description is required",
          "risks": "risk is required"
      }
    }
    ```

* Error response: Couldn't find a project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found",
      "statusCode": 404
    }
    ```

### PR6 - Delete a Project

Deletes an existing project.

* Require Authentication: true
* Require proper authorization: Project must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/projects/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found",
      "statusCode": 404
    }
    ```
## Rewards

### R1 - Create a reward for a Project based on the Project's ID - DONE

Create and return a new reward for a project specified by ID.

- Require Authentication: true
- Require proper authorization: Project must belong to the current user
- Request

  - Method: POST
  - URL: /api/projects/:projectId/rewards
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "title": "Reward of paper back book",
    "price": 1.0,
    "description": "A virtual high five!",
    "estimatedDelivery": "2050-11-19"
  }
  ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "id": 1,
    "projectId": 1,
    "title": "Reward of paper back book",
    "price": 1.0,
    "description": "A virtual high five!",
    "estimatedDelivery": "2050-11-19",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
  }
  ```

- Error Response: Body validation errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body
  ```json
  {
    "message": "Validation error",
    "statusCode": 400,
    "errors": {
      "title": "Title text is required.",
      "price": "Must set a price for this reward.",
      "description": "Reward description text is required.",
      "estimatedDelivery": "Reward delivery date must be set some time in the future."
    }
  }
  ```

### R2 - Get all rewards by Project's ID - DONE

Returns all of the rewards that belong to a project specified by ID.

- Require authentication: false
- Request

  - Method: GET
  - URL: /api/projects/:projectId/rewards
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  "Rewards": [
      {
          "id": 1,
          "projectId": 1,
          "title": "A book as a reward",
          "price": 1.00,
          "description": "A virtual high five!",
          "estimatedDelivery": "2050-11-19",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
      }
  ]

  ```

- Error response: Couldn't find a project with the specified ID
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "message": "Project couldn't be found",
    "statusCode": 404
  }
  ```

### R3 - Get reward details based on reward ID - DONE (Probably don't need this)

Returns reward details based on reward ID.

- Require authentication: true
- Request

  - Method: GET
  - URL: /api/rewards/:rewardId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  "Rewards": [
      {
          "id": 1,
          "projectId": 1,
          "title": "A Project",
          "price": 1.00,
          "description": "A virtual high five!",
          "estimatedDelivery": "2050-11-19",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
      }
  ]

  ```

- Error response: Couldn't find a reward with the specified ID
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "message": "Reward couldn't be found",
    "statusCode": 404
  }
  ```

###  R4- Update a reward - DONE

Updates and returns an existing reward.

- Require Authentication: true
- Require proper authorization: Project must belong to the current user
- Request

  - Method: PUT
  - URL: /api/rewards/:rewardId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "A Project",
      "price": 1.0,
      "description": "A virtual high five!",
      "estimatedDelivery": "2050-11-19"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "projectId": 1,
      "title": "A Project",
      "price": 1.0,
      "description": "A virtual high five!",
      "estimatedDelivery": "2050-11-19",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Title text is required.",
        "price": "Must set a price for this reward.",
        "description": "Reward description text is required.",
        "estimatedDelivery": "Reward delivery date must be set."
      }
    }
    ```

- Error response: Couldn't find a reward with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reward couldn't be found",
      "statusCode": 404
    }
    ```

### R5- Delete a reward - DONE

Deleted an existing reward

- Require Authentication: true
- Require proper authorization: Project must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/rewards/:rewardId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Reward with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reward couldn't be found",
      "statusCode": 404
    }
    ```

- Error response: Cannot delete rewards if campaign has reached end date

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Cannot delete rewards if campaign has reached end date",
      "statusCode": 403
    }
    ```
## Pledges

###  PL1: Get all pledges for all users (never use)

Returns all the pledges.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/pledges
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
       {
      "pledges": [
        {
           "id": 1,
           "backerId": 1,
           "projectId": 1,
           "rewardId":1,
           "Reward":  {
           "id": 1,
           "price": 20,
           "title": "Book for kids"
           },
           "Project": {
           "id": 1,
           "creatorId": 1,
           "title": "Books about female leaders"
           }
        }
      ]
    }
    ```

### PL2: Get all pledges owned by the Current User for all their projects (low priority)
#will want associated reward title, project title, reward price, status of project, boolean for receiving the gift for the full project page which is lower priority
#for just the modal, we only need the name of the associated project

Returns all the pledges owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/pledges/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "pledges": [
        {
           "id": 1,
           "creatorId": 1,
           "backerId": 1,
           "pledgeId": 1,
           "Reward":  {
           "id": 1,
           "price": 20,
           "title": "Book for kids",
           },
           "Project": {
           "id": 1
           }
        }
      ]
    }
    ```

### PL3: Get all pledges associated with a Project (lower priority)
#will want associated reward title, project title, reward price, status of project, boolean for receiving the gift for the full project page which is lower priority
#for just the modal, we only need the name of the associated project

Returns all the pledges owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/pledges/project/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "pledges": [
        {
           "id": 1,
           "creatorId": 1,
           "backerId":1,
           "pledgeId":1,
           "Reward": {
              "id": 1,
              "price": 20,
              "title": "Book for kids"
         },
        }
      ]
    }
### PL4: Get details of a pledge from an id (will need for edit page)

Returns the details of a Pledge specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/pledges/:pledgeId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
            "id": 1,
            "creatorId": 1,
            "backerId":1,
            "pledgeId":1
        }
    ```

* Error response: Couldn't find a Pledge with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

 ```json

      {
      "message": "Pledge couldn't be found",
      "statusCode": 404
      }

  ```

### PL5: Create a pledge for a Reward based on the Reward’s Id (required)

Creates and returns a new Pledge for a reward based on the specified Id..

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/rewards/:rewardId/pledges
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
          {
            "rewardId": 1,
            "backerId":1
           }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
           "id": 1,
           "creatorId": 1,
            "backerId":1,
            "pledgeId":1,
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36",
            "Reward": {
               "id": 1,
               "price": 20,
               "title": "Book for kids"
               }
    }
    ```
Error response: Couldn't find a Reward with the specified id
Status Code: 404
Headers:
Content-Type: application/json
Body:
{
  "message": "Reward couldn't be found",
  "statusCode": 404
}



### PL6: Edit a pledge (required)

Updates and returns an existing Pledge.

* Require Authentication: true
* Require proper authorization: Pledge must belong to the current user
* The only part that changes is the reward Id
* Request
  * Method: PUT
  * URL: /api/pledges/:pledgeId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
         {
          "id": 1,
          "creatorId": 1,
          "backerId":1,
          "pledgeId":1,
          "Reward": {
            "id": 1,
            }
        }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "id": 1,
          "creatorId": 1,
          "backerId":1,
          "pledgeId":1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Reward": {
             "id": 1,
             "price": 20,
             "title": "Book for kids"
             }
      }
    ```

* Error Response: Reward Id did not exist
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Reward couldn't be found ",
      "statusCode": 404
    }
    ```

* Error response: Couldn't find a Pledge with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Pledge couldn't be found",
      "statusCode": 404
    }
    ```

### PL7: Delete a pledge (required)

Deletes an existing Pledge.

* Require Authentication: true
* Require proper authorization: Pledge must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/pledges/:pledgeId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Pledge with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Pledge couldn't be found",
      "statusCode": 404
    }
    ```

## Search

###  S1: Get all search results for any user

Returns all the projects matching search parameters

* Require Authentication: false
* Request
  * Method: GET
  * URL: `https://www.kickstarter.com/discover/advanced?term=Cory&staff_picks=1&goal=2&sort=magic&seed=2789404&page=1`
  * Later add how to search and filter correctly
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Projects": [
        {
          "id": 1,
          "creatorId": 1,
          "category": "Art",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "title": "App Academy",
          "imageUrl": "image.url",
          "videoUrl": "video.url",
          "fundingGoal": 30000,
          "startDate": "2022-01-10",
          "endDate": "2022-07-10",
          "description": "This sourcebook is designed for all Nightfell fans and newcomers.",
          "risks": "People may not like arts",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Rewards": {
           "id": 1,
           "projectId": 1,
           "title": "The super cool project",
           "price": 100,
           "description": "The most fun thing ever"
           },
           "Creator": {
            "id":1,
            "name": "Kirin"
           }

        }
      ]
    }
    ```

* Error response: Couldn't find a Project with the specified parameters
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "No Projects could be found",
      "statusCode": 404
    }
    ```
