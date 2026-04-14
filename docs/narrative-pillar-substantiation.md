# Narrative Pillar Substantiation: Proactive & Event-Driven

Critical review of the "Proactive Agents" and "Event-Driven" pillars. Do we have evidence to claim these as differentiators, or should we reframe?

---

## 1. The "Proactive" Problem

### Current Claim
- **Pillar:** "Proactive by Default"
- **Tagline:** "Agents that act before you ask"
- **Description:** "Agents anticipate, initiate, and act without waiting for prompts—monitoring, detecting, and responding to what matters."

### What "Proactive" Implies (Strict Definition)
An agent is **proactive** when it:
1. **Initiates** action without a user prompt (e.g., reaches out when SLA is about to breach)
2. **Monitors** external state (queues, sentiment, tickets) and acts when conditions are met
3. **Anticipates** and acts before the user asks (e.g., "We noticed your order is delayed—here's an update")

### What the Codebase / Marketing Shows
- **SupportAgentDemo** describes: "Monitor queues & sentiment", "Detect at-risk tickets", "Act before escalation"
- **RetailOrderDemo** describes: "Proactively notifies customers about delays, shipping updates"
- **Platform:** Agent Builder (Studio) is a **conversational** interface—user describes agent, agent is created. No visible background monitoring, scheduler, or proactive-initiation layer in the marketing site.

### The Gap
If the platform today is primarily **conversational** (user → agent → response), then "proactive" is either:
- **Aspirational** (roadmap), or
- **Use-case specific** (e.g., retail agent can send proactive notifications if that flow exists), or
- **Overstated** (we're using "proactive" loosely to mean "smart" or "autonomous within a conversation")

### Recommendation: Proactive

| Option | Action |
|--------|--------|
| **A. We have proactive capabilities** | Document them explicitly: background monitors, schedulers, outbound triggers. Use concrete examples in copy. |
| **B. We don't, but it's roadmap** | Reframe: "Built for proactive use cases" or "Proactive-ready" rather than "Proactive by Default." |
| **C. We're using it loosely** | Drop "Proactive" as a pillar. Replace with something we can substantiate: e.g., "Outcome-Driven," "Adaptive," "Production-Ready." |

**Suggested reframe if we cannot substantiate:**  
Replace "Proactive by Default" with **"Autonomous Within Scope"** or **"Goal-Oriented"**—agents work toward defined outcomes without rigid scripts. This is defensible and aligns with Outcome-Driven.

---

## 2. The "Event-Driven" Problem

### Current Claim
- **Pillar:** "Event-Driven"
- **Tagline:** "When it happens, agents respond"
- **Description:** "Triggered by events, not manual invocation. Inbound ticket, SLA breach, repeat caller—event-triggered autonomy that scales."

### Do Competitors Handle Events?

**Nurix** (from [nurix.ai](https://www.nurix.ai/)):
- 400+ integrations (CRM, ticketing, CCaaS)
- Agents "retrieve data, update records, close workflows"
- Integrates with Genesys, Talkdesk, Aircall, HubSpot, Salesforce
- **Conclusion:** Nurix agents respond to inbound calls, tickets, CRM events. They are event-triggered in the sense that a call or ticket triggers the agent.

**Industry pattern:**
- **Conversational:** User sends message → agent responds (request-response)
- **Event-driven:** External event (webhook, cron, system event) → agent runs (async, no user in loop)

Most modern AI agent platforms support both. Webhooks, cron, and system triggers are table stakes for automation.

### What Would Make Thuriyam "Better" on Events?

To claim we are **better than any other agent platform** on events, we need at least one of:

| Differentiator | Meaning | Evidence needed |
|----------------|---------|-----------------|
| **Event-first architecture** | Platform is designed around events, not bolted on | Event model, schema, docs |
| **Richer event model** | More event types, composable triggers, conditions | Feature list, examples |
| **Lower latency / reliability** | Faster or more reliable event→agent execution | Benchmarks, SLAs |
| **Unified event bus** | Single place to define and route all events | Architecture docs |
| **Event-driven by default** | Agents are event-triggered out of the box; conversation is one event type | Product design |

### The Gap
The marketing site does not show:
- Event schema or trigger configuration UI
- Webhook/cron documentation
- Comparison to competitors on event handling

Without this, "Event-Driven" reads as **generic**—same as Nurix, Vapi, Bland, etc.

### Recommendation: Event-Driven

| Option | Action |
|--------|--------|
| **A. We have a distinct event advantage** | Document it: event model, latency, reliability, or architecture. Use in copy: "Event-native platform" or "Built for event-triggered automation." |
| **B. We're parity** | Reframe: "Event-triggered agents" (capability) not "Event-Driven" (pillar). Don't claim superiority. |
| **C. We're behind** | De-emphasize. Lead with Outcome-Driven and Beyond RPA instead. |

**Suggested reframe if we cannot substantiate superiority:**  
- Keep "Event-Driven" only if we can point to concrete differentiators.
- Otherwise: "Agents that respond to your systems—tickets, CRMs, schedules" (capability, not pillar).
- Or merge into Outcome-Driven: "Define the outcome. Agents respond when it matters—whether from a conversation or an event."

---

## 2a. Event-Driven USPs (Intelligent Collections PRD)

*Source: Product Requirements Document — Intelligent Collections (Feb 2026)*

These event-related differentiators are substantiated by the PRD and can be used to support the Event-Driven pillar, especially in BFSI/collections context.

### Defensible USPs

| USP | Description | Evidence (PRD) | vs Competitors |
|-----|-------------|----------------|----------------|
| **Unified Signal Ingestion API** | Single API for bank app, IoT, Account Aggregator, and payment webhooks feeding one Orchestrator | "Signal Ingestion API: Bank mobile app + IoT devices push events to Orchestrator" | Spocto X: "Predictive, not clearly signal-driven" |
| **Event–Action Architecture** | Watcher Agent listens for events; Planner Agent triggers actions via Tool Calls | Explicit event→action mapping (Payment Bounced, PTP Broken, "Job Loss" keyword, etc.) | Not explicitly described for Spocto |
| **Pre-delinquency Signal Triggers** | Balance low, app uninstall, etc. before due date—not just time-based | Scenario 5: "Signals (balance, app uninstall, etc.)" vs "Time only (due date)" | Spocto: time-based, not clearly signal-based |
| **T+0 Reconciliation** | Payment webhooks for instant state update; no post-payment harassment | "Payment Rail: Webhooks (Razorpay/Stripe/UPI) for T+0 Recon" | "Not highlighted as core" for Spocto |
| **Product-Level Event Policies** | Different event handling per product (e.g., PL Under 5L vs Over 5L) | "Product-Level Policies" | "Not clearly articulated" for Spocto |

### Sample Event→Action Mapping (PRD)

| Event | Action |
|-------|--------|
| Payment Bounced (Insufficient Funds) | generate_payment_link + schedule_retry_mandate |
| Call Not Picked (2 attempts) | switch_channel + pause_dialing |
| PTP Broken | escalate_tone + revoke_waiver_offer |
| "Job Loss" keyword | activate_negotiation_agent (Interest-only) |
| Contact unreachable (SIM swapped) | trigger_deep_trace + send_physical_letter |
| Customer Refuses to Pay | generate_legal_notice |
| Customer Requests Settlement | calculate_settlement_floor + open_settlement_ui |

### Messaging Guidance

- **Avoid:** "No one has this" (absolute claim).
- **Use:** "First collections platform with unified Signal Ingestion" or "Event–Action architecture built for collections."
- **Context:** These USPs apply most strongly to BFSI/collections; use for solutions pages and vertical-specific copy.

---

## 2b. Third Platform Pillar Options

*For "The Agentic Platform for Autonomous Operations" section — Outcome-Driven and Event-Driven are fixed; options for the third card.*

### Option 1: HITL Where It Matters (Recommended)

| Field | Content |
|-------|---------|
| **Title** | HITL Where It Matters |
| **Subtitle** | Humans where judgment matters. Agents everywhere else. |
| **Description** | Agents handle routine work at scale; humans focus on exceptions, empathy, and decisions that matter. Escalation and approval flows are built in. |
| **Icon** | Handshake |
| **Rationale** | Aligns with vision board; clarifies smart human–agent collaboration, not "full automation." |

### Option 2: Adaptive

| Field | Content |
|-------|---------|
| **Title** | Adaptive |
| **Subtitle** | Learns from context. Adapts without scripts. |
| **Description** | Agents adjust to new situations and constraints without rigid flows. Goal-based behavior instead of brittle, script-based automation. |
| **Icon** | Sparkles or RefreshCw |
| **Rationale** | Connects to "Beyond RPA"; differentiates from rigid, rule-based systems. |

### Option 3: Production-Ready

| Field | Content |
|-------|---------|
| **Title** | Production-Ready |
| **Subtitle** | Built for scale, security, and governance. |
| **Description** | Security, guardrails, and observability are built in. Agents are enterprise-ready from day one. |
| **Icon** | ShieldCheck |
| **Rationale** | Addresses trust and risk for business buyers. |

### Option 4: Autonomous Within Bounds

| Field | Content |
|-------|---------|
| **Title** | Autonomous Within Bounds |
| **Subtitle** | Acts independently. Stays within policy. |
| **Description** | Agents make decisions and take action within defined policies and guardrails, without constant human oversight. |
| **Icon** | Lock or Scale |
| **Rationale** | Reinforces "Autonomous Operations" in the section title. |

### Implementation Note

**Implemented:** Option 1 (HITL Where It Matters) on Home v4.

---

## 3. Pillars We Can Likely Substantiate

| Pillar | Claim | Likely evidence |
|--------|-------|-----------------|
| **Outcome-Driven** | Define outcomes, not scripts; agents align to goals | Natural-language goal definition in Agent Builder; no flowchart requirement |
| **Event-Driven** | Unified Signal Ingestion, Event–Action architecture, pre-delinquency triggers | Intelligent Collections PRD (Section 2a) |
| **Beyond RPA** | Adaptive, goal-based vs brittle scripts | Positioning; no direct feature proof needed |
| **HITL Where It Matters** | Humans for judgment; agents for routine | Escalation, approval workflows (if we have them) |
| **Production-Ready** | Security, guardrails, observability built in | Triple Gate, IQA, Guardrails pages |

---

## 4. Revised Pillar Options

### Option A: Lead with Outcome-Driven (Safest)
- **Pillar 1:** Outcome-Driven — "Define the outcome. Agents deliver."
- **Pillar 2:** Beyond RPA — "From scripts to intelligence"
- **Pillar 3:** Production-Ready — "Built for scale, security, and governance"

Drop Proactive and Event-Driven as pillars; mention as capabilities where accurate.

### Option B: Keep Three Pillars, Reframe
- **Pillar 1:** Outcome-Driven — (unchanged)
- **Pillar 2:** Goal-Oriented / Adaptive — Replace "Proactive" with "Agents that work toward goals without rigid scripts"
- **Pillar 3:** System-Connected — Replace "Event-Driven" with "Agents that connect to your systems—tickets, CRMs, schedules" (capability, not superiority claim)

### Option C: Substantiate and Keep
- Document proactive capabilities (monitors, schedulers, outbound)
- Document event differentiators (architecture, latency, reliability)
- Update vision board and copy with concrete evidence

---

## 5. Action Items

1. **Product/Engineering:** Confirm what proactive and event-driven capabilities exist today vs roadmap.
2. **Marketing:** Do not claim "Proactive by Default" as a differentiator unless we have evidence. For Event-Driven, use USPs from Section 2a (BFSI/collections context).
3. **Vision board:** Update `docs/vision-board.md` with revised pillars based on substantiation.
4. **Nurix analysis doc:** Add a "Narrative caveats" section referencing this document.
5. **Solutions/BFSI pages:** Surface Event-Driven USPs (Signal Ingestion, Event–Action architecture, T+0) where relevant.

---

## 6. Summary

| Pillar | Verdict | Action |
|--------|---------|--------|
| **Proactive** | Likely overstated | Reframe or drop; use "Goal-Oriented" or "Adaptive" if we cannot show proactive initiation. |
| **Event-Driven** | **Substantiated (BFSI/collections)** | Use USPs from Section 2a: Unified Signal Ingestion, Event–Action architecture, pre-delinquency triggers, T+0. Avoid "no one has" claims. |
| **Outcome-Driven** | Strong, defensible | Keep as primary pillar. |
| **Beyond RPA** | Positioning, not feature | Keep. |
| **HITL** | Depends on product | Keep if we have escalation/approval flows. |
