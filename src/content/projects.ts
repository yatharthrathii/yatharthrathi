import type { ProjectDetail } from "./project-types";

// Long-form write-ups, one per project page. Every figure here comes from the project's own
// repository (code, tests, README), so update it there first and here second.

const recallify: ProjectDetail = {
  slug: "recallify",
  name: "Recallify",
  kind: "Web · Full-stack",
  tagline: "A flashcard scheduler that shows its work.",
  intro:
    "I kept forgetting what I studied a week later. Spaced repetition fixes that, but every app I tried hid the model: a card appears and you are never told why. Recallify schedules each card with FSRS and puts the reasoning on the screen.",
  meta: [
    { label: "Role", value: "Solo. Design, frontend, backend and deployment" },
    { label: "Timeline", value: "Version 2 built Aug to Sep 2026" },
    { label: "Platform", value: "Web, works offline" },
    { label: "Status", value: "Live" },
  ],
  links: [
    { label: "Open the live site", href: "https://recallify-five.vercel.app", primary: true },
    { label: "Source code", href: "https://github.com/yatharthrathii/Recallify" },
    { label: "API docs", href: "https://recallify-api.vercel.app/docs" },
  ],
  cover: {
    type: "browser",
    src: "/images/projects/recallify-review.webp",
    alt: "A Recallify review card with the reasoning panel open: recall chance 84%, stability 2 days, difficulty 8.2 out of 10, and the interval each rating would give.",
    url: "recallify-five.vercel.app/review",
    width: 1600,
    height: 1000,
  },
  numbers: [
    { value: "FSRS-6", label: "written by hand, with no scheduling library at runtime" },
    { value: "19,000", label: "generated cases checked against the reference implementation, agreeing to six decimal places" },
    { value: "100%", label: "test coverage required on the scheduler and the optimizer" },
    { value: "300+", label: "automated tests: unit, property, integration and end to end" },
  ],
  sections: [
    {
      kind: "prose",
      title: "The problem",
      paragraphs: [
        "Every spaced repetition app has a memory model inside it. Most show you a due count and a button, and keep the model to themselves.",
        "That bothered me as a user and as an engineer. If an app decides I should see a card again in eleven days, I want to know what it thinks my memory looks like, and whether it is right about me.",
        "So the rule for Recallify was simple: the scheduler is visible everywhere, and nothing is claimed that the code does not do.",
      ],
    },
    {
      kind: "features",
      title: "What it does",
      items: [
        {
          title: "The curve of every card",
          text: "Each card has its own forgetting curve, drawn from your actual answers. You can see where it fell, where a review lifted it, and where it is heading.",
        },
        {
          title: "Why this card, today",
          text: "During a review, one key opens the reasoning: the chance you still remember the card right now, how stable the memory is, how hard the card is for you, and the date it drops below your target. Every rating button shows the interval it would produce.",
        },
        {
          title: "What a retention target costs",
          text: "Asking to remember 95% instead of 90% is not free. The settings slider shows the daily reviews each target implies, before you save it.",
        },
        {
          title: "A model fitted to you",
          text: "After 400 reviews, an optimizer fits the model's parameters to your own history and compares them with the defaults side by side. You decide whether to adopt them.",
        },
        {
          title: "Keyboard first, offline too",
          text: "Space reveals, 1 to 4 rates. Answers go into an outbox on the device, so a review session keeps working with no connection and syncs later.",
        },
        {
          title: "AI drafts, you approve",
          text: "Give it a topic or your notes and a language model drafts the cards. Nothing is saved until you approve each one.",
        },
        {
          title: "A demo with real history",
          text: "Try the demo creates a private account with six months of simulated reviews, so the charts have something to show. It is deleted after a day.",
        },
        {
          title: "Built for daily use",
          text: "Ctrl K opens a command palette to jump to any page. Light and dark themes, and a layout that works on a phone.",
        },
      ],
    },
    {
      kind: "gallery",
      title: "On the screen",
      intro: "These are screenshots of the app itself, from an account with a few weeks of history.",
      images: [
        {
          src: "/images/projects/recallify-today.webp",
          alt: "The Today page: 13 cards are due, with streak, recall rate, review count, cards due by deck and a 14-day forecast.",
          caption: "Today. What is due, how long it will take, and what the next two weeks look like.",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/recallify-stats.webp",
          alt: "The Stats page: recall rate, streak and review totals above a one-year heatmap coloured by recall rate.",
          caption: "Stats. Everything is computed on the server from the review log. The heatmap is coloured by how well you recalled that day, not just how much you reviewed.",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/recallify-phone-review.webp",
          alt: "The same review card on a phone, with the four rating buttons at the bottom.",
          caption: "The review screen on a phone. Each button shows when the card would come back.",
          width: 560,
          height: 1212,
          phone: true,
        },
      ],
    },
    {
      kind: "flow",
      title: "How it fits together",
      intro: "One TypeScript monorepo. The scheduler is a single pure module that runs in three places: the browser, the API and the tests.",
      steps: [
        {
          label: "Browser",
          title: "Next.js 16 and React 19",
          text: "Pages, charts and the review screen. The charts are hand-built SVG. The reasoning panel is computed locally with the same scheduler the server runs, so it opens instantly and works offline.",
          tone: "coral",
        },
        {
          label: "Proxy",
          title: "A thin backend for the frontend",
          text: "Tokens live in httpOnly cookies and never reach page scripts. Requests that change data get a same-origin check.",
          tone: "ink",
        },
        {
          label: "API",
          title: "NestJS, one modular monolith",
          text: "Every route is closed unless it is marked public. Request bodies are validated with Zod schemas shared with the client. Errors come back in one format with a request id.",
          tone: "ink",
        },
        {
          label: "Scheduler",
          title: "FSRS-6 in about 720 lines, zero dependencies",
          text: "Given a card's state and a rating, it returns the next state and due date. It is deterministic: the caller passes in the randomness.",
          tone: "ink",
        },
        {
          label: "Data",
          title: "PostgreSQL through Prisma",
          text: "Reviews are an append-only log. The state on each card is a cache, and replaying the log rebuilds it.",
          tone: "leaf",
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions I would defend",
      items: [
        {
          decision: "Write the algorithm by hand. Use the library as the judge.",
          why: "I wanted to be able to explain every number on the screen, so I wrote FSRS-6 from the published formulas. The established library is only a test dependency: 19,000 generated review histories run through both, and the results must agree to six decimal places. Property tests cover the rules that must always hold.",
        },
        {
          decision: "The log is the truth. Card state is a cache.",
          why: "Each review is stored once and never edited, with the memory state before and after. If a card's cached state is ever wrong, replaying the log rebuilds it. It also made offline sync simple: the review id is created on the device, so sending the same answer twice cannot apply it twice.",
        },
        {
          decision: "The optimizer does not promise less studying.",
          why: "On simulated learners, fitting the model cut calibration error from 0.031 to 0.017. A slow forgetter got 27% fewer daily reviews, but a fast forgetter got 48% more. The app shows that comparison before you adopt anything, because a more accurate schedule is the honest goal.",
        },
        {
          decision: "Keep gradient descent out of the browser.",
          why: "Parameter fitting lives in its own package, so the web bundle never ships it. The scheduler is held to a size budget in CI and comes to 7.5 kB compressed.",
        },
        {
          decision: "Refresh tokens rotate, and reuse is treated as theft.",
          why: "Access tokens last fifteen minutes. Refresh tokens are stored only as hashes and replaced on every use. If a revoked one is ever presented again, the whole family is revoked. Passwords are hashed with Argon2id.",
        },
        {
          decision: "A test that passed with the lock deleted.",
          why: "The daily AI allowance is reserved under a row lock, so two requests cannot both spend the last of it. My first race test still passed after I removed the lock, which meant it was testing nothing. I fixed the test first, then the lock.",
        },
      ],
    },
    {
      kind: "list",
      title: "How it is kept honest",
      items: [
        "CI runs five jobs on every push: lint and typecheck with zero warnings, unit tests, integration tests against a real PostgreSQL, end-to-end tests on the production build, and Lighthouse.",
        "The scheduler and the optimizer must stay at 100% test coverage.",
        "Bundle size budgets fail the build: 9 kB for the scheduler and 500 kB for the web client.",
        "Lighthouse scores 100 for accessibility, best practices and SEO. Performance sits at 85 to 87, and that gap is written down rather than hidden.",
        "An uptime check calls the API's health endpoint every 30 minutes.",
      ],
    },
    {
      kind: "stack",
      title: "Stack",
      groups: [
        { label: "Frontend", items: ["Next.js 16", "React 19", "TanStack Query", "Tailwind CSS 4", "Radix UI", "d3-shape"] },
        { label: "Backend", items: ["NestJS 11", "Prisma 6", "PostgreSQL", "Zod", "Argon2id", "JWT"] },
        { label: "Shared", items: ["TypeScript", "pnpm workspaces", "Turborepo"] },
        { label: "Testing", items: ["Vitest", "fast-check", "Supertest", "Playwright", "Lighthouse CI"] },
        { label: "Hosting", items: ["Vercel", "Neon", "GitHub Actions"] },
        { label: "AI", items: ["Groq"] },
      ],
    },
    {
      kind: "list",
      title: "What it does not do yet",
      items: [
        "No import from other apps. Anki and CSV import are planned.",
        "No native app yet. The Android app is in development.",
        "Days are counted in UTC. Per-user time zones come later.",
        "The optimizer needs at least 400 reviews before it will fit anything.",
      ],
    },
  ],
};

const buildOrBreak: ProjectDetail = {
  slug: "build-or-break",
  name: "build-or-break",
  kind: "Android · Kotlin",
  tagline: "A routine app that moves with you when the day goes wrong.",
  intro:
    "One late start used to throw off my whole day. Every routine app I tried assumed the plan would hold. build-or-break recomputes the rest of the day when you run late, and treats an alarm that does not ring as a bug to be measured.",
  meta: [
    { label: "Role", value: "Solo. Design, engineering and testing" },
    { label: "Timeline", value: "Built in Sep 2026" },
    { label: "Platform", value: "Android 8 and up" },
    { label: "Status", value: "In development, no public build yet" },
  ],
  links: [{ label: "Source code", href: "https://github.com/yatharthrathii/build-or-break", primary: true }],
  cover: {
    type: "phones",
    images: [
      {
        src: "/images/projects/build-or-break-today.webp",
        alt: "The Today screen: a progress ring, a Running late button, the next step with Done, Smaller version, Snooze and Skip, and the day's timeline.",
        width: 600,
        height: 1333,
      },
      {
        src: "/images/projects/build-or-break-plan.webp",
        alt: "The Plan screen: nine steps from 6:15 AM to 10:45 PM, some fixed, some pinned, one that follows the gym, and one inside a window.",
        width: 600,
        height: 1333,
      },
    ],
  },
  numbers: [
    { value: "0", label: "network calls. No account, no server, no analytics, no internet permission" },
    { value: "650+", label: "tests, most of them on the plain JVM with no emulator" },
    { value: "4", label: "ways to time a step: fixed, relative, window and interval" },
    { value: "11", label: "Gradle modules, with the engine kept free of Android code" },
  ],
  sections: [
    {
      kind: "prose",
      title: "The problem",
      paragraphs: [
        "A routine is a chain. Wake at 6:15, gym at 6:45, shower fifteen minutes after the gym. Miss the first link and every reminder after it is wrong.",
        "Most routine apps treat each reminder as a separate alarm, so a late morning leaves you with a day of alarms for things you can no longer do on time. I wanted the plan to bend instead of break.",
        "I also wanted alarms I could trust. On Android, whether an alarm rings on time depends on permissions, battery settings and the phone's manufacturer. An app that simply assumes it worked is guessing.",
      ],
    },
    {
      kind: "shift",
      title: "When you run late",
      intro: "Tap Running late and pick 15, 30, 60 or 90 minutes. The rest of today moves, tomorrow does not, and it can be undone.",
      late: "+30 min late",
      rows: [
        { task: "Gym", planned: "6:45", actual: "6:45", tag: "pinned" },
        { task: "Protein and shower", planned: "7:00", actual: "7:00", tag: "follows gym" },
        { task: "Breakfast", planned: "9:00", actual: "9:30" },
        { task: "Lunch and walk", planned: "1:00", actual: "1:00", tag: "pinned" },
        { task: "Evening walk", planned: "6:30", actual: "7:00" },
        { task: "Lights out", planned: "10:45", actual: "11:15" },
      ],
      note: "Pinned steps hold their time, and anything that follows them stays with them. Everything else moves. Times are capped at the end of the day, never wrapped into tomorrow.",
    },
    {
      kind: "features",
      title: "What it does",
      items: [
        {
          title: "Four ways to time a step",
          text: "At a fixed time, a set gap after another step, anywhere inside a window, or on a repeat between two times.",
        },
        {
          title: "A day that recomputes",
          text: "Finish a step late, snooze it, or tap Running late, and everything that depends on it moves. Before you snooze, the alarm screen tells you how many later steps it will push.",
        },
        {
          title: "A smaller version of every step",
          text: "Each step can have a minimum version. On a bad day the smaller one still counts, and the run continues.",
        },
        {
          title: "Paste a plan as text",
          text: "Write the routine in plain text and paste it in. The parser shows what it understood and what it did not. It never drops a line silently.",
        },
        {
          title: "Alarms you can act on",
          text: "Done, smaller version, snooze and skip work straight from the notification, without opening the app. A home-screen widget shows the next step.",
        },
        {
          title: "A weekly review in words",
          text: "Instead of a wall of charts, the app writes what happened this week: whether the plan is too big, a reminder is badly timed, or a step keeps getting skipped.",
        },
        {
          title: "Goals with a pace line",
          text: "Track a number, a count, a duration or consistency. A seven-day average smooths the noise, and a pace line shows whether you will reach the target date.",
        },
        {
          title: "Your data stays on the phone",
          text: "Backup and restore is a JSON file you own. English and Hindi throughout.",
        },
      ],
    },
    {
      kind: "gallery",
      title: "On the screen",
      intro: "Screenshots from the app. The look is deliberate: a printed schedule board, square corners, one signal colour.",
      images: [
        {
          src: "/images/projects/build-or-break-today.webp",
          alt: "The Today screen with the next step, its actions and the day's timeline.",
          caption: "Today. One step at a time, with the four things you can do about it.",
          width: 600,
          height: 1333,
          phone: true,
        },
        {
          src: "/images/projects/build-or-break-plan.webp",
          alt: "The Plan screen listing nine steps with their timing rules.",
          caption: "Plan. Each step says how it is timed: fixed, pinned, after another step, or inside a window.",
          width: 600,
          height: 1333,
          phone: true,
        },
      ],
    },
    {
      kind: "flow",
      title: "How it fits together",
      intro: "The rule behind the whole app: the plan is stored, what happened is stored, and the day is computed. The resolved schedule is never saved, so it can never disagree with the plan.",
      steps: [
        {
          label: "Interface",
          title: "Jetpack Compose, single activity",
          text: "Screens hold no logic. They render what the view model gives them and send events back.",
          tone: "coral",
        },
        {
          label: "Use cases",
          title: "One class per action",
          text: "Complete, snooze, skip, shift the day. Each one settles the step, recomputes the day and reschedules the alarms.",
          tone: "ink",
        },
        {
          label: "Engine",
          title: "Pure Kotlin, no Android imports",
          text: "A nine-step resolver turns the plan and today's history into a timeline. Because it cannot touch Android, its tests run in milliseconds with no emulator.",
          tone: "ink",
        },
        {
          label: "Scheduler",
          title: "Alarms, notifications and the widget",
          text: "The only part that talks to the system. It sits behind interfaces, so the engine never knows how an alarm is delivered.",
          tone: "ink",
        },
        {
          label: "Data",
          title: "Room and DataStore",
          text: "Eighteen tables on the device, with hand-written migrations and no destructive fallback.",
          tone: "leaf",
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions I would defend",
      items: [
        {
          decision: "Never store the resolved day.",
          why: "The timeline is recomputed on every read, from the plan and from what actually happened. It costs a little CPU and removes a whole class of bugs where a saved schedule drifts away from the plan.",
        },
        {
          decision: "The snooze preview runs the real thing twice.",
          why: "To show what a snooze will move, the app resolves the day with and without it and compares the two. The preview cannot disagree with what happens, because it is what happens.",
        },
        {
          decision: "Rescheduling never cancels everything first.",
          why: "Cancelling every alarm and adding them back leaves a moment where an alarm due right then does not exist. Instead each alarm is reconciled one by one, and running it twice changes nothing.",
        },
        {
          decision: "Assume nothing about the phone.",
          why: "Alarm delivery degrades in four tiers, from a full-screen alarm down to in-app only, detected at runtime. A reliability screen names what is blocking the best tier and links to the right setting, including the autostart screens of seven phone makers.",
        },
        {
          decision: "Measure delivery instead of claiming it.",
          why: "Every scheduled alarm writes a row: when it was due, when it fired, and on which device and tier. Late and missed are counted separately, so reliability is a real number.",
        },
        {
          decision: "Survive reboots, updates and clock changes.",
          why: "Alarms are rebuilt after a restart, an app update and any change to the time or time zone. A daily background job and a check on every launch repeat the same work as a backstop.",
        },
      ],
    },
    {
      kind: "list",
      title: "How it is kept honest",
      items: [
        "654 tests across 63 files. The engine's suite is required to stay under one second.",
        "Compiler warnings and lint warnings fail the build.",
        "Static analysis forbids reading the clock directly. Time is injected, so every scheduling test controls it.",
        "CI checks formatting, static analysis, tests, lint and a full build on every push.",
        "Alarm delivery is also tested on a device, including a walkthrough of a whole day.",
      ],
    },
    {
      kind: "stack",
      title: "Stack",
      groups: [
        { label: "Language", items: ["Kotlin 2.2", "Coroutines", "Flow"] },
        { label: "Interface", items: ["Jetpack Compose", "Material 3", "Navigation 3", "Glance widget"] },
        { label: "Storage", items: ["Room", "DataStore"] },
        { label: "System", items: ["AlarmManager", "WorkManager", "Foreground service"] },
        { label: "Architecture", items: ["Hilt", "11 Gradle modules", "Convention plugins"] },
        { label: "Quality", items: ["JUnit 5", "Robolectric", "Turbine", "Detekt", "ktlint"] },
      ],
    },
    {
      kind: "list",
      title: "What does not exist yet",
      items: [
        "There is no public build, so there is nothing to install yet.",
        "Nothing is paid, and the watch-an-ad button is deliberately not wired up.",
        "Multi-week programs are not built.",
        "Android only. iOS has no exact alarm API, and the whole app depends on one.",
      ],
    },
  ],
};

export const projects: ProjectDetail[] = [recallify, buildOrBreak];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
