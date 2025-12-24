# Master Blueprint: Scaling SMB Digital Engine

## 1. Project Overview
**Scaling SMB** is a high-performance digital agency platform. The project’s mission is to move local businesses from "digital invisibility" to a **"Predictable Acquisition Machine."** It is a **conversion-first ecosystem** integrating high-speed web development, targeted advertising, and Local Search dominance.

---

## 2. Technical Architecture
*   **Core:** Next.js 15+ (App Router).
*   **Styling:** Tailwind CSS v4 (Custom @utility glassmorphism).
*   **Animations:** Framer Motion (Spring-based smooth motion, staggered reveals).
*   **Backend:** Firebase (Firestore for Leads/Bookings, Auth for Admin).
*   **Structure:** Hub-and-Spoke SEO architecture for mass scalability.

---

## 3. Style & Design (Implemented)
*   **Theme:** Modern Dark Mode (`bg-[#121212]`).
*   **Accents:** Scaling Blue (`#3B82F6`) and Growth Green (`#10B981`).
*   **Visuals:** Glassmorphism cards, interactive FAQ accordions, high-fidelity mockups.
*   **UX Interaction:**
    *   Premium "FeatureFocus" Carousel with hover-pause logic.
    *   Dual-Modal system (Audit Form & Calendar Booking).
    *   Fluid mobile Side Drawer with spring-staggered navigation.
    *   SEO-ready Breadcrumb navigation on all solutions.

---

## 4. Feature & Roadmap Audit

### A. Public Facing (Status: Core Infrastructure Ready)
*   [x] **Homepage:** High-impact hero, 4 Pillars, Results, Blog, and FAQ.
*   [x] **Solutions Hubs:** Dedicated pages for Web Dev, FB Ads, Google Ads, and Local SEO.
*   [x] **Industry Pills:** Sleek, responsive industry sector indicators.
*   [x] **Lead Capture:** Functional 3-step Audit Form with Firestore integration.
*   [x] **Booking System:** Functional Calendar Booking with time-slot selection.
*   [x] **Navigation:** Scalable hover-dropdowns and Side Drawer.
*   [ ] **Dynamic Content:** Connect `/solutions/[slug]`, `/blog/[slug]`, and `/success-stories/[slug]` to Firestore data.

### B. Admin Dashboard (Status: Upcoming - Phase 3)
*   [ ] **Security:** Firebase Auth restriction for admin access.
*   [ ] **Lead Command:** Table/Kanban view of Audit requests and Bookings.
*   [ ] **pSEO Engine:** Interface to bulk-generate industry/city landing pages.
*   [ ] **AI Content Engine:** Automated blog post generation with smart interlinking.

---

## 5. SEO & Indexability Progress
*   [x] **Flat URL Structure:** `/solutions/[slug]` optimized for keyword proximity.
*   [x] **Visual Breadcrumbs:** Implemented as a separate section for search engine crawling.
*   [x] **Internal Linking:** Hub pages cross-link to industry placeholders.
*   [ ] **Meta Generation:** Implement `generateMetadata` for dynamic Firestore routes.
*   [ ] **Sitemap:** Automated `sitemap.ts` implementation.

---

## 6. Directory Structure
```text
/src
  /app
    /solutions/        # Hubs & Dynamic Spokes
      /[slug]/         # Tailwind-ready dynamic template
      page.tsx         # Solutions Library
    /blog/             # Authority Blog (Library + dynamic slugs)
    /success-stories/  # Case Study Library
    /admin/            # Private Control Center (TBD)
    layout.tsx
    page.tsx
  /components
    /marketing/        # FeatureFocus, IndustryPills, Hero
    /shared/           # Navbar, Footer, Breadcrumbs
    /ui/               # Modal, Form components
    AuditForm.tsx
    CalendarModal.tsx
  /lib/
    firebase.ts
    utils.ts
```
