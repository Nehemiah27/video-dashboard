<h1 align="center" id="title">Video Dashboarding</h1>

<p id="description">Video Dashboarding is a full-stack MERN application that allows users to create an account with the Dashboard and receive a password in the email registered to follow-up with the Dashboarding process. Here the registered user can upload videos and view vidoe. The application demonstrates proficiency in frontend development with ReactJS and backend development with Node.js, Express.js and database management with MongoDB. Additionally the app incorporates advanced MongoDB Aggregations with optimized quering.</p>

<h2>🚀 Demo</h2>

[https://video-dashboarding.netlify.app/](https://video-dashboarding.netlify.app/)

- **Walkthrough Info**:
- When Link is opened, a Login screen will be shown, where you can be navigated to A/c creation page, If you follow it.
- In the Account creation page, If you submit the requisitive details, you will receive an email with A/c login details and you need to note your "FirstName" and "Passowrd" in order to log in to the A/c.
- In the home page, you'll be given an option to view your Avatar image, Your Bio and your registered detail(Avatar & Bio can be edited).
- In the page, it self, you can navigate to the "New Video" page, "My videos" page & "Listings" page and the same can also be accessed in the side bar as well, which can be opened if the three line icon on the top left page is clicked.
- In the add new video page, You can upload the video, you can also watch the Video thumbnail and you can proceed with video title and description.
- The uploaded video can be seen in the My videos page as well along with Title, Description and it can also be played.
- The uploaded videos of other users can also be seen in the Listings page.

<h2>🧐 Features</h2>

Here're some of the project's best features:

### Frontend:

- **Responsive UI**: Application comes with a Responsive UI supporting smaller and portable devices to larger screens & PCs.
- **Video Upload**: Users can choose a 6MB video and upload them.
- **Emailing setup**: The app sends your credentials via email.
- **Video Play**: You can play the videos that are uploaded.
- **Annotation**: The application allows users to Title it and comment its description.
- **User Dashboard**: The application dashboards the Details of users with their Video stats.
- **MUI Usage**: React with MUI has been used to enhance the UX of the applications.
  <br />

### Backend:

- **Save Video Data**: Uploaded videos can be saved in the Server and Meta Data of Videos in MongoDB database via a Node.js server.
- **Retrieve Video Data**: Endpoints are provided to retrieve and display saved Video data and thumbnails.
- **State Management**: Users can upload and play with the state of the Video variables captured.
- **Advanced Alogrithms**: An algorithm identifies and returns the random password for the User when he creates his account.
- **Advanced Quering**: Implemented a efficient mechanism to improve the performance of Large data sets.
- **User Management**: Users can be created with password setting & emailing features.
- **Containerization**: The application is containerized and deployed via Docker.
- **JWT Authentication**: JWT Authentication with verification of tokens are implemented.

<br />
<br />
<h2>🛠️ Installation Steps:</h2>
<br />
<p>1. Node.js (v18+)</p>

```
npm run start:dev //(if nodemon is available with you then use "npm run start:dev-nodemon")
```

<p>2. MongoDB</p>

<p>3. A VPS or server with HTTPS enabled for backend deployment</p>

<p>4. Netlify or any other platform for frontend deployment</p>

<p>5. React NPM</p>

```
npm start
```

  <br />
<br />
<h2>💻 Built with</h2>

Technologies used in the project:

- Frontend:- ReactJS | SASS & Material-UI
- Backend:- Node.js Express.js & Mongoose
- Database:- MongoDB
- Authentication:- JSON Web Tokens (JWT)
- Deployment:- Netlify (Frontend) & VPS/Server with HTTPS (Backend MongoDB & Redis via Docker Containerizations)

<br />
<br />

## API Endpoints

The API wise break up has been provided with Swagger API documentation in the link of http://92.205.63.217:40000/api-docs/#/
<br />
<br />

## Advanced JWT Integration for Enhanced Performance and Security

<br />

## Overview

In this application, JWT is strategically integrated to optimize both security and performance. By leveraging JWT Auth Strategy structure capabilities, the application efficiently manages user authentication and secures the User Data. This approach not only enhances user experience by reducing latency but also ensures robust Application management.
<br />

## JWT Use Cases

<br />

### Token Management and Session Security

**Purpose**: To enhance security and manage user sessions effectively.

**Mechanism**:

- **Token Generation**: Upon user authentication, a unique token is generated.
- **Session Authorization**: Alongside the token, The user requests of the session are authorized with Tokens.
- **Request Validation**: For every incoming request, the application checks the Token. If the Token is faulty, then the user will be logged out forcefully.
- **Continuous Integration Update**: With each valid request & verification ensuring active sessions remain valid.
  <br />

**Benefits**:

- **Enhanced Security**: Automatically verifies users & reducing the risk of unauthorized access.
- **Efficient Resource Utilization**: Tokens are for active sessions, reducing unauthorized usage.
- **Load Balancing**: The combined use of JWT auth and MongoDB ensures that both database & Node JS share the load & verifications, preventing any single point from becoming a bottleneck.

<br />
<br />
<br />

## Identifying Recent Five Updated Videos and User Uploads

<br />
<b>Objective</b>: To provide insights into the most recent videos uploaded by users, an endpoint was created to process video data and return the recent five of the User uploades. This was accomplished using an efficient aggregation algorithm designed to handle large datasets.

<br />
<br />

**Implementation**:

To achieve this, we utilized MongoDB's powerful aggregation framework. The key steps involved in the aggregation pipeline are:

**Searching & Grouping**:

- The User data can be searched and grouped with recent five videoes based on the First Name.
- For each user combination of these fields, from separate collection ensures the Optimized Document size utilization.

<br />

**Sorting**:

The results from the grouping stage are then sorted in descending order based on the time stamps, ensuring that the most recent videos appear first.
<br />

**Limiting**:

Finally, the aggregation pipeline is limited to return only the top five results, providing the most recent videos uploaded.

**Benefits**:

- **Efficient Data Processing**: This aggregation method is designed to efficiently process large datasets, making it scalable as the volume of map data increases.
- **Actionable Insights**: By identifying the recent most uploaded videos from large datasets, this endpoint can offer valuable insights into user behavior and preferences.

## Repo Cloning & Production Access

- **Cloning**: To Clone the repo, hit the URL in bash with command as git clone https://github.com/Nehemiah27/video-dashboard.git
- **Production**: To Access production Database, hit the URL "mongodb://video_dashboard_db_owner:i5u3h1PHb61@92.205.63.217:40001/video_dashboard" in the Mongoose Compass
