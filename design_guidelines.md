# Design Guidelines: Mobi Ash Portfolio

## Design Approach
**Reference-Based**: Inspired by leading AI startup websites (OpenAI, Anthropic, Midjourney) with premium futuristic aesthetics, heavy animation focus, and world-class visual polish.

## Typography System
- **Primary Font**: Space Grotesk (Google Fonts CDN)
- **Secondary Font**: Inter (Google Fonts CDN)
- **Hierarchy**:
  - Hero headline: 4xl-6xl, bold (700-800)
  - Section titles: 3xl-4xl, semibold (600)
  - Card headings: xl-2xl, medium (500-600)
  - Body text: base-lg, regular (400)
  - Labels/chips: sm-base, medium (500)

## Layout & Spacing System
- **Container**: max-w-7xl centered with px-6 md:px-12
- **Spacing Scale**: Tailwind units of 4, 8, 12, 16, 24, 32 (e.g., py-16, gap-8, mt-24)
- **Section Padding**: py-16 md:py-24 lg:py-32 for desktop rhythm
- **Grid Systems**: 
  - Experience cards: Single column with timeline
  - Skills: 4-6 columns responsive grid (grid-cols-2 md:grid-cols-4 lg:grid-cols-6)
  - Projects: 1-2 columns (grid-cols-1 lg:grid-cols-2)

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with centered content
- Animated geometric floating elements (circles, triangles, grid patterns)
- Parallax background layers with depth
- Large animated headline with staggered fade-in
- Subtitle and tagline with delayed entrance
- Dual CTA buttons (primary + secondary) with pulse/glow animations
- Scroll indicator with bounce animation

### Experience Timeline
- Vertical timeline connector with animated progress line
- Job cards with:
  - Company logo placeholder (circle, 64px)
  - Role title and duration
  - Bullet achievements in grid layout (2 columns)
  - Hover: lift transform (translateY(-8px)), glow shadow
  - Glass-morphism background (backdrop-blur-md, border, subtle gradient)

### Skills Section
- Animated chip components with:
  - Rounded-full badges with px-4 py-2
  - Category groupings (spacing between groups)
  - Staggered fade-in on scroll
  - Hover: scale(1.05) with shadow increase
  - Icon support from Heroicons (optional technical icons)

### Projects Gallery
- Large cards with:
  - Title, description, tech stack tags
  - Glass-morphism treatment
  - Hover: glow border, subtle scale
  - Icon indicator for external link/demo

### Achievements Section
- Animated stat counters (count-up effect)
- Large numbers with descriptive labels
- 3-column grid layout

### Contact Section
- Contact info with icons (email, phone, location)
- Animated button links
- Social proof or availability indicator

## Animation Specifications

### Scroll Animations
- Fade-in-up: opacity 0→1, translateY(40px→0), duration 0.8s
- Parallax: background/elements move at 0.5x scroll speed
- Stagger delays: 0.1s between sequential elements

### Hover Effects
- Cards: transform translateY(-8px), shadow-2xl, duration 300ms
- Buttons: scale(1.05), glow shadow, duration 200ms
- Chips: scale(1.05), brightness increase, duration 200ms

### Theme Toggle
- Smooth transition: all properties 300ms ease
- Toggle switch in top-right header
- Persist preference in localStorage

### Performance
- Use CSS transforms (not margin/padding)
- Intersection Observer for scroll triggers
- RequestAnimationFrame for smooth counters
- Reduce motion respect (prefers-reduced-motion)

## Images
**Hero Background**: Abstract AI/technology visualization - neural network nodes, flowing data streams, or geometric grid patterns with depth and motion blur (1920x1080 minimum). Subtle, not overpowering, allowing text to remain prominent.

## Accessibility
- Minimum contrast ratios maintained
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Semantic HTML structure (header, nav, main, section, footer)
- ARIA labels on icon-only buttons
- Skip-to-content link
- Reduced motion fallbacks

## Icons
**Heroicons** via CDN - outline style for most UI, solid for emphasis points