// The copy for the home page lives here. Client names are deliberately never used.

export const site = {
  name: "Yatharth Rathi",
  role: "Full-stack engineer",
  location: "India",
  url: "https://yatharthrathi.vercel.app",
  description:
    "Yatharth Rathi is a full-stack engineer who builds product interfaces and the systems behind them: booking funnels, supplier integrations and background jobs. TypeScript, NestJS, Next.js, PostgreSQL, React Native.",
  email: "yatharthmaheshwari01@gmail.com",
  resume: "/Yatharth-Rathi-Resume.pdf",
  currently: "Software Engineer at Codevibe Technology",
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
    "Software Engineer at Codevibe Technology",
    "~1 year in production · ex-Team Lead",
  ],
} as const;

export type Role = {
  title: string;
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
  kind?: string;
  /** Newest role first, like LinkedIn. */
  roles: Role[];
};

export const employers: Employer[] = [
  {
    org: "Codevibe Technology",
    location: "Gurugram",
    kind: "Full-time",
    roles: [
      {
        title: "Software Engineer",
        start: "2026-04",
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
    when: "2020 – 2024",
    degree: "B.Tech, Computer Science",
    school: "Shri Ram Institute of Technology",
  },
] as const;

// The project cards on the home page. The long-form write-ups live in ./projects.ts.
export type Project = {
  slug: string;
  name: string;
  kind: string;
  why: string;
  what: string;
  tags: string[];
  live?: string;
  code?: string;
  image: string;
  /** How the card frames the image: a browser window or a phone. */
  frame: "browser" | "phone";
};

export const featuredProjects: Project[] = [
  {
    slug: "recallify",
    name: "Recallify",
    kind: "Web · Full-stack",
    why: "I kept forgetting what I studied a week later.",
    what: "A flashcard app that schedules every card with FSRS and shows its reasoning: each card's forgetting curve, why it is due today, and a model fitted to your own reviews.",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
    live: "https://recallify-five.vercel.app",
    code: "https://github.com/yatharthrathii/Recallify",
    image: "/images/projects/recallify-cover.webp",
    frame: "browser",
  },
  {
    slug: "build-or-break",
    name: "build-or-break",
    kind: "Android · Kotlin",
    why: "One late start used to throw off my whole day.",
    what: "A routine app that recomputes the rest of your day when you run late, and measures whether its alarms actually rang. No account, no server, no internet permission.",
    tags: ["Kotlin", "Jetpack Compose", "Room"],
    code: "https://github.com/yatharthrathii/build-or-break",
    image: "/images/projects/build-or-break-today.webp",
    frame: "phone",
  },
];

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
