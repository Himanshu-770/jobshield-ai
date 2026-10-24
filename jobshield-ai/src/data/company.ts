export type CompanyReport = {
  jobTitle: string;
  riskScore: number;
  riskLevel: string;
  reportedDate: string;
  status: string;
};

export type CompanyRedFlag = {
  title: string;
  description: string;
};

export type CompanyTimelineEvent = {
  date: string;
  title: string;
  description: string;
  color: string;
};

export type Company = {
  id: number;
  name: string;
  website: string;
  domain: string;
  industry: string;
  location: string;
  founded: string;
  verificationStatus: string;

  totalInvestigations: number;
  averageRiskScore: number;
  scamReports: number;
  positiveReports: number;
  lastReported: string;

  commonRedFlags: CompanyRedFlag[];
  previousReports: CompanyReport[];
  timeline: CompanyTimelineEvent[];
};

export const companies: Company[] = [
  {
    id: 1,
    name: "Apex Global Tech",
    website: "https://apexglobaltech.com",
    domain: "apexglobaltech.com",
    industry: "Information Technology",
    location: "Bengaluru, India",
    founded: "2018",
    verificationStatus: "Needs Review",

    totalInvestigations: 42,
    averageRiskScore: 76,
    scamReports: 28,
    positiveReports: 14,
    lastReported: "Sep 1, 2026",

    commonRedFlags: [
      {
        title: "Upfront payment requested",
        description:
          "Several reports mention requests for security deposits, registration fees, or equipment payments.",
      },
      {
        title: "Unofficial recruiter email",
        description:
          "Multiple reports mention communication through free email providers instead of a company domain.",
      },
      {
        title: "Unverifiable company address",
        description:
          "Some users were unable to independently verify the company's listed physical address.",
      },
      {
        title: "Urgent application pressure",
        description:
          "Reported messages used high-pressure language and asked candidates to act immediately.",
      },
    ],

    previousReports: [
      {
        jobTitle: "Software Developer",
        riskScore: 78,
        riskLevel: "High Risk",
        reportedDate: "Aug 31, 2026",
        status: "Needs Review",
      },
      {
        jobTitle: "Data Entry Operator",
        riskScore: 91,
        riskLevel: "Critical",
        reportedDate: "Aug 25, 2026",
        status: "High Concern",
      },
      {
        jobTitle: "HR Executive",
        riskScore: 64,
        riskLevel: "High Risk",
        reportedDate: "Aug 18, 2026",
        status: "Needs Review",
      },
      {
        jobTitle: "Frontend Developer",
        riskScore: 32,
        riskLevel: "Low Risk",
        reportedDate: "Aug 10, 2026",
        status: "Lower Concern",
      },
    ],

    timeline: [
      {
        date: "Sep 1, 2026",
        title: "High-risk report received",
        description:
          "A user reported suspicious payment-related communication from a recruiter.",
        color: "bg-red-500",
      },
      {
        date: "Aug 25, 2026",
        title: "Multiple reports detected",
        description:
          "The company received additional reports involving upfront payment requests.",
        color: "bg-orange-500",
      },
      {
        date: "Aug 10, 2026",
        title: "Company profile created",
        description:
          "The company was added to the JobShield AI company database.",
        color: "bg-blue-500",
      },
    ],
  },
];