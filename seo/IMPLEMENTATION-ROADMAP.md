# Implementation Roadmap — Sondr Designs
**Generated:** 2026-08-20  
**Timeline:** 12 months  
**Team:** 3 people (content + dev time is limited — roadmap is realistic for a working studio)

---

## Phase 1 — Foundation (Weeks 1–4)
**Goal: Fix all critical gaps, index-ready, Google Business set up**

### Week 1: Critical Fixes

- [ ] **Create og-image.png** (1200×630px) and add to `/public/assets/`
  - The layout references this file but it doesn't exist — all social shares are broken without it
- [ ] **Enable Next.js image optimization** in `next.config.js` (remove `unoptimized: true`)
- [ ] **Set up Google Analytics 4** — add measurement ID to layout or via Next.js script tag
- [ ] **Set up Google Search Console** — verify sondrdesigns.com, submit sitemap
- [ ] **Fix heading hierarchy** — HomeScreen CTA section, BlogScreen "coming soon" heading

### Week 2: Google Business Profile

- [ ] Claim / create **Google Business Profile** for Sondr Designs
  - Category: Web Design Company, Graphic Designer
  - Add address, hours (Mon–Thu 10–6), phone, website, description
  - Upload logo and 3–5 office/work photos
- [ ] Submit to **Bing Places** (free, takes 10 mins)
- [ ] Add **Clutch.co** listing (major agency discovery platform)

### Week 3: Service Pages (Dev)

Build `/services/web-design` and `/services/brand-identity` (see SITE-STRUCTURE.md for content spec):
- [ ] Create `app/services/web-design/page.jsx` with full metadata
- [ ] Create `app/services/brand-identity/page.jsx` with full metadata
- [ ] Add `Service` schema to each via JSON-LD script tag
- [ ] Add both pages to `sitemap.xml`
- [ ] Internal link from homepage service list items to these pages

**Content minimum per service page (800 words):**
- Value proposition
- What's included / deliverables
- Process overview (3 steps)
- 2–3 case study thumbnails linking to case study pages
- FAQ (3–5 questions)
- CTA

### Week 4: First Two Case Study Pages (Dev + Content)

- [ ] Build `/work/[slug]` dynamic route in Next.js App Router
- [ ] Create case study pages for **KHM Tutoring** and **LNC Food** first (strongest content)
- [ ] Add `Article` schema + `Review` schema (if client quote obtained)
- [ ] Internal link from `/works` grid to these detail pages
- [ ] Update sitemap with new URLs

**Content per case study (1,000 words):**
- Challenge + approach + outcome + metric + client quote
- 3–4 screenshots or process images
- Linked to primary service page

---

## Phase 2 — Expansion (Weeks 5–12)
**Goal: Content flywheel running, all live portfolio projects have detail pages**

### Weeks 5–6: Blog Infrastructure

- [ ] Build `/blog/[slug]` dynamic route with proper `BlogPosting` schema
- [ ] Add author bio component with photo, name, role, LinkedIn link
- [ ] Add `Person` schema for each author
- [ ] Publish **first 2 blog posts** (see CONTENT-CALENDAR.md — posts #1 and #2)
- [ ] Set up RSS feed (Next.js can auto-generate)

### Weeks 7–8: Remaining Case Studies

- [ ] `/work/tennis-keiki-hawaii`
- [ ] `/work/pando-surgical`
- [ ] `/work/blend`
- [ ] All added to sitemap, internally linked

### Weeks 9–10: Team Bio Pages

- [ ] Build `/studio/[slug]` dynamic route
- [ ] Create pages for Aizen, Toshio, and Joseph
- [ ] Add `Person` schema with `sameAs` LinkedIn URLs
- [ ] Add `ProfilePage` schema
- [ ] Link from /studio team section to individual pages

### Weeks 11–12: Process Page + Citations

- [ ] Create `/process` page — "From sketch to launch" (900+ words)
- [ ] Submit to **10 local directories**:
  - Hawaii Business Directory
  - Yelp
  - Houzz (for interior dept.)
  - DesignRush
  - Clutch (review request from clients)
  - Yellow Pages Hawaii
  - Chamber of Commerce Hawaii
  - BBB
  - Alignable
  - Thumbtack

### Blog: Publish 6 posts total by end of Phase 2
Use posts #1–6 from CONTENT-CALENDAR.md.

---

## Phase 3 — Scale (Weeks 13–24)
**Goal: Industry vertical pages, 16 blog posts live, local authority established**

### Weeks 13–16: Industry Vertical Pages

- [ ] `/industries/restaurants-and-cafes` — anchor: Pai Café + LNC Food
- [ ] `/industries/education` — anchor: KHM Tutoring
- [ ] `/industries/healthcare` — anchor: Pando Surgical
- [ ] Add to sitemap, internally link from relevant case studies

### Weeks 17–20: FAQ + Schema Expansion

- [ ] Create `/faq` page (target: featured snippet for "how much does a website cost in hawaii")
- [ ] Add `FAQPage` schema to /faq
- [ ] Add `BreadcrumbList` schema to all pages
- [ ] Update `hasOfferCatalog` in homepage schema to link to service pages

### Weeks 21–24: Interior Dept. Launch

- [ ] Build out `/interior` (or `/services/interior-design`) with real content
- [ ] Add to Google Business Profile: Interior Designer category
- [ ] Create `/work/[slug]` pages for 4AS and Pai Café (when those projects launch)
- [ ] Submit Houzz listing with interior work photos

### Blog: Publish posts #7–16 by end of Phase 3

---

## Phase 4 — Authority (Months 7–12)
**Goal: Domain authority building, thought leadership, AI search visibility**

### Link Building

- [ ] **Client footer credits**: Ensure each live client site has "Design by Sondr Designs" with a link
  - Tennis Keiki Hawaii, Pando Surgical, LNC Food, KHM Tutoring, Blend
- [ ] **Hawaii press pitch**: Draft a studio profile story for Honolulu Magazine or Pacific Business News
- [ ] **Guest posts**: Pitch 2 posts to industry blogs (Smashing Magazine, CSS-Tricks, or similar)
- [ ] **Clutch reviews**: Request reviews from all 5 live clients (target: 5+ reviews)

### AI Search / GEO Optimization

- [ ] Create `/llms.txt` in public root with studio description and key services
- [ ] Audit all case studies: ensure each contains a citable, specific metric
- [ ] Add `speakable` schema to homepage and service pages
- [ ] Monitor brand mentions in ChatGPT, Perplexity, Google AI Overviews

### Content Scaling

- [ ] Publish posts #17–24 from content calendar
- [ ] Publish first **"original research" post**: survey of Hawaii small business websites (link-earning asset)
- [ ] Begin **updating older posts** with fresh data and expanded sections

### Analytics Review (Monthly)

Run these checks every month:
- [ ] Search Console: top queries, click-through rates, index coverage
- [ ] GA4: organic traffic by page, conversion rate (contact form), bounce rate
- [ ] Ahrefs/Semrush (even free tier): ranking progress for target keywords
- [ ] Core Web Vitals: LCP, INP, CLS via GSC or PageSpeed Insights

---

## Dependency Map

```
Week 1 fixes (og-image, GSC) 
    → unlocks proper social sharing + search console data

Service pages (Week 3)
    → unlocks internal linking from homepage
    → unlocks blog post links to services

Case study pages (Week 4+)
    → unlocks internal linking from works grid
    → unlocks industry vertical pages (need 2+ case studies per vertical)

Blog infrastructure (Week 5–6)
    → unlocks content calendar execution
    → unlocks author E-E-A-T signals

Team bio pages (Weeks 9–10)
    → unlocks Person schema / entity authority
    → unlocks author bylines on blog posts

Industry pages (Weeks 13–16)
    → requires case study pages to exist (internal linking)
    → requires 2+ case studies per vertical
```

---

## Resource Requirements

| Phase | Dev Time | Content Time | External Cost |
|-------|----------|-------------|---------------|
| Phase 1 | 12–16 hrs | 8–10 hrs (2 case studies) | $0 (Clutch free) |
| Phase 2 | 16–20 hrs | 20–24 hrs (6 posts + 3 case studies) | $0–$50 (directories) |
| Phase 3 | 8–12 hrs | 20–24 hrs (10 posts + verticals) | $0 |
| Phase 4 | 4–8 hrs | 16–20 hrs (8 posts + research) | $100–$200 (press outreach) |
| **Total** | **40–56 hrs dev** | **64–78 hrs content** | **~$200** |

At 2 blog posts/month and one team member spending ~3–4 hrs per post, this is manageable alongside client work.

---

## Quick Wins Checklist (Do This Week)

- [ ] Create and upload `og-image.png` to `/public/assets/`
- [ ] Verify sondrdesigns.com in Google Search Console and submit sitemap
- [ ] Set up Google Business Profile
- [ ] Remove `unoptimized: true` from next.config.js
- [ ] Write and publish Blog Post #1 ("Why we start on paper")
