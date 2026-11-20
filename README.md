# Anouar Ech-Charai — Portfolio

A Next.js / React portfolio inspired by the supplied paper-collage reference. The application uses TypeScript, Tailwind CSS, a shadcn-style Button, React Bits, and a custom laptop-dive studio. It is isolated from the hotel applications.

## Interactive studio

The home section adapts the supplied Laptop Dive choreography to Anouar's existing paper, gold, and photographic identity. The laptop is built with CSS perspective and moves from an angled developer screen into a front-facing project gallery. A suspended developer badge drops in, sways, and responds to hover or tap. Project tickets and descriptions enter and exit with the screen transitions.

- Enter with **portfolio**, the scroll hint, wheel down, swipe up/left, or an arrow/PageDown key.
- Use the next/previous buttons, click the laptop screen, swipe, or use arrow keys to change cases. After the last case, scrolling/swiping forward, pressing a forward key, or choosing **continue to about** exits the gallery and scrolls to About Me. Previous on the first case returns to the studio.
- **my studio**, the centre monogram, and Escape return to the hero.
- **Explore the full portfolio**, **about me**, **let's talk**, and **Read the project notes** leave the scene and scroll to the corresponding existing section. The scene does not lock the rest of the document.
- Ambient motion can be paused. Reduced-motion preferences remove movement and settle transitions immediately; ambient animations pause offscreen or in a hidden tab.

This is a code-rendered adaptation, not the reference's AI camera film or a pixel-identical Haldoren replica. The three screen previews are labelled illustrations of Anouar's projects, not recordings of the live products. No external reference video or uploaded collage MP4 is used.

## Run

From this directory:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. If the preview already occupies that port, stop that process before starting the development server.

Production preview:

```sh
npm run check
npm run build
npm start
```

The build exports to `out/`. `npm start` serves this export. `postbuild` also updates the root preview HTML and chunk symlink for the previously running preview server. Set `PORT` to use a different production preview port.

## Edit

- `app/page.tsx`: page copy and section layout.
- `app/data.ts`: projects, navigation, skills and icons.
- `components/portfolio-motion.tsx`: animation placement and interactions.
- `components/laptop-experience.tsx`: home scene, project previews, gesture/keyboard navigation, and transition state.
- `app/laptop-experience.css`: perspective camera move, badge, tickets, preview artwork, and responsive/reduced-motion layouts.
- `components/react-bits/`: supplied animation source and associated CSS.
- `style.css` and `app/motion.css`: collage design, responsive layout and motion overrides.
- `public/assets/`: local images and icons.

The supplied animation components remain JSX; application integration is TypeScript. They load client-side to avoid server/browser rendering mismatches. The studio replaces the earlier hero grid and rotating profession; their reusable components remain in source. See `ANIMATION_CHECKLIST.md` for verification and adaptive behavior.

## Content notes

- Two portraits edited from user-supplied photos are integrated into About and the personal editorial section. WebP files in `public/assets/` keep delivery lightweight.
- Project previews are illustrative; the e-commerce project is labeled as a concept.
- Contact prepares an email in the visitor's mail application. There is no sending backend.
- `/cv.html` is a printable CV, not a downloaded copy of the original PDF.
- Fonts load from Google Fonts with local fallbacks. Other visual assets are local.
- No analytics or private credentials are included.
- `legacy-index.html` and `app.js` preserve the earlier static implementation; they are not the active Next.js application.
# portfolio-V2
