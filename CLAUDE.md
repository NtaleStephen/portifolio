# Code's Desktop: portfolio

Personal portfolio for Stephen Ntale ("Code"), a computer science student at KIU and a founder building software for African SMEs.

## Current state
`code-desktop.html` is a working single-file prototype: plain HTML, CSS and vanilla JS, with no build step. Open it in a browser to see it.

All placeholder content (projects, experience, skills, email) lives in the `CONFIG` object at the top of the `<script>`.

## Design concept
The site is a macOS-style desktop you travel through by scrolling. Each section is a pinned "station":

1. **Desktop (hero).** Floating windows, stickers and notes. Mouse parallax (`data-depth`), hover tilt (`.tilt`), and items fly outward on scroll (`data-dx`/`data-dy`).
2. **Folder dive.** The "Selected work" folder moves to the centre, scales up, the front flap opens, the paper rises, and the view zooms in.
3. **Finder.** A tunnel of frames zooms out, then a Cover Flow carousel and a Finder list. Scroll position drives the active project, and clicking the active project opens the case-study sheet.
4. **About.** Zoom-in entrance, word-by-word text reveal, polaroid photo.
5. **Experience log.** Sticky left column and a timeline whose fill line follows scroll.
6. **Contact.** Email-composer form (not connected yet).

Persistent chrome:
- Menu bar whose title changes per station, with a live clock in Africa/Kampala.
- Dock with magnification and a scroll progress bar.
- Wallpaper tint that changes per section, plus a wallpaper switcher.

The scroll engine is `render()`. It reads each stage's progress (0 to 1) with `progressOf()` and applies transforms. Stages overlap with `margin-top: -100svh` so transitions are seamless.

## Tokens
- **Colours:** desk `#F3F6FB`, ink `#1E2330`, accent `#3157E8`, note `#FDF0A6`. Section tints are blue, peach, lilac and pink.
- **Fonts:** Inter Tight (display), Inter (body), JetBrains Mono (labels and code), Caveat (handwritten notes), Instrument Serif italic (single accent word).

## Rules to keep
- Respect `prefers-reduced-motion`: the `.calm` class unpins every stage.
- Below 860px wide, the `.compact` class unpins the About section.
- No horizontal scroll at phone width.

## Next steps
1. Port to Next.js (App Router) + Tailwind:
   - Components: `Menubar`, `Dock`, `Desktop`, `Folder`, `Finder`/`CoverFlow`, `About`, `ExperienceLog`, `Contact`, `CaseStudy`.
   - Content goes in `content/` data files.
   - Case studies become real routes at `/projects/[slug]`.
2. Replace the placeholders with real content, real screenshots (`next/image`) and a real portrait.
3. Wire the contact form (Resend or Formspree).
4. Deploy on Vercel with proper metadata: Open Graph tags and a canonical URL on the correct domain.
