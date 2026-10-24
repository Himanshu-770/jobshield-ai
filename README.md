# JobShield AI — local development

This repository contains the Next.js/React frontend (`jobshield-ai`), Express API (`jobshield-backend`), MongoDB persistence, and Python/Playwright job-posting scraper. Users can analyze job details, URLs, and screenshots, review a source-linked evidence report, and continue a saved hiring-safety conversation attached to each analysis.

## Prerequisites

- Node.js 20 or newer
- MongoDB local instance or MongoDB Atlas connection string
- Python 3.10+ (3.11/3.12 recommended)
- Ollama Cloud API key for `gemma4:31b-cloud`
- Chromium installed through Playwright for URL scraping

## 1. Configure the backend

```powershell
cd jobshield-backend
Copy-Item .env.example .env
npm install
```

Set the values in `.env`:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: long random secret (at least 32 random bytes recommended)
- `OLLAMA_API`: Ollama Cloud API key
- `OLLAMA_MODEL`: model used by all analysis paths; defaults to `gemma4:31b-cloud`. A smaller model supported by your Ollama account will usually answer faster.
- `OLLAMA_NUM_PREDICT`: maximum generated tokens per response (default `2048`; lower this if responses are consistently shorter).
- `OLLAMA_CONNECT_TIMEOUT_SECONDS` / `OLLAMA_READ_TIMEOUT_SECONDS`: Python scraper connection/read timeouts (defaults `10` / `90` seconds), so a network connection failure does not hang for 180 seconds.
- `FRONTEND_URL`: frontend origin, normally `http://localhost:3000`
- `PYTHON_BIN`: `python` on Windows; `python3` on macOS/Linux

Install scraper dependencies and browser:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m playwright install chromium
```

On macOS/Linux, activate with `source .venv/bin/activate` instead.

Start the API:

```powershell
npm run dev
```

Health check: `http://localhost:5000/api/health`

## 2. Configure the frontend

In another terminal:

```powershell
cd jobshield-ai
Copy-Item .env.local.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. `NEXT_PUBLIC_API_URL` defaults to `http://localhost:5000/api` if unset.

## API endpoints

- `POST /api/user/signup` — create account and set an HTTP-only JWT cookie
- `POST /api/user/login` — sign in
- `POST /api/user/logout` — sign out
- `GET /api/user/me` — current user
- `PATCH /api/user/profile` — update profile details
- `POST /api/job/analyze` — analyze pasted job details with Ollama
- `POST /api/job/url/get-data` — scrape a public job URL, enrich it, analyze it, and save the result
- `POST /api/job/screenshot` — analyze an uploaded PNG/JPEG/WEBP image with a vision-capable configured Ollama model
- `GET /api/job/history` — paginated current-user analysis history
- `GET /api/job/stats` — dashboard counters
- `GET /api/job/:id` — retrieve one of the current user's analyses
- `GET /api/job/:id/chat` and `POST /api/job/:id/chat` — load and continue the analysis conversation; messages persist with the analysis after sign-out
- `DELETE /api/job/:id` — delete one of the current user's analyses

Analysis routes require an authenticated session. Analysis records are scoped to the signed-in user. Risk scores are screening signals, not proof that a job is fraudulent or legitimate.

Scoring rules and point limits are documented in [`jobshield-backend/RISK_RULEBOOK.md`](jobshield-backend/RISK_RULEBOOK.md) (Rulebook v2.4). Scoring is deterministic: the LLM's numeric score and positive signals do not change the final score. Matched fixed rules, capped source-linked research findings, and capped company/job profile gaps form the score. Company reviews are linked public search excerpts; recheck the source and company identity before relying on them.

Run backend regression tests after installing backend dependencies:

```powershell
cd jobshield-backend
npm test
```

The scoring tests check that numeric model scores and positive signals cannot alter the final score, missing job details are reflected, and direct critical evidence is not offset by positive signals.

## Security notes

- Never commit `.env` or `.env.local`; the example files contain placeholders only.
- URL validation blocks common local/private literal addresses. For a public deployment, add network-level egress restrictions and stricter DNS/redirect validation before allowing arbitrary URLs to be scraped.
- Screenshot analysis depends on whether the configured Ollama model supports image input. If it does not, use the URL or pasted-details path or configure a vision-capable model.
- Full end-to-end tests require working MongoDB/Ollama credentials and installed Node/Python dependencies.

## Company Intelligence UI

The analysis result page includes a Company Intelligence section for newly analyzed job URLs. It displays the extracted company website and hiring-platform profile, industry/domain, registration information, review summaries, reported scam patterns, and clickable company-research search results.

The URL scraper now saves the actual URLs returned by Ollama web search as `job["Company Research Sources"]`, grouped by search category, so the UI links to returned sources rather than fabricating source URLs. Search-derived details are not independently verified. Analyses created before this change will not have saved research-source links; rerun those URL analyses to populate the new section.

The URL scraper runs independent company searches concurrently and uses the same `OLLAMA_MODEL` configuration as pasted-detail and screenshot analysis. Ollama chat requests use JSON output and disable optional thinking for these structured tasks; these request fields are supported by the [Ollama chat API](https://docs.ollama.com/api/chat).
