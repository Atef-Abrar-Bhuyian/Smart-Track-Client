# Smart Track

Smart Track is a web application designed for managing and tracking assets within an organization. The system allows HR and employees to interact with assets, request or approve asset distributions, and generate detailed reports. 

## Features

- **HR Management**:
  - HR can add assets as **returnable** or **non-returnable**.
  - HR can approve or reject asset requests made by employees.
  - HR can add users as team members.
  - HR can search assets or filter assets.
  - HR can see the top 5 **Pending Requests**, **Top Most Requested Items**, **Limited Stock Items**, and a **Pie Chart** showing the percentage of returnable vs non-returnable items requested by employees on the homepage.

- **Employee Management**:
  - Employees can request assets.
  - Employees can search or filter assets.
  - Employees can see **Pending Requests** and **Monthly Requests** on their homepage.
  - Employees can return returnable assets.
  - Employees can print a **PDF** of asset information once their requests are approved.

## Technologies Used

- **Frontend**:
  - React
  - Firebase (for authentication)
  - React Router (for routing)
  - Tailwind CSS (for styling)
  - Flowbite React (for UI components)
  - Axios (for making API requests)
  - React Query (for data fetching and state management)
  - Recharts (for data visualization)

- **Backend**:
  - MongoDB (for data storage)
  - Node.js (for server-side logic)
  - Express.js (for building the REST API)
  - Firebase (for authentication)

- **Other Libraries**:
  - React-Stripe (for Stripe integration)
  - SweetAlert2 (for user-friendly alerts)
  - Animate.css (for animations)
  - Lottie-React (for interactive animations)
  - Typewriter-Effect (for typing animations)

## npm Packages Used

Here are the main npm packages used in the project:

- `@react-pdf/renderer`: For generating PDFs of asset information.
- `@stripe/react-stripe-js`, `@stripe/stripe-js`: For Stripe integration to handle payments.
- `@tanstack/react-query`: For data fetching, caching, and synchronization.
- `animate.css`: For adding animations to elements.
- `axios`: For making HTTP requests.
- `date-fns`: For handling date manipulation.
- `firebase`: For authentication.
- `flowbite-react`: For UI components such as modals, dropdowns, and buttons.
- `localforage`: For offline storage of tasks and data.
- `lottie-react`: For interactive animations.
- `match-sorter`: For sorting data.
- `react-router-dom`: For routing within the app.
- `react-toastify`: For displaying notifications.
- `recharts`: For rendering charts and graphs.
- `sweetalert2`: For elegant alerts.
- `swiper`: For implementing image sliders.
- `typewriter-effect`: For adding typewriter animations to text.
- `express`: For building the backend API.
- `mongoose`: For interacting with MongoDB in the backend.

## Live Website

You can check out the live version of the website here:

- [Smart Track - Web App](https://smart-track-8eed9.web.app/)
- [Smart Track - Firebase Hosting](https://smart-track-8eed9.firebaseapp.com/)
