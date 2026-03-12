# Thuriyam Marketing Website

A modern, responsive marketing website for Thuriyam - an AI Agent Platform. Built with React, TypeScript, and Tailwind CSS, featuring animated components and a clean, professional design.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- **Platform Pages**: 
  - Agent Builder (Studio)
  - AI Security (Triple Gate Architecture)
  - IQA (Interaction Quality Analytics)
  - Guardrails & Compliance
- **Solutions Pages**:
  - Cross-Industry Solutions
  - By Industry (BFSI, Retail/E-commerce)
  - Marketplace
- **Developers Bay**: API documentation and developer resources
- **Animated Components**: Engaging hero sections, interactive cards, and smooth transitions
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   The production build will be in the `dist` directory.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/         # Reusable components
│   ├── animations/    # Animated components (HeroVideo, TripleGateVisual, etc.)
│   ├── Marketing/    # Marketing-specific components (Navigation, Footer, Logo)
│   ├── ui/           # UI primitives (Button, Card, Input, etc.)
│   └── DynamicUIDemo.tsx
├── pages/            # Page components
│   ├── Home/         # Landing page
│   ├── Platform/     # Platform pages (Studio, Security, IQA, Guardrails)
│   ├── Solutions/    # Solutions pages (Horizontal, Vertical, Marketplace)
│   └── Developers/   # Developers Bay page
├── lib/              # Utility functions
│   └── utils.ts      # Helper functions (cn, etc.)
├── App.tsx            # Root component with routing
├── main.tsx           # Entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Key Pages

### Home Page (`/`)
- Hero section with animated elements
- Platform showcase
- Feature highlights
- Call-to-action sections

### Platform Pages
- **Agent Builder** (`/platform/studio`) - No-code agent creation platform
- **AI Security** (`/platform/security`) - Triple Gate architecture for AI security
- **IQA** (`/platform/iqa`) - Interaction Quality Analytics
- **Guardrails** (`/platform/guardrails`) - Compliance and safety policies

### Solutions Pages
- **Cross-Industry Solutions** (`/solutions/horizontal`) - Cross-industry solutions
- **By Industry** (`/solutions/vertical/bfsi`) - BFSI industry solutions
- **By Industry** (`/solutions/vertical/retail`) - Retail/E-commerce solutions
- **Marketplace** (`/solutions/marketplace`) - Pre-built agents marketplace

### Developers Bay (`/developers`)
- API documentation
- Quick start guide
- Virtual Keys management
- Custom agent deployment

## 🎯 Design Principles

- **Clean & Modern**: Minimalist design with focus on content
- **Performance**: Optimized animations and lazy loading
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Responsive**: Mobile-first responsive design

## 🔧 Configuration

### Path Aliases
The project uses `@/` as an alias for `src/` directory:
```typescript
import MainNavigation from '@/components/Marketing/MainNavigation';
```

### Tailwind CSS
Tailwind v4 is configured via `tailwind.config.js` and uses CSS-first configuration with `@theme` directive in `src/index.css`.

### TypeScript
TypeScript configuration is in `tsconfig.json` with strict mode enabled.

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the Thuriyam team
