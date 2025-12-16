GuideCraft – Frontend Demo inspired by Clueso.io

GuideCraft is a frontend-only web application inspired by Clueso.io.
It demonstrates how screen recordings can be converted into simple,
step-by-step guides using a clean UI and simulated flows.

The main focus of this project is product understanding, UI flow,
routing, and frontend architecture. Backend services and AI-based
processing are intentionally mocked for demonstration purposes.



Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Deployed on Vercel



Features Implemented

- Landing page inspired by Clueso.io
- Mock authentication using browser localStorage
- Protected routes (login required for guide generation)
- Upload UI for screen recording (frontend simulation)
- Loader animation after clicking "Generate Guide"
- Preview page showing generated step-by-step guide
- Logout functionality
- Responsive dark-themed UI



Project Structure

src/
 ├─ App.tsx        Main routes, authentication logic, app flow
 ├─ main.tsx       Application entry point
 ├─ index.css      Tailwind CSS styles
 ├─ assets/        Static assets



Running the Project Locally

1. Clone the repository

git clone https://github.com/yadnik07/guidecraft.git
cd guidecraft

2. Install dependencies

npm install

3. Start development server

npm run dev

The application will run on the local Vite port shown in the terminal.



Deployment

The project is deployed using Vercel.

Live URL:
https://guidecraft.vercel.app



Authentication Notes

Authentication is implemented using browser localStorage.
No real backend, database, or password storage is connected.

This decision was intentional to keep the project frontend-focused.



Assumptions and Design Decisions

- Backend and AI features are out of scope
- File upload is simulated for UI demonstration
- Guide generation is mocked using static steps
- Primary focus is on UI flow, routing, and clean structure
- Designed to replicate the Clueso.io experience at a basic level



Video Demo

A demo video is provided separately showing:
- Login and signup flow
- Upload interaction
- Loader animation
- Preview page
- Overall navigation



Author

Nikhil Kumar Yadav
Frontend Developer
