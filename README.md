# Paschal Omereife — Full-Stack Software Engineer Portfolio

[![Live portfolio](https://img.shields.io/badge/Live-Vercel-000?logo=vercel)](https://paschalomereife.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-5-000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=fff)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready full-stack portfolio focused on making Paschal's engineering work easy to evaluate. The React frontend presents selected projects, experience, availability, and a downloadable resume. The Express API validates and stores contact enquiries, then sends notification and acknowledgement emails.

**Live site:** [paschalomereife.vercel.app](https://paschalomereife.vercel.app)

## Preview

| Home | Selected work |
| --- | --- |
| ![Portfolio home page](screenshots/homepage.png) | ![Selected projects](screenshots/projects.png) |

| About | Contact |
| --- | --- |
| ![About and experience](screenshots/about.png) | ![Contact form](screenshots/contact.png) |

## What the application includes

### Frontend

- Hiring-focused landing page with direct project, resume, and contact actions
- Responsive editorial interface built for mobile, tablet, and desktop
- Four project case studies with live demonstrations and source links
- Keyboard-accessible project dialogs with focus management
- Reduced-motion support, semantic landmarks, skip navigation, and visible focus states
- Locally hosted and optimized project imagery
- Search metadata, canonical URL, Open Graph, Twitter cards, sitemap, and structured data
- Installable web-app metadata and a network-first service worker
- Contact form with matching browser- and server-side constraints
- Error boundary and direct-email fallback when the API is unavailable

### Backend

- Public contact-submission endpoint with field validation and normalization
- MongoDB persistence and duplicate-submission protection
- Per-IP rate limiting and a hidden honeypot field for basic bot filtering
- HTML escaping before user content is inserted into email templates
- Notification email to the site owner and acknowledgement email to the sender
- Restricted CORS origins, Helmet headers, small request-body limits, and disabled framework disclosure
- Health endpoint for deployment monitoring
- Graceful HTTP and MongoDB shutdown on `SIGTERM` or `SIGINT`

## Technology

| Area | Tools |
| --- | --- |
| UI | React 19, JavaScript, Tailwind CSS 4, Framer Motion |
| Build | Vite 8, ESLint 9 |
| API | Node.js 20+, Express 5 |
| Data | MongoDB, Mongoose |
| Email | Nodemailer, Gmail SMTP or Ethereal for development |
| Security | Helmet, CORS, express-rate-limit, express-validator |
| Hosting | Vercel (frontend), Render (API), MongoDB Atlas |

## Repository layout

```text
my-portfolio/
├── portfolio-frontend/
│   ├── public/                 # Static images, resume, metadata, service worker
│   ├── src/
│   │   ├── components/         # Layout, sections, and reusable UI
│   │   ├── data/               # Project case-study content
│   │   ├── hooks/              # Analytics and performance helpers
│   │   ├── utils/              # Browser performance utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
├── portfolio-backend/
│   ├── src/
│   │   ├── config/             # MongoDB connection
│   │   ├── controllers/        # Contact workflow
│   │   ├── middleware/         # Validation and error responses
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API route definitions
│   │   ├── utils/              # Email transport and templates
│   │   └── server.js
│   ├── test/                   # Node test-runner security tests
│   ├── .env.example
│   └── package.json
├── output/resume/              # Editable and PDF resume deliverables
├── screenshots/                # README and portfolio screenshots
└── README.md
```

## Local development

### Prerequisites

- Node.js 20.19 or later
- npm
- A local MongoDB server or MongoDB Atlas connection string
- Optional Ethereal credentials for development email delivery

### 1. Install dependencies

```bash
cd portfolio-frontend
npm ci

cd ../portfolio-backend
npm ci
```

### 2. Configure the environment

Create local environment files from the committed examples:

```bash
cp portfolio-frontend/.env.example portfolio-frontend/.env.local
cp portfolio-backend/.env.example portfolio-backend/.env
```

Frontend variable:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Absolute URL of the Express API, without a trailing slash |

Backend variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NODE_ENV` | Yes in production | Runtime mode; use `production` when deployed |
| `PORT` | No | HTTP port; defaults to `5001` |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `ALLOWED_ORIGINS` | Yes in production | Comma-separated frontend origins, without paths |
| `EMAIL_USER` | Yes for production email | Gmail address used as sender and notification recipient |
| `EMAIL_PASS` | Yes for production email | Gmail app password; never use the account password |
| `ETHEREAL_EMAIL` | Development email only | Ethereal SMTP username |
| `ETHEREAL_PASSWORD` | Development email only | Ethereal SMTP password |
| `RATE_LIMIT_WINDOW_MS` | No | Contact rate-limit window; defaults to 15 minutes |
| `RATE_LIMIT_MAX` | No | Requests allowed per IP and window; defaults to 5 |

Never commit real credentials. All `.env` variants are ignored by Git.

### 3. Start both services

In the first terminal:

```bash
cd portfolio-backend
npm run dev
```

In a second terminal:

```bash
cd portfolio-frontend
npm run dev
```

Open `http://localhost:5173`. The API health endpoint is available at `http://localhost:5001/api/health`.

## Commands

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run lint      # Check JavaScript and JSX
npm run build     # Create the production bundle in dist/
npm run preview   # Serve the production bundle locally
```

### Backend

```bash
npm run dev       # Start with Nodemon
npm start         # Start the production server
npm test          # Run the Node test suite
```

## API

### `GET /api/health`

Returns a simple readiness response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### `POST /api/contact/submit`

Request body:

```json
{
  "name": "Ada Example",
  "email": "ada@example.com",
  "message": "I would like to discuss a full-stack engineering role.",
  "company": ""
}
```

`company` is the honeypot field and must remain empty for legitimate submissions. Successful requests return HTTP `201`; validation failures return `400`; duplicate or rate-limited submissions return `429`.

## Production deployment

### Backend on Render

1. Create a Web Service with `portfolio-backend` as the root directory.
2. Use `npm ci` as the build command and `npm start` as the start command.
3. Set `NODE_ENV=production`, `MONGODB_URI`, `ALLOWED_ORIGINS`, `EMAIL_USER`, and `EMAIL_PASS` in Render's secret environment settings.
4. Set `ALLOWED_ORIGINS` to the exact Vercel origin. Add preview or custom domains as a comma-separated list only when they need API access.
5. Configure `/api/health` as the health-check path.

The server trusts one upstream proxy hop because Render forwards the original client IP. Change this setting if the deployment topology changes.

### Frontend on Vercel

1. Import the repository and use `portfolio-frontend` as the root directory.
2. Vercel should detect Vite; the build command is `npm run build` and the output directory is `dist`.
3. Add `VITE_API_URL` with the deployed Render service URL.
4. Redeploy after changing any `VITE_*` variable because Vite embeds it at build time.

`vercel.json` adds security headers and rewrites client-side routes to `index.html`. Update the canonical URL, sitemap, robots file, and Open Graph URLs together if the public domain changes.

## Verification before release

Run these from the repository root:

```bash
cd portfolio-frontend
npm run lint
npm run build

cd ../portfolio-backend
npm test
```

Then verify the following against the deployed services:

- `/api/health` returns HTTP `200`.
- The Vercel domain is present in `ALLOWED_ORIGINS`.
- A contact submission is stored once and both emails are delivered.
- The resume downloads and every project link opens correctly.
- Social sharing renders `og-image.png` with the expected title and description.
- Keyboard navigation, the project dialog, reduced motion, and mobile navigation work as expected.

## Security notes

- Keep SMTP and database credentials only in provider secret stores.
- Use a Gmail app password with two-factor authentication, not a primary password.
- The contact API deliberately exposes no message-listing or administration routes.
- Rate limiting is in-memory, which is appropriate for a single small service instance. Use a shared store such as Redis before horizontally scaling the API.
- Email delivery is best-effort after the message is persisted; a temporary SMTP failure does not discard the enquiry.

## License

This project is available under the [MIT License](LICENSE).
