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
  * URL: /api/auth/
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
  * URL: /api/session NEW /api/auth/login
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
  * URL: /api/users NEW /api/auth/signup
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

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session NEW /api/auth/logout
  * Body: none

* Successful Response
  * None


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
            "category": "Arts",
            "city": "New Haven",
            "country": "USA",
            "creator": {
                "email": "kirin@aa.io",
                "id": 1,
                "username": "Kirin"
            },
            "creatorId": 1,
            "description": "A Make 100 Project by GEMS.",
            "endDate": "2024-01-01",
            "fundingGoal": "5000.00",
            "id": 1,
            "imageUrl": "https://link.img",
            "rewards": [
                {
                    "description": "One beautifully designed digital copy of the project photo book.",
                    "estimatedDelivery": "2023-10-01",
                    "id": 1,
                    "price": "10.00",
                    "projectId": 1,
                    "title": "Photobook + Thank You"
                }
            ],
            "risks": "Both Ericka & Gabriela have run Kickstarter campaigns in the past and have learned of potential pitfalls.",
            "startDate": "2023-01-01",
            "state": "Connecticut",
            "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
            "videoUrl": null
        },
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
            "category": "Arts",
            "city": "New Haven",
            "country": "USA",
            "creator": {
                "email": "kirin@aa.io",
                "id": 1,
                "username": "Kirin"
            },
            "creatorId": 1,
            "description": "A Make 100 Project by GEMS.",
            "endDate": "2024-01-01",
            "fundingGoal": "5000.00",
            "id": 1,
            "imageUrl": "https://link.img",
            "rewards": [
                {
                    "description": "One beautifully designed digital copy of the project photo book.",
                    "estimatedDelivery": "2023-10-01",
                    "id": 1,
                    "price": "10.00",
                    "projectId": 1,
                    "title": "Photobook + Thank You"
                }
            ],
            "risks": "Both Ericka & Gabriela have run Kickstarter campaigns in the past and have learned of potential pitfalls.",
            "startDate": "2023-01-01",
            "state": "Connecticut",
            "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
            "videoUrl": null
        },
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
            "category": "Arts",
            "city": "New Haven",
            "country": "USA",
            "creator": {
                "email": "kirin@aa.io",
                "id": 1,
                "username": "Kirin"
            },
            "creatorId": 1,
            "description": "A Make 100 Project by GEMS.",
            "endDate": "2024-01-01",
            "fundingGoal": "5000.00",
            "id": 1,
            "imageUrl": "https://link.img",
            "rewards": [
                {
                    "description": "One beautifully designed digital copy of the project photo book.",
                    "estimatedDelivery": "2023-10-01",
                    "id": 1,
                    "price": "10.00",
                    "projectId": 1,
                    "title": "Photobook + Thank You"
                }
            ],
            "risks": "Both Ericka & Gabriela have run Kickstarter campaigns in the past and have learned of potential pitfalls.",
            "startDate": "2023-01-01",
            "state": "Connecticut",
            "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
            "videoUrl": null
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
    "title":"newProject04",
    "category":"production",
    "city":"Los Angeles",
    "state":"California",
    "country":"USA",
    "imageUrl":"http://image.com/image04",
    "fundingGoal":"30000000.3234",
    "startDate":"2023-04-05",
    "endDate":"2023-05-05",
    "description":"we found a new way to eat",
    "risks":"people don't like eating"
   }

    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json

      {
    "category": "production",
    "city": "Los Angeles",
    "country": "USA",
    "creator": {
        "email": "david@aa.io",
        "id": 5,
        "username": "David"
    },
    "creatorId": 5,
    "description": "we found a new way to eat",
    "endDate": "2023-05-05",
    "fundingGoal": "30000000.32",
    "id": 20,
    "imageUrl": "http://image.com/image04",
    "rewards": [],
    "risks": "people don't like eating",
    "startDate": "2023-04-05",
    "state": "California",
    "title": "newProject04",
    "videoUrl": null
     }

    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
    "errors": [
        "title : This field is required.",
        "category : This field is required.",
        "city : This field is required.",
        "state : This field is required.",
        "country : This field is required.",
        "imageUrl : This field is required.",
        "fundingGoal : This field is required.",
        "startDate : This field is required.",
        "endDate : This field is required.",
        "description : This field is required.",
        "risks : This field is required."
    ],
    "message": "Validation Error",
    "statusCode": 400
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
          "startDate": "2023-01-24",
          "endDate": "2024-05-04",
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
    "category": "Art",
    "city": "San Francisco",
    "country": "United States of America",
    "creator": {
        "email": "david@aa.io",
        "id": 5,
        "username": "David"
    },
    "creatorId": 5,
    "description": "This sourcebook is designed for all Nightfell fans and all newcomer",
    "endDate": "2024-05-04",
    "fundingGoal": "30000.00",
    "id": 5,
    "imageUrl": "image.url",
    "rewards": [
        {
            "description": "Shipping will be calculated during the post-campaign survey process. Estimated shipping costs are available on campaign page. ",
            "estimatedDelivery": "2023-10-01",
            "id": 13,
            "price": "30.00",
            "projectId": 5,
            "title": "1x Lifted Lumbar - Early Bird"
        },
    ],
    "risks": "People may not like arts",
    "startDate": "2023-01-24",
    "state": "California",
    "title": "App Academy",
    "videoUrl": "video.url"
    }

    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "errors": [
            "title : This field is required.",
            "category : This field is required.",
            "city : This field is required.",
            "state : This field is required.",
            "country : This field is required.",
            "imageUrl : This field is required.",
            "fundingGoal : This field is required.",
            "startDate : This field is required.",
            "endDate : This field is required.",
            "description : This field is required.",
            "risks : This field is required."
        ],
        "message": "Validation Error",
        "statusCode": 400
    }
    ```

* Error response: Couldn't find a project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "errors": [
          "Project couldn't be found"
      ],
      "message": "HTTP Error",
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
      "title": "a title",
      "price": 10,
      "description": "a reward",
      "estimatedDelivery": "2024-01-05"
  }
  ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
      "description": "a reward",
      "estimatedDelivery": "2024-01-05",
      "id": 55,
      "price": "10.00",
      "projectId": 5,
      "title": "a title"
  }
  ```

- Error Response: Body validation errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body
  ```json
  {
    "errors": [
        "title : Reward title cannot be blank.",
        "price : Price for this reward must be set.",
        "description : Reward description cannot be blank.",
        "estimatedDelivery : Delivery estimation can not be in the past."
    ],
    "message": "Validation Error",
    "statusCode": 400
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
  {
      "Rewards": [
          {
              "description": "One beautifully designed digital copy of the project photo book",
              "estimatedDelivery": "2023-10-01",
              "id": 1,
              "price": "10.00",
              "projectId": 1,
              "title": "Photobook + Thank You"
          }
      ]
  }

  ```


### R3 - Get reward details based on reward ID - DONE

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
  {
      "description": "One beautifully designed digital copy of the project photo book.",
      "estimatedDelivery": "2023-10-01",
      "id": 1,
      "price": "10.00",
      "projectId": 1,
      "title": "Photobook + Thank You"
  }

  ```

- Error response: Couldn't find a reward with the specified ID
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "errors": [
        "Reward couldn't be found"
    ],
    "message": "HTTP Error",
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
    "title": "a title",
    "price": 500,
    "description": "a reward",
    "estimatedDelivery": "2050-01-01"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "description": "a reward",
        "estimatedDelivery": "2050-01-01",
        "id": 13,
        "price": "500.00",
        "projectId": 5,
        "title": "a title"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "errors": [
          "title : Reward title cannot be blank.",
          "price : Price for this reward must be set.",
          "description : Reward description cannot be blank.",
          "estimatedDelivery : Reward estimated delivery cannot be blank."
      ],
      "message": "Validation error",
      "statusCode": 400
      }
    ```

- Error response: Couldn't find a reward with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
      {
      "errors": [
          "Reward couldn't be found"
      ],
      "message": "HTTP Error",
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
    "errors": [
        "Reward couldn't be found"
    ],
    "message": "HTTP Error",
    "statusCode": 404
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
        "Pledges": [
            {
                  "Project": {
                      "category": "Arts",
                      "city": "New Haven",
                      "country": "USA",
                      "creatorId": 1,
                      "description": "A Make 100 Project by GEMS. ",
                      "endDate": "2024-01-01",
                      "fundingGoal": "5000.00",
                      "id": 1,
                      "imageUrl": "https://ksr-ugc.imgix.img",
                      "risks": "Both Ericka & Gabriela have run Kickstarter campaigns in the past.",
                      "startDate": "2023-01-01",
                      "state": "Connecticut",
                      "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
                      "videoUrl": null
                  },
                  "Reward": {
                      "description": "One beautifully designed digital copy of the project photo book.",
                      "estimatedDelivery": "2023-10-01",
                      "id": 1,
                      "price": "10.00",
                      "projectId": 1,
                      "title": "Photobook + Thank You"
                  },
                  "backerId": 1,
                  "id": 1,
                  "projectId": 1,
                  "rewardId": 1
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
    "Pledges": [
        {
            "Project": {
                "category": "Arts",
                "city": "New Haven",
                "country": "USA",
                "creatorId": 1,
                "description": "A Make 100 Project by GEMS. \n We are Gabriela and Ericka, two self-taught artists c ",
                "endDate": "2024-01-01",
                "fundingGoal": "5000.00",
                "id": 1,
                "imageUrl": "https://ksr-ugc.imgix.net/assets/039/651/363/1a9",
                "risks": "Both Ericka & Gabriela have run Kickstarter campaigns in the past and h.",
                "startDate": "2023-01-01",
                "state": "Connecticut",
                "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
                "videoUrl": null
            },
            "Reward": {
                "description": "One beautifully designed digital copy of the project photo or this project plus backer acknowledgement on our website",
                "estimatedDelivery": "2023-10-01",
                "id": 1,
                "price": "10.00",
                "projectId": 1,
                "title": "Photoboook + Thank You"
            },
            "backerId": 7,
            "id": 109,
            "projectId": 1,
            "rewardId": 1
        }
    ]
    ```
### PL3: Get all pledges associated with a Project (lower priority)
#will want associated reward title, project title, reward price, status of project, boolean for receiving the gift for the full project page which is lower priority
#for just the modal, we only need the name of the associated project
Returns all the pledges owned (created) by the current user.
* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/projects/:projectId/pledges
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "Pledges": [
        {
            "Project": {
                "category": "Arts",
                "city": "New Haven",
                "country": "USA",
                "creatorId": 1,
                "description": "A Make 100 Project by GEMS. \n We are Gabriela and Ericka, two self-taught artists collaborating this year to create  handcrafwo artists passionate about their craft.",
                "endDate": "2024-01-01",
                "fundingGoal": "5000.00",
                "id": 1,
                "imageUrl": "https://ksr-ugc.imgix.net/assets/03",
                "risks": "Both Ericka & Gabriela have run Kickstarter .",
                "startDate": "2023-01-01",
                "state": "Connecticut",
                "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
                "videoUrl": null
            },
            "Reward": {
                "description": "One beautifully designed digital copy of the ",
                "estimatedDelivery": "2023-10-01",
                "id": 1,
                "price": "10.00",
                "projectId": 1,
                "title": "Photoboook + Thank You"
            },
            "backerId": 1,
            "id": 1,
            "projectId": 1,
            "rewardId": 1
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
        "Project": {
            "category": "Arts",
            "city": "New Haven",
            "country": "USA",
            "creatorId": 1,
            "description": "A Make 100 Project by GEMS. \n We are Gabriela and Ericka.",
            "endDate": "2024-01-01",
            "fundingGoal": "5000.00",
            "id": 1,
            "imageUrl": "https://ksr-ugc.imgix.net/assets/039/651/363/1a9218465",
            "risks": "Both Ericka & Gabriela have run Kickstarter .",
            "startDate": "2023-01-01",
            "state": "Connecticut",
            "title": "Make 100 Bowls, Ceramic Mugs, and Pottery Vases",
            "videoUrl": null
        },
        "Reward": {
            "description": "One beautifully designed digital copy of the ",
            "estimatedDelivery": "2023-10-01",
            "id": 1,
            "price": "10.00",
            "projectId": 1,
            "title": "Photoboook + Thank You"
        },
        "backerId": 1,
        "id": 1,
        "projectId": 1,
        "rewardId": 1
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
*Error response: Couldn't find a Reward with the specified id
  *Status Code: 404
  *Headers:
    *Content-Type: application/json
  *Body:
  ```json
        {
        "message": "Reward couldn't be found",
        "statusCode": 404
      }
  ```
*Error response: Only one user can back one project
  *Status Code: 404
  *Headers:
    *Content-Type: application/json
  *Body:
  ```json
  {
   "message": "Validation Error",
   "statusCode": 400
  }
  ```
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
* Error response: Pledge does not belong to current user
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:
      ```json
      {
      "errors": [
        "The pledge is not belongs to the current user"
       ],
      "message": "Forbidden Error",
      "statusCode": 403
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
