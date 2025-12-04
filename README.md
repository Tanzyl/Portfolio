# Mobi Ash Portfolio - Static Website

A premium animated portfolio website converted to static HTML/CSS/JavaScript for easy deployment on Vercel.

## Features

- ✅ Fully static website (no build process required)
- ✅ Dark/Light theme toggle with localStorage persistence
- ✅ Smooth scroll navigation
- ✅ Three.js 3D background effects
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
   - Vercel will automatically detect it's a static site
   - Click "Deploy"

3. **That's it!** Your site will be live in seconds.

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
- **Three.js Background**: Customize in `script.js` `initThreeBackground()` function

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Three.js background requires ES modules support (all modern browsers)
- Theme preference is saved in localStorage
- All animations respect `prefers-reduced-motion` where applicable
- Site is fully static and can be hosted anywhere (Vercel, Netlify, GitHub Pages, etc.)

