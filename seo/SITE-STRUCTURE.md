# Site Structure — Sondr Designs
**Generated:** 2026-08-20  
**Current indexed pages:** 6  
**Target (12 months):** 60+

---

## Current Architecture

```
/                           ✅ Live
/works                      ✅ Live (gallery only — no detail pages)
/studio                     ✅ Live (team overview)
/blog                       ✅ Live but empty
/contact                    ✅ Live
/interior                   ⏳ Coming soon
```

---

## Target Architecture (12 months)

```
/                           Homepage
│
├── /services               Services hub
│   ├── /services/web-design           Web Design & Build
│   ├── /services/brand-identity       Brand Identity
│   └── /services/interior-design      Interior Dept.
│
├── /work                   Portfolio hub (current: /works → redirect to /work)
│   ├── /work/tennis-keiki-hawaii
│   ├── /work/pando-surgical
│   ├── /work/lnc-food
│   ├── /work/khm-tutoring
│   ├── /work/blend
│   ├── /work/4as              (when ready)
│   └── /work/pai-cafe         (when ready)
│
├── /studio                 Studio / About
│   ├── /studio/aizen-chung
│   ├── /studio/toshio-nagai
│   └── /studio/joseph-kim
│
├── /blog                   Blog hub
│   ├── /blog/[slug]         Individual posts
│   └── /blog/category/[cat] Category filters
│
├── /industries             Vertical expertise (new)
│   ├── /industries/restaurants-and-cafes
│   ├── /industries/healthcare
│   ├── /industries/education
│   └── /industries/nonprofits
│
├── /interior               Interior Dept. (expand from coming soon)
│
├── /contact                Contact
├── /process                Process / How We Work (new)
└── /faq                    FAQ (new)
```

---

## URL Conventions

| Rule | Example |
|------|---------|
| All lowercase | `/services/web-design` not `/Services/WebDesign` |
| Hyphens for spaces | `/web-design` not `/web_design` |
| No trailing slashes | `/contact` not `/contact/` |
| Short and descriptive | `/work/lnc-food` not `/work/lnc-food-brand-web-design-honolulu` |

---

## Page Priority & URL Map

### Priority 1 — Create Immediately

| URL | Primary Keyword Target | Notes |
|-----|----------------------|-------|
| `/services/web-design` | "web design honolulu", "website design hawaii" | Expand on existing homepage service blurb |
| `/services/brand-identity` | "brand identity hawaii", "branding agency honolulu" | Expand on existing homepage service blurb |
| `/work/khm-tutoring` | "tutoring website design" | Already has a metric: "30% more enquiries" |
| `/work/lnc-food` | "food brand design hawaii" | Strong visual case study |
| `/work/tennis-keiki-hawaii` | "web design for nonprofits hawaii" | Local cause — link-earning potential |

### Priority 2 — Phase 2 (Weeks 5–12)

| URL | Primary Keyword Target | Notes |
|-----|----------------------|-------|
| `/work/pando-surgical` | "healthcare website design hawaii" | Precise, trust-focused niche |
| `/work/blend` | "app design case study" | Tech/startup appeal |
| `/process` | "web design process", "how we design websites" | E-E-A-T and differentiation |
| `/studio/aizen-chung` | Entity authority | Person schema |
| `/studio/toshio-nagai` | Entity authority | Person schema |
| `/studio/joseph-kim` | Entity authority | Person schema |

### Priority 3 — Phase 3 (Weeks 13–24)

| URL | Primary Keyword Target | Notes |
|-----|----------------------|-------|
| `/industries/restaurants-and-cafes` | "web design for restaurants hawaii" | Pai Café + LNC Food anchor this |
| `/industries/healthcare` | "healthcare web design hawaii" | Pando Surgical anchors this |
| `/industries/education` | "education website design hawaii" | KHM Tutoring anchors this |
| `/services/interior-design` | "interior design honolulu" | Once interior dept. launches |
| `/faq` | FAQ-intent queries, featured snippets | Bundle common client questions |

---

## Internal Linking Strategy

### Hub-and-Spoke Model

Each service page is a hub. Blog posts and case studies are spokes that link back to the hub.

```
/services/web-design
    ↑ linked from: /work/khm-tutoring, /work/tennis-keiki-hawaii, /work/blend
    ↑ linked from: blog posts about web design topics
    ↑ linked from: /industries/restaurants-and-cafes, /industries/education

/services/brand-identity
    ↑ linked from: /work/lnc-food, /work/4as
    ↑ linked from: blog posts about branding topics
    ↑ linked from: /industries/restaurants-and-cafes
```

### Breadcrumb Structure

Every sub-page should include breadcrumbs:
- Case study: `Home > Work > KHM Tutoring`
- Blog post: `Home > Blog > [Post Title]`
- Service: `Home > Services > Web Design`
- Team member: `Home > Studio > Aizen Chung`

### Cross-Linking Rules

1. Every case study page links to its primary service page
2. Every blog post links to at least 1 service page and 1 case study
3. Service pages link to 2–3 relevant case studies each
4. Industry pages link to all related case studies and the relevant service page
5. Team bio pages link to case studies the person worked on

---

## Sitemap Priority Update

When new pages are added, update `/public/sitemap.xml`:

| Page Type | `<priority>` | `<changefreq>` |
|-----------|------------|----------------|
| Homepage | 1.0 | weekly |
| Service pages | 0.9 | monthly |
| Case study pages | 0.8 | monthly |
| Industry pages | 0.8 | monthly |
| Blog posts | 0.7 | monthly |
| Studio/team | 0.6 | monthly |
| Process, FAQ | 0.6 | monthly |
| Contact | 0.5 | yearly |

---

## Redirect Plan

If `/works` is eventually moved to `/work` (cleaner URL), implement:

```
301: /works → /work
```

Hold off until case study pages are live so the redirect chain is clean.
