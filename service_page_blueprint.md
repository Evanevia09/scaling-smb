This **`service_page_blueprint.md`** is designed to provide a high-conversion framework for your four core pillars. By using a consistent structure, you build brand familiarity while allowing the AI to swap out the specific technical benefits for each service.

---

# Service Page Blueprint: Scaling SMB Conversion Framework

## 1. Goal

To transform high-intent traffic into **Free Digital Growth Audit** leads by demonstrating deep expertise in a specific pillar (Web, Facebook Ads, Google Ads, or Local SEO).

## 2. Global Service Design Standards

* **Visuals:** Use a "Glassmorphism" card style for technical features.
* **Psychology:** Use "Problem-Agitation-Solution" (PAS) copywriting.
* **Layout:** Clean, single-column flow on mobile; staggered 2-column on desktop.
* **Color Accent:** Each service gets a subtle thematic tint (e.g., Google Ads = Gold, Facebook = Blue, SEO = Green).

---

## 3. The Core Page Structure

### **Section 1: The Specific Hero**

* **Headline:** `[Service Name] Designed to Scale.`
* **Sub-headline:** "We don't just manage [Service]; we integrate it into your 7-day acquisition machine to ensure every click has a purpose."
* **Primary CTA:** "Audit My [Service] Setup"
* **Visual:** A high-fidelity UI mockup or data visualization relevant to the service (e.g., a Google Search result for SEO, a high-converting mobile site for Web Dev).

### **Section 2: The "Performance Gap" (Agitation)**

* **Headline:** "Why most [Service] campaigns fail local businesses."
* **Content:** 3 Bullet points highlighting common mistakes Scaling SMB avoids:
* *Example (Ads):* "Broad targeting that wastes budget on non-local clicks."
* *Example (Web):* "Beautiful designs that load slowly and lose 50% of mobile traffic."
* *Example (SEO):* "Ranking for keywords that don't actually generate phone calls."



### **Section 3: The Scaling SMB Solution (Features)**

* **Headline:** "A Smarter Approach to [Service]."
* **Feature Grid (4 Items):**
1. **Data-Driven Strategy:** No guesswork. Every move is based on your specific local market data.
2. **Conversion-First Build:** We optimize for the "Submit" button, not just "Views."
3. **7-Day Execution:** No months-long onboarding. We launch your [Service] engine in one week.
4. **Continuous Optimization:** Real-time monitoring and gap-bridging to keep the machine running.



### **Section 4: The Service-Specific Process**

* **Headline:** "The 7-Day [Service] Sprint."
* **Steps:** * *Step 1:* Deep Audit & Competitor Benchmarking.
* *Step 2:* Infrastructure Setup (Tracking Pixels, SEO Schema, or UI Wireframes).
* *Step 3:* The Launch & Integration into the Scaling SMB Machine.



### **Section 5: Final Call to Action (The Audit)**

* **Headline:** "Ready to see the gaps in your [Service]?"
* **Copy:** "Our Free Digital Growth Audit includes a deep dive into your current [Service] performance. We’ll show you exactly where you’re losing money and how to fix it."
* **The Form:** Reuse the `AuditForm` component with a hidden field identifying which service page the lead came from.

---

## 4. Service-Specific Keyword & SEO Logic

| Service | Primary H1 Keyword | Key Meta Tags |
| --- | --- | --- |
| **Web Dev** | Conversion-First Web Development for SMBs | Fast, SEO-ready websites, 7-day build, mobile-optimized. |
| **FB Ads** | Local Facebook Ads Management | Lead generation, Meta Ads for SMBs, Social ROI, Local targeting. |
| **Google Ads** | High-Intent Google Ads Strategy | PPC for local business, Google Maps Ads, CPL optimization. |
| **Local SEO** | Local Search & Map Pack Optimization | Rank #1 on Google Maps, Local citations, SEO for SMBs. |

---

## 5. Technical Instruction for the AI

* **File Pattern:** `app/services/[service-name]/page.tsx`
* **Components:** * Import `AuditForm` for the footer.
* Use `generateMetadata` to pull the unique SEO strings defined above.


* **Animation:** Use a "Sticky" scroll effect where the service features stay in view while the descriptions scroll by.

---

