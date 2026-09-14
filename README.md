# JobShield AI 🛡️

JobShield AI is a web application designed to help users investigate companies and identify potential risks related to job opportunities and recruitment activities.

The application allows users to analyze companies, view investigation results, review risk indicators, inspect recruiter information, and maintain additional investigation updates.

> **Current status:** The project currently uses frontend mock data for investigations and company information. Backend and database integration are planned for persistent data storage and updates.

---

## Features

### Dashboard

* View an overview of investigations.
* Display recent investigations.
* View company names and job titles.
* Display risk scores and risk levels.
* Navigate to individual investigation details.

### Company Analysis

* Analyze company and recruitment information.
* Display investigation results.
* Show company details and job information.
* Display risk scores and detected risk indicators.

### Investigation History

* View previously created investigations.
* Display investigation IDs and user IDs.
* View company names, job titles, risk levels, and scores.
* Open detailed investigation pages.

### Investigation Details

Each investigation detail page includes:

* Company information
* Job title
* Recruiter name
* Recruiter email
* Investigation description
* Overall risk score
* Company verification status
* Detected risk indicators
* Investigation metadata
* Last updated date
* Total number of updates

### Investigation Updates

Users can:

1. Click **Add More Information**.
2. Open a textarea.
3. Enter additional recruitment or investigation information.
4. Save the information.
5. View the saved information on the page.
6. See the locally updated total update count.

> Currently, newly added updates are stored only in React state and are lost after refreshing the page.

### Company Track Record

The company track record page displays:

* Company-level risk information
* Company statistics
* Red flags
* Previous reports
* Company verification information
* Company event timeline

---

## Technology Stack

* **Next.js** — Application framework
* **React** — UI development
* **TypeScript** — Type-safe development
* **Tailwind CSS** — Styling and responsive layouts
* **Lucide React** — Icons
* **Next.js App Router** — Routing and dynamic pages

---

## Project Structure

```text
src/
├── app/
│   ├── landing/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── analyze/
│   │   └── page.tsx
│   │
│   ├── history/
│   │   └── [userId]/
│   │       └── [company]/
│   │           ├── page.tsx
│   │           └── RecentRecruitmentUpdates.tsx
│   │
│   └── investigation/
│       └── page.tsx
│
├── component/
│   └── sidebar/
│       └── Sidebar.tsx
│
└── data/
    ├── investigation.ts
    └── company.ts
```

---

## Important Routes

| Route                         | Description                      |
| ----------------------------- | -------------------------------- |
| `/landing`                    | Landing page                     |
| `/dashboard`                  | Dashboard overview               |
| `/analyze`                    | Company analysis page            |
| `/history`                    | Investigation history            |
| `/history/[userId]/[company]` | Individual investigation details |
| `/investigation`              | Company track record             |

The investigation details page also supports the `from` query parameter:

```text
/history/101/abc-technologies?from=dashboard
```

When opened from the dashboard, the page displays a **Back to Dashboard** link. Otherwise, it displays a **Back to History** link.

---

## Investigation Data

Investigation data is currently maintained in:

```text
src/data/investigation.ts
```

The investigation data model includes:

```ts
export type Investigation = {
  id: number;
  userId: number;
  company: string;
  companySlug: string;
  jobTitle: string;
  score: number;
  riskLevel: string;
  lastUpdated: string;
  updates: number;
  recruiterName: string;
  recruiterEmail: string;
  description: string;
  redFlags: {
    title: string;
    description: string;
  }[];
};
```

Company track record data is currently maintained in:

```text
src/data/company.ts
```

---

## Risk Score Display

The investigation risk score uses the following visual categories:

| Score    | Color  | Meaning     |
| -------- | ------ | ----------- |
| `80–100` | Red    | High risk   |
| `50–79`  | Orange | Medium risk |
| `0–49`   | Green  | Lower risk  |

The risk score is currently based on the stored investigation data.

---

## Company Verification

The company verification section currently displays a static status:

```text
Needs Review
```

The current implementation does not yet include:

* Admin verification
* Backend verification
* Database verification status
* Live company verification services

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd JobShield-AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs the project's linting checks, if configured.

---

## UI Theme

JobShield AI uses a dark-themed interface.

### Main Colors

| Purpose                  | Color     |
| ------------------------ | --------- |
| Main background          | `#070B14` |
| Card background          | `#111A2E` |
| Inner card background    | `#080D17` |
| Primary action           | Blue      |
| High-risk state          | Red       |
| Warning state            | Orange    |
| Safe or successful state | Green     |

The interface uses:

* Rounded cards
* Subtle borders
* Responsive layouts
* Dark backgrounds
* Lucide React icons
* Clear risk-level colors
* Mobile-friendly spacing and layouts

---

## Current Data Flow

At present, the application uses local TypeScript data:

```text
Local TypeScript Data
        ↓
Next.js Page
        ↓
React UI
```

The intended future architecture is:

```text
Database
        ↓
Backend API
        ↓
Next.js Frontend
        ↓
Investigation UI
```

---

## Current Limitations

The following functionality is not yet fully implemented:

* Persistent investigation updates
* Backend API for saving additional information
* Database storage for recruitment updates
* Permanent update count synchronization
* Real-time risk score recalculation
* Admin-based company verification
* Live company verification
* Database-connected company track record
* Authentication-based update ownership
* Cross-device update history
* Backend-driven investigation history

The current update feature stores information temporarily in React state. Refreshing the page removes newly added updates.

---

## Future Improvements

Planned improvements include:

* Connect investigations to a backend API.
* Store company investigations in a database.
* Store recruitment updates permanently.
* Maintain update counts in the backend.
* Add authentication and user-specific data access.
* Add real company verification.
* Recalculate risk scores based on new information.
* Add admin verification workflows.
* Add persistent company timelines.
* Add API error handling and loading states.
* Add form validation.
* Add automated tests.
* Add production deployment configuration.

---

## Development Guidelines

* Preserve existing functionality when modifying the UI.
* Avoid changing unrelated files.
* Use TypeScript types for shared data.
* Use Lucide React icons consistently.
* Maintain the existing dark UI theme.
* Keep layouts responsive across screen sizes.
* Distinguish frontend issues from backend or data-source issues.
* Do not treat mock verification data as real verification.
* Do not treat mock timelines as live database events.
* Connect persistent functionality to the backend instead of relying only on React state.

---

## Project Status

JobShield AI currently provides a frontend investigation experience with:

* Dashboard navigation
* Company analysis structure
* Investigation history
* Dynamic investigation detail pages
* Risk score display
* Recruiter information
* Company verification placeholder
* Detected risk indicators
* Company track record
* Investigation updates through a textarea

The project is currently in the frontend development stage, with backend and database integration planned for persistent and production-ready functionality.
