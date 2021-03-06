# First Assignment(Sprint_1) status

## GatorGiveaway

Generally, all the giveaways and sales of old stuff happen in WhatsApp groups. There are many groups, and it's very hard to keep track of those groups and posts. The idea is to provide a web-application for such sales and giveaway stuff. It's basically an eBay clone for UF.


### React JS UI Progress
- Added boilerplate template for the front end.
- Added signup and signin pages for user.
- Added a page to view posts.
- Also added modals for edit, delete and creating the posts in the view posts page.
- Integrated all the pages with the backend APIs and also maintaing the user session.

### Go-Lang backend progress
- Added boilerplate template for the back-end.
- Using Gin Web Framework and GORM library.
- Created APIs for giveaway post CRUD operations for sellers.
- Created APIs for user CRUD operations.
- Maintaing user sessions

### Video Links:
- [Backend Video Link(YouTube)](https://www.youtube.com/watch?v=q9oKbFjwysg)
- [Frontend Video Link(YouTube)](https://youtu.be/VJ32whCfxBs)

### Api documentation of backend services
<details>
  <summary>Login</summary>

### Target URL

`"localhost:3000" + "/login"`

### Request

Method: `POST`

Example

```json
{
   "username" : "myUserName",
   "password" : "myPASSW1234!"
}
```

Fields

| Elements | Descriptions                   | Type | Required |
| -------- | ------------------------------ |------| -------- |
| username | The username cannot be empty   |String|  true    |
| password | The password cannot be empty   |String|  true    |

### Response

{
    "result": "login success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![login_success](https://user-images.githubusercontent.com/87737522/152627688-888eda8a-2882-4a90-826f-d30e114cb4ae.gif)

</details>

<details>
  <summary>Register</summary>

### Target URL

`"localhost:3000" + "/register"`

### Request

Method: `POST`

Example

```json
{
   "username" : "myUserName",
   "password" : "myPASSW1234!"
}
```

Fields

| Elements | Descriptions                   | Type | Required |
| -------- | ------------------------------ |------| -------- |
| username | The username cannot be empty   |String|  true    |
| password | The password cannot be empty   |String|  true    |

### Response

{
    "result": "registration success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![register_success](https://user-images.githubusercontent.com/87737522/152627731-69e4a622-5fa3-48db-a144-1449f0e38430.gif)

</details>
<details>
  <summary>Logout</summary>

### Target URL

`"localhost:3000" + "/logout"`

### Request

Method: `POST`


Field
{
    "result": "logout success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
![logout_success](https://user-images.githubusercontent.com/87737522/152627782-b61abec2-68d2-4a3f-86b3-b77de5910917.gif)


</details>

<details>
  <summary>Create Post</summary>

### Target URL

`"localhost:3000" + "/create"`

### Request

Method: `POST`

Example

```json
{
    "name":"Laptop Stand",
    "description": "Useful to put laptop in a height and at a distance.",
    "location": "4000 SW 34th St Block #733C",
    "dimensions": "5 x 2 x 6 m",
    "weight":10,
    "age": 1,
    "count": 2
}
```

Fields

| Elements    	| Descriptions                   | Type | Required |
| -------------	| ------------------------------ |------| -------- |
| name	   	    | Name of the product		         |String|  true    |
| description	  | Description of the item 	     |String|  true    |
| location	    | Location to pickup the item    |String|  true    |
| dimensions    | Dimensions of the item         |String|  true    |
| weight	      | Weight of the item             |int  	|  true    |
| age		        | Age of the item	               |int 	|  true    |
| count		      | No pof items		               |int	  |  true    |


### Response
{
    "result": "post creation success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![create_success](https://user-images.githubusercontent.com/91032296/152626808-fe772014-515a-41ab-87d7-757397937c82.gif)
  
</details>

<details>
  <summary>Edit post</summary>

### Target URL

`"localhost:3000" + "/update/<post_id>"`

### Request

Method: `PATCH`

Example

```json
{
    "name":"Steel Laptop Stand",
    "weight": 11,
    "count": 1
}
```

Fields

Same as create post fields.
Eg: 
{
    "name":"Steel Laptop Stand",
    "weight": 11,
    "count": 1
}

### Response

<Upadated post details>
{
    "ID": 5,
    "CreatedAt": "2022-02-04T20:42:18.1731823-05:00",
    "UpdatedAt": "2022-02-04T20:47:02.5941861-05:00",
    "DeletedAt": null,
    "name": "Steel Laptop Stand",
    "description": "Useful to put laptop in a height and at a distance.",
    "location": "4000 SW 34th St Block #733C",
    "dimensions": "5 x 2 x 6 m",
    "weight": 11,
    "age": 1,
    "count": 1
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![update_success](https://user-images.githubusercontent.com/91032296/152626836-a6999e3e-cbfb-4923-bab5-90f978b6f78c.gif)
  
</details>
<details>
  <summary>Delete post</summary>

### Target URL

`"localhost:3000" + "/delete/<post_id>"`

### Request

Method: `DELETE`

Example

localhost:8080/delete/5

### Response

<Deleted post details>
{
    "ID": 5,
    "CreatedAt": "2022-02-04T20:42:18.1731823-05:00",
    "UpdatedAt": "2022-02-04T20:47:02.5941861-05:00",
    "DeletedAt": null,
    "name": "Steel Laptop Stand",
    "description": "Useful to put laptop in a height and at a distance.",
    "location": "4000 SW 34th St Block #733C",
    "dimensions": "5 x 2 x 6 m",
    "weight": 11,
    "age": 1,
    "count": 1
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![delete_success](https://user-images.githubusercontent.com/91032296/152626857-6bc0b585-18c7-48b1-a8ce-7ee96bb317c2.gif)
  
</details>

<details>
  <summary>Get posts</summary>

### Target URL

`"localhost:3000" + "/read"`

### Request

Method: `GET`

Example

localhost:8080/read

### Response

<All post details>

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![read_success](https://user-images.githubusercontent.com/91032296/152626871-08f2fc34-97b3-4414-af3c-008a10e8170f.gif)
  
</details>

<details>
  <summary>User operations</summary>


  <details>
  <summary>Get Users</summary>

    
  ### Target URL

`"localhost:3000" + "/users"`

### Request

Method: `GET`

Example

`localhost:8080/users`

### Response

<Users details>

```
  [
    {
        "ID": 2,
        "CreatedAt": "2022-02-04T22:39:18.8175326-05:00",
        "UpdatedAt": "2022-02-04T22:39:18.8175326-05:00",
        "DeletedAt": null,
        "username": "superuser",
        "password": "Supr@123",
        "firstname": "Super",
        "lastname": "User",
        "phone": "+1 (111)-11-11111"
    },
    {
        "ID": 3,
        "CreatedAt": "2022-02-04T22:40:26.5245709-05:00",
        "UpdatedAt": "2022-02-04T22:40:26.5245709-05:00",
        "DeletedAt": null,
        "username": "admin",
        "password": "Admin@123",
        "firstname": "Admin",
        "lastname": "User",
        "phone": "+1 999-99-99999"
    },
    {
        "ID": 4,
        "CreatedAt": "2022-02-04T23:35:52.370314-05:00",
        "UpdatedAt": "2022-02-04T23:35:52.370314-05:00",
        "DeletedAt": null,
        "username": "User1",
        "password": "User@123",
        "firstname": "User First Name",
        "lastname": "User Last Name",
        "phone": "+1 443-77-66666"
    },
    {
        "ID": 5,
        "CreatedAt": "2022-02-04T23:41:40.2563053-05:00",
        "UpdatedAt": "2022-02-04T23:41:40.2563053-05:00",
        "DeletedAt": null,
        "username": "Shangchi",
        "password": "Shang@123",
        "firstname": "Shang",
        "lastname": "Chi",
        "phone": "+1 333-22-88888"
    },
    {
        "ID": 6,
        "CreatedAt": "2022-02-04T23:46:39.8110102-05:00",
        "UpdatedAt": "2022-02-04T23:46:39.8110102-05:00",
        "DeletedAt": null,
        "username": "MayaMattew",
        "password": "Maya@123",
        "firstname": "Maya",
        "lastname": "Mattew",
        "phone": "+1 333-22-88888"
    }
]
```
Possible status: 200, 400

Message format: json

Example

`Code: 200 OK`
  </details>


  <details>
  <summary>Create User</summary>


  ### Target URL

`"localhost:3000" + "/register"`

### Request

Method: `POST`

Example

`localhost:8080/users`

### Input
    
 ```
 {
    "username": "superuser1",
    "password": "Super@123",
    "firstname": "Super",
    "lastname": "User",
    "phone": "+1(111)-11-11111"
}   
 ```
    
### Response

<Users details>

```
{
    "result": "registration success"
}
```
Possible status: 200, 400

Message format: json

Example

`Code: 200 OK`
    
  </details>
  
      <details>
  <summary>Delete User</summary>


  ### Target URL

`"localhost:3000" + "/user/6"`

### Request

Method: `DELETE`

Example

`localhost:8080/user/6`

    
### Response

<Delete USer details>

```
{
    "ID": 6,
    "CreatedAt": "2022-02-04T23:46:39.8110102-05:00",
    "UpdatedAt": "2022-02-04T23:46:39.8110102-05:00",
    "DeletedAt": "2022-02-04T23:58:22.7753997-05:00",
    "username": "MayaMattew",
    "password": "Maya@123",
    "firstname": "Maya",
    "lastname": "Mattew",
    "phone": "+1 333-22-88888"
}
```
Possible status: 200, 400

Message format: json

Example

`Code: 200 OK`
    
  </details>
    
    
</details>


User Registration:
To register your account, first route to localhost:3000, then click on "Register" button. You need to fill username and password fields and then submit. If you input something wrong, you'll get notified at the top of the page, or if you register successfully, you'll automatically redirected to login page.

Fields in signup form that needs your notice:

Username: Has to be unique, which means you can not register with a username that has already been taken, and case sensitive.
Password: Must contains figure, uppercase letter, lowercase letter, and a special sign, and total length should be at least 9.

Login:
Route to localhost:3000/login, input your registered username and password, and sign in. After signing in, you'll see home page to view the giveaway posts.

Home Page:
In home page, we have a logout and create post buttons in the top-left.
In cards, all the giveaway posts are displayed wich can be editted and deleted.
## Useful links of the project
- [Main project repo link](https://github.com/raghusaripalli/GatorGiveaway) 
- [Link for Actions on git](https://github.com/raghusaripalli/GatorGiveaway/actions/workflows/)
- [All user stories link](https://github.com/raghusaripalli/GatorGiveaway/issues)
- [Github Wiki Documentation link](https://github.com/raghusaripalli/GatorGiveaway/wiki)
- [Project Kanban Board](https://github.com/raghusaripalli/GatorGiveaway/projects/1)

## Hosted on AWS:
- [Golang Server Base URL](http://ec2-3-144-28-176.us-east-2.compute.amazonaws.com:8080)

