# FriendCircle

Social Network API
This project is a RESTful API for a social network application where users can share their thoughts, react to friends' thoughts, and manage a friend list. This API is built using Node.js, Express, and MongoDB.

Table of Contents
Installation
Usage
API Routes
Models
License
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/social-network-api.git
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add your MongoDB connection string and any other necessary environment variables:

bash
Copy code
MONGODB_URI=your_mongodb_connection_string
Start the server:

bash
Copy code
npm start
The server will start on http://localhost:3000.

Usage
Use a tool like Postman or Insomnia to interact with the API endpoints.

Example Requests
Get all users:

bash
Copy code
GET /api/users
Create a new user:

bash
Copy code
POST /api/users
Body:

json
Copy code
{
    "username": "exampleuser",
    "email": "example@example.com"
}
Update a user:

bash
Copy code
PUT /api/users/:userId
Body:

json
Copy code
{
    "username": "newusername",
    "email": "newemail@example.com"
}
API Routes
Users
GET /api/users - Get all users
GET /api/users/:userId - Get a user by ID
POST /api/users - Create a new user
PUT /api/users/:userId - Update a user by ID
DELETE /api/users/:userId - Delete a user by ID
POST /api/users/:userId/friends/:friendId - Add a friend
DELETE /api/users/:userId/friends/:friendId - Remove a friend
Thoughts
GET /api/thoughts - Get all thoughts
GET /api/thoughts/:thoughtId - Get a thought by ID
POST /api/thoughts - Create a new thought
PUT /api/thoughts/:thoughtId - Update a thought by ID
DELETE /api/thoughts/:thoughtId - Delete a thought by ID
POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought
Models
User
username: String, unique
email: String, unique, must match a valid email format
thoughts: Array of ObjectIds referencing Thought model
friends: Array of ObjectIds referencing User model
Thought
thoughtText: String, required, must be between 1 and 280 characters
createdAt: Date, default value is the current timestamp
username: String, required
reactions: Array of nested documents created with the reactionSchema
Reaction (Schema only)
reactionId: ObjectId, default is a new ObjectId
reactionBody: String, required, 280 character maximum
username: String, required
createdAt: Date, default value is the current timestamp
License
This project is licensed under the MIT License. See the LICENSE file for details.

