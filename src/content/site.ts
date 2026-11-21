// The copy for the home page lives here; projects are in ./projects.ts. Client names are deliberately never used.

export const site = {
  name: "Yatharth Rathi",
  role: "Full-stack engineer",
  location: "India",
  url: "https://yatharthrathi.vercel.app",
  description:
    "Yatharth Rathi is a full-stack engineer who builds product interfaces and the systems behind them: booking funnels, supplier integrations and background jobs. TypeScript, NestJS, Next.js, PostgreSQL, React Native.",
  email: "yatharthmaheshwari01@gmail.com",
  resume: "/Yatharth-Rathi-Resume.pdf",
  currently: "Associate Software Engineer at Codevibe Technology",
  links: {
    github: "https://github.com/yatharthrathii",
    linkedin: "https://www.linkedin.com/in/yatharthrathii",
    x: "https://x.com/yatharthrathiii",
  },
} as const;

export const hero = {
  frontend: {
    label: "Frontend",
    title: "Interfaces",
    body: "I love building UI people enjoy using: booking funnels, dashboards and design systems that feel fast.",
    stack: ["Next.js", "React", "TanStack Query", "Tailwind", "React Native"],
  },
  backend: {
    label: "Backend",
    title: "systems",
    body: "APIs, supplier integrations and background jobs that say so when something breaks, instead of failing silently.",
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "Zod"],
  },
  facts: [
    "Open to full-stack & backend roles",
    "Associate Software Engineer at Codevibe Technology",
    "~1 year in production · ex-Team Lead",
  ],
} as const;

export type Role = {
  title: string;
  /** Set on the role when one employer covers more than one kind of employment. */
  kind?: string;
  /** Year-month, e.g. "2026-04". No end means the role is current. */
  start: string;
  end?: string;
  badge?: string;
  groups: { heading?: string; points: string[] }[];
  stack?: string;
};

export type Employer = {
  org: string;
  location: string;
  /** Employment type, when every role here shares it. */
  kind?: string;
  /** Newest role first, like LinkedIn. */
  roles: Role[];
};

export const employers: Employer[] = [
  {
    org: "Codevibe Technology",
    location: "Gurugram",
    roles: [
      {
        title: "Associate Software Engineer",
        kind: "Full-time",
        start: "2026-11",
        badge: "Intern to full-time",
        groups: [
          {
            points: ["Joined full-time after a seven-month internship, continuing on the same booking platforms."],
          },
        ],
      },
      {
        title: "Full Stack Developer Intern",
        kind: "Internship",
        start: "2026-04",
        end: "2026-10",
        groups: [
          {
            heading: "Consumer flight & hotel booking platform",
            points: [
              "Built the flight and hotel booking funnels end to end, from search to seats, meals, travellers, payment and confirmation.",
              "Integrated GDS supplier APIs in NestJS for live search, pricing, fare rules, booking, ticketing and status.",
              "Designed booking and seat holds, full and partial cancellation, and abandoned-booking recovery over WhatsApp and email.",
              "Built the admin bookings module, and moved passenger validation into shared Zod rules used by client and server.",
            ],
          },
          {
            heading: "B2B group-travel platform",
            points: ["Built the website CMS and the branding and access-control settings behind it."],
          },
        ],
        stack: "TypeScript · NestJS · Prisma · PostgreSQL · Redis · Next.js · TanStack Query · Zod · Jest · Vitest",
      },
    ],
  },
  {
    org: "Medzzapp by NirveonX",
    location: "Hyderabad · Remote",
    kind: "Internship",
    roles: [
      {
        title: "Team Lead, Mobile",
        start: "2025-12",
        end: "2026-02",
        badge: "Promoted after 3 months",
        groups: [
          {
            points: [
              "Interviewed and hired four developers for the mobile team, then led them day to day.",
              "Owned the app's technical direction: component structure, state patterns and API conventions.",
              "Shipped an LLM-powered chatbot for health queries and live map-based delivery tracking.",
            ],
          },
        ],
      },
      {
        title: "Mobile Developer Intern",
        start: "2025-09",
        end: "2025-11",
        groups: [
          {
            points: [
              "Built a multi-role React Native app for patients, delivery partners and medical stores, including prescription upload, ordering and JWT auth.",
            ],
          },
        ],
        stack: "React Native · Expo · TypeScript · Redux Toolkit",
      },
    ],
  },
];

export const education = [
  {
    when: "2024 – 2025",
    degree: "Frontend development course",
    school: "Sharpener",
  },
  {
    when: "2020 – 2024",
    degree: "B.Tech, Computer Science",
    school: "Shri Ram Institute of Technology",
  },
] as const;

/** The degree, for structured data. */
export const degree = education[1];

// Ordered the way a request travels: from the screen, through the API, down to the data.
export const stack = [
  { layer: "Interface", note: "daily", tone: "coral", items: ["Next.js App Router", "React", "TanStack Query", "Tailwind CSS", "shadcn/ui", "Design systems"] },
  { layer: "API", note: "daily", tone: "ink", items: ["TypeScript", "Node.js", "NestJS", "REST", "Zod contracts"] },
  { layer: "Data", note: "daily", tone: "leaf", items: ["PostgreSQL", "Prisma", "Redis", "Scheduled jobs"] },
  { layer: "Mobile", note: "shipped", tone: "ink", items: ["React Native", "Expo", "Redux Toolkit", "Kotlin", "Jetpack Compose"] },
  { layer: "Quality", note: "daily", tone: "ink", items: ["Jest", "Vitest", "Playwright", "Docker", "GitHub Actions"] },
] as const;

export const principles = [
  { title: "Foundations before frameworks.", body: "Strong JavaScript turns every new library into a few days of reading, not months of guessing." },
  { title: "Failures should be visible.", body: "An empty list and a failed request must never look the same, to the user or to the team." },
  { title: "One source of truth.", body: "If the client and the server can disagree about a rule, eventually they will. Share it instead." },
] as const;
