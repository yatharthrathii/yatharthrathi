# yatharthrathi.vercel.app

My portfolio site. Who I am, what I have built, and how to reach me.

Live: [yatharthrathi.vercel.app](https://yatharthrathi.vercel.app)

## What is on it

- **Hero:** my portrait rendered as about 5,000 particles. The left half is colour tiles (frontend), the right half is monospace glyphs (backend). Push tiles across the divider and they turn into code; click to scatter and rebuild. Written by hand on a 2D canvas, no particle library.
- **A working request:** the button on the frontend side sends a request across the portrait's API line, and the terminal on the backend side logs how it is handled.
- **Experience and education**, with client names kept private.
- **Projects:** two cards on the home page, each opening a full case study at `/projects/<slug>` with its own contents list and social preview image.
- **Skills** laid out as layers of a stack, and a contact section.

## Stack

- Next.js 16 (App Router, Turbopack, fully static) and React 19
- TypeScript 7 for `tsc`, with the TypeScript 6 API alongside it for ESLint ([the side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/))
- Tailwind CSS 4, with the design tokens in `src/app/globals.css`
- Scroll reveals use CSS scroll-driven animations (`animation-timeline: view()`), so content is visible even without JavaScript
- Lenis for smooth scrolling
- `next/font` for Playfair Display, Sora and JetBrains Mono; `next/og` for the social preview image

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

There is no backend and no environment file. GitHub Actions runs lint, typecheck and a build on every pull request and on pushes to `main`.

## Editing content

- Home page copy (hero, jobs, education, skills) lives in `src/content/site.ts`.
- Everything about a project, its home page card and its case study, lives in `src/content/projects.ts`. Every figure there comes from the project's own repository, so change it there first.
- Project screenshots are in `public/images/projects/`.
- The portrait is `public/images/yatharth.webp`: a cut-out with a transparent background, 4:5. Replace it and the particles are regenerated in the browser from the new photo.
- The resume button appears on the live site once `public/Yatharth-Rathi-Resume.pdf` exists. In `npm run dev` it always shows, so the layout can be checked before the PDF is there.
- Page views are counted with Vercel Web Analytics (cookieless). It only loads on Vercel, and needs Web Analytics switched on in the project there.

## Contact

[yatharthmaheshwari01@gmail.com](mailto:yatharthmaheshwari01@gmail.com) · [LinkedIn](https://linkedin.com/in/yatharthrathii) · [GitHub](https://github.com/yatharthrathii)
