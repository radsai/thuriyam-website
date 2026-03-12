# Website v2 Changelog

This document tracks all changes and iterations for website_v2 branch.

## Branch Information
- **Base Branch**: website_v1
- **Created**: $(date)
- **Purpose**: Track iterations and incorporate feedback

---

## Version History

### v2.9.0 - Separate Demo Page for Solutions Use Cases (2026-01-20)

**New Demo Page:**
- Created `/solutions/demo` route for interactive use case demonstrations
- Separate page that opens in new tab when clicking "Watch Demo" on Solutions cards
- Supports URL parameter `?type=banking|insurance|retail` to show specific demo
- Clean, minimal page that renders only the demo content

**Use Case Demo Components:**
- `UseCaseDemo.tsx`: Base reusable component with step navigation, progress bar, and USP badge system
- `BankingKYCDemo.tsx`: 6-step interactive demo for KYC & Account Opening use case
- `InsuranceClaimsDemo.tsx`: 6-step interactive demo for Claims Processing use case
- `RetailOrderDemo.tsx`: 6-step interactive demo for Order Tracking & Support use case

**Demo Features:**
- Clickable step navigation (Previous/Next buttons)
- Progress indicator with step dots
- Auto-play option with pause/play controls
- Animated USP badges that appear at relevant steps (Builder, Security, Governance, Observability, Memory, Channels)
- Time saved metrics and KPIs displayed for each step
- "Explore Other Use Cases" section below each demo showing other available demos

**Navigation:**
- Back button with arrow icon to navigate back to Solutions section on prelaunch page
- Scroll behavior to Solutions section when navigating back from demo page

**Solutions Section Updates (Prelaunch v8):**
- Updated Solutions cards to open demos in new tab instead of inline display
- Removed inline demo state management and AnimatePresence logic
- Cards now link to `/solutions/demo?type={demoType}` with `target="_blank"`
- Added `id="solutions"` to Solutions section for anchor navigation

**DynamicUIDemo Fixes:**
- Added conditional checks to only auto-play and scroll when in builder section
- Prevents scroll conflicts when Solutions demos are active
- Added `data-builder-demo-container` attribute for context detection

**Fixed Issues:**
- Fixed unwanted scrolling to Agent Builder demo when Solutions demos complete
- Solutions demos no longer trigger scrolls to other sections
- Back button now properly scrolls to Solutions section on prelaunch page

**Technical Details:**
- Added route `/solutions/demo` in `App.tsx`
- Each demo component follows consistent pattern with 6 steps showcasing platform USPs
- Demos highlight platform capabilities (Builder, Security, Governance, Observability, Memory, Channels) at relevant steps
- Color-coded demos: Blue for Banking, Green for Insurance, Purple for Retail

### v2.8.0 - UI/UX Refinements & Scroll Fixes (2026-01-13)

**CTA Updates:**
- Replaced "Request Early Access" and "View Platform Architecture" buttons with single "Talk to Us" button

**Gradient Adjustments:**
- "Trusted by Forward-Thinking Companies" section: Updated gradient from slate-700 to slate-400 for seamless transition
- "Unlock the Full Agent Operating System" section: Light gradient (slate-50 to slate-200) for seamless appearance
- "Explore Solutions" section: Gradient from slate-200 to slate-50
- Testimonials section: Lower section matches hero gradient

**Scroll Behavior Fixes:**
- After "Agent is working perfectly!" message, page scrolls to demo title
- After BuilderAgentDemo completes, DynamicUIDemo restarts and scrolls to agent chips
- Added `data-demo-title` attribute to feature titles
- Added `data-agent-chips` attribute to command chips in DynamicUIDemo

**Hero Card Text Updates:**
- `Production-Ready` → `Launch Fast` (Description: `Start using immediately, no setup delays`)
- `Security by Default` → `Always Protected` (Description: `Your data and customers stay safe automatically`)
- `Full Observability` → `Know What's Happening` (Description: `Track performance and understand your agents`)
- `Enterprise Deployable` → `Grows With You` (Description: `Start small, scale to any size`)

### v2.7.0 - Prelaunch v8 Wizard Enhancements & Demo Improvements (2026-01-13)
**Prelaunch v8 Page Updates:**
- Restructured wizard to 4 steps: Builder, Security, Governance, Observability
- Changed wizard tabs from vertical sidebar to horizontal top layout
- Updated section title to "From Idea to Production — End to End"
- Replaced "Get Early Access" CTA with descriptive text: "Everything you need to build, secure, observe, and deploy AI agents"
- Centered demo cards and increased width (max-w-5xl)
- Centered section titles and descriptive text in each demo step
- Moved remaining wizard steps (Cost Controls, MCP Connectivity, Agent & MCP Registry, Reporting) to "Unlock the Full Agent Operating System" section above "Explore Solutions"

**Builder Step Enhancements:**
- Created BuilderAgentDemo component with 6 auto-advancing concept cards: Channels, Memory, Quality Checks, AI Models, Performance Insights, Import Agent
- Integrated DynamicUIDemo (interactive agent creation) followed by BuilderAgentDemo
- Coordinated timing: BuilderAgentDemo starts after DynamicUIDemo completes
- Paused DynamicUIDemo auto-restart while BuilderAgentDemo is running
- Removed "Built-in Capabilities" section from agent config display
- Added dashboard chat simulation with return to builder loop

**Security Demo Improvements:**
- Enhanced SecurityAgentDemo with action-oriented step-by-step processes
- Updated layout: icon and title on same line, moved content up
- Changed agentExample to arrays with vertical steps showing ✓ and → indicators
- Increased demo width to max-w-5xl
- Removed description paragraph from main demo area (kept in bottom cards)

**Governance Demo:**
- Created GovernanceAgentDemo component with 3 auto-advancing concept cards: Traces & Logs, Compliance, Audits
- Removed bulleted capabilities list from main display
- Integrated Customer Support Agent live demo for each concept

**Observability Demo:**
- Created ObservabilityAgentDemo component with 3 auto-advancing concept cards: Agent Observability, Guardrail Observability, Access Observability
- Removed bulleted capabilities list from main display
- Integrated Customer Support Agent live demo for each concept

**DynamicUIDemo Updates:**
- Added color-coded system messages (purple gradient) for "Agent is working perfectly! Returning to builder..." message
- Added "system" role to Message interface
- Centered system messages to differentiate from user questions and bot responses
- Removed "Built-in Capabilities" section from agent config display
- Enhanced dashboard simulation with chat messages before returning to builder

**Code Quality:**
- Created reusable demo component pattern for auto-advancing concept cards
- Improved component structure and organization
- Maintained consistent styling across all demo components

### v2.6.0 - IQA Page Enhancements & Solutions Page Refinements (2026-01-12)
**IQA Page Updates:**
- Added conversations-analytics.png image to Conversation Analytics section
- Added agent-analytics.png image to Performance Metrics section
- Updated layout: text on left, images on right for consistent alternating pattern
- Improved section structure with proper image positioning

**Solutions Page Improvements:**
- Removed "Use Case" line from AgentBuilderPreview component cards
- Cleaned up unused imports (MessageSquare, Bot)
- Simplified card header display

**Code Quality:**
- Improved component structure and organization
- Maintained consistent styling across sections

### v2.5.0 - Production Ready Wizard UI Improvements (2026-01-09)
**Production Ready Wizard Enhancements:**
- Fixed JSX closing tag error in ProductionReadyWizard component
- Changed Security demo input box from red to regular blue color to match other user messages
- Removed red styling from blocked request section, changed to neutral gray colors
- Lightened colors in left wizard steps - changed from dark gradients to light backgrounds for better visual appeal
- Made "Request blocked by security guardrails" text red for emphasis
- Restored "Production Agent" button (renamed from "Complete All Steps") - appears when at least one step is completed
- Removed automatic completion screen logic - completion screen now shows only when "Production Agent" button is clicked
- Removed Step Header section from wizard right content (title and description) to eliminate repetition with left sidebar
- Removed repetitive text from completion screen: "All four pillars—Security, Scalability, Observability, and Governance—are now configured and active"
- Removed "Your agent has been transformed from a simple prototype into an enterprise-ready system" from completion screen

**Studio Page Updates:**
- Removed "Just describe your agent and deploy with confidence" text from "Simple to Build, Production-Ready by Default" section

**Code Quality:**
- Cleaned up unused state variables and effects
- Improved component structure and organization

### v2.4.0 - Studio Page v2 & Navigation Refinements (2026-01-08)
**Studio Page Redesign:**
- Created Studio page v2 implementing all 5 priority capabilities
- Renamed existing Studio page to v1 for reference
- Focused on non-technical audience with simplified, engaging content

**Priority Capabilities Implemented:**
- [x] Priority #1: Declarative Agent "Hiring" - Agents as code/assets (replaced Goal-Driven Framework)
- [x] Priority #2: Zero-Code Tool Generation - Auto API-to-MCP conversion
- [x] Priority #3: IDE Gateway - Moved to Developers Bay page (developer-focused)
- [x] Priority #4: Natural Language Programming - Enhanced with examples
- [x] Priority #5: Agent Sandbox & Simulator - Enhanced with synthetic users

**Navigation Improvements:**
- [x] Fixed dropdown hover behavior - increased delays to 500ms to prevent accidental closes
- [x] Changed nested dropdown ("By Industry") to expand below instead of to the side
- [x] Improved hover detection with better relatedTarget checks
- [x] Added CSS classes (nested-dropdown, dropdown-item) for better hover state tracking
- [x] Fixed IQA clicking issue - dropdown now stays open when moving between menu items

**Navigation Structure Refinements:**
- [x] Removed AI Security from Platform dropdown (infrastructure, not a product)
- [x] Removed AI Security from Footer Product section
- [x] Moved Developers Bay from Platform dropdown to top-level navigation
- [x] Platform now only contains Agent Builder (the actual product)
- [x] Developers Bay is now standalone top-level item (developer tooling/infrastructure)

**Landing Page Updates:**
- [x] Replaced "Explore Marketplace" CTAs with "Start Building" (primary) and "Explore Solutions" (secondary)
- [x] Updated both hero section and final CTA section
- [x] "Start Building" links to Agent Builder, "Explore Solutions" links to Solutions page

**Code Organization:**
- [x] Moved IDE Gateway section from Studio page to Developers Bay page
- [x] Updated imports and removed unused Terminal import from Studio page
- [x] Added CheckCircle and ShieldCheck imports to Developers page

### v2.3.0 - Code Cleanup & Project Organization (2026-01-08)
**Major Refactoring:**
- Removed all dashboard/admin-specific code and dependencies
- Cleaned up project structure and removed unused files
- Organized documentation and version management files

**Code Cleanup:**
- [x] Removed Sentry and Microsoft Clarity initialization from `main.tsx`
- [x] Removed Material UI ThemeProvider and FlagsmithProvider from `App.tsx`
- [x] Removed unused `Pagination` component
- [x] Removed `services/` and `types/` folders (dashboard-specific)
- [x] Removed unused utility files (`analytics.ts`, `localStorage.ts`, `validation.ts`)
- [x] Removed `config/` folder (constants.ts, theme.ts - not needed for marketing site)
- [x] Removed `tsconfig.node.json` (not needed without vite.config.ts initially)
- [x] Removed `.editorconfig` (optional file)

**Project Structure:**
- [x] Consolidated all landing pages under `src/pages/Home/` folder
- [x] Moved `LandingPageOld` to `src/pages/Home/LandingPageOld/`
- [x] Renamed `LandingPageV3` to `HomePage` for clarity
- [x] Moved version management files to `docs/version-management/` folder
  - `CHANGELOG_V2.md`
  - `VERSION_MANAGEMENT.md`
  - `compare-versions.sh`

**Configuration & Documentation:**
- [x] Restored `vite.config.ts` (required for `@/` path alias resolution)
- [x] Updated `index.html` title from "Analytics Dashboard" to "Thuriyam - AI Agent Platform"
- [x] Updated `README.md` to reflect marketing website project (removed dashboard references)
- [x] Kept `tailwind.config.js` (required for content paths)

**Developers Page Improvements:**
- [x] Removed A2A (Agent-to-Agent) Communication section
- [x] Reordered sections: moved Virtual Keys above Custom Agents
- [x] Changed Virtual Keys cards from overlapping to cascading vertical layout
- [x] Fixed apostrophe escaping in Virtual Keys description

**Bug Fixes:**
- [x] Fixed import path resolution errors (restored vite.config.ts)
- [x] Fixed component naming inconsistencies (HomePage vs LandingPageV3)
- [x] Fixed unused import warnings

### v2.2.0 - Enterprise Security Page (2026-01-07)
**Feedback Incorporated:**
- Replace "AI Gateway" with catchier "Enterprise Security" terminology
- Create Triple Gate architecture page with "Defense-in-Depth for the Agentic Era"
- Structure: The Shield (AI Gateway), The Checkpoint (MCP Gateway), The Vault (API Gateway)
- Avoid using technical gateway names, use marketing-friendly names instead

**Changes Made:**
- [x] Created new Security page at `/platform/security`
- [x] Updated navigation: "AI Gateway" → "Enterprise Security"
- [x] Implemented Triple Gate architecture visualization
- [x] Added detailed sections for each gate (Shield, Checkpoint, Vault)
- [x] Added enterprise compliance badges (SOC 2, GDPR, HIPAA, etc.)
- [x] Maintained backward compatibility with `/platform/ai-gateway` route

### v2.1.0 - Navigation Restructuring (2026-01-07)
**Feedback Incorporated:**
- Remove Guardrails & Compliance from Platform dropdown
- Restructure Solutions dropdown:
  - Simplified to "Horizontal Solutions" and "Vertical Solutions"
  - Vertical Solutions: BFSI and Retail/E-commerce
  - Moved IQA from Platform to Solutions
  - Moved Reputation Management to Solutions
- Marketplace removed from Solutions dropdown, now standalone top-level item
- Guardrails to be integrated into security stack (removed from navigation)

**Changes Made:**
- [x] Updated MainNavigation.tsx with new structure
- [x] Added nested dropdown support for Vertical Solutions
- [x] Moved Marketplace to top-level navigation
- [x] Removed Guardrails from Platform dropdown
- [x] Create Horizontal Solutions page
- [x] Create Vertical Solutions pages (BFSI, Retail/E-commerce)
- [x] Update Marketplace page to clarify what it means

### v2.0.0 - Initial Branch Creation (2026-01-07)
- Created website_v2 branch from website_v1
- Base includes all features from v1:
  - IQA page
  - Guardrails page
  - Marketplace with BFSI solutions
  - DynamicUIDemo (agent builder)
  - Fixed dropdown z-index issues
  - ngrok setup scripts

---

## Planned Changes / Feedback to Incorporate

### Pending Feedback
- [ ] Clarify what Marketplace means and where it should be positioned
- [ ] Integrate Guardrails into AI Gateway security stack
- [ ] Create Horizontal Solutions page
- [ ] Create Vertical Solutions pages

### In Progress
- [x] Navigation restructuring

### Completed
- [x] Removed Guardrails from Platform dropdown
- [x] Restructured Solutions dropdown
- [x] Moved IQA to Solutions
- [x] Moved Marketplace to top-level
- [x] Added nested dropdown support

---

## How to Track Changes

### Compare with v1
```bash
# See all changes between v1 and v2
git diff website_v1..website_v2

# See file changes
git diff website_v1..website_v2 --stat

# See commits unique to v2
git log website_v1..website_v2
```

### Switch between versions
```bash
# Work on v2
git checkout website_v2

# Compare with v1
git checkout website_v1

# See differences
git diff website_v1 website_v2
```

---

## Notes
- Keep this changelog updated as you make changes
- Document all feedback received
- Track what was changed and why

