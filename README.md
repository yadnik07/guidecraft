GuideCraft – Frontend Demo inspired by Clueso.io

GuideCraft is a frontend-only web application inspired by Clueso.io.
It demonstrates how screen recordings can be converted into clear,
step-by-step guides using a clean user interface and simulated product flow.

This project focuses on frontend architecture, routing, authentication flow,
and user experience. All backend, AI processing, and video analysis features
are intentionally mocked for demonstration purposes.

Tech Stack

React (Vite)
TypeScript
Tailwind CSS
React Router DOM
LocalStorage for mock authentication
Deployment: Vercel

Features Implemented

Landing page similar to Clueso.io style
Login and Signup using mock authentication
Logout functionality
Authentication handled using browser localStorage
Conditional UI based on login state
Upload screen recording (video file) – simulated flow
Loader animation during guide generation
Preview page showing uploaded video
Step-by-step guide generated from mock data
Video preview shown for each step
Clean dark UI and responsive layout

Note:
Actual AI guide generation and video processing are not implemented.
This project simulates the full frontend flow only.

Project Structure

src/
 ├─ App.tsx     Main routes, authentication logic, app flow
 ├─ main.tsx    Application entry point
 ├─ index.css   Tailwind CSS styles
 ├─ assets/     Static assets


How Authentication Works

Authentication is mocked using browser localStorage.

On login or signup:
auth is set to true
currentUser is saved

On logout:
localStorage is cleared
user is redirected to the home page

Protected behavior:
Generate Guide redirects to login if user is not authenticated
Preview page is accessible only after login


Running the Project Locally

Step 1: Clone the repository

git clone https://github.com/yadnik07/guidecraft.git
cd guidecraft

Step 2: Install dependencies

npm install

Step 3: Start development server

npm run dev

The app will run on the Vite local development URL shown in the terminal.


Deployment

The project is deployed on Vercel.

Live URL:
https://guidecraft.vercel.app


Assumptions and Design Decisions

Backend services are out of scope
AI processing is simulated
File upload is frontend-only
Guide steps are static mock data
Focus is on UI flow, routing, and user experience
Designed to resemble Clueso.io at a basic product level


Video Demo

A screen recording demo is provided separately showing:

Landing page
Login flow
Signup flow
Upload screen recording
Generate guide interaction
Loader animation
Preview page with video and steps
Logout functionality


Author

Nikhil Kumar Yadav
Frontend Developer
