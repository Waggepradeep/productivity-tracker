# Productivity Tracker

A full-stack productivity app for managing daily work in one place.
It supports authentication, task/goal/habit tracking, and a live stats dashboard backed by Firebase.

## Overview

This project helps users:
- Create an account and sign in securely
- Track tasks, goals, and habits
- See live updates as data changes
- Visualize activity counts in a chart

The app is built with React + Vite on the frontend and Firebase (Auth + Firestore) on the backend.

## Core Features

- User authentication with Firebase Email/Password
- Personalized dashboard with user greeting
- Task management (add, list, delete)
- Goal management (add, list, delete)
- Habit management (add, toggle complete, delete)
- Realtime sync with Firestore listeners
- Activity chart for tasks, goals, and habits
- Graceful Firebase config error screen when env values are missing
- Keyboard-accessible habit toggle button (`aria-pressed`)
- Responsive layout for desktop and mobile

## Tech Stack

- Frontend: React 19, Vite
- Routing: React Router
- Backend: Firebase Authentication, Cloud Firestore
- Charts: Chart.js + react-chartjs-2
- Linting: ESLint

## Project Structure

```text
src/
  components/      Reusable UI parts (Header, trackers, chart)
  context/         Auth context and hook
  firebase/        Firebase config and Firestore helpers
  pages/           Route-level pages (Login, Register, Dashboard)
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root using `.env.example`.

Example:

```bash
cp .env.example .env
```

Set the Firebase values in `.env`:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Note: `.env` is ignored by Git and should not be committed.

### 3. Run locally

```bash
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Data Model (Firestore)

Each user has nested collections:

- `users/{uid}/tasks`
- `users/{uid}/goals`
- `users/{uid}/habits`

This keeps data isolated per authenticated user.

## Realtime Behavior

The app uses Firestore subscriptions (`onSnapshot`) for each tracker list.
The dashboard chart receives counts from tracker state to avoid duplicate listeners.
New task/goal/habit items use Firestore `serverTimestamp()` for consistent ordering across devices.

## Troubleshooting

- Firebase configuration error screen on startup:
  - Check that `.env` exists and includes all required Firebase keys.
  - Restart the dev server after changing `.env`.
- Auth errors:
  - Verify Firebase Authentication is enabled for Email/Password in Firebase Console.
- Firestore permission errors:
  - Check Firestore security rules and ensure authenticated access is allowed.

## Future Improvements

- Add edit/update for tasks and goals
- Add due dates and priority labels
- Add filtering and search
- Add unit/integration tests
- Add CI workflow for lint + build

## License

This project is for educational and portfolio use.
