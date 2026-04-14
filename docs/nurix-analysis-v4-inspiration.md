# Nurix.ai Analysis: V4 Website Inspiration

Analysis of [Nurix.ai](https://www.nurix.ai/) for narrative, structure, color themes, and animations to inform the Thuriyam v4 website design. **No implementation**—design and planning only.

---

## 1. Narrative & Messaging

### Nurix Narrative Patterns

| Element | Nurix Approach | Thuriyam V3 (Current) | V4 Recommendation |
|---------|----------------|------------------------|--------------------|
| **Hero headline** | Emotional, customer-centric: "Voice AI agents that make your customers feel heard" | Outcome-focused: "Proactive Agents That Deliver Outcomes" | Keep outcome focus; consider adding emotional hook (e.g., "Agents that make your operations feel effortless") |
| **Subline** | Benefit-led: "Deliver human-like conversation... without sacrificing trust or quality" | "Define the outcome. Agents act. Less manual work. Fewer escalations." | Keep; aligns with vision board. Consider adding trust/quality angle |
| **Social proof** | "30+ happy clients across globe" early in hero | None | Add lightweight social proof (client count, logos) below hero |
| **CTA** | "Schedule a Custom Demo" / "Talk to Nurix" | "See How It Works" / "Explore Demo" | Consider "Schedule a Demo" as primary CTA for enterprise feel |

### Narrative Structure

Nurix flows: **Emotional hook → Trust (clients) → Metrics → Use cases → Platform depth → Enterprise → CTA**

Thuriyam v3: **Outcome hook → Pillars → Beyond RPA → HITL → CTA**

**V4 suggestion:** Blend both:
1. Hero (outcome + optional emotional angle)
2. Social proof (clients / logos)
3. Metrics that matter (quantified outcomes)
4. Pillars (Proactive, Outcome-Driven, Event-Driven)
5. Beyond RPA
6. HITL Where It Matters
7. Platform teaser (Studio, IQA)
8. CTA

---

## 2. Page Structure & Sections

### Nurix Home Page Flow

| Section | Content | Purpose |
|---------|---------|---------|
| Hero | Headline + subline + CTA | Emotional + value prop |
| Trust bar | "30+ happy clients" | Social proof |
| Metrics grid | 3 columns (Internal, Outbound, Inbound) with % metrics | Quantified outcomes |
| ROI block | 4 stats (90%, 3–4x, 100%, 99%+) with links to stories | Proof + depth |
| Use case + channel | Journey automation, channel continuity | Breadth of use |
| Platform pillars | Build, Deploy, Monitor (carousel) | Platform depth |
| Enterprise | Analytics, Security, Integrations | Enterprise credibility |
| Final CTA | "Want to listen to our Voice AI agents in action?" | Conversion |

### V4 Structure Proposal

| # | Section | Nurix-inspired element | Thuriyam-specific |
|---|---------|-------------------------|-------------------|
| 1 | Hero | Emotional + outcome headline | "Proactive Agents That Deliver Outcomes" |
| 2 | Trust bar | Client count / logos | "X+ teams" or placeholder logos |
| 3 | **Metrics that matter** | 3-column grid with % | Internal workflows, Support, Sales—each with 2–3 metrics |
| 4 | ROI block | 4 big stats with links | Resolution rate, TAT, containment, accuracy |
| 5 | Three pillars | Card layout | Proactive, Outcome-Driven, Event-Driven |
| 6 | Beyond RPA | RPA vs Agentic | Keep current |
| 7 | HITL | Agents vs Humans | Keep current |
| 8 | Platform teaser | Build/Deploy/Monitor style | Studio + IQA |
| 9 | CTA | "Want to see agents in action?" | "See How It Works" / "Schedule Demo" |

---

## 3. Color Themes

### Nurix Palette (from site)

- **Primary:** Dark navy / black for headers and CTAs
- **Accent:** Blue (links, buttons, highlights)
- **Backgrounds:** White, light gray, soft gradients
- **Metrics:** Green for positive, colored cards per category
- **Trust:** Clean, minimal, enterprise feel

### Thuriyam V3 Palette

- **Primary:** Black (`oklch(20% 0.01 250)`)
- **Backgrounds:** `from-blue-50 via-indigo-50 to-purple-50`, `from-slate-50 to-blue-50`
- **Cards:** White, gray-100, muted borders
- **Accents:** Indigo, purple, blue gradients

### V4 Color Recommendations

| Use | Nurix-style | V4 direction |
|-----|-------------|--------------|
| Hero background | Clean white / light gray | Keep soft gradients; consider lighter, more neutral |
| CTA buttons | Dark (navy/black) | Keep black primary CTA |
| Metric cards | Colored by category | Use subtle category colors (blue, green, purple) |
| Section alternation | White / light gray | Alternate `bg-white` and `bg-muted/30` |
| Trust bar | Minimal | White or very light gray |

---

## 4. Animations & Demo Look & Feel

### Nurix Home Page Animations (observed)

- **Hero:** Subtle motion, possibly parallax or gentle fade
- **Metrics grid:** Cards with hover states, possibly staggered reveal
- **Platform carousel:** Horizontal carousel (Low-Latency, Long Conversations, Scale)
- **ROI stats:** Large numbers, possibly count-up or fade-in
- **Overall:** Smooth, minimal, not distracting

### Thuriyam V3 Animations

- **Hero:** Blob animation (blue, purple, indigo), fade-in
- **Sections:** `whileInView` fade + slide (Framer Motion)
- **Cards:** `whileHover` lift
- **SupportAgentDemo:** Step-based wizard with progress bar
- **ProductionReadyWizard:** Step click, "Applying..." animation, completion screen

### V4 Animation Recommendations

| Element | Nurix-inspired | V4 action |
|---------|----------------|-----------|
| Hero | Calmer, less busy | Reduce blob intensity or remove; prefer subtle gradient shift |
| Metrics grid | Staggered reveal, hover | Add `whileInView` stagger for metric cards |
| ROI stats | Big numbers, emphasis | Consider count-up or scale-in for key metrics |
| Platform carousel | Horizontal tabs/carousel | Consider tabbed "Build / Deploy / Monitor" for Studio |
| Demo component | Prominent, interactive | Keep SupportAgentDemo; make it more hero-like (larger, above fold) |
| Scroll behavior | Smooth, minimal | Keep Framer Motion; avoid heavy parallax |

### Demo Component Enhancements

- **Placement:** Hero demo (like Nurix "listen to our Voice AI")—demo as primary hero element
- **Visual style:** Cleaner card, less busy borders, more whitespace
- **Interaction:** Auto-play option, clear step indicators, "See it in action" CTA
- **Mobile:** Ensure demo is usable or has fallback (static screenshot / video)

---

## 5. Metrics Section (New for V4)

Nurix uses a strong "Metrics that matter" grid. Thuriyam can mirror this with outcome-focused metrics.

### Proposed Metrics Grid (3 columns)

| Column | Theme | Sample metrics |
|--------|-------|----------------|
| **Internal workflows** | Automation | 60–70% reduction in processing time, 3x faster completion |
| **Support** | Containment | 65%+ workflow containment, 40% lower resolution time |
| **Sales / Ops** | Velocity | 2x pipeline velocity, 80% task completion rate |

### ROI Block (4 stats)

- Resolution rate improvement (e.g., 80%+)
- TAT reduction (e.g., 50%+)
- Containment (e.g., 65%+)
- Accuracy (e.g., 99%+)

Link each to customer stories or case studies where available.

---

## 6. Platform Section (Nurix "How we build, deploy, run")

Nurix uses a 3-pillar carousel: **Low-Latency** | **Long Conversations** | **Designed for Scale**.

### V4 Platform Teaser

| Pillar | Nurix equivalent | Thuriyam |
|--------|------------------|----------|
| Build | Voice agents for conversations | Outcome-first agent builder |
| Deploy | Flexible, model-agnostic | Production-ready by default |
| Monitor | Continuous optimization | IQA, observability, governance |

Present as horizontal tabs or cards with "Know more" links to Studio / IQA.

---

## 7. Enterprise Block

Nurix has: **Analytics** | **Security** | **Integrations**.

Thuriyam v3 removed standalone Security/Guardrails pages. V4 can surface these as cards:

- **Analytics:** IQA, conversation insights
- **Security:** Guardrails, PII, compliance (brief)
- **Integrations:** CRMs, ticketing, APIs

Keep as teaser cards, not full sections.

---

## 8. Summary: V4 Checklist

| Area | Action |
|------|--------|
| **Narrative** | Add emotional angle; keep outcome focus; add social proof |
| **Structure** | Add Metrics grid, ROI block, Trust bar; reorder for flow |
| **Colors** | Lighter, cleaner; category colors for metrics; keep black CTA |
| **Animations** | Calmer hero; staggered metric reveals; prominent demo |
| **Demo** | Hero placement; cleaner UI; auto-play; mobile fallback |
| **Metrics** | 3-column grid + 4-stat ROI block |
| **Platform** | Build / Deploy / Monitor style carousel or tabs |
| **Enterprise** | Analytics, Security, Integrations as teaser cards |
| **CTA** | "Schedule Demo" as primary option |

---

## 9. References

- [Nurix.ai](https://www.nurix.ai/)
- `docs/vision-board.md` — Thuriyam narrative pillars
- `src/pages/Home/v3/index.tsx` — Current home structure
- `src/pages/Platform/Studio/v3/index.tsx` — Current Studio structure
