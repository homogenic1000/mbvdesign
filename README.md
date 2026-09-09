# MBV Design Portfolio

A personal portfolio website for **Maksym Burbeza** (MBV Design), showcasing work in film editing, motion graphics, photography, and documentary filmmaking.

**Live Demo:** [mbvdesign.ch](https://mbvdesign.ch)

## Project Overview

This is a single-page portfolio website built with a custom React-based framework called **dc-runtime**. The site features:

- **Hero section** with animated timecode and scroll effects
- **Project showcases** including motion graphics, photography, and documentary work
- **Responsive design** with scroll-reveal animations
- **Dark theme** with modern aesthetic

## Tech Stack

- **Framework:** dc-runtime (custom React wrapper)
- **Styling:** Inline CSS with keyframe animations
- **Fonts:** Google Fonts (Inter)
- **Hosting:** GitHub Pages
- **Domain:** mbvdesign.ch

## Project Structure

```
mbvdesign/
├── index.html          # Main website (all HTML, CSS, JS)
├── support.js          # dc-runtime framework (don't edit)
├── CNAME               # GitHub Pages domain config
├── objets/             # Image assets
│   ├── portrait1.jpg   # Portrait photography
│   ├── portrait2.jpg
│   ├── portrait3.jpg
│   ├── seiko1.jpg      # Product photography
│   ├── seiko2.jpg
│   └── seiko3.jpg
└── *.jpg               # Duplicate images (can be deleted)
```

## For Developers

### Architecture

The website uses a custom framework called **dc-runtime** that:
- Wraps React 18.3.1 (loaded from CDN)
- Uses custom HTML elements for templating
- Provides component-based architecture within a single file

### Key Files

1. **`index.html`** - Contains all HTML, CSS, and JavaScript
   - HTML structure with `<x-dc>` custom element boundary
   - Inline CSS styles in `<helmet>` section
   - JavaScript logic in `<script type="text/x-dc">` block

2. **`support.js`** - Pre-built framework (generated from TypeScript)
   - **Do not modify** - will be overwritten on rebuild
   - Handles React rendering and component lifecycle

### Making Changes

#### Safe Changes
- **Text content:** Edit HTML text nodes directly
- **Images:** Replace files in `objets/` directory (keep same filenames)
- **Add projects:** Follow existing HTML structure in `index.html`

#### Caution Required
- **CSS styles:** Test animations thoroughly
- **JavaScript logic:** Must maintain React component patterns
- **Template syntax:** dc-runtime has strict requirements

### Testing Locally

1. Open `index.html` directly in a web browser
2. No server required for basic testing
3. Requires internet connection for React/Google Fonts

### Known Issues

1. **Single-file architecture** - All code in one file makes maintenance difficult
2. **No build process** - Changes require manual testing
3. **Duplicate images** - Same files exist in root and `objets/` directory
4. **Inline styles** - No CSS separation, hard to maintain
5. **Fragile framework** - dc-runtime has strict syntax requirements

## For Non-Technical Users

### Viewing the Website

Visit [mbvdesign.ch](https://mbvdesign.ch) in any web browser.

### Making Simple Updates

**To update text:**
1. Contact the developer (see below)
2. Provide the exact text to change and where it should appear

**To update images:**
1. Send new images to the developer
2. Specify which project the images belong to
3. Developer will replace files in the `objets/` directory

**To add new projects:**
1. Provide project details (title, description, images/videos)
2. Developer will add new section following existing structure

### Contact for Changes

For any website updates or issues, contact:
- **Email:** mburbeza@gmail.com
- **WhatsApp:** Via website contact link

## Current State & Issues

This website has technical debt that makes updates challenging:
- All code is in a single file (HTML, CSS, JavaScript mixed together)
- No separation of concerns makes changes risky
- Framework has strict syntax requirements
- Duplicate image files exist in multiple locations

**Recommendation:** Consider a future refactor to separate CSS, JavaScript, and components into different files for easier maintenance.

## License

This is a personal portfolio website. For permissions, contact Maksym Burbeza.

---

**Note:** This project was created with assistance from AI agents due to its complex, single-file architecture. Future maintenance may require similar technical expertise.