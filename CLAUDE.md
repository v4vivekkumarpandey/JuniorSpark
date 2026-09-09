# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # Run ESLint
```

There are no tests in this project.

## Environment Variables

Create `.env.local` with:
- `GEMINI_API_KEY` — Gemini AI API key (referenced in README, not actively used in current code)
- `GMAIL_USER` — Gmail address used as SMTP sender for booking emails
- `GMAIL_APP_PASSWORD` — Gmail App Password (not the account password) for SMTP auth
- `ADMIN_EMAIL` — Booking notification recipient (defaults to `juniorspark2026@gmail.com`)

## Architecture

This is a **Next.js 15 / React 19 marketing site** for JuniorSpark, an online English tutoring service for kids in India. It uses the App Router with all pages under `app/`.

**Pages:**
- `/` (`app/page.tsx`) — Full single-page marketing site (hero, stats, curriculum tabs, pricing, testimonials, FAQs). All content is hardcoded inline as arrays/objects; no CMS.
- `/book-demo` (`app/book-demo/page.tsx`) — 3-step booking form (age group → date/time → contact info). Uses `react-hook-form` + `zod` for validation. On submit, POSTs to the API route and redirects to `/thank-you`.
- `/thank-you`, `/contact`, `/privacy`, `/terms` — Static pages.

**API:**
- `POST /api/send-booking-email` — Sends an admin notification email via Gmail SMTP (nodemailer). The parent confirmation email template is written but commented out.

**Shared components:**
- `components/Navbar.tsx` — Sticky top nav with mobile hamburger menu, links to hash anchors on the homepage.
- `components/Footer.tsx` — Site-wide footer.

**Styling:**
- Tailwind CSS v4 with a custom theme defined in `app/globals.css`. Design tokens:
  - `primary` = `#2b7cee` (blue)
  - `secondary` = `#ffb800` (amber)
  - `accent` = `#f97316` (orange)
  - `background-light` = `#fefeff`
- Font: Lexend (Google Fonts), loaded via `next/font` as `--font-lexend` / `font-display`.

**Key libraries:**
- `motion/react` (Framer Motion v12) — page animations; must be in `transpilePackages` in `next.config.ts`.
- `lucide-react` — icons throughout.
- `date-fns` — date formatting/manipulation in the booking form.
- `nodemailer` — server-side email in the API route.

**Analytics (in `app/layout.tsx`):**
- Facebook Pixel (ID: `1495466888888244`)
- Google Analytics GA4 (ID: `G-P5VDG06N62`)
- Microsoft Clarity (ID: `w38gv4qaul`)

**Next.js config notes:**
- `output: 'standalone'` — built for container deployment.
- ESLint errors are ignored during builds (`ignoreDuringBuilds: true`).
- Only `picsum.photos` is allowed as a remote image host; add other domains to `remotePatterns` if needed.
- HMR is suppressed when `DISABLE_HMR=true` env var is set (used by AI Studio).
