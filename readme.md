
# Workasana

Workasana is a task management and team collaboration tool where users can create projects, assign tasks to teams and owners, set deadlines, and organize work using tags. It supports authentication, dynamic filtering, URL-based queries, and reporting features to track task progress and team productivity.



## Tech Stack

**Client:**
| ![React](https://img.shields.io/badge/React-212121?logo=react&labelColor=black) | ![Bootstrap](https://img.shields.io/badge/Bootstrap-212121?logo=bootstrap&labelColor=white) | ![HTML5](https://img.shields.io/badge/HTML-212121?logo=html5&labelColor=white) | ![CSS](https://img.shields.io/badge/CSS-212121?logo=css3&labelColor=grey) | ![JavaScript](https://img.shields.io/badge/JavaScript-212121?logo=javascript&labelColor=grey) |
|---|---|---|---|---|

**Server:**
| ![NodeJS](https://img.shields.io/badge/NodeJS-212121?logo=nodedotjs&labelColor=grey) | ![ExpressJS](https://img.shields.io/badge/ExpressJS-212121?logo=express&labelColor=grey) | ![JWT](https://img.shields.io/badge/JWT-212121?logo=auth0&labelColor=white) | ![Bcrypt](https://img.shields.io/badge/Bcrypt-212121?logo=cryptpad&labelColor=whiblablackckte) | ![Mongoose](https://img.shields.io/badge/Mongoose-212121?logo=mongoose&labelColor=black)  |
|---|---|---|---|---|


**Database:**
| [![Static Badge](https://img.shields.io/badge/MongoDB-212121?logo=mongodb&labelColor=grey)](#) |
|---|



## Features

**Frontend:-**

- **LogIn Page**

    ☑  Login form with Email and Password fields.

    ☑  Error message when invalid input.

    ☑  Log In button.

    ☑  Goto SignUp Page.
- **Sign Up Page**

    ☑  Sign Up  form with Name, Email and Password fields.

    ☑  Error message when invalid input.

    ☑  Sign Up button.

    ☑  Goto Log In Page.

- **Authentication Handling:**

    ☑  The app checks for a valid JWT token in localStorage to confirm if the user is logged in.

    ☑  Users are redirected to the login page if they attempt to access protected routes without authentication.

    ☑  Logout functionality clears the token and redirects the user to the login page.
    
- **Dashboard Page**

    ☑  Search bar where user will be able to search Projects and tasks with title or name.

    ☑  My Projects section where user will be able to see Projects created by him/her.

    ☑  Filter Projects by their status.

    ☑  Add new Project button.

    ☑  Project form opens when user clicks add project button.

    ☑  My Tasks section where user will be able to see Tasks assigned to him/her.

    ☑  Filter Tasks by their status.

    ☑  Add new Task button.

    ☑  Task form opens when user clicks add task button.

- **Project Form**

    ☑  Project form with Project name and Description input fields.

    ☑  Add project button.

- **Task Form**

    ☑  Task form with Task name, Project name, Team name, Owners, Tags, Completion date, Status and Priority input fields.

    ☑  Project, Team, Owners and Tags input must be selected from the available options in the form.

    ☑  Add task button.

- **Projects Page**

    ☑  Show all available projects in cards.

    ☑  Project cards will include Project Status, Title and description.

    ☑  Filter projects with project status options. 

    ☑  Add new project button.

    ☑  Show project form when Add New Project button is clicked.

- **Teams Page**

    ☑  Show available teams.

    ☑  Team card will include Team Name, Member logos with the first character of their first name and last name.

    ☑  Add new team button.

    ☑ Team form will appear when Add new team button is clicked.

-  **Team Form**

    ☑  Team form with Team name, description and member field.

    ☑  Add team button.

    ☑  Members need to be seleced from available options shown in the form.

-  **Reports Page**

    ☑  Report page will include 3 reports shown in charts.

    ☑  Chart.js library can be used for the chart design.

    ☑  Total work left, Total work done in last week and Number of tasks closed, opened. These 3 data needs to be represented in charts (Pie, Bar).

-  **Settings Page**

    ☑  Welcome message with the logged in user name.

    ☑  User name and email needs to be shown in Profile details section.

-  **Side Navigation**

    ☑  Navigation menu needs to be shown as sidebar.

    ☑  Logout button needs to shown when user is logged in.

-  **Project Details Page**

    ☑  Project details need to be shown.

    ☑  Tasks asociated with the project needs to be shown.

    ☑  Filter options (sort by priority, sort by newest oldest and status) need to be shown for tasks.

    ☑  Add new task button.

    ☑  Update project status needs to be shown.

-  **Task Details**

    ☑  Task detals should be shown here.

    ☑  Update task status feature should be present.

**Backend:-**

-  **Models**

    ☑ Models required:- User, Project, Task, Tag and Team.

-  **Authentication**

    ☑ User must be authenticated with JWT authentication method for the protected routes.

    ☑ User password needs to be encrypted before storing into database.

-  **Form Handling**

    ☑ All user inputs needs to be thoroughly checked for minimum requirements before storing it to database.
