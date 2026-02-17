# Hari Ram S — Portfolio

Neon‑glass, minimal, and fast portfolio built with Vite + React, featuring an interactive hero sandbox, console‑style About, iconographic Skills, a graphic Timeline, and a playful Easter egg.

## Live

- Deployed on Netlify (clean URLs, SPA fallback).
- Public assets (images, PDFs) served from /public.

## Features

### Interactive hero sandbox
- Idle particles that react to hover/touch.
- Secret Easter egg: tap/click the hero sandbox 10 times to reveal a spinning oii.ai cat that fades out.
- Pointer trails: neon orbs gently float and fade along the cursor path.

### Bio + Skills
- Bio with gradient text, profile photo slot with neon glow.
- Skills grouped as:
  - Programming Languages (Devicon logos only, no text).
  - Tools & Frameworks (Devicon logos, custom SVG for Vite).
  - Core Skills (lucide-react icons).
- Instant custom tooltips that follow the cursor.

### Timeline
- Horizontally scrollable, drag‑to‑pan, and wheel/trackpad scrolling (no scrollbar dragging needed).
- Each milestone shows brand coin, title, short description, date, and quick actions (Credential / Open PDF / GitHub).
- Mobile‑friendly (swipe to scroll).

### About console
- Type commands like “bio” or “about” to print the Bio.
- Easily extendable with commands like “skills”.

### Theming and aesthetics
- Neon/cyan/violet accents on a dark canvas.
- Subtle glows, rings, and motion with sensible defaults.

## Tech stack

- React + Vite
- Tailwind‑style utility classes (lightweight CSS)
- lucide-react for system icons
- Devicon (CDN) for language/tool logos
- tsparticles for the hero particle sandbox

## Project structure (key files)

- src/components/Hero.jsx — right‑panel particles, Easter egg overlay, pointer trails
- src/components/BioSkills.jsx — bio, grouped skills with icons/logos
- src/components/Timeline.jsx — horizontal timeline with wheel + drag scrolling
- src/data/profile.js — BIO, skills, labels, groups
- src/data/timeline.js — certifications and projects (brand, dates, links, asset paths)
- public/brands/* — brand logos for timeline cards
- public/certs/* — PDFs/PNGs for credentials
- public/media/oiiai-cat.gif — Easter egg asset
- netlify.toml — build/publish settings + SPA fallback
- index.html — favicon and meta tags
