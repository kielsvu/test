# JHNER Portfolio — Setup Guide

## Quick Start

```bash
npm install
cp .env.example .env.local  # Fill in your Supabase credentials
npm run dev
```

## GitHub Pages Deploy

1. In `next.config.ts`, uncomment and set `basePath` if your repo is NOT `username.github.io`:
   ```ts
   basePath: '/your-repo-name',
   ```
2. Build the static export:
   ```bash
   npm run build
   ```
3. The `out/` folder is your deployable site.
4. Push `out/` to your `gh-pages` branch, or use GitHub Actions.

## Customise Your Info

| File | What to update |
|------|----------------|
| `src/app/layout.tsx` | SEO title, description, your domain |
| `src/components/sections/Hero.tsx` | Typing texts array, description |
| `src/components/sections/About.tsx` | Bio paragraphs, primary stack chips |
| `src/components/sections/contact/ContactForm.tsx` | `SOCIALS` array — replace `YOUR_USERNAME` links |
| `public/assets/jhner-cv.pdf` | Drop your CV PDF here |
| `public/assets/bandd.png` | Replace with your ID card image for the 3D lanyard |
| `next.config.ts` | Set `basePath` for your GitHub Pages repo name |

## Connect a Form Handler

In `ContactForm.tsx`, the submit handler has a comment with Formspree instructions.
Swap in your Formspree form ID (free tier works fine).

## Supabase Tables Required

```
projects      — id, title, description, image_url, live_url, github_url, tech_stack, features, category
certificates  — id, title, issuer, date, credential_url
tech_stack    — id, name, category, icon_url
comments      — id, name, message, image_url, attachment_url, likes, is_pinned, created_at
```

## Settings Panel

Accessible via the gear icon in the navbar. Settings are saved to localStorage automatically.
- Theme: Dark / Light
- Accent: Purple, Blue, Green, Rose, Cyan
- Animations: On / Off
- Animation Intensity: Full / Balanced / Subtle / Off
- Background Effects: On / Off (also disables the 3D band card)
- Glass Effects: On / Off
