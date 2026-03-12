# Pre-Launch Landing Page Style Guide
## Creating a Stunning & Unique Pre-Launch Experience

Based on analysis of successful pre-launch pages (Dropbox, Tesla Cybertruck, Notion AI, Robinhood) and best practices for 2024.

---

## 🎨 Design Philosophy

### Core Principles
1. **Simplicity First** - One clear goal: capture emails
2. **Visual Storytelling** - Show, don't just tell
3. **Emotional Connection** - Create excitement and anticipation
4. **Trust Building** - Social proof and credibility throughout
5. **Mobile-First** - 60%+ of traffic comes from mobile

---

## 🎯 Layout Structure

### Hero Section (Above the Fold)
**Purpose:** Immediate value communication + email capture

**Elements:**
- **Headline:** 1 powerful sentence (max 10 words)
  - Outcome-focused, not feature-focused
  - Example: "Deploy Production AI Agents in Minutes, Not Months"
  
- **Subheadline:** 1-2 sentences explaining the transformation
  - Address the pain point
  - Example: "Stop wrestling with fragmented tools. Get enterprise security, observability, and governance—built-in from day one."

- **Visual Element:** 
  - Product mockup/GIF (60% of hero space)
  - OR animated demo video
  - OR interactive preview
  
- **CTA Form:** 
  - Single email field (no distractions)
  - Large, prominent button
  - Place above the fold (no scrolling required)

- **Trust Indicators:**
  - Live waitlist counter
  - Recent signups ticker
  - Press mentions (if available)

**Design Specs:**
- Max width: 1200px
- Padding: 80px top, 60px bottom
- Background: Gradient or subtle animation
- Form: Centered, max-width 600px

---

## 🎨 Visual Design System

### Color Palette

**Primary Colors:**
- **Primary Brand:** `#000000` (Black) - CTAs, emphasis
- **Accent:** `#6366F1` (Indigo) - Interactive elements
- **Success:** `#10B981` (Green) - Confirmations, positive states
- **Warning/Urgency:** `#EF4444` (Red) - Scarcity, alerts

**Background Gradients:**
- **Hero:** `from-purple-50 via-indigo-50 to-blue-50`
- **Sections:** `bg-white` or `bg-gray-50`
- **CTA Section:** `bg-black` or `bg-gradient-to-br from-gray-900 to-black`

**Text Colors:**
- **Headlines:** `#1E293B` (Slate-800)
- **Body:** `#64748B` (Slate-500)
- **Muted:** `#94A3B8` (Slate-400)

### Typography

**Headlines:**
- Font: System font stack (SF Pro, Inter, or similar)
- Size: `text-4xl md:text-6xl` (48-72px)
- Weight: `font-bold` (700)
- Line Height: `leading-tight` (1.1-1.2)

**Subheadlines:**
- Size: `text-xl md:text-2xl` (20-24px)
- Weight: `font-normal` (400)
- Line Height: `leading-relaxed` (1.6-1.8)

**Body Text:**
- Size: `text-base` (16px)
- Weight: `font-normal` (400)
- Line Height: `leading-relaxed` (1.6)

**CTA Buttons:**
- Size: `text-lg` (18px)
- Weight: `font-semibold` (600)
- Padding: `px-8 py-4` (32px horizontal, 16px vertical)

### Spacing System

**Section Padding:**
- Mobile: `py-16` (64px)
- Desktop: `md:py-24` (96px)

**Element Spacing:**
- Between sections: `mb-12` (48px)
- Between cards: `gap-8` (32px)
- Form elements: `gap-3` (12px)

**Container:**
- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 md:px-6` (16px mobile, 24px desktop)

---

## ✨ Interactive Elements

### Animations

**Entrance Animations:**
- Fade in + slide up: `opacity: 0 → 1, y: 20 → 0`
- Duration: 0.6s
- Stagger: 0.1s between elements

**Hover Effects:**
- Scale: `hover:scale-105` (5% increase)
- Shadow: `hover:shadow-lg`
- Transition: `transition-all duration-300`

**Background Animations:**
- Floating blobs: Continuous, subtle movement
- Gradient shifts: Slow color transitions
- Particle effects: Optional, subtle

### Micro-Interactions

**Form Input:**
- Focus ring: `ring-2 ring-primary`
- Border color change on focus
- Real-time validation feedback

**Button States:**
- Default: Solid background
- Hover: Slight scale + darker shade
- Loading: Spinner + disabled state
- Success: Confetti animation

**Counter Animations:**
- Number counting: Smooth increment
- Duration: 2 seconds
- Easing: `ease-out`

---

## 📱 Component Specifications

### Email Capture Form

**Layout:**
```
┌─────────────────────────────────────┐
│  [Email Input Field]  [Join Button] │
│  Privacy note below                 │
└─────────────────────────────────────┘
```

**Specs:**
- Input: `flex-1` (takes available space)
- Button: Fixed width `px-8`
- Border radius: `rounded-lg` (8px)
- Height: `h-12` (48px)
- Border: `border-2` on focus

**States:**
- Default: White background, gray border
- Focus: Primary color border, ring
- Error: Red border, error message
- Success: Green border, checkmark

### Countdown Timer

**Design:**
- Background: Semi-transparent with blur
- Format: `DD:HH:MM:SS`
- Size: Large, prominent
- Color: White text on dark gradient
- Animation: Pulse on second change

### Waitlist Counter

**Display:**
- Format: "1,247 developers have joined"
- Animation: Counts up on load
- Position: Above headline or below CTA
- Style: Badge with icon

### Recent Signups Ticker

**Design:**
- Horizontal scrolling text
- Format: "Sarah from Acme Corp just joined • John from TechCo joined 2 min ago"
- Background: Subtle, doesn't distract
- Animation: Smooth, continuous scroll

---

## 🎭 Section Breakdown

### 1. Hero Section
**Purpose:** Capture attention + email

**Elements:**
- Badge: "Join the Beta Program"
- Headline (H1)
- Subheadline
- Visual (mockup/video/GIF)
- Email form
- Trust indicators

**Height:** Full viewport on desktop, scrollable on mobile

### 2. Value Proposition
**Purpose:** Explain what they get

**Format:** 3-column grid
- Icon
- Title
- Description
- Benefit badge

**Visual:** Cards with hover effects

### 3. Product Preview
**Purpose:** Show what's coming

**Format:** 2-column grid
- Feature name
- Description
- Mockup placeholder

**Visual:** Clean, minimal, focused

### 4. Social Proof
**Purpose:** Build trust

**Elements:**
- Press logos
- Testimonial quote
- User count
- Company logos

**Visual:** Centered, prominent

### 5. Final CTA
**Purpose:** Last chance conversion

**Design:**
- Dark background
- Large headline
- Prominent button
- Scarcity indicator

---

## 🚀 Unique Differentiators

### 1. Interactive Product Demo
- Embedded iframe or video
- Auto-play on scroll
- Muted by default

### 2. Gamification Elements
- Progress bar for waitlist milestones
- "Unlock" features as more people join
- Referral leaderboard

### 3. Personalization
- Dynamic headline based on referrer
- Personalized waitlist position
- Custom referral code

### 4. Real-Time Updates
- Live signup counter
- Recent joiners ticker
- Dynamic scarcity ("X spots left")

### 5. Multi-Step Engagement
- Step 1: Email capture
- Step 2: Referral code generation
- Step 3: Social sharing prompts

---

## 📊 Conversion Optimization

### Above the Fold
- Email form visible without scrolling
- Clear value prop in < 5 seconds
- Single, prominent CTA

### Trust Signals
- Social proof throughout
- Security badges
- Privacy assurance
- Press mentions

### Urgency Elements
- Countdown timer
- Limited spots
- Early bird benefits
- Time-sensitive offers

### Friction Reduction
- Single field form
- No account creation
- Instant confirmation
- Clear next steps

---

## 🎯 Content Guidelines

### Headlines
- **Do:** Focus on outcome/benefit
- **Don't:** Use jargon or features
- **Example:** "Deploy Production AI Agents in Minutes" ✅
- **Avoid:** "AI Platform with Enterprise Security" ❌

### Descriptions
- **Do:** Address pain points
- **Don't:** List features
- **Length:** 1-2 sentences max
- **Tone:** Conversational, confident

### CTAs
- **Do:** Action-oriented, benefit-focused
- **Don't:** Generic "Submit" or "Click Here"
- **Examples:**
  - "Join Waitlist"
  - "Get Early Access"
  - "Reserve Your Spot"
  - "Be First to Try"

---

## 📱 Mobile Optimization

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-Specific Adjustments
- Stack form vertically
- Larger touch targets (min 44px)
- Reduced padding
- Simplified animations
- Touch-friendly buttons

### Performance
- Lazy load images
- Optimize animations
- Minimize JavaScript
- Fast load time (< 3s)

---

## 🎨 Visual Hierarchy

### Size Hierarchy
1. **H1:** 72px (desktop), 48px (mobile)
2. **H2:** 48px (desktop), 36px (mobile)
3. **H3:** 32px (desktop), 24px (mobile)
4. **Body:** 16px
5. **Small:** 14px

### Color Hierarchy
1. **Primary:** Black (headlines, CTAs)
2. **Secondary:** Indigo (accents, links)
3. **Tertiary:** Gray (body text)
4. **Success:** Green (confirmations)
5. **Warning:** Red (urgency)

### Spacing Hierarchy
- Large: 96px (sections)
- Medium: 48px (between elements)
- Small: 24px (within elements)
- Tiny: 12px (tight spacing)

---

## ✨ Animation Guidelines

### Entrance Animations
- **Duration:** 0.6s
- **Easing:** `ease-out`
- **Stagger:** 0.1s between elements
- **Direction:** Fade + slide up

### Hover Animations
- **Duration:** 0.3s
- **Easing:** `ease-in-out`
- **Effect:** Scale + shadow

### Background Animations
- **Duration:** 7-10s (slow, subtle)
- **Easing:** `ease-in-out`
- **Repeat:** Infinite
- **Intensity:** Low (doesn't distract)

---

## 🎯 A/B Testing Recommendations

### Test These Elements:
1. **Headlines:** Outcome vs. Feature-focused
2. **CTA Text:** "Join Waitlist" vs. "Get Early Access"
3. **Form Position:** Above vs. below fold
4. **Visual:** Video vs. GIF vs. Static mockup
5. **Scarcity:** Countdown vs. "Limited Spots"
6. **Social Proof:** Testimonials vs. Logos vs. Counters

### Metrics to Track:
- Conversion rate (email captures)
- Time on page
- Scroll depth
- Form abandonment
- Referral rate

---

## 🎨 Brand Consistency

### Thuriyam-Specific Guidelines

**Colors:**
- Primary: Black (`#000000`)
- Accent: Indigo/Purple gradients
- Success: Green (`#10B981`)

**Typography:**
- Headlines: Bold, modern sans-serif
- Body: Clean, readable sans-serif
- Code: Monospace for technical content

**Imagery:**
- Modern, clean
- Tech-focused but approachable
- High contrast
- Professional but not corporate

**Tone:**
- Confident but not arrogant
- Technical but accessible
- Professional but friendly

---

## 📋 Checklist

### Design
- [ ] Mobile-responsive layout
- [ ] Fast load time (< 3s)
- [ ] Accessible (WCAG AA)
- [ ] Consistent branding
- [ ] Clear visual hierarchy

### Content
- [ ] Clear value proposition
- [ ] Benefit-focused copy
- [ ] Social proof elements
- [ ] Trust signals
- [ ] Urgency elements

### Functionality
- [ ] Email validation
- [ ] Success state
- [ ] Error handling
- [ ] Analytics tracking
- [ ] Referral system

### Optimization
- [ ] SEO meta tags
- [ ] Open Graph tags
- [ ] Schema markup
- [ ] Performance optimization
- [ ] A/B test setup

---

## 🚀 Implementation Priority

### Phase 1: Core (Week 1)
- Hero section with form
- Value proposition section
- Basic animations
- Mobile optimization

### Phase 2: Enhancement (Week 2)
- Countdown timer
- Waitlist counter
- Social proof
- Referral system

### Phase 3: Polish (Week 3)
- Advanced animations
- Product preview
- Testimonials
- A/B testing setup

---

## 📚 Inspiration Sources

1. **Dropbox:** Simplicity and focus
2. **Tesla:** Visual storytelling
3. **Notion AI:** Product preview
4. **Robinhood:** Urgency and FOMO
5. **Superhuman:** Referral system
6. **Calm:** Minimalist design
7. **Duolingo:** Playful engagement

---

## 🎯 Success Metrics

### Primary KPIs
- Email capture rate: Target 15-25%
- Time on page: Target > 2 minutes
- Scroll depth: Target > 75%
- Referral rate: Target 10-15%

### Secondary KPIs
- Social shares
- Press mentions
- Backlinks
- Brand awareness

---

*This style guide is a living document. Update based on performance data and user feedback.*
