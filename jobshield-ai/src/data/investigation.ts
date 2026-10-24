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

export const investigations: Investigation[] = [
  {
    id: 8402,
    userId: 101,
    company: "ABC Technologies",
    companySlug: "abc-technologies",
    jobTitle: "Software Developer",
    score: 78,
    riskLevel: "High Risk",
    lastUpdated: "Aug 31",
    updates: 4,
    recruiterName: "Rajesh Kumar",
    recruiterEmail: "careers.abc.tech@gmail.com",
    description:
      "This job posting contains several indicators commonly associated with fraudulent recruitment scams.",
    redFlags: [
      {
        title: "Payment Requested",
        description:
          "Recruiter requested a security deposit for equipment before issuing a contract.",
      },
      {
        title: "Unofficial Email Domain",
        description:
          "Communication originated from a generic email address instead of a company domain.",
      },
      {
        title: "Unverifiable Physical Address",
        description:
          "The company headquarters address could not be independently verified.",
      },
    ],
  },
  {
    id: 8403,
    userId: 101,
    company: "TechCorp",
    companySlug: "techcorp",
    jobTitle: "Senior Developer",
    score: 18,
    riskLevel: "Low Risk",
    lastUpdated: "Aug 25",
    updates: 1,
    recruiterName: "Sarah Connor",
    recruiterEmail: "careers@techcorp.example",
    description:
      "The job posting contains relatively few suspicious indicators.",
    redFlags: [],
  },
  {
    id: 8404,
    userId: 101,
    company: "QuickCash Solutions",
    companySlug: "quickcash-solutions",
    jobTitle: "Data Entry Operator",
    score: 94,
    riskLevel: "Critical",
    lastUpdated: "Aug 22",
    updates: 6,
    recruiterName: "Alex Morgan",
    recruiterEmail: "recruitment@quickcash.example",
    description:
      "The investigation identified multiple serious warning signs.",
    redFlags: [
      {
        title: "Unrealistic Salary",
        description:
          "The advertised compensation is significantly higher than typical industry standards.",
      },
      {
        title: "Urgent Payment Request",
        description:
          "The recruiter requested payment before the hiring process could continue.",
      },
    ],
  },
  {
    id: 8405,
    userId: 101,
    company: "GlobalTech",
    companySlug: "globaltech",
    jobTitle: "Marketing Executive",
    score: 56,
    riskLevel: "Medium Risk",
    lastUpdated: "Aug 18",
    updates: 3,
    recruiterName: "Priya Sharma",
    recruiterEmail: "hiring@globaltech.example",
    description:
      "The investigation found some suspicious details that require additional verification.",
    redFlags: [
      {
        title: "Unclear Job Responsibilities",
        description:
          "The job description does not clearly explain the expected responsibilities.",
      },
      {
        title: "Unverified Recruiter",
        description:
          "The recruiter's identity could not be independently confirmed.",
      },
    ],
  },
  {
    id: 8406,
    userId: 101,
    company: "NextWave Digital",
    companySlug: "nextwave-digital",
    jobTitle: "Frontend Developer",
    score: 32,
    riskLevel: "Low Risk",
    lastUpdated: "Aug 15",
    updates: 2,
    recruiterName: "Amit Verma",
    recruiterEmail: "careers@nextwave.example",
    description:
      "The job posting appears relatively consistent, with a few details requiring review.",
    redFlags: [
      {
        title: "Incomplete Company Information",
        description:
          "The job posting provides limited information about the company.",
      },
    ],
  },
  {
    id: 8407,
    userId: 101,
    company: "BrightPath Consulting",
    companySlug: "brightpath-consulting",
    jobTitle: "Business Analyst",
    score: 67,
    riskLevel: "High Risk",
    lastUpdated: "Aug 12",
    updates: 5,
    recruiterName: "Neha Kapoor",
    recruiterEmail: "jobs@brightpath.example",
    description:
      "Several warning signs were identified during the investigation of this opportunity.",
    redFlags: [
      {
        title: "Unusual Interview Process",
        description:
          "The recruiter requested personal information before completing a formal interview.",
      },
      {
        title: "Unclear Employment Terms",
        description:
          "The job posting does not clearly specify the employment arrangement.",
      },
    ],
  },
  {
    id: 8408,
    userId: 101,
    company: "CloudMatrix",
    companySlug: "cloudmatrix",
    jobTitle: "Cloud Engineer",
    score: 24,
    riskLevel: "Low Risk",
    lastUpdated: "Aug 08",
    updates: 1,
    recruiterName: "Rohan Mehta",
    recruiterEmail: "careers@cloudmatrix.example",
    description:
      "The investigation found limited suspicious activity in the submitted job posting.",
    redFlags: [],
  },
  {
    id: 8409,
    userId: 101,
    company: "FastHire Network",
    companySlug: "fasthire-network",
    jobTitle: "Remote Support Specialist",
    score: 88,
    riskLevel: "Critical",
    lastUpdated: "Aug 05",
    updates: 7,
    recruiterName: "Daniel Brooks",
    recruiterEmail: "recruitment@fasthire.example",
    description:
      "The investigation identified multiple serious warning signs associated with the recruitment opportunity.",
    redFlags: [
      {
        title: "Advance Fee Requested",
        description:
          "The recruiter requested an upfront fee before the candidate could begin employment.",
      },
      {
        title: "Urgent Hiring Pressure",
        description:
          "The candidate was pressured to accept the offer immediately.",
      },
      {
        title: "Suspicious Contact Details",
        description:
          "The provided contact information could not be independently verified.",
      },
    ],
  },
  {
    id: 8410,
    userId: 101,
    company: "Innovate Labs",
    companySlug: "innovate-labs",
    jobTitle: "Backend Developer",
    score: 45,
    riskLevel: "Medium Risk",
    lastUpdated: "Aug 02",
    updates: 2,
    recruiterName: "Karan Singh",
    recruiterEmail: "hiring@innovatelabs.example",
    description:
      "The job posting contains some inconsistencies that should be reviewed before proceeding.",
    redFlags: [
      {
        title: "Inconsistent Job Details",
        description:
          "The responsibilities and required qualifications do not fully match.",
      },
    ],
  },
  {
    id: 8411,
    userId: 101,
    company: "PrimeWorks Solutions",
    companySlug: "primeworks-solutions",
    jobTitle: "HR Executive",
    score: 72,
    riskLevel: "High Risk",
    lastUpdated: "Jul 29",
    updates: 4,
    recruiterName: "Meera Joshi",
    recruiterEmail: "careers@primeworks.example",
    description:
      "The investigation identified several details that warrant careful verification.",
    redFlags: [
      {
        title: "Unverified Company Details",
        description:
          "The company information provided in the job posting could not be fully confirmed.",
      },
      {
        title: "Request for Sensitive Information",
        description:
          "The recruiter requested sensitive personal information at an early stage of recruitment.",
      },
    ],
  },
];