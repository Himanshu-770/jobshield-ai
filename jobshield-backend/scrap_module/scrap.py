from playwright.sync_api import sync_playwright
import requests
import json
import os
import sys
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor
from requests.adapters import HTTPAdapter


# ============================================================
# Encoding
# ============================================================

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")


# ============================================================
# Configuration
# ============================================================

URL = sys.argv[1]
OLLAMA_CHAT_URL = os.getenv("OLLAMA_CHAT_URL", "https://ollama.com/api/chat")
OLLAMA_WEB_SEARCH_URL = os.getenv("OLLAMA_WEB_SEARCH_URL", "https://ollama.com/api/web_search")

MODEL = os.getenv("OLLAMA_MODEL", "gemma4:31b-cloud")
MAX_OUTPUT_TOKENS = max(256, min(4096, int(os.getenv("OLLAMA_NUM_PREDICT", "2048"))))

OLLAMA_API_KEY = os.getenv("OLLAMA_API", "")


if not OLLAMA_API_KEY:
    raise RuntimeError(
        "OLLAMA_API_KEY was not provided."
    )


HEADERS = {
    "Authorization": f"Bearer {OLLAMA_API_KEY}",
    "Content-Type": "application/json"
}
HTTP = requests.Session()
HTTP.mount("https://", HTTPAdapter(pool_connections=8, pool_maxsize=8))


# ============================================================
# Extraction Schema
# ============================================================

EXTRACTION_SCHEMA = {

    "Job Title": None,
    "Company": None,
    "Posting ID": None,
    "Location": None,
    "Work Mode": None,
    "Office Days": None,
    "Start Date": None,
    "Duration": None,
    "Stipend": None,
    "Salary": None,
    "Apply By": None,
    "Skills Required": [],
    "Job Description": None,
    "Who Can Apply": None,
    "Other Requirements": None,
    "Perks": [],
    "Number of Openings": None,
    "Job Offer / PPO": None,
    "Company Description": None,
    "Company Website": None,
    "Company Platform Profile": None,
    "Hiring Since": None,
    "Opportunities Posted": None,
    "Candidates Hired": None,
    "Actively Hiring": None,
    "URL": None,
    "Company Reviews": [],
    "Company Registration": None,
    "Company_Domain_Of_Work": []
}


# ============================================================
# Scam Risk Weights
#
# IMPORTANT:
# These weights represent how strongly evidence from a field
# should influence scam-risk reasoning.
#
# They are NOT probabilities.
# They do NOT mean that the field itself is suspicious.
# ============================================================

SCAM_RISK_WEIGHTS = {

    "Job Title": 4,
    "Company": 10,
    "Posting ID": 5,
    "Location": 5,
    "Work Mode": 6,
    "Office Days": 2,
    "Start Date": 3,
    "Duration": 3,
    "Stipend": 7,
    "Salary": 9,
    "Apply By": 5,
    "Skills Required": 5,
    "Job Description": 10,
    "Who Can Apply": 6,
    "Other Requirements": 8,
    "Perks": 5,
    "Number of Openings": 6,
    "Job Offer / PPO": 7,
    "Company Description": 7,
    "Company Website": 10,
    "Company Platform Profile": 9,
    "Hiring Since": 4,
    "Opportunities Posted": 4,
    "Candidates Hired": 5,
    "Actively Hiring": 5,
    "URL": 10,
    "Company Reviews": 9,
    "Company Registration": 10,
    "Company_Domain_Of_Work": 6
}


# ============================================================
# Explicit Scam Indicators
#
# NOTE: This includes both the original generic fraud
# indicators (payment requests, fake checks, task scams,
# impersonation, etc.) AND the newer post-hire / process-based
# indicators (paid fake training, role bait-and-switch,
# unpaid "evaluation project" then ghosting). The model should
# detect ANY of these, not just the newer ones.
# ============================================================

SCAM_INDICATOR_SCHEMA = {

    # --- Financial / upfront-payment scams ---
    "Upfront_Payment_Required": None,
    "Recruitment_Fee": None,
    "Training_Fee": None,
    "Equipment_Payment": None,
    "Security_Deposit": None,
    "Crypto_Payment": None,
    "Bank_Transfer_Required": None,
    "Personal_Financial_Info_Requested": None,
    "Identity_Documents_Requested": None,

    # --- Paid "training" / fake certification scams ---
    "Paid_Training_Or_Course_Required": None,
    "Certification_Fee_Required": None,
    "Mandatory_Third_Party_Course_Required": None,

    # --- Unrealistic offer signals ---
    "Unrealistic_Salary": None,
    "Easy_Work_High_Pay": None,
    "Guaranteed_Income": None,
    "Guaranteed_Job": None,

    # --- Process red flags ---
    "No_Interview": None,
    "Direct_Joining": None,
    "Urgency_Pressure": None,
    "Unsolicited_Contact": None,

    # --- Contact / channel red flags ---
    "WhatsApp_Telegram_Contact": None,
    "Personal_Email_Used": None,

    # --- Identity / domain red flags ---
    "Company_Impersonation_Suspected": None,
    "Suspicious_Domain": None,

    # --- Classic job-scam archetypes ---
    "Fake_Check_Indicator": None,
    "Task_Scam_Indicator": None,
    "Money_Transfer_Job": None,
    "Package_Reshipping_Job": None,
    "Referral_Recruitment_Scheme": None,

    # --- Unpaid "evaluation project" / ghosting pattern ---
    "Unpaid_Full_Project_As_Evaluation": None,
    "Task_Then_No_Response_Reported": None,

    # --- Bait-and-switch role change pattern ---
    "Bait_And_Switch_Role_Change_Reported": None,
    "Vague_Or_Shifting_Job_Description": None,
}


# ============================================================
# Scam Indicator Weights
# ============================================================

SCAM_INDICATOR_WEIGHTS = {

    "Upfront_Payment_Required": 10,
    "Recruitment_Fee": 10,
    "Training_Fee": 9,
    "Equipment_Payment": 10,
    "Security_Deposit": 10,
    "Crypto_Payment": 10,

    "Bank_Transfer_Required": 10,
    "Personal_Financial_Info_Requested": 10,
    "Identity_Documents_Requested": 8,

    "Paid_Training_Or_Course_Required": 10,
    "Certification_Fee_Required": 10,
    "Mandatory_Third_Party_Course_Required": 9,

    "Unrealistic_Salary": 9,
    "Easy_Work_High_Pay": 9,
    "Guaranteed_Income": 9,
    "Guaranteed_Job": 9,

    "No_Interview": 9,
    "Direct_Joining": 9,
    "Urgency_Pressure": 7,
    "Unsolicited_Contact": 7,

    "WhatsApp_Telegram_Contact": 7,
    "Personal_Email_Used": 8,

    "Company_Impersonation_Suspected": 10,
    "Suspicious_Domain": 10,

    "Fake_Check_Indicator": 10,
    "Task_Scam_Indicator": 10,
    "Money_Transfer_Job": 10,
    "Package_Reshipping_Job": 10,
    "Referral_Recruitment_Scheme": 8,

    "Unpaid_Full_Project_As_Evaluation": 8,
    "Task_Then_No_Response_Reported": 9,

    "Bait_And_Switch_Role_Change_Reported": 9,
    "Vague_Or_Shifting_Job_Description": 4,
}


# ============================================================
# Helper: Ollama Chat
# ============================================================

def call_ollama_chat(user_prompt, timeout=None):
    # Fail quickly when the provider cannot be reached; allow a longer read
    # window for cloud model generation. Requests accepts (connect, read) timeouts.
    connect_timeout = max(3, float(os.getenv("OLLAMA_CONNECT_TIMEOUT_SECONDS", "10")))
    read_timeout = max(15, float(os.getenv("OLLAMA_READ_TIMEOUT_SECONDS", "90")))
    request_timeout = timeout if isinstance(timeout, tuple) else (connect_timeout, read_timeout)


    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        "stream": False,
        "format": "json",
        "think": False,
        "options": {"num_predict": MAX_OUTPUT_TOKENS}
    }

    try:

        response = HTTP.post(
            OLLAMA_CHAT_URL,
            headers=HEADERS,
            json=payload,
            timeout=request_timeout
        )

    except requests.RequestException as e:

        print(
            f"Ollama request failed: {e}",
            file=sys.stderr
        )

        raise SystemExit(1)


    if response.status_code != 200:

        print(
            "Ollama chat request failed.",
            file=sys.stderr
        )

        print(
            "Status:",
            response.status_code,
            file=sys.stderr
        )

        print(
            "Response:",
            response.text,
            file=sys.stderr
        )

        raise SystemExit(1)


    try:

        data = response.json()

    except json.JSONDecodeError:

        print(
            "Ollama returned invalid HTTP JSON:",
            file=sys.stderr
        )

        print(
            response.text,
            file=sys.stderr
        )

        raise SystemExit(1)


    try:

        return data["message"]["content"]

    except KeyError:

        print(
            "Unexpected Ollama response:",
            file=sys.stderr
        )

        print(
            json.dumps(
                data,
                indent=4,
                ensure_ascii=False
            ),
            file=sys.stderr
        )

        raise SystemExit(1)


# ============================================================
# Helper: Parse Model JSON
# ============================================================

def parse_model_json(content, label="model"):
    content = content.strip()

    # Remove Markdown code fences if the model added them
    if content.startswith("```json"):
        content = content[7:]
    elif content.startswith("```"):
        content = content[3:]

    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    try:
        return json.loads(content)

    except json.JSONDecodeError:
        print(
            f"\n{label} did NOT return valid JSON.",
            file=sys.stderr
        )

        print(
            "\nRaw response:",
            file=sys.stderr
        )

        print(
            content,
            file=sys.stderr
        )

        raise SystemExit(1)


# ============================================================
# 1. Open job page with Playwright
# ============================================================

print(
    "Opening job page...",
    file=sys.stderr
)


with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=True
    )

    page = browser.new_page()

    page.goto(
        URL,
        wait_until="domcontentloaded",
        timeout=45000
    )

    # Give dynamic content time to load
    page.wait_for_timeout(1500)

    print(
        f"Page: {page.title()}",
        file=sys.stderr
    )

    job_posting_detail = page.locator(
        "body"
    ).inner_text()

    # Capture hrefs too (plain inner_text strips all links,
    # which we need for fields like "Company Platform Profile")
    links = page.eval_on_selector_all(
        "a[href]",
        "els => els.map(e => ({text: e.innerText.trim(), href: e.href}))"
    )

    browser.close()


# ============================================================
# 2. Create clean input for LLM
# ============================================================

links_text = "\n".join(
    f"- {l['text']}: {l['href']}"
    for l in links
    if l.get("text")
)

job_text = f"""
JOB POSTING DETAIL:
{job_posting_detail[:30000]}

LINKS FOUND ON PAGE:
{links_text[:12000]}
"""


# ============================================================
# 3. Prompt for Initial Structured Extraction
# ============================================================

prompt = f"""

You are a job-data extraction system.

Your task is to convert the supplied job posting into
structured JSON.

Return ONLY valid JSON.

Do not use Markdown.
Do not use ```json.
Do not add explanations before or after the JSON.

The JSON must contain EXACTLY these fields:

{json.dumps(EXTRACTION_SCHEMA, indent=4)}


IMPORTANT RULES:

1. Extract information ONLY from the supplied job posting.

2. NEVER invent information.

3. If information is not present, use null.

4. "Skills Required" MUST be an array of strings.

5. "Perks" MUST be an array of strings.

6. Extract ALL explicitly mentioned technical and
   non-technical skills.

7. Do NOT use a predefined skill list.

   Skills can be any technology, framework, tool,
   programming language, methodology, domain skill,
   software, platform, or professional skill.

8. Look throughout the entire job description for skills,
   especially sections such as:

   - Skills
   - Mandatory Skills
   - Required Skills
   - Requirements
   - Qualifications
   - Responsibilities
   - Experience

9. Remove duplicate skills.

10. "Salary" means normal employee compensation.

11. "Stipend" means internship/trainee stipend.

12. NEVER put normal salary into "Stipend".

13. Example:

   "₹30,000 - ₹40,000 a month"

   under Pay should go into "Salary", not "Stipend".

14. "Work Mode" should describe whether the work is:

   - Remote
   - Hybrid
   - In person
   - On-site

   only when supported by the source.

15. "Office Days" should only be populated if the
    posting explicitly specifies a number or schedule
    of office days.

16. Extract the complete job description into
    "Job Description".

17. "Company Description" should contain the company's
    description/about section if present.

18. "Who Can Apply" should contain eligibility information
    if explicitly provided.

19. "Other Requirements" should contain requirements that
    do not fit naturally into the skills field.

20. "Job Offer / PPO" should only be populated if the
    posting explicitly mentions PPO, pre-placement offer,
    or a full-time conversion offer.

21. "Number of Openings" should only be populated if
    explicitly stated.

22. Do not confuse job posting age with "Hiring Since".

23. Only populate "Hiring Since" if the source explicitly
    provides that information.

24. Do not estimate "Opportunities Posted".

25. Do not estimate "Candidates Hired".

26. Do not assume that an employer is "Actively Hiring"
    merely because the job exists.

27. Preserve the original meaning and values.

28. The output must be valid JSON.

29. "Company Platform Profile" should contain the URL of the
    company's profile page on the hiring platform itself
    (e.g. an Internshala/Naukri/LinkedIn employer page),
    found in "LINKS FOUND ON PAGE". Do NOT use the company's
    own official website for this field — that goes in
    "Company Website".

30. If the posting asks candidates to build/develop a
    complete project, app, feature, or deliverable as part
    of a "selection process", "evaluation", "assignment",
    or "task round" — especially with no clear payment or
    stipend mentioned for that specific work — capture this
    verbatim (or closely paraphrased) into
    "Other Requirements".

31. If the posting mentions any paid course, paid
    certification, paid "training program", or third-party
    learning platform that the candidate must pay for or
    enroll in as a condition of the internship/job, capture
    this verbatim (or closely paraphrased) into
    "Other Requirements".

32. If the described day-to-day responsibilities appear
    inconsistent with the stated Job Title (e.g. title says
    "Graphic Design Intern" but responsibilities are mostly
    sales, cold-calling, or unrelated work), note this
    mismatch explicitly in "Other Requirements".

JOB POSTING:

{job_text}

"""


print(
    "Sending job to Ollama for extraction...",
    file=sys.stderr
)


extraction_content = call_ollama_chat(prompt)

structured_job = parse_model_json(
    extraction_content,
    label="Extraction model"
)

structured_job["URL"] = URL


print(
    "Initial extraction completed.",
    file=sys.stderr
)


# ============================================================
# 4. Ollama Web Search
# ============================================================

def ollama_web_search(query, max_results=5):

    payload = {
        "query": query
    }

    try:

        response = requests.post(
            OLLAMA_WEB_SEARCH_URL,
            headers=HEADERS,
            json=payload,
            timeout=60
        )

    except requests.RequestException as e:

        print(
            f"Web search request failed for '{query}': {e}",
            file=sys.stderr
        )

        return []


    if response.status_code != 200:

        print(
            f"Web search failed for '{query}': "
            f"{response.status_code} {response.text}",
            file=sys.stderr
        )

        return []


    try:

        data = response.json()

    except json.JSONDecodeError:

        print(
            f"Web search returned invalid JSON for '{query}'",
            file=sys.stderr
        )

        return []


    results = data.get(
        "results",
        []
    )[:max_results]

    return results


# ============================================================
# 5. Format Search Results
# ============================================================

def format_search_results(label, results):

    if not results:

        return (
            f"[{label}]\n"
            "No results found.\n"
        )


    lines = [
        f"[{label}]"
    ]


    for r in results:

        title = r.get(
            "title",
            ""
        )

        url = r.get(
            "url",
            ""
        )

        content = (
            r.get(
                "content",
                ""
            ) or ""
        )[:800]


        lines.append(
            f"- Title: {title}\n"
            f"  URL: {url}\n"
            f"  Snippet: {content}"
        )


    return (
        "\n".join(lines)
        + "\n"
    )


# ============================================================
# 6. Company Enrichment
# ============================================================

company_name = structured_job.get(
    "Company"
)
job_title_for_search = structured_job.get("Job Title") or ""


search_blocks = []
company_research_sources = []


if company_name:

    search_queries = {

        "Official Website":
            f"{company_name} official website",

        "Company Reviews":
            f"{company_name} employee reviews "
            f"Glassdoor AmbitionBox",

        "Glassdoor employee reviews":
            f'site:glassdoor.com/Reviews "{company_name}" employee reviews',

        "AmbitionBox employee reviews":
            f'site:ambitionbox.com/reviews "{company_name}" employee reviews',

        "Company Registration":
            f'site:tracxn.com OR site:falconebiz.com '
            f'"{company_name}" CIN registration details',

        "Business Domain / Industry":
            f"{company_name} industry sector "
            f"what does the company do",

        "Platform Profile":
            f"{company_name} internshala OR naukri OR "
            f"linkedin company page",

        # Targeted search for the specific scam patterns we
        # care about: paid fake training, ghosting after an
        # "evaluation" task, and role bait-and-switch.
        "Scam Complaints":
            f'"{company_name}" scam OR fraud OR fake '
            f'"paid training" OR "paid certification" OR '
            f'"joining fee" OR "equipment fee" OR '
            f'"salary withheld" review complaint',

        "Hiring Process Complaints":
            f'"{company_name}" interview OR assessment OR assignment '
            f'ghosted OR "no response" OR "unpaid task" OR '
            f'"changed my role" OR "different role" OR bait-and-switch',

        "Onboarding and Post-Hire Reports":
            f'"{company_name}" onboarding OR joining OR training '
            f'fee OR equipment payment OR fake check OR salary '
            f'withheld OR role changed employee complaint',

        "Specific Job and Careers Verification":
            f'"{company_name}" "{job_title_for_search}" '
            f'official careers job opening'
    }


    print(
        "Running company enrichment searches...",
        file=sys.stderr
    )


    for label, query in search_queries.items():
        print(f"Searching: {query}", file=sys.stderr)

    # These searches do not depend on one another, so run them concurrently.
    with ThreadPoolExecutor(max_workers=min(6, len(search_queries))) as executor:
        search_results = list(executor.map(ollama_web_search, search_queries.values()))

    for (label, _query), results in zip(search_queries.items(), search_results):

        search_blocks.append(
            format_search_results(
                label,
                results
            )
        )

        # Preserve the actual URLs returned by web search so the UI can
        # show clickable evidence links instead of relying on model-made URLs.
        for result in results:
            result_url = str(result.get("url", "")).strip()
            if not result_url.startswith(("https://", "http://")):
                continue
            result_host = (urlparse(result_url).hostname or "").lower().removeprefix("www.")
            if label == "Glassdoor employee reviews" and result_host != "glassdoor.com":
                continue
            if label == "AmbitionBox employee reviews" and result_host != "ambitionbox.com":
                continue
            company_research_sources.append({
                "category": label,
                "title": str(result.get("title", "")).strip()[:300],
                "url": result_url,
                "snippet": str(result.get("content", "") or "").strip()[:800],
            })


else:

    print(
        "No company name extracted - "
        "skipping web search enrichment.",
        file=sys.stderr
    )


# ============================================================
# 7. Company Enrichment Schema
# ============================================================

enrichment_schema = {

    "Company Website": None,

    "Company Reviews": [],

    "Company Registration": None,

    "Company_Domain_Of_Work": [],

    # Fallback source if the posting page itself did not
    # expose a platform-profile link.
    "Company Platform Profile": None,

    # Structured complaint signals specifically about the
    # scam patterns we're targeting (paid fake training,
    # unpaid-project-then-ghosting, role bait-and-switch),
    # plus any other fraud complaints found.
    "Scam_Pattern_Reports": []
}


if company_name and search_blocks:

    search_text = "\n".join(
        search_blocks
    )


    enrichment_prompt = f"""

You are a company-research assistant.

You are given web search results about a company called:

"{company_name}"


Using ONLY the information present in the search results below,
fill in the following JSON fields:

{json.dumps(enrichment_schema, indent=4)}


RULES:

1. Use ONLY information found in the search results provided.

2. Do not use outside or prior knowledge about the company.

3. If a field cannot be confidently determined from the
   search results, set it to null or [].

4. "Company Website" must be the company's own official
   domain, not a job board, review site, or news article.

5. "Company Reviews" must be an array of short strings,
   each summarizing one distinct review, rating, or
   reputation signal found in the search results.

6. Include the source name if mentioned.

7. "Company Registration" should include legal or
   registration identifiers such as:

   - CIN
   - GST number
   - Incorporation information
   - Registered entity name

   only if explicitly present.

8. "Company_Domain_Of_Work" must be an array of short
   strings describing industries, sectors, or domains.

9. "Company Platform Profile" must be a URL to the
   company's profile page on a job/hiring platform
   (Internshala, Naukri, LinkedIn, etc.) found in the
   search results — NOT their own corporate website.

10. "Scam_Pattern_Reports" must be an array of short strings,
    each describing ONE specific complaint pattern found in
    the search results — for example:

    - "Multiple reviewers report being asked to pay for a
      'mandatory certification course' before joining."
    - "A reviewer reported the company assigned a full
      project for evaluation and then stopped responding."
    - "A reviewer reported being hired for one role and then
      assigned completely different work after joining."

    Only include entries describing a SPECIFIC pattern from
    a specific source/context. Do NOT include generic
    negative sentiment (e.g. "bad management", "long hours")
    — this field is only for financial scams, ghosting after
    a task, bait-and-switch role changes, or similar fraud
    patterns.

11. NEVER invent information.

12. Return ONLY valid JSON.

13. No Markdown.

14. No explanations before or after the JSON.


SEARCH RESULTS:

{search_text}

"""


    print(
        "Sending company research to Ollama...",
        file=sys.stderr
    )


    enrichment_content = call_ollama_chat(
        enrichment_prompt
    )


    enrichment_data = parse_model_json(
        enrichment_content,
        label="Enrichment model"
    )


else:

    enrichment_data = enrichment_schema


# ============================================================
# 8. Merge Enrichment
# ============================================================

def merge_enrichment(
    base_job,
    enrichment
):

    for field in enrichment_schema.keys():

        new_value = enrichment.get(
            field
        )

        if new_value in (
            None,
            [],
            ""
        ):

            continue

        # Don't let the enrichment step overwrite a
        # platform-profile link that was already found
        # directly on the page (Fix 1 takes priority over
        # the web-search fallback, Fix 2).
        if field == "Company Platform Profile" and base_job.get(field):
            continue

        base_job[field] = new_value


    return base_job


structured_job = merge_enrichment(
    structured_job,
    enrichment_data
)

# Real search-result sources, categorized and de-duplicated for the UI.
seen_source_urls = set()
unique_company_sources = []
for source in company_research_sources:
    normalized_url = source["url"].rstrip("/").lower()
    if normalized_url in seen_source_urls:
        continue
    seen_source_urls.add(normalized_url)
    unique_company_sources.append(source)
structured_job["Company Research Sources"] = unique_company_sources
structured_job["Company Research Status"] = "search_attempted" if company_name else "skipped_no_company_name"
structured_job["Company Review Search Status"] = "search_attempted" if company_name else "skipped_no_company_name"


# ============================================================
# 9. Scam Risk Analysis
# ============================================================

print(
    "Running scam-risk analysis...",
    file=sys.stderr
)


scam_analysis_prompt = f"""

You are a job scam risk analysis system.

You must analyze the supplied job information and identify
evidence that increases or decreases the likelihood that the
job or company is fraudulent.

You must detect the FULL RANGE of common job/internship scam
patterns — not only one type. This includes (but is not
limited to):

- Classic upfront-payment scams (recruitment fees, security
  deposits, equipment payments, crypto payments).

- Paid "training" or paid certification scams, where a
  candidate is told they must pay for a course, certification,
  or third-party training program as a condition of getting
  or keeping the internship/job.

- Unpaid "evaluation project" scams, where a candidate is
  asked to build a full project, app, or deliverable as part
  of a "selection process" and the company then stops
  responding (ghosting) after the work is submitted.

- Bait-and-switch role changes, where the candidate is hired
  for one role/title and then assigned different work after
  joining, or the job description is vague/shifting in a way
  that suggests the real role differs from what was posted.

- Other classic patterns: fake checks, money-transfer jobs,
  package-reshipping jobs, referral/pyramid recruitment
  schemes, guaranteed income/job claims, no-interview direct
  joining, urgency pressure, unsolicited contact, contact via
  WhatsApp/Telegram only, personal (non-corporate) email used
  for official communication, company impersonation, and
  suspicious domains.

You MUST reason using the supplied fields and weights.

IMPORTANT:

The weights represent the strength with which evidence from
a field SHOULD influence scam-risk reasoning.

They are NOT probabilities.

A weight of 10 does NOT mean a field is always suspicious.

A missing field is NOT automatically suspicious.

Do not treat Remote, high salary, limited reviews, or a young
company as proof of fraud by themselves.

You must consider multiple independent signals.

Use evidence rather than assumptions.

Do NOT invent evidence.

When an indicator is not supported by the available
information, set its value to null.

When an indicator is clearly supported, set its value to true.

When the available evidence clearly indicates the indicator
does not exist, set it to false.

Evidence for "Paid_Training_Or_Course_Required",
"Certification_Fee_Required", and
"Mandatory_Third_Party_Course_Required" should generally come
from the job posting text itself (e.g. "Other Requirements",
"Job Description") — set these to true only if the posting
explicitly mentions candidates paying for training,
certification, or a course as a condition of the role.

Evidence for "Unpaid_Full_Project_As_Evaluation" can come from
the job posting text (an explicit ask to build a full
project/deliverable as part of selection, with no mention of
payment) and/or from "Scam_Pattern_Reports".

Evidence for "Task_Then_No_Response_Reported" and
"Bait_And_Switch_Role_Change_Reported" can ONLY reasonably
come from "Scam_Pattern_Reports", since these are post-hire
behaviors that cannot be observed in the posting itself.

Treat "Scam_Pattern_Reports" evidence as weaker than evidence
found directly in the job posting, since reviews can be
outdated, biased, exaggerated, or fabricated. A single
unverified complaint should raise risk_level by at most one
tier (e.g. LOW -> MEDIUM), not push it directly to HIGH or
CRITICAL, unless multiple independent reports describe the
same specific pattern, or the pattern is corroborated by
something in the posting itself.


============================================================
FIELD SCAM-RISK WEIGHTS
============================================================

{json.dumps(SCAM_RISK_WEIGHTS, indent=4)}


============================================================
EXPLICIT SCAM INDICATOR WEIGHTS
============================================================

{json.dumps(SCAM_INDICATOR_WEIGHTS, indent=4)}


============================================================
EXPLICIT SCAM INDICATORS
============================================================

{json.dumps(SCAM_INDICATOR_SCHEMA, indent=4)}


============================================================
SCORING GUIDANCE
============================================================

Use the weights as evidence strength.

Consider:

- severity of the indicator
- reliability of the evidence
- number of independent indicators
- whether indicators reinforce one another
- whether evidence comes from the actual job posting
- whether company information can be independently verified

Do NOT simply add every weight together.

Do NOT produce a high score solely because the company
has little online presence.

Do NOT produce a high score solely because the job is remote.

Do NOT produce a high score solely because the salary is high.

Strong indicators such as:

- requesting money from applicants
- recruitment fees
- security deposits
- equipment payment
- cryptocurrency payment
- financial information requests
- paid training/certification required
- task scams
- money-transfer jobs
- package reshipping
- company impersonation
- suspicious domains
- fake checks
- guaranteed jobs/income combined with suspicious conditions
- corroborated reports of ghosting after an evaluation task
- corroborated reports of role bait-and-switch

should have much stronger influence than weak contextual signals.

============================================================
RISK LEVEL GUIDANCE
============================================================

LOW:
Little or no meaningful evidence of scam behavior.

MEDIUM:
Some suspicious signals exist, but the evidence is not
strong enough to conclude that the opportunity is probably
fraudulent.

HIGH:
Multiple meaningful scam indicators exist or one extremely
strong indicator is present.

CRITICAL:
There is extremely strong evidence of fraud, such as
requests for payment/crypto, fake-check behavior, money
transfer schemes, task scams, or strong evidence of
impersonation.


============================================================
OUTPUT FORMAT
============================================================

Return ONLY valid JSON.

The output must have EXACTLY this structure:

{{
    "scam_risk_score": 0,
    "risk_level": "LOW",
    "confidence": 0.0,
    "company_job_fit": {{"status": "unknown", "evidence": ""}},
    "triggered_indicators": [
        {{
            "indicator": "",
            "weight": 0,
            "evidence": ""
        }}
    ],
    "positive_legitimacy_signals": [],
    "verification": {{
        "company_exists": null,
        "official_domain_verified": null,
        "job_found_on_official_careers_page": null,
        "registration_verified": null
    }},
    "reasoning_summary": "",
    "decision": "APPLY"
}}


============================================================
RULES FOR OUTPUT
============================================================

1. scam_risk_score must be an integer from 0 to 100.

2. risk_level must be one of:

   LOW
   MEDIUM
   HIGH
   CRITICAL

3. confidence must be between 0 and 1.

4. triggered_indicators must contain ONLY indicators
   supported by evidence.

5. Every triggered indicator must include concise evidence,
   and should note whether that evidence came from the job
   posting itself or from external reports/reviews.

6. Do not fabricate evidence.

7. positive_legitimacy_signals should contain evidence
   supporting legitimacy, with at most four concise items.

8. verification fields should be null when they cannot
   be established.

9. company_job_fit.status must be "match", "mismatch", or
   "unknown". Use mismatch only when the supplied company
   business-profile evidence clearly conflicts with the job
   function. Missing or weak evidence means unknown. Cite
   both the business and job evidence in the evidence field.

9. "decision" must be one of:

   APPLY
   APPLY_WITH_CAUTION
   DO_NOT_APPLY

10. DO_NOT_APPLY should generally be used for HIGH or
    CRITICAL risk, especially when strong fraud indicators
    exist.

11. APPLY_WITH_CAUTION should generally be used for
    MEDIUM risk.

12. APPLY can generally be used for LOW risk when there
    are no major unresolved concerns.

13. The risk score is a risk assessment, NOT proof of fraud.

14. reasoning_summary must be at most two short sentences.

15. triggered_indicators should include only distinct,
    evidence-backed findings. Do not repeat the same signal
    under different names.

14. Do not claim certainty that a company is fraudulent
    unless the provided evidence directly supports that
    conclusion.


============================================================
JOB INFORMATION
============================================================

{json.dumps(structured_job, indent=4, ensure_ascii=False)}

"""


scam_analysis_content = call_ollama_chat(
    scam_analysis_prompt,
    timeout=None
)


scam_analysis = parse_model_json(
    scam_analysis_content,
    label="Scam analysis model"
)


# ============================================================
# 10. Final Result
# ============================================================

final_result = {

    "job": structured_job,

    "scam_analysis": scam_analysis
}


# ============================================================
# 11. Return the result to Node
# ============================================================
# ============================================================
# SEND FINAL JSON TO NODE
#
# IMPORTANT:
# stdout contains ONLY machine-readable JSON.
# All logs above were sent to stderr.
# ============================================================

print(
    json.dumps(
        final_result,
        ensure_ascii=False
    )
)
