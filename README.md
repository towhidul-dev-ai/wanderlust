# Wanderlust — Travel Booking Website

Wanderlust is a full-stack travel booking project I built to make it easier to discover places and keep track of travel plans. Visitors can browse destinations, open a destination to see its details, and book a trip. Signed-in users can also view their bookings from the My Bookings page.

The project has a Next.js frontend and a separate Express.js API. MongoDB is used to store destination and booking information, while Better Auth handles user authentication and JWTs for protected API requests.

## Live Project

- **Website:** https://wanderlust-seven-beta.vercel.app/
- **Backend API:** https://wanderlust-server-umber-three.vercel.app/

The backend root URL is a simple health check. It should return a message confirming that the server is running; the application data is available through the API routes below.

## Features

- **Home page:** A landing page with a featured destinations section.
- **Browse destinations:** Explore available trips and view details such as the destination name, country, category, price, duration, and image. Ratings are shown when provided by the data.
- **Destination details:** Open a destination's individual page to read more about the trip.
- **Book a trip:** Submit a booking for a destination. The backend saves the booking in MongoDB.
- **My Bookings:** View the bookings associated with the signed-in user's email address.
- **Authentication:** Better Auth manages sign-in and sessions. The frontend can request a JWT and send it to protected backend routes.
- **Responsive interface:** The pages and destination cards are designed to work on desktop, tablet, and mobile screens.

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Better Auth

### Backend

- Node.js
- Express.js
- MongoDB
- Better Auth JWT integration for protected API requests

## How the Project Works

The frontend is built with Next.js and is responsible for the pages, interface, and user experience. It sends requests to the Express.js backend to load destinations and manage bookings.

The backend communicates with MongoDB. It reads destination data, saves new bookings, and returns bookings for the signed-in user. For protected requests, the frontend sends an authentication token in the request header:

```http
Authorization: Bearer <token>
```

The backend's authentication middleware checks the token before allowing access to protected routes.

## Main API Routes

These are the routes used by the application:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/destinations` | Get the destination list. |
| `GET` | `/destination/:id` | Get one destination by its ID. |
| `POST` | `/booking` | Save a new booking. |
| `GET` | `/my-bookings/:email` | Get bookings associated with an email address. This route uses token verification. |
| `DELETE` | `/booking/:id` | Delete or cancel a booking by its ID. |

The frontend reads the backend address from `NEXT_PUBLIC_API_URL`, so the API URL can be changed between local development and deployment without editing the application code.

## Run the Frontend Locally

1. Clone the frontend repository and open it in your terminal.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend project root. Add the values used by your local setup:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URL=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret
   ```

   Keep real connection strings and secrets private. Do not commit `.env.local` to GitHub. Add any other variables required by your Better Auth or deployment configuration.

4. Start the Next.js development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Run the Backend Locally

1. Open the backend project in a separate terminal.
2. Install its dependencies:

   ```bash
   npm install
   ```

3. Add the MongoDB connection string and the environment variables required by the backend, including the settings used by its token-verification middleware.
4. Start the backend using the development or start script defined in the backend project's `package.json`.
5. Make sure the API is running at `http://localhost:8000`, or update `NEXT_PUBLIC_API_URL` to use the port configured for your backend.

Run the frontend and backend in separate terminals during local development.

## Deployment

The frontend and backend are deployed separately on Vercel. In the frontend Vercel project, set this environment variable under **Settings → Environment Variables**:

```env
https://wanderlust-server-umber-three.vercel.app
```

Also configure the Better Auth, MongoDB, and token-verification environment variables required by each deployed application. Use the correct production auth URL and keep all secrets out of the repository. After changing environment variables in Vercel, redeploy the relevant project.

> Do not use `http://localhost:8000` as the API URL in production. That address only works on your own development machine.

## A Few Things to Check When Setting It Up

- The `/destinations` and other data endpoints should return JSON, not an HTML error page.
- The backend CORS configuration must allow requests from the deployed frontend domain where browser requests are made.
- Protected routes must receive the token in the format expected by the backend's verification middleware.
- The frontend and backend must use compatible Better Auth JWT settings.
- Never commit database credentials, authentication secrets, or other private environment variables.

## Why I Built It

I built Wanderlust as a way to practise putting together a complete web application, from the pages people use to the API and database behind them. It gave me experience with the Next.js App Router, connecting a frontend to an Express API, working with MongoDB, handling authentication, and building a booking flow.
