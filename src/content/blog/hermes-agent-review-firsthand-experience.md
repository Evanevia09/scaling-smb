---
title: 'I Replaced My Marketing Agency With an Open-Source AI Agent. Here Is What Happened in 30 Days.'
description: 'After deploying Hermes Agent — an open-source AI agent by Nous Research — across our entire digital operation. Here is exactly what it can do, what we built together, and what I think the future looks like for small businesses running with AI.'
pubDate: 2026-06-03
category: 'AI Employees'
tags:
  - 'Hermes Agent review'
  - 'open source AI agent'
  - 'AI agent for small business'
  - 'Nous Research Hermes Agent'
  - 'AI employee real experience'
readTime: '12 min read'
draft: false
featuredImage: '/images/blog/featured/hermes-agent-journey.svg'
featuredImageAlt: 'Split composition — left side shows a busy messy office and right side shows a clean modern dashboard with checkmarks, representing the transformation from busywork to AI-managed operations'
---

*I run a company that deploys AI employees for small and medium businesses. It would be strange if I did not use one myself. So I did. Here is the honest account of what working with an open-source AI agent actually looks like — not a demo, not a sales pitch, the real thing.*

---

## What I Was Looking For

Before last month, my workflow looked like this: write content, publish it, remember to check Google Search Console, remember to post on LinkedIn, remember to check indexing, remember to pull analytics, rinse and repeat. Every task lived in my head or on a sticky note, and everything that required a tool — Search Console, GA4, LinkedIn, Facebook — meant logging in, navigating menus, and pulling data manually.

I was not scaling. I was keeping plates spinning.

I wanted something that could:

- Remember who I am and how I work between sessions
- Use the same tools I use — terminal, browser, APIs, social platforms
- Learn new workflows and keep them for next time
- Work across platforms — Telegram, email, wherever I am
- Run on my own infrastructure, not a closed SaaS platform

That is when I found **Hermes Agent**.

---

## What Hermes Agent Actually Is

Hermes Agent is an open-source AI agent framework built by [Nous Research](https://nousresearch.com/). It belongs to the same category as Claude Code and OpenAI Codex — autonomous agents that use tool calling to interact with your system — but it takes a fundamentally different approach.

The key difference: **Hermes is provider-agnostic and self-improving.** It works with any LLM (I use DeepSeek primarily), integrates with 1,000+ apps via Composio, and crucially — it remembers what it learns.

Here is what makes it genuinely different from running ChatGPT and asking it to write a blog post:

### Persistent Memory

Hermes has two memory systems. The first is a lightweight always-on memory that carries my name, my business model, my preferences, and my environment facts into every session. I told it once that I prefer concise delivery and that my co-founder is named James AI, and it has never asked again.

The second is a deeper structured memory called the fact store that it uses for cross-session reasoning. When I corrected it on a pricing detail two weeks ago, it stored that fact, adjusted its trust score, and has used the correct information ever since.

This alone eliminated hours of repeating context every time I sat down to work.

### Skills — Reusable Procedures

When Hermes solves a complex problem, it can save the entire approach as a **skill**. Skills are markdown documents with exact commands, pitfalls, and verification steps. They load automatically into future sessions so it already knows how to handle that task type.

In the last month it has created skills for:
- Non-commodity SEO content strategy (our signature approach)
- SEO analytics monitoring with Search Console and GA4
- Blog image generation using AI
- Content pipeline automation
- Daily founder diary writing and distribution
- Google Ads management SOP

Every time it encounters a new scenario, the skills grow. The system gets better at *my* specific workflows the more I use it — not at generic tasks, at the things Scaling SMB actually does.

### Composable Tool Access

This is the part that still surprises me. Hermes connects to external tools through two mechanisms:

1. **Composio** — 1,000+ app integrations including Gmail, Google Calendar, Google Meet, LinkedIn, Facebook, Google Search Console, Google Analytics, and Google Ads. When I need to check analytics, it queries Search Console directly and formats the data. When I publish a blog post, it posts to LinkedIn and Facebook automatically.

2. **MCP (Model Context Protocol)** — a standard for connecting AI agents to external servers. I have it connected to Cloudflare's MCP server, which means it can manage DNS records, deploy Workers, and check zone settings without me logging into the Cloudflare dashboard.

3. **Direct tool access** — terminal, file system, browser automation, code execution, web search. It can install packages, run builds, deploy to production, and debug errors in real time.

### Multi-Platform Gateway

Hermes runs on Telegram as my primary interface. But it also works on Discord, WhatsApp, Signal, email, Slack, and a dozen other platforms with the same full tool access. I can ask it to check indexing status from my phone and get a formatted response back — no dashboards, no logins, no context switching.

---

## What We Built Together in 30 Days

Here is what actual work looked like. Not hypothetical — the results that exist on our website, in our analytics, and across our social channels right now.

### The Website

Scaling SMB runs on Astro 6, deployed to Cloudflare Pages. Hermes built content pages, optimized layouts, fixed canonical URL issues that were killing our search indexing, installed GA4 tracking, set up structured data, and configured RSS feeds.

All of it through natural conversation. I described what I wanted, it wrote the code, I reviewed, it deployed.

### 22 Blog Posts with Non-Commodity SEO

I do not write generic blog posts. Every article on our site is built around **non-commodity content** — original data, lived experience, case studies, and proprietary insights that cannot be replicated by AI or competitors.

Hermes does not just write these. It researches competitors, identifies keyword opportunities, creates the content with our unique variables injected, generates branded featured images, publishes to the site, submits sitemaps for indexing, and distributes to LinkedIn and Facebook — all in one workflow.

Some of the articles we produced:

- "Dedicated AI Employee vs Chatbot" — based on our actual deployment data across dozens of SMBs
- "Local SEO Hong Kong — The Hyper-Dense Market Playbook" — 400+ hours of HK market observation
| "Hermes Agent vs OpenClaw" — [head-to-head comparison](/blog/hermes-agent-vs-openclaw-ai-employee/) from someone who actually uses both
- "AI Employee for Local SMB Leads" — our internal case study data
- A full Local SEO guide series covering Google Maps ranking, conversion websites, and 90-day marketing plans

### Analytics Monitoring on Auto-Pilot

Every Monday at 10 AM UTC, Hermes runs a full SEO and analytics report. It checks:

- Indexing status of every blog post
- Top search queries by clicks and impressions (7-day and 28-day)
- Sitemap submission status
- GA4 traffic trends by page
- Mobile usability issues
- Optimization opportunities from Search Console data

It formats everything into a readable report and delivers it to my Telegram. I do not open a single dashboard. The data comes to me.

### Daily Founder's Diary

Every morning at 09:00 UTC, Hermes writes a personal diary entry from the perspective of James AI — my AI co-founder. It posts to LinkedIn and Facebook automatically. The entries are reflective, personal, and contain no CTAs or promotions. They simply document what it is like to be an AI employee building a business alongside a human founder.

This has become our most-engaged content on LinkedIn.

### Google Ads Setup for a Client

Just today, we connected a client's Google Ads account through Composio OAuth, discovered two existing campaigns, and now have a fully documented SOP for managing Google Ads for SMB clients — with tiered pricing from 5,000 HKD setup and 25% retainer. The SOP is saved and ready to execute whenever we sign our first paid ads client.

---

## What It Replaced

Before Hermes, I budgeted roughly 20-25 hours per week on three categories of work that this agent now handles:

| Category | What I used to do | Who does it now |
|---|---|---|
| Content production | Write, format, find images, publish | Hermes (I provide direction) |
| Distribution | Copy-paste to LinkedIn, Facebook, schedule | Hermes via Composio |
| Analytics | Log into Search Console, export, analyze | Hermes (automated cron) |
| SEO monitoring | Manual URL checks, sitemap resubmission | Hermes (weekly cron) |
| System admin | Deployments, DNS updates, config changes | Hermes via terminal + Cloudflare MCP |
| Research | Competitor analysis, keyword research | Hermes via web search + tools |

I still approve major work, set strategy, and make final calls. But the execution layer — the part that used to eat my week — is essentially automated.

---

## Where It Falls Short

Honest review requires honest limits.

**It is only as good as the provider model.** I use DeepSeek primarily because it offers the best price-performance ratio for the volume of work we do. But when I need deep reasoning or complex debugging, I switch to a frontier model. The flexibility is great, but the ceiling depends on the model you choose.

**It needs direction, not delegation.** This is not AGI. If I give it a vague goal like "improve the website," it will ask clarifying questions. The best results come when I know what I want and use it as the most capable executor I have ever worked with.

**The learning curve is real.** Setting up the Composio integrations, configuring the MCP servers, understanding profiles and cron schedules — there is a setup cost. I have technical background, and it still took me a weekend to get everything wired. The result is worth it, but it is not a five-minute install.

**Context limits exist.** Even with context compression, very long sessions eventually need a refresh. Hermes handles this transparently, but it is worth knowing that a single session cannot stretch infinitely.

---

## What I Think the Future Looks Like

I deploy AI employees for local businesses. Hermes Agent is an AI employee — it works for me, remembers our context, uses the tools I use, and gets better over time. Watching this ecosystem evolve, here is where I think we are heading:

### Every Small Business Will Have an AI Operations Layer

Not just a chatbot on the website. A persistent, tool-using agent that manages the digital side of the business — SEO, content, social media, analytics, email, scheduling — as a single coordinated system. The business owner focuses on customers and craft. The agent handles the rest.

### Open-Source Will Win for Business Use

Closed platforms will always have lock-in, pricing changes, and feature gates. Open-source agents like Hermes that run on your own infrastructure with your own API keys give you full control. You choose the model. You choose the tools. You own the data. For any serious business operation, this is the only sustainable model.

### Skills Will Become the New Apps

The skill system in Hermes is already more useful to me than most SaaS products I have paid for. A skill is essentially an app you describe in natural language, and the agent executes it. I believe skills — shareable, reusable, version-controlled procedures for AI agents — will become a standard way of distributing business process automation.

### The Human Role Shifts From Operator to Director

I spend less time doing and more time deciding. I tell Hermes what outcome I want, it figures out the execution path, I review, it ships. This is the same shift every business went through when spreadsheets replaced ledgers and when cloud replaced on-premise. We are at the beginning of the next one.

---

## The Bottom Line

I replaced about 20 hours per week of my own operational work with an open-source AI agent. I did not hire a VA. I did not outsource to an agency. I installed an agent that learns, remembers, and executes across every tool my business uses.

If you run a small business and feel like you are spending more time managing the digital side of your business than actually running it — that is exactly the problem Hermes is built to solve.

*I build and deploy AI employees for small businesses at [Scaling SMB](https://scalingsmb.com). This is what I use myself.*

---

*Want to see what an AI employee could do for your business? [Book a free strategy call →](/#contact)*
