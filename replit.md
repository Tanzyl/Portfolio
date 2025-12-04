# Mobi Ash Portfolio

A premium animated portfolio website for Mobi Ash, a Senior Data and ML Engineer with 10+ years of experience.

## Overview

This is a modern, fully-animated portfolio website featuring:
- Stunning hero section with parallax elements and floating geometric shapes
- About section with animated stat counters
- Experience timeline with animated cards and glow effects
- Skills showcase with categorized, animated chip components
- Projects gallery with glass-morphism cards
- Achievements section with animated metrics
- Contact section with professional contact information
- Dark/Light theme toggle with smooth transitions

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Routing**: Wouter
- **State Management**: React Query (TanStack Query)
- **Backend**: Express.js
- **Build Tool**: Vite

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── theme-provider.tsx    # Dark/Light theme management
│   │   ├── navigation.tsx        # Fixed header with nav links
│   │   ├── hero-section.tsx      # Landing section with parallax
│   │   ├── about-section.tsx     # Summary and stats
│   │   ├── experience-section.tsx # Work history timeline
│   │   ├── skills-section.tsx    # Technical skills grid
│   │   ├── projects-section.tsx  # Featured projects
│   │   ├── achievements-section.tsx # Key accomplishments
│   │   ├── contact-section.tsx   # Contact information
│   │   └── footer.tsx            # Site footer
│   ├── pages/
│   │   └── portfolio.tsx         # Main portfolio page
│   └── App.tsx                   # Root application component
server/
├── index.ts                      # Express server entry
├── routes.ts                     # API routes
└── storage.ts                    # Data storage interface
```

## Design System

The portfolio uses a premium AI-inspired design with:
- **Primary Color**: Purple/Violet gradient (#8B5CF6)
- **Typography**: Space Grotesk (headings), Inter (body)
- **Effects**: Glass-morphism, glow effects, smooth animations
- **Theme Support**: Dark mode by default, with light mode option

## Running the Project

The application runs on port 5000 with:
- Vite dev server for frontend (HMR enabled)
- Express for backend API and static serving

## Contact Information

- **Email**: mobidatadev@gmail.com
- **Phone**: (253) 356-7927
- **Location**: Columbus, OH
