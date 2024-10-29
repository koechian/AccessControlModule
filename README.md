# Task 1

## TLDR: [I want to run the application](#running-the-application)

## Components

1. Authentication System
2. Role Based Access Policy
3. Two main entities, Projects and Users.
4. MySQL Database

### 1. Authentication System

- Authentication was done by username and password in the Auth module.
- the user submitted a username and password, which were validated against the user data stored in the database
- Passwords were hashed in the database using an Argon2 Function and a salt, they were verified using the same function
- On successful Authentication, a JWT was utilised, encoding the users information { role, userid, username } and a secret token stored in the .env file.
- The JWT was then used to enforce Authorization and Conditional rendering on the backend and frontend respectivley.
- The JWT token was verified for every request and data access. The token had a fixed life.
- On logout, the JWT token is added to a persistent data store. Any incoming requests are also checked against this blacklist.
- On the front end, user tokens are stored in session and are purged on logout, the blacklist exists as a fail safe.

### 2. RBAC

- The provided Roles and Policies have been enforced using a combination of Guards and custom @Role decorators.
- Every endpoint ping is checked for the expected permissions against the expected @Role for the route.
- On the front end, conditional rendering is utilised to display only data and actions that the associated party can consume
- If a bad actor was somehow able to access the api endpoints to send data directly to the backend, they would be greeted with a 401 Unauthorized response.

### 3. Entities

- From the description, active entities narrowed down to Projects and Users. Both schemas for their representation have been outlines in the prisma/schema.prisma file.
- Data and Object structure validation has also been implemented by using Data Transfer Objects and the standard Validation library to represent expected types and values of any user generated data

### 4. MySQL Database

- As directed, a MySQL database was used to store data. SQL Statements were further abstratced by use of an ORM, Prisma, to handle the query calls to the database.
- Data migrations and seeding was done through use of a seeder script and the faker.js Library to provide fake data to flesh out the application.

### Running the application ⚡️

1. Navigate to the root directory and install all deps using `yarn install` or `npm`, your call.
2. Run database migrations using `yarn prisma migrate dev --name init`, this should also seed the database, in case seeding does not happen, run `npx prisma db seed`
3. (Optional) Run Prisma Studio if you want to have a look at the raw database using `npx prisma studio`
4. Run the main Nest JS application using `yarn run start:dev`
5. In another terminal, go to the client directory `cd client` run `yarn install` then `yarn run dev`
6. Backend should be at `localhost:3000` and frontend at `localhost:5173`
