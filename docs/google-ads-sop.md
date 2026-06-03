# Google Ads Management — SOP

> **Status:** Draft / Not yet offered as active service.
> When ready: load this file, follow the SOP.

---

## Pricing

| Tier | Monthly Revenue | Setup Fee (one-time) | Retainer |
|---|---|---|---|
| Small Business | 100k–200k HKD/mo | 5,000 HKD | 25% of ads budget |
| Medium Business | 300k–500k HKD/mo | 10,000 HKD | 25% of ads budget |
| Enterprise | 500k+ HKD/mo | Custom | Custom |

- No minimum ad budget
- Retainer billed monthly on top of ad spend
- Ad spend goes directly to Google (client-managed billing)

## Included

- Campaign strategy & structure design
- Keyword research (Search Console + competitor analysis)
- Non-commodity ad copywriting
- Landing page alignment
- Conversion tracking setup & verification
- Weekly monitoring, bi-weekly optimization
- Monthly reporting + quarterly strategy review

---

## Phase 1: Onboarding

1. **Discovery Call** — Business, goals, budget, audience, competitors, USP
2. **Client Classification** — Monthly revenue determines Small vs Medium tier
3. **Quote & Agreement** — Setup fee + 25% retainer terms
4. **Account Access** — Client creates Google Ads account → Composio OAuth link → verify active connection
5. **Conversion Tracking** — Identify primary conversion (calls/forms/bookings/sales), install tag, verify
6. **Kickoff** — Confirm KPIs, reporting cadence, communication channel, budget

## Phase 2: Campaign Setup

1. **Keyword Research** — Search Console data (high impression/low CTR queries) + competitor analysis + long-tail discovery
2. **Campaign Structure** — Brand (10-15%) / Non-Brand Search (50-60%) / Competitor (15-20%) / PMax (15-20%)
3. **Ad Copy** — Non-commodity approach: unique data/proprietary angle in headlines + descriptions
4. **Landing Pages** — Match each ad group to a relevant page (service page, case study, comparison)
5. **Extensions** — Sitelinks, callouts, structured snippets, call, location
6. **Bidding** — Start Maximize Clicks (2 weeks), then switch to Target CPA
7. **Launch Checklist** — Campaigns enabled, keywords correct, ads live, extensions active, conversion tracking verified

## Phase 3: Management

**Weekly** (Mondays):
- CTR, CPC, Conversion Rate, CPA, Impression Share, Quality Score
- Traffic-light matrix → action matrix (refresh ads, add negatives, adjust bids)

**Bi-weekly**:
- Search term report (add winners as exact match, add losers as negatives)
- Ad rotation (pause underperformers, write fresh RSAs)
- Bid adjustments (device, location, time, audience)
- Auction insights

**Monthly**:
- Budget review, new keyword discovery, ad extension audit, landing page audit, competitor check

## Phase 4: Reporting

**Weekly:** 2-3 line snapshot via WhatsApp/Telegram
**Monthly:** Full report (exec summary, campaign breakdown, top keywords, wasted spend analysis, optimization log, next month plan)
**Quarterly:** Strategy review call (30 min, Google Meet)

## Phase 5: Offboarding

- Pause campaigns (preserves Quality Score history)
- Provide final report + data export
- Remove Composio connection
- Offer account ownership transfer

---

## Tools (via Composio)

| Tool | Purpose |
|---|---|
| `GOOGLE_ADS_CREATE_CAMPAIGN` | Create Search/Display/PMax campaigns |
| `GOOGLE_ADS_GET_CAMPAIGNS` | List campaigns with metrics |
| `GOOGLE_ADS_UPDATE_CAMPAIGN` | Update budget, status, bidding |
| `GOOGLE_ADS_CREATE_AD_GROUP` | Create ad groups |
| `GOOGLE_ADS_CREATE_KEYWORD` | Add keywords |
| `GOOGLE_ADS_GET_KEYWORDS` | List keywords with status |
| `GOOGLE_ADS_CREATE_AD` | Create responsive search ads |
| `GOOGLE_ADS_GET_ADS` | List ads with performance |
| `GOOGLE_ADS_CREATE_AD_EXTENSION` | Add extensions |
| `GOOGLE_ADS_SEARCH` | Custom GAQL reporting |
| `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY` | Keyword research data |
| `GOOGLE_ANALYTICS_RUN_REPORT` | Conversion analysis |

## Pitfalls

- New accounts need 2-week learning phase — don't optimize aggressively
- Conversion tracking gaps are the #1 failure point — verify before launch
- Low budgets (<3k HKD/mo) limit data collection — set client expectations
- Major structural changes reset learning — batch changes wisely
- HK specifics: Cantonese targeting, HKT timezone, HKD currency
- Ads OAuth expires — Composio handles refresh, but reconnect if inactive
