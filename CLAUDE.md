# Code's Desktop: portfolio

Personal bio site for Stephen Ntale, aka "Code crafter": entrepreneur, startup founder at Codevertex, UI/UX designer and AI developer working in ecommerce, based in Kampala, Uganda. It is a bio and showcase, not a job-search portfolio: no résumé, no experience log, no contact form.

## Current state
Next.js 16 (App Router) + Tailwind v4, statically exported and deployed to GitHub Pages at https://ntalestephen.github.io/portifolio/ by `.github/workflows/deploy.yml` on every push to `main`.

- `code-desktop.html` is the original single-file prototype, kept for reference only.
- Content lives in `content/` (`site.ts` for name, email and links; `projects.ts` for the work list). Images live in `content/assets/` and are imported statically so they pick up the Pages base path.
- Local dev: `npm run dev`. To test the Pages build, set `NEXT_PUBLIC_BASE_PATH=/portifolio` and serve `out/` under `/portifolio/`.

## Design concept
The site opens with a black-and-white **intro** (`components/Intro.tsx`) on every load: a Porsche (the photo, mirrored so it drives left to right) crosses the screen on a road line and the line "Working towards my Porsche funding." is written in its wake, then the desktop opens. A frame loop locks the text mask to the car's tail. Skipped only for reduced motion (`.no-intro` is set before first paint in `app/layout.tsx`).

Then it is a macOS-style desktop you travel through by scrolling. Each section is a pinned "station":

1. **Desktop (hero).** Floating windows, stickers and notes. Mouse parallax (`data-depth`), hover tilt (`.tilt`), and items fly outward on scroll (`data-dx`/`data-dy`).
2. **Folder dive.** The "Selected work" folder moves to the centre, scales up, the front flap opens, the paper rises, and the view zooms in.
3. **Finder.** A tunnel of frames zooms out, then a Cover Flow carousel and a Finder list. Scroll position drives the active project; clicking the active project opens its live site (currently Soko, getsoko.co) in a new tab.
4. **About.** Zoom-in entrance, word-by-word text reveal, polaroid photo.

Every "Say hello" button (menu bar, hero, dock, footer) opens `ContactSheet`: WhatsApp (`wa.me`, number in `content/site.ts`) or email.

Persistent chrome:
- Menu bar whose title changes per station, with a live clock in Africa/Kampala.
- Dock with magnification and a scroll progress bar.
- Wallpaper tint that changes per section, plus a wallpaper switcher.

The scroll engine is `lib/engine.ts`. Each station registers a frame callback with `useFrame()`; the engine runs them all in one `requestAnimationFrame` and they write styles straight to the DOM (no React state per frame). Stations read their progress (0 to 1) with `progressOf()`. Stages overlap with `margin-top: -100svh` so transitions are seamless. `<Engine />` must render last in `app/page.tsx`.

## Tokens
- **Colours:** desk `#F3F6FB`, ink `#1E2330`, accent `#3157E8`, note `#FDF0A6`. Section tints are blue, peach, lilac and pink. Defined in `@theme` in `app/globals.css`.
- **Fonts:** Inter Tight (display), Inter (body), JetBrains Mono (labels and code), Caveat (handwritten notes), Instrument Serif italic (single accent word), loaded with `next/font`.

## Rules to keep
- Respect `prefers-reduced-motion`: the `.calm` class unpins every stage.
- Below 860px wide, the `.compact` class unpins the About section.
- No horizontal scroll at phone width. The hero re-lays out below 1100px, below 720px, and on short screens (`max-height:560px`); check phone, tablet and landscape after changing it.
- Static export has no intercepting routes, API routes or server actions. Anything that needs a server (a contact form) has to use an external service.
- Internal links and `history` URLs must respect `NEXT_PUBLIC_BASE_PATH` (use `next/link` and static image imports).

## Next steps
1. More projects: add entries to `content/projects.ts` with a logo and a screenshot. The Finder and Cover Flow already handle several; add a filter bar back if the list grows.
2. Open Graph preview image and a custom domain (then clear `NEXT_PUBLIC_BASE_PATH` in the workflow and update `NEXT_PUBLIC_SITE_URL`).
