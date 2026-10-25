# Sandra – Portfolio (Next.js + TypeScript)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Edit all text in `src/data/content.ts`. Photos live in `public/images/`.
Deploy for free on Vercel: push to GitHub and import the repo.

### Premium portfolio stack

The home hero implements the supplied tech-and-design brief while retaining Sandra's transparent portrait and portfolio content.

- React, Next.js, and TypeScript provide the application structure.
- Tailwind CSS is configured through `postcss.config.mjs`. Theme and utility layers are imported in `src/app/globals.css`; the existing CSS reset is retained.
- The homepage uses hero preview 01 (Orbital), with a shared portrait scene and 3D controls. The Hero-to-About wrapper uses scoped GSAP ScrollTrigger animations.
- `src/components/HeroShowcase.tsx` presents all eight projects in a CSS 3D ring. Drag horizontally, swipe, use arrow buttons, or focus the stage and press Left/Right. Home returns to the first project. Reduced-motion mode presents one card without 3D rotation.
- The hero portrait is an optimized transparent WebP (800px, approximately 116KB); the original PNG is retained.
- Projects use measured horizontal scrolling on tall desktop screens and a card grid on mobile, short screens, and reduced-motion settings.

The brief names Figma as a design tool but supplies no Figma file or 3D model. The interactive scene is implemented directly in CSS and React, with no additional model download or WebGL runtime.

Run `npm run build` for production validation. No credentials or external services are required for the portfolio interactions.

### Project details

Each project has a statically generated page at `/projects/[slug]`, with its description, capabilities, stack, live website when supplied, contact link, and next-project navigation. Edit the stable `slug` and `features` fields in `src/data/content.ts` to maintain these pages. Both the main project cards and the active hero carousel item link to details. The hero portrait is mirrored with CSS to face the introduction.

### Interactive skills

`src/components/Skills.tsx` replaces the skills list previously inside About. The four existing skill categories form a CSS 3D cube. Drag/swipe or use Left/Right keys, category buttons, or previous/next buttons to rotate it. Home returns to the first face. Technology buttons show a brief explanation, and selections are remembered per category. Skill content comes from `src/data/content.ts`; explanations live in the component. Reduced-motion mode switches categories without rotation. Vertical touch scrolling remains available, and the scene uses no WebGL renderer or model downloads.

### Hero-to-About parallax

`src/components/ui/parallax-scrolling.tsx` wraps the existing Hero and About sections. Scoped GSAP ScrollTrigger animations move them at different speeds during the transition. Desktop gets a stronger depth effect; mobile uses smaller movement. Reduced-motion mode keeps the normal document layout. No landscape, extra content section, scroll pinning, or global smooth-scroll controller is added. Animation cleanup only affects this wrapper. The `@/components/ui` alias resolves to `src/components/ui`; global styles remain in `src/app/globals.css`. TypeScript, Tailwind, and GSAP are already installed.

### Ten hero previews

Visit `/hero-previews` (also linked in the homepage footer) to compare ten live hero concepts: Orbital, Type playground, Glass studio, After dark, Developer mode, In motion, Work in layers, Soft signal, The blueprint, and Two perspectives. Pickers and previous/next buttons switch the active design; only one scene runs at a time. Move the mouse to interact, or focus the preview and use arrow keys/Home. Terminal replay, project shuffle, and the portrait comparison slider provide additional controls. Pause motion freezes ambient animation and pointer effects; operating-system reduced-motion preferences are respected. The homepage uses the selected Orbital concept (01). Components live in `src/components/HeroPreviewGallery.tsx`, with styles scoped to `src/app/hero-previews/previews.css`.

The hero previews also include a shared 3D scene rig (`src/components/InteractiveHeroScene.tsx`): drag/swipe to rotate, arrow-key rotation, 360° spin, spread/stack layers, an energy pulse, adjustable perspective depth, and reset. Floating CSS cubes and gyroscope rings provide ambient depth. The controls remain outside the rotating scene. Pause and reduced-motion settings disable the rig's motion and decorative geometry; the scene controls require no new dependencies.

### Selected homepage hero

Preview 01, Orbital, is applied in `src/components/Hero.tsx`. `OrbitalPortrait.tsx` and `InteractiveHeroScene.tsx` share the same visual and controls with the gallery. Each has shared styles alongside the component, while `orbital-hero.css` handles the full-size homepage layout. The homepage includes mouse parallax, drag/touch and keyboard rotation, spin, layer spread, pulse, depth, reset, and pause. The existing Hero-to-About transition remains in place.
