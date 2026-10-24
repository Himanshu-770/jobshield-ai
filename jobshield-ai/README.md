# JobShield AI

JobShield helps job seekers screen a job opportunity, inspect supporting evidence, and keep a conversation about what happens during the hiring process.

## What it does

- Analyze job details, a public job URL, or a job screenshot.
- Show a 0–100 evidence score with source-linked findings, company verification gaps, public review results, and next steps.
- Re-score relevant risks when a user adds hiring experience in the investigation chat.
- Save reports and chat history to the signed-in user's account so they can resume after signing out and back in.

Scores are screening signals, not proof that a company or job is fraudulent. Public reviews and hiring-platform statistics are unverified leads and receive limited weight.

## Local setup

See the repository [README](../README.md) for frontend, API, MongoDB, Ollama, and scraper setup. The frontend uses `NEXT_PUBLIC_API_URL` (default: `http://localhost:5000/api`).

## Routes

| Route | Purpose |
| --- | --- |
| `/landing` | Product overview |
| `/auth/signup`, `/auth/login` | Account access |
| `/dashboard` | Saved analysis overview |
| `/analyze` | Submit job details, URL, or screenshot |
| `/analyze/result?id=<analysis-id>` | Evidence report and persistent follow-up chat |
| `/history` | Search saved investigations |
| `/profile` | Account profile |

The API stores analysis, evidence, and conversation under the authenticated user. The browser session may expire; sign in again to continue the saved investigation.
