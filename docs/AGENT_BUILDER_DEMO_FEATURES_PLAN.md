# Agent Builder Demo - Sequential Feature Screens Plan

## Overview
Transform the Agent Builder Demo to show features sequentially, screen-by-screen, with simple language and visual demonstrations.

## Current Flow
1. Agent Selection (chip selection)
2. Agent Configuration Display (all features shown at once)
3. Deploy Button

## Proposed Flow - Sequential Screens

### Screen 1: Agent Created ✅
**Current State**: Shows agent configuration
**Action**: After agent config is shown, automatically transition to next screen

---

### Screen 2: Where Can Your Agent Work? 🌐
**Feature**: Channels - Deploy across web, API, Slack, and more

**Simple Language**:
- **Title**: "Your agent works everywhere your customers are"
- **Description**: "Deploy your agent on your website, through an API, in Slack, or anywhere else—all from one place."

**Visual Demo**:
- Show animated icons/logos for: Web, API, Slack, WhatsApp, Email
- Each icon pulses/animates as it appears
- Simple text: "One agent, multiple places"
- Visual: Icons arranged in a grid, each lighting up sequentially

**Transition**: Auto-advance after 3 seconds

---

### Screen 3: Your Agent Remembers 📚
**Feature**: LTM & STM - Long-term and short-term memory management

**Simple Language**:
- **Title**: "Your agent remembers what matters"
- **Description**: "It remembers recent conversations (short-term) and important details about your business (long-term), so every interaction feels personal."

**Visual Demo**:
- Two memory "banks" side by side
- Short-term: Recent chat bubbles appearing/disappearing
- Long-term: Key facts/icons (customer name, preferences, order history) stored permanently
- Animation: Show a conversation where agent recalls previous context
- Simple text: "Recent chats + Important facts = Better conversations"

**Transition**: Auto-advance after 4 seconds

---

### Screen 4: Quality Check Built-In ✅
**Feature**: Hallucination Testing - Built-in quality assurance

**Simple Language**:
- **Title**: "Every answer is checked for accuracy"
- **Description**: "Before your agent responds, it automatically checks if the answer is correct and helpful—no more wrong information."

**Visual Demo**:
- Show a question being asked
- Show a "checking" animation (spinning checkmark or shield icon)
- Show result: "✓ Verified accurate" with a green checkmark
- Show a percentage: "98.5% accuracy rate"
- Simple text: "Automatic quality check on every response"

**Transition**: Auto-advance after 3 seconds

---

### Screen 5: Choose Your AI Brain 🧠
**Feature**: Multiple LLMs - Choose from frontier and open-source models

**Simple Language**:
- **Title**: "Pick the perfect AI for your needs"
- **Description**: "Choose from the best AI models—some are super smart, others are fast and affordable. Pick what works best for you."

**Visual Demo**:
- Show 4-5 model cards in a row
- Each card shows: Model name, brief description (e.g., "Most capable", "Fastest", "Most affordable")
- Highlight one as "Recommended" or "Selected"
- Simple text: "Different AI models for different needs"
- Visual: Cards with icons, maybe a slider or selection indicator

**Transition**: Auto-advance after 3 seconds

---

### Screen 6: See How Well It's Working 📊
**Feature**: Analytics Agent - Track and optimize performance

**Simple Language**:
- **Title**: "See how your agent is performing"
- **Description**: "Watch real-time stats: How fast it responds, how many questions it answers correctly, and how much it costs."

**Visual Demo**:
- Show 3-4 metric cards:
  - Speed: "245ms" with a speedometer icon
  - Success Rate: "98%" with a checkmark icon
  - Cost: "$0.02 per conversation" with a dollar icon
- Numbers animate/count up
- Simple text: "Real-time performance tracking"
- Visual: Dashboard-style cards with icons and numbers

**Transition**: Auto-advance after 3 seconds

---

### Screen 7: Bring Your Own Agent 🤖
**Feature**: BYO Agent - Bring your own custom agents

**Simple Language**:
- **Title**: "Already have an agent? Bring it here"
- **Description**: "If you've built an agent elsewhere, you can bring it to our platform and get all these features—memory, quality checks, analytics, and more."

**Visual Demo**:
- Show an "Import" or "Connect" button/icon
- Show icons/logos of other platforms (OpenAI, Anthropic, etc.) with arrows pointing to our platform
- Simple text: "Import your existing agents"
- Visual: Platform logos → Arrow → Our platform logo

**Transition**: Auto-advance after 3 seconds

---

### Screen 8: Ready to Deploy 🚀
**Final Screen**: Deploy button
- Show all features summarized in small icons
- "Your agent is ready!"
- Deploy button

---

## Implementation Approach

### State Management
Add a new state to track current feature screen:
```typescript
const [currentFeatureScreen, setCurrentFeatureScreen] = useState<number | null>(null);
```

### Screen Transitions
- After agent config is shown, start showing features sequentially
- Each screen auto-advances after 3-4 seconds
- Smooth fade transitions between screens
- Use `AnimatePresence` from framer-motion for transitions

### Component Structure
Create a new component or section that renders based on `currentFeatureScreen`:
- `renderFeatureScreen(screenNumber)` function
- Each screen is a full-width card that replaces the agent config
- Keep the chat visible but dimmed/faded in background

### Visual Design Principles
1. **One concept per screen**: Don't overwhelm
2. **Large, clear icons**: Visual > Text
3. **Simple language**: No jargon, explain benefits
4. **Animation**: Subtle, helps understanding
5. **Consistent styling**: Same card style, different content

---

## Technical Details

### Timing
- Screen 1 (Agent Config): 2 seconds
- Screen 2 (Channels): 3 seconds
- Screen 3 (Memory): 4 seconds
- Screen 4 (Quality Check): 3 seconds
- Screen 5 (LLMs): 3 seconds
- Screen 6 (Analytics): 3 seconds
- Screen 7 (BYO Agent): 3 seconds
- Screen 8 (Deploy): Until user clicks or auto-deploy

**Total**: ~24 seconds of feature showcase

### Icons Needed
- Channels: Globe, API, Slack logo, WhatsApp, Email
- Memory: Brain, Chat bubbles, Database
- Quality: Shield, Checkmark, Alert
- LLMs: CPU/Chip icon, Model logos
- Analytics: Bar chart, Speedometer, Dollar sign
- BYO: Import/Upload icon, Platform logos

### Animation Ideas
- Fade in/out between screens
- Icons pulse or scale on appear
- Numbers count up
- Progress indicator at bottom showing which screen (1/7, 2/7, etc.)

---

## User Experience Flow

1. User sees agent selection chips
2. Chip is selected (auto or manual)
3. Agent config appears
4. **NEW**: Features start showing sequentially
5. Each feature screen appears, explains, then transitions
6. Final screen shows deploy button
7. User can deploy or let it auto-deploy

---

## Next Steps

1. ✅ Plan created
2. ⏳ Implement state management for sequential screens
3. ⏳ Create individual feature screen components
4. ⏳ Add auto-advance timing logic
5. ⏳ Add smooth transitions
6. ⏳ Test flow end-to-end
7. ⏳ Refine language and visuals based on feedback
