# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns an authentication token along with the user details.

### Request Body:
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 5 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (201):
- **Description**: User registered successfully.
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Error (400):
- **Description**: Validation failed for the input data.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Server Error (500):
- **Description**: An error occurred on the server.
- **Body**:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```