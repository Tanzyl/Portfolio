# Mobi Ash Portfolio - Static Website

A premium animated portfolio website converted to static HTML/CSS/JavaScript for easy deployment on Vercel.

## Features

- ✅ Fully static website (no build process required)
- ✅ Dark/Light theme toggle with localStorage persistence
- ✅ Smooth scroll navigation
- ✅ CSS-based animated backgrounds and effects
- ✅ Animated counters and scroll-triggered animations
- ✅ Responsive design for all devices
- ✅ Glass-morphism UI elements
- ✅ All original designs and text preserved

## Deployment to Vercel

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - **Important**: In Project Settings, configure:
     - **Framework Preset**: "Other" or leave blank
     - **Build Command**: Leave empty (or set to `""`)
     - **Output Directory**: `.` (current directory)
     - **Install Command**: Leave empty
   - Click "Deploy"

3. **That's it!** Your site will be live in seconds.

**Note**: If Vercel detects it as an app, go to Project Settings → General → Override and set:
- Build Command: (empty)
- Output Directory: .
- Install Command: (empty)

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Customization

- **Colors**: Edit CSS variables in `styles.css` (lines 6-60 for light mode, 63-100 for dark mode)
- **Content**: Edit text directly in `index.html`
- **Animations**: Modify animation timings in `styles.css` keyframes section

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Theme preference is saved in localStorage
- All animations respect `prefers-reduced-motion` where applicable
- Site is fully static and can be hosted anywhere (Vercel, Netlify, GitHub Pages, etc.)
- No build process or dependencies required

