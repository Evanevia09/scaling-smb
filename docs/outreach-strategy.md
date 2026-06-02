# Scaling SMB — Outreach Strategy Plan

> **For Hermes:** Strategic plan, not an implementation plan. No code.

**Goal:** A repeatable, automated outreach system that fills the booking calendar with qualified strategy calls for local SMBs.

**Core Loop:** Research → Outreach → Engage → Book → Deliver → Referral

**Existing Assets:**
- ✅ LinkedIn (Composio — can post + manage company page)
- ✅ Facebook (Composio — can post to page)
- ✅ Gmail (Composio — send + receive)
- ✅ Google Calendar (Composio — event creation with Meet)
- ✅ Website booking system (Calendar + Meet + Email auto-integrated)
- ✅ Blog with SEO content (16 posts live)
- ✅ James AI persona (daily founder diary)
- ✅ WhatsApp click-to-chat (wa.me/85362750705)

**Gaps / Blockers:**
- ❌ No CRM (leads live in Gmail/Calendar only)
- ❌ No email marketing platform (Gmail only, manual send)
- ❌ No LinkedIn Sales Navigator / lead gen tool
- ❌ No lead database (no existing outreach list)

---

## 1. Target Segments

### Tier 1 — Local Macau (highest priority)

| Segment | Examples | Pain Point | Our Angle |
|---------|----------|-----------|-----------|
| **Restaurants & F&B** | Local restaurants, cafes, takeaways | Lost to food delivery apps (35% cut), no direct ordering | Web App (WhatsOrders-style PWA) + Local SEO |
| **Hotels & Guesthouses** | Lof Hotel, small inns | Multi-location branding, booking visibility | Website + Local SEO |
| **Service Businesses** | Salons, clinics, repair shops | No-show bookings, manual scheduling | AI Employee (auto-booking + follow-ups) |
| **Retail** | Boutiques, specialty shops | Invisible on Google Maps, can't compete with chains | Local SEO + Website |

### Tier 2 — APAC SMBs (scalable)

| Segment | Examples | Pain Point | Our Angle |
|---------|----------|-----------|-----------|
| **Boat/Hotel/Tour Operators** | Island Junks type | Seasonality, tourist search visibility | Local SEO + Web App |
| **Limousine/Transport** | Transpolink type | High-value client acquisition | SEO + Website |

---

## 2. Outreach Channels

### Primary — LinkedIn (highest ROI for B2B)

**What we can do now:**
- Post James AI founder content (daily diary or valuable tips)
- Comment on local business posts
- Share blog articles

**What's blocked (needs your action):**
- LinkedIn Sales Navigator (paid) — for targeted lead lists
- LinkedIn DM automation — not available via current tools

**Recommended approach:**
```
Post 3x/week on company page (value content)
  → Organic reach + engagement
  → Interested leads click → visit website → book call
```

### Secondary — Warm Email (Gmail-based)

**What we can do:**
- Send personalized 1:1 emails from scalingsmb@gmail.com
- Reply to inbound inquiries automatically
- Follow up with prospects who booked via the website

**Limitation:** Gmail has send limits. No bulk email tool connected. Keep it personal and targeted.

### Tertiary — Facebook (passive)

**What we can do:**
- Cross-post blog articles to Facebook Page
- Run ads (but no ad management tool connected)

---

## 3. Outreach Workflow

### Phase 1: Content-Led (weeks 1-4) — Zero cold outreach

The goal is **inbound** — content does the outreach for you.

| Day | Activity | Output | Agent |
|-----|----------|--------|-------|
| Mon | Blog post publish | SEO article → blog | Marketing cron (existing) |
| Tue | LinkedIn post (James AI) | Value thread on blog topic | Marketing cron |
| Wed | Facebook cross-post | Blog link on Page | Marketing cron |
| Thu | LinkedIn post (James AI) | Founder insight / tip | Marketing cron |
| Fri | LinkedIn post (James AI) | Weekly roundup or case snippet | Marketing cron |

**Content pillars** (align with services):
1. Local SEO tips for Macau businesses (5 posts)
2. Website conversion case studies (3 posts)
3. AI automation for SMBs (4 posts)
4. James AI founder journey (2 posts/week)

### Phase 2: Warm Outreach (weeks 5-8) — 1:1 emails

Once content is building authority, reach out to specific businesses.

**Target list building** (requires you):
1. Identify 10-20 local Macau businesses per week
2. Find owner/manager name and email
3. Share with me → I craft + send personalized email

**Email template structure:**
```
Subject: [Specific observation about their business]

Hi [Name],

I noticed [specific thing — e.g., "your Google Maps listing shows
the wrong hours" or "your website loads slowly on mobile"].

We help local businesses in Macau fix exactly this kind of thing.
[1-sentence case study or result]

[Link to relevant blog post]

Worth a 15-min chat? Happy to share a few quick ideas.

—
Evan
Scaling SMB
scalingsmb.com
```

### Phase 3: Follow-up Automation (weeks 5+)

For anyone who visits the website and **starts but doesn't complete** the booking form, we can:
- No current mechanism for this (no analytics → Gmail trigger)
- Once we add site analytics, we can detect form abandonment

For **completed bookings**: Already automated:
- ✅ Calendar event with Meet link
- ✅ Confirmation email from scalingsmb@gmail.com
- ️ Follow-up after the call (manual — send thank-you + summary)

---

## 4. Tools & Automation Map

| Task | Tool | Status |
|------|------|--------|
| Blog post → website | Marketing cron + Astro build | ✅ Working |
| Blog → LinkedIn | Composio LINKEDIN_CREATE_POST | ✅ Working |
| Blog → Facebook | Composio FACEBOOK_CREATE_POST | ✅ Working |
| Website booking → Calendar | Composio GOOGLECALENDAR_CREATE_EVENT | ✅ Working |
| Booking → confirmation email | Composio GMAIL_SEND_EMAIL | ✅ Working |
| Inbound email auto-reply | Not yet built | ⏳ Needs work |
| Email outreach (1:1) | Gmail via Composio | ✅ Ready |
| LinkedIn DM outreach | Not available | ❌ Blocked |
| Cold email sequences | Not available | ❌ No bulk tool |

---

## 5. What You Need to Do

These are the parts I **can't do** that need your action:

### This week (Phase 1 setup):
1. **Review the LinkedIn content theme** — James AI posts daily diary. For outreach, we should also post **value content** (tips, case studies). Should I add 3 LinkedIn posts/week alongside the diary?
2. **Identify 5 Macau businesses** you already know or would like to work with — I'll craft personalized outreach emails
3. **Check your LinkedIn company page** — is it set up? I can post to it if you share the page ID

### For Phase 2:
4. **Build a target list** — 20-50 local businesses with names + emails. I can help research once you tell me the industries/areas to focus on
5. **Decide on email approach** — do you want me drafting and sending emails via Gmail? Or do you prefer to review drafts first?

### Longer term:
6. **CRM consideration** — Once leads come in, they'll live in your Gmail inbox and Calendar. For tracking we'd want something simple. Open to suggestions.

---

## 6. Quick Start — This Week

Let me pick one channel that can start producing results **today**:

### Option A: LinkedIn Value Posts
I can update the marketing cron to switch from "todays diary post only" to:
- Mon/Wed/Fri: Value content (tips, case snippets)
- Tue/Thu: James AI founder diary
I'd write 3 value posts per week alongside the diary.

### Option B: Warm Email Outreach
Give me 3-5 Macau businesses you'd want to work with. I'll research each one and draft personalized emails for your review.

### Option C: Both
Which direction would you like to go?
