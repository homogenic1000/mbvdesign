# Agent Guidelines for MBV Design Portfolio

## Project Overview
This is a personal portfolio website for **Maksym Burbeza** (MBV Design), an Interactive Media Design student. The site showcases film editing, motion graphics, photography, and documentary work.

**Current State:** The codebase is a single-page application with all HTML, CSS, and JavaScript in one file (`index.html`). It uses a custom framework called **dc-runtime** (bundled as `support.js`) that wraps React. The code is fragile and poorly organized - handle with extreme caution.

## Architecture

### Core Components
1. **`support.js`** - Pre-built dc-runtime framework (React-based)
   - Handles component rendering, templating, and state management
   - **DO NOT MODIFY** - Generated from TypeScript source in separate repo
   - Loads React 18.3.1 from CDN at runtime

2. **`index.html`** - Single-file application containing:
   - HTML structure with `<x-dc>` custom element boundary
   - Inline CSS styles (no external stylesheets)
   - Inline JavaScript logic class extending `DCLogic`
   - All project content and assets

3. **`objets/`** - Image assets directory (French for "objects")
   - Contains portrait and product photography
   - Note: Duplicate images exist in root directory (leftover uploads)

### How dc-runtime Works
- Uses `<x-dc>` custom elements as component boundaries
- Templates use `{{ mustache }}` interpolation
- Control flow via `<sc-if>`, `<sc-for>` custom elements
- Component logic defined in `<script type="text/x-dc">` blocks
- `StreamableLogic` base class provides React-like lifecycle methods

## File Structure & Purposes

```
mbvdesign/
├── CNAME                  # GitHub Pages custom domain: mbvdesign.ch
├── index.html             # Main application (29KB, all-in-one)
├── support.js             # dc-runtime framework (69KB, generated)
├── portrait1.jpg          # Duplicate image (root copy)
├── portrait2.jpg          # Duplicate image (root copy)
├── portrait3.jpg          # Duplicate image (root copy)
├── seiko1.jpg             # Duplicate image (root copy)
├── seiko2.jpg             # Duplicate image (root copy)
├── seiko3.jpg             # Duplicate image (root copy)
├── objets/                # Image assets directory
│   ├── portrait1.jpg      # Portrait photography
│   ├── portrait2.jpg      # Portrait photography
│   ├── portrait3.jpg      # Portrait photography
│   ├── seiko1.jpg         # Product photography
│   ├── seiko2.jpg         # Product photography
│   └── seiko3.jpg         # Product photography
└── .git/                  # Git repository
```

## Critical Warnings

### NEVER Modify These Files
- **`support.js`** - Generated code. Changes will be overwritten on rebuild.
- **React/ReactDOM CDN URLs** - Changing these will break the entire application.

### Extremely Fragile Areas
1. **The `<script type="text/x-dc">` block** - Contains component logic
   - Must maintain exact class structure: `class Component extends DCLogic`
   - Must preserve lifecycle methods (`componentDidMount`, `renderVals`, etc.)
   - State management must use `this.setState()` pattern

2. **Template structure** - HTML inside `<x-dc>` must follow dc-runtime syntax
   - Custom elements: `<sc-if>`, `<sc-for>`, `<x-import>`, `<dc-import>`
   - Mustache interpolation: `{{ variableName }}`
   - Attribute binding: `{{ expression }}`

3. **CSS within `<helmet>`** - All styles are inline
   - Changing selectors may break animations and layouts
   - Keyframe animations are critical for scroll reveals

## Safe Modification Patterns

### Adding/Updating Content
1. **Text changes** - Safe to modify text nodes within HTML structure
2. **Image updates** - Replace files in `objets/` directory, keep same filenames
3. **Project sections** - Follow existing HTML structure exactly when adding new projects

### What Requires Extreme Caution
1. **CSS changes** - Test thoroughly, animations are fragile
2. **JavaScript logic** - Must maintain React component patterns
3. **Adding new components** - Must use dc-runtime syntax correctly

### Testing After Changes
1. Open `index.html` directly in browser (no server needed)
2. Check all sections render correctly
3. Test scroll animations work
4. Verify timecode counter updates
5. Test dropdown menu functionality
6. Check responsive behavior on mobile

## Known Issues

### High-Level Problems
1. **Single-file architecture** - All code in one file makes maintenance difficult
2. **No build process** - Changes require manual testing
3. **Duplicate images** - Same files in root and `objets/` directory
4. **Inline styles** - No CSS separation, hard to maintain
5. **Fragile framework** - dc-runtime has strict syntax requirements

### Code Organization Issues
1. **Mixed concerns** - HTML, CSS, and JavaScript all in one file
2. **No separation of components** - All projects in single template
3. **Hardcoded values** - Colors, sizes, and timings scattered throughout
4. **No responsive design system** - Media queries mixed with component styles

## Coding Conventions (As-Is)

### Current Patterns
1. **Component class** - Always named `Component`, extends `DCLogic`
2. **State management** - Uses `this.setState({ key: value })` pattern
3. **Lifecycle methods** - `componentDidMount()` for scroll observers
4. **Template syntax** - Mustache interpolation with `{{ }}`
5. **Custom elements** - `<sc-if value="{{ condition }}">` for conditionals

### Naming Conventions
1. **IDs** - camelCase: `heroSection`, `project1`
2. **Classes** - kebab-case: `project-card`, `scroll-reveal`
3. **Variables** - camelCase: `menuOpen`, `scrollProgress`

## AI Agent Guidelines

### When Modifying Code
1. **Read first** - Always read the entire file before making changes
2. **Small changes** - Make minimal, focused modifications
3. **Test immediately** - Verify changes work before proceeding
4. **Preserve structure** - Maintain existing HTML/CSS/JS patterns
5. **Document changes** - Note what you changed and why

### Common Pitfalls
1. **Breaking React patterns** - Must maintain class component structure
2. **Invalid HTML** - dc-runtime is strict about template syntax
3. **CSS specificity** - Inline styles have high specificity
4. **Animation timing** - Keyframes are carefully tuned

### Safe Approach
1. Start with smallest possible change
2. Test in browser
3. If it works, commit
4. If it breaks, revert and try different approach

## Deployment

### GitHub Pages
- Site deploys automatically from `main` branch
- Custom domain: `mbvdesign.ch` (via CNAME file)
- No build step required - just push changes

### Local Testing
- Open `index.html` directly in browser
- No server required for basic testing
- React loads from CDN (requires internet connection)