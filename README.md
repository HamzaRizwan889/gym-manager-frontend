This is the Gym Manager front end.

PREREQUISITE
Make sure you have node installed.
We are going to run this with npm


To start create a new folder and name it as Projects(personal preference).
Next create 2 folders one for front end and one for backend.
Clone the frontend and backend into their respective folders.
Now open the browser and go to this url ------>  http://localhost:3000

FRONTEND
You can start the app by running this command in the frontend folder -------->  npm run dev
This will start the app in developer mode.  
Thats all for the frontend, lets start with backend.

BACKEND
First download MongoDB compass and set it up.
Create a new connection with this uri ---------> mongodb://localhost:27017
Once thats setup you want to run this command in the backend folder --------> npm start
Now the server will start, go to your browser and go to this url -------> http://localhost:4000/graphql
Create a new role in the playground by the create role mutation.
Create a new Membership in the playground by the create mutation.
Now you will insert the id of the role and membership into the required fields while creating the user.
Now in graphql you have to make a new user which will be the Admin by running the create user mutation in the playground.
Now with the user being created you will login with the correct credentials and you will be able to access the app.


