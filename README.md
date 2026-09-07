# JobShield AI

JobShield AI is an AI-powered job scam detection platform designed to help job seekers identify potentially fraudulent or suspicious job opportunities before sharing personal information or applying.

The application provides a simple interface where users can submit job details, job URLs, or screenshots and receive a security assessment.

---

## Features

### Landing Page

- Responsive navigation bar
- Hero section
- How It Works section
- About section
- Statistics section
- Call-to-action section
- Responsive mobile navigation
- Lucide React icons

### Authentication

- Sign In page
- Sign Up page
- Responsive authentication layout
- Reusable authentication input component
- Password visibility support
- Authentication visual section
- Navigation from authentication pages to dashboard

### Dashboard

- Responsive sidebar
- Dashboard statistics
- Jobs Checked
- High Risk jobs
- Medium Risk jobs
- Safe jobs
- Responsive mobile sidebar
- Active navigation state
- User profile section

### Job Analysis

Users can analyze a job using:

- Job Details
- Job URL
- Screenshot

The Analyze Job page includes:

- Job title
- Company name
- Recruiter name
- Recruiter email
- Salary / compensation
- Job description
- Job posting URL
- Screenshot upload
- Security information
- Analysis trigger

### Responsive Design

The application is designed for:

- Desktop
- Tablet
- Mobile

The dashboard sidebar and landing page navigation adapt to smaller screen sizes using mobile menus.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Framer Motion

---

## Project Structure

```text
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── fragments/
│   │       ├── AuthInput.tsx
│   │       └── AuthVisual.tsx
│   │
│   ├── analyze/
│   │   ├── fragments/
│   │   │   ├── AnalyzeHeader.tsx
│   │   │   ├── JobDetailsForm.tsx
│   │   │   └── WhatWeAnalyze.tsx
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── fragments/
│   │   │   └── StatsCards.tsx
│   │   └── page.tsx
│   │
│   ├── history/
│   │   └── page.tsx
│   │
│   ├── settings/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── About.tsx
│   │   ├── StatsCTA.tsx
│   │   └── Footer.tsx
│   │
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── AuthVisual.tsx
│   └── sidebar/
│       └── Sidebar.tsx
│
└── types/
    └── auth.ts
