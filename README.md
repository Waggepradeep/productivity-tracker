# Productivity Tracker

A productivity web app built with React, Vite, Firebase Authentication, and Cloud Firestore.

## Features

- Email/password authentication
- Task, goal, and habit tracking
- Realtime dashboard updates
- Activity stats chart
- Responsive UI for desktop and mobile

## Tech Stack

- Frontend: React + Vite
- Backend: Firebase Auth + Firestore
- Charts: Chart.js + react-chartjs-2

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file from `.env.example`:

```bash
cp .env.example .env
```

3. Fill in Firebase values in `.env`.

4. Start development server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
