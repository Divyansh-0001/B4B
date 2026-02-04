# Global UI Components Guide

## Overview

Complete design system with RED & WHITE theme, Framer Motion animations, and accessibility features including reduced-motion support.

## 🎨 Theme

**Strict Color Palette:**
- **RED**: `#E10600` (Primary actions, accents, branding)
- **WHITE**: `#FFFFFF` (Backgrounds, text on dark)
- **Charcoal**: Dark backgrounds (`#1F1F1F`)
- **Grays**: Neutral grays only (borders, muted text)

## 📚 Component Library

### Typography

**Location:** `components/ui/typography.tsx`

Semantic typography components with consistent styling.

```tsx
import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Code, Blockquote } from "@/components/ui/typography";

// Headings
<H1>Main Page Title</H1>
<H2>Section Heading</H2>
<H3>Subsection Heading</H3>
<H4>Card Title</H4>

// Text
<P>Regular paragraph text</P>
<Lead>Larger introductory text</Lead>
<Muted>Secondary or helper text</Muted>
<Small>Fine print or labels</Small>

// Code
<Code>const example = true;</Code>

// Quotes
<Blockquote>Important quote with red border</Blockquote>
```

### Buttons

**Location:** `components/ui/button.tsx` & `AnimatedButton.tsx`

Full-featured button with variants and animations.

```tsx
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

// Variants
<Button variant="default">Primary RED Button</Button>
<Button variant="secondary">Secondary Gray Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive RED Button</Button>
<Button variant="link">Link Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// With animations
<AnimatedButton>Hover & Tap Animations</AnimatedButton>
```

**Variants:**
- `default`: RED background, white text
- `secondary`: Gray background
- `outline`: White background, RED border
- `ghost`: Transparent, hover effect
- `destructive`: RED for delete actions
- `link`: Underlined link style

### Cards

**Location:** `components/ui/card.tsx` & `AnimatedCard.tsx`

Flexible card components with optional animations.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Animated card (hover effect)
<AnimatedCard>
  <AnimatedCard.Header>
    <AnimatedCard.Title>Animated Card</AnimatedCard.Title>
    <AnimatedCard.Description>Lifts on hover</AnimatedCard.Description>
  </AnimatedCard.Header>
</AnimatedCard>

// Disable hover animation
<AnimatedCard hover={false}>Content</AnimatedCard>
```

### Navigation

**Location:** `components/layout/Navigation.tsx`

Global navigation with mobile menu and auth integration.

```tsx
import { Navigation } from "@/components/layout/Navigation";

// In layout
<Navigation />
```

**Features:**
- Fixed top navigation
- Backdrop blur effect
- RED brand logo
- Active link indicator (animated)
- Mobile hamburger menu
- Auth-aware (shows/hides links based on auth status)
- Sign out button for authenticated users
- Smooth animations

### Footer

**Location:** `components/layout/Footer.tsx`

Global footer with links and social media.

```tsx
import { Footer } from "@/components/layout/Footer";

// In layout
<Footer />
```

**Features:**
- Brand section with logo
- Link sections (Product, Company)
- Social media icons
- Copyright notice
- Dark background with borders

### Layout Wrappers

#### Container

**Location:** `components/layout/Container.tsx`

Responsive container with max-width control.

```tsx
import { Container } from "@/components/layout/Container";

<Container size="sm">Narrow content</Container>
<Container size="md">Medium content</Container>
<Container size="lg">Large content (default)</Container>
<Container size="xl">Extra large content</Container>
<Container size="full">Full width</Container>
```

**Sizes:**
- `sm`: max-w-3xl (768px)
- `md`: max-w-5xl (1024px)
- `lg`: max-w-7xl (1280px) - default
- `xl`: max-w-[1400px]
- `full`: max-w-full

#### Section

**Location:** `components/layout/Section.tsx`

Page section with consistent padding.

```tsx
import { Section } from "@/components/layout/Section";

<Section>
  Content with automatic padding and container
</Section>

<Section containerSize="md">
  Medium container section
</Section>

<Section noPadding>
  No vertical padding
</Section>
```

#### PageLayout

**Location:** `components/layout/PageLayout.tsx`

Complete page layout with nav and footer.

```tsx
import { PageLayout } from "@/components/layout/PageLayout";

export default function MyPage() {
  return (
    <PageLayout>
      <div>Your page content</div>
    </PageLayout>
  );
}

// Without nav/footer
<PageLayout showNav={false} showFooter={false}>
  <div>Standalone page</div>
</PageLayout>
```

## 🎬 Animations

### Animation Utilities

**Location:** `lib/animations.ts`

Pre-built animation variants with reduced-motion support.

```tsx
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  buttonHover,
  buttonTap,
  cardHover,
  modal,
  backdrop,
} from "@/lib/animations";

// Use with Framer Motion
<motion.div variants={fadeIn} initial="initial" animate="animate">
  Content
</motion.div>
```

**Available Animations:**
- `fadeIn`: Simple opacity fade
- `fadeInUp`: Fade in with upward movement
- `fadeInDown`: Fade in with downward movement
- `slideInLeft`: Slide from left
- `slideInRight`: Slide from right
- `scaleIn`: Scale from 0.9 to 1
- `staggerContainer`: Parent for staggered children
- `staggerItem`: Child items that stagger
- `buttonHover`: Button hover effect (scale 1.05)
- `buttonTap`: Button tap effect (scale 0.95)
- `cardHover`: Card hover effect (lift -4px)
- `modal`: Modal/dialog animation
- `backdrop`: Backdrop fade animation

### FadeIn Component

**Location:** `components/ui/FadeIn.tsx`

Client-side component for fade animations.

```tsx
import { FadeIn } from "@/components/ui/FadeIn";

<FadeIn>Simple fade in</FadeIn>
<FadeIn direction="up">Fade in from bottom</FadeIn>
<FadeIn direction="down">Fade in from top</FadeIn>
<FadeIn delay={0.2}>Delayed fade in</FadeIn>
```

### Stagger Children

**Location:** `components/ui/StaggerChildren.tsx`

Stagger animations for lists and grids.

```tsx
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";

<StaggerChildren>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <div>{item.content}</div>
    </StaggerItem>
  ))}
</StaggerChildren>
```

### Custom Animations

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function MyComponent() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      Animated content
    </motion.div>
  );
}
```

## ♿ Reduced-Motion Support

All animations respect user's motion preferences:

```tsx
// Automatically handled in animation utilities
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Animations become instant (0.01s) for reduced-motion users
// Movement animations (x, y) become 0
// Scale animations stay at 1
```

**CSS Support:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎯 Performance

### No Scroll Lag
- `will-change` not overused
- GPU acceleration only when needed
- Smooth scroll with CSS `scroll-behavior`
- Debounced scroll listeners

### No Jank
- Animations use `transform` and `opacity` (GPU-accelerated)
- Layout shifts prevented
- Conditional rendering for heavy components
- Lazy loading for images

### Optimization Tips

```tsx
// ✅ Good: transform (GPU-accelerated)
<motion.div animate={{ x: 100, opacity: 1 }} />

// ❌ Bad: layout properties (causes reflow)
<motion.div animate={{ width: "100%", height: "100%" }} />

// ✅ Good: Client component for animations
"use client";
import { motion } from "framer-motion";

// ✅ Good: Reduced-motion support
import { fadeInUp } from "@/lib/animations";
```

## 📖 Usage Examples

### Complete Page Example

```tsx
"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { H1, H2, P, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function MyPage() {
  return (
    <PageLayout>
      <Section>
        <H1 className="text-center">Page Title</H1>
        <Muted className="text-center">Page description</Muted>
        
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <AnimatedCard>
                <AnimatedCard.Header>
                  <AnimatedCard.Title>{item.title}</AnimatedCard.Title>
                  <AnimatedCard.Description>
                    {item.description}
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
                <AnimatedCard.Content>
                  <P>{item.content}</P>
                </AnimatedCard.Content>
                <AnimatedCard.Footer>
                  <AnimatedButton>Action</AnimatedButton>
                </AnimatedCard.Footer>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
    </PageLayout>
  );
}
```

### Feature Card Grid

```tsx
<StaggerChildren className="grid gap-6 md:grid-cols-3">
  <StaggerItem>
    <AnimatedCard>
      <AnimatedCard.Header>
        <div className="mb-2 rounded-full bg-primary/10 p-3 w-fit">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <AnimatedCard.Title>Feature Title</AnimatedCard.Title>
        <AnimatedCard.Description>
          Feature description
        </AnimatedCard.Description>
      </AnimatedCard.Header>
    </AnimatedCard>
  </StaggerItem>
</StaggerChildren>
```

### Hero Section

```tsx
<Section className="relative min-h-screen flex items-center">
  <FadeIn direction="up">
    <H1 className="text-center text-6xl text-white">
      Welcome to Be4Breach
    </H1>
    <Lead className="text-center mt-6">
      Enterprise security platform
    </Lead>
    <div className="flex justify-center gap-4 mt-8">
      <AnimatedButton size="lg">Get Started</AnimatedButton>
      <AnimatedButton variant="outline" size="lg">
        Learn More
      </AnimatedButton>
    </div>
  </FadeIn>
</Section>
```

## 🎨 Color Usage

### Background Colors
```tsx
<div className="bg-background">        {/* White */}
<div className="bg-card">              {/* White card */}
<div className="bg-muted">             {/* Light gray */}
<div className="bg-primary">           {/* RED */}
```

### Text Colors
```tsx
<span className="text-foreground">      {/* Dark charcoal */}
<span className="text-muted-foreground">{/* Gray */}
<span className="text-primary">         {/* RED */}
<span className="text-white">           {/* White */}
```

### Border Colors
```tsx
<div className="border-border">        {/* Light gray */}
<div className="border-primary">       {/* RED */}
<div className="border-white/10">      {/* Transparent white */}
```

## 🎬 Animation Best Practices

### 1. Client Components Only

```tsx
"use client";  // Required for Framer Motion

import { motion } from "framer-motion";
```

### 2. Use Pre-built Animations

```tsx
// ✅ Good: Use utilities
import { fadeInUp } from "@/lib/animations";
<motion.div variants={fadeInUp} />

// ❌ Avoid: Inline animations
<motion.div animate={{ opacity: 1, y: 0 }} />
```

### 3. Reduced-Motion Support

```tsx
// Automatically handled in animation utilities
// Users with prefers-reduced-motion get instant animations
```

### 4. Performance

```tsx
// ✅ Good: transform & opacity
<motion.div animate={{ x: 100, opacity: 1 }} />

// ❌ Bad: layout properties
<motion.div animate={{ width: "100%", marginTop: "20px" }} />
```

### 5. Stagger Lists

```tsx
<StaggerChildren>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerChildren>
```

## 🏗️ Layout System

### Page Structure

```tsx
<PageLayout>              {/* Nav + Footer */}
  <Section>               {/* Padding + Container */}
    <Container size="lg"> {/* Max-width control */}
      <H1>Content</H1>
    </Container>
  </Section>
</PageLayout>
```

### Responsive Grid

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <Card>Column 1</Card>
  <Card>Column 2</Card>
  <Card>Column 3</Card>
</div>
```

### Flexbox Layout

```tsx
<div className="flex items-center justify-between">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

## 🎭 Micro-Interactions

### Button Press

```tsx
<AnimatedButton>
  {/* Scales down on tap, up on hover */}
  Click Me
</AnimatedButton>
```

### Card Hover

```tsx
<AnimatedCard>
  {/* Lifts up 4px on hover */}
  Card content
</AnimatedCard>
```

### Link Active State

```tsx
// Navigation automatically shows active indicator
// Animated red underline that follows active link
```

### Loading State

```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

## 📱 Responsive Design

### Breakpoints

```tsx
// Mobile first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

**Tailwind Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Menu

Navigation automatically switches to hamburger menu on mobile with smooth slide-down animation.

## 🎨 Component Composition

### Feature Card

```tsx
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <AnimatedCard>
      <AnimatedCard.Header>
        <div className="mb-2 rounded-full bg-primary/10 p-3 w-fit">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <AnimatedCard.Title>{title}</AnimatedCard.Title>
        <AnimatedCard.Description>{description}</AnimatedCard.Description>
      </AnimatedCard.Header>
    </AnimatedCard>
  );
}
```

### Stat Card

```tsx
function StatCard({ label, value, icon: Icon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Icon className="h-8 w-8 text-primary" />
          <span className="text-3xl font-bold">{value}</span>
        </div>
        <Muted className="mt-2">{label}</Muted>
      </CardContent>
    </Card>
  );
}
```

### Alert Card

```tsx
<Card className="border-l-4 border-primary">
  <CardContent className="p-4">
    <H4 className="text-primary">Important</H4>
    <P>Alert message content</P>
  </CardContent>
</Card>
```

## ♿ Accessibility

### Keyboard Navigation
- All interactive elements keyboard accessible
- Focus visible states
- Tab order maintained

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Proper heading hierarchy

### Motion Preferences
- Respects `prefers-reduced-motion`
- Animations become instant
- No movement for sensitive users

### Color Contrast
- RED on WHITE: WCAG AA ✓
- WHITE on RED: WCAG AA ✓
- Charcoal on WHITE: WCAG AAA ✓

## 🎨 Dark Mode Support

Toggle dark mode by adding class to html:

```tsx
<html className="dark">
```

**Color Mapping:**
- Light: WHITE backgrounds, charcoal text
- Dark: CHARCOAL backgrounds, white text
- RED: Same in both modes

## 📦 Component Index

### UI Components
- ✅ Typography (H1, H2, H3, H4, P, Lead, Muted, etc.)
- ✅ Button (with all variants)
- ✅ AnimatedButton (with hover/tap)
- ✅ Card (with header, content, footer)
- ✅ AnimatedCard (with hover lift)
- ✅ FadeIn (with directions)
- ✅ StaggerChildren & StaggerItem

### Layout Components
- ✅ Navigation (with mobile menu)
- ✅ Footer (with links and social)
- ✅ Container (with size variants)
- ✅ Section (with padding)
- ✅ PageLayout (complete page wrapper)

### Utilities
- ✅ Animation variants (lib/animations.ts)
- ✅ Reduced-motion detection
- ✅ Theme utilities (lib/utils.ts)

## 🚀 Performance Checklist

- [x] Animations use GPU-accelerated properties
- [x] Client components marked with "use client"
- [x] Server components for static content
- [x] Reduced-motion support
- [x] No layout shifts
- [x] Optimized re-renders
- [x] Conditional animations
- [x] Efficient event listeners

## 🎯 Quick Reference

```tsx
// Typography
<H1>Title</H1>
<P>Paragraph</P>
<Muted>Helper text</Muted>

// Buttons
<Button>Primary</Button>
<AnimatedButton variant="outline">Animated</AnimatedButton>

// Cards
<AnimatedCard>
  <AnimatedCard.Header>
    <AnimatedCard.Title>Title</AnimatedCard.Title>
  </AnimatedCard.Header>
</AnimatedCard>

// Layout
<PageLayout>
  <Section>
    <Container>Content</Container>
  </Section>
</PageLayout>

// Animations
<FadeIn direction="up">Content</FadeIn>
<StaggerChildren>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
</StaggerChildren>
```

---

**Design system complete with RED & WHITE theme, smooth animations, and accessibility!**
