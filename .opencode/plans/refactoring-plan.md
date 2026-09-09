# Refactoring Plan: MBV Design Portfolio

## Current State Analysis
- **Single file**: All HTML, CSS, and JavaScript in `index.html` (353 lines)
- **Framework**: Uses dc-runtime (requires specific patterns)
- **Inline styles**: All CSS is inline within `<helmet>` and HTML elements
- **Inline JavaScript**: Component logic in `<script type="text/x-dc">` block
- **No build process**: Static files served directly

## Target Architecture
```
mbvdesign/
├── index.html              # Minimal HTML structure
├── css/
│   ├── global.css          # Reset, base styles, animations
│   ├── nav.css             # Navigation component styles
│   ├── hero.css            # Hero section styles
│   ├── projects.css        # Project sections styles
│   └── footer.css          # Footer styles
├── js/
│   ├── app.js              # Main component class
│   ├── scroll.js           # Scroll reveal functionality
│   ├── menu.js             # Menu toggle functionality
│   └── timecode.js         # Timecode counter functionality
├── support.js              # dc-runtime framework (unchanged)
├── objets/                 # Image assets (unchanged)
└── CNAME                   # GitHub Pages config (unchanged)
```

## Refactoring Phases

### Phase 1: CSS Separation (Priority: High)

**Goal**: Extract all CSS from `index.html` to separate files in `css/` directory.

#### 1.1 Create CSS Directory Structure
```bash
mkdir css
```

#### 1.2 Extract Global Styles to `css/global.css`
- Move reset styles (`* { margin:0; padding:0; box-sizing:border-box; }`)
- Move base body styles
- Move link styles
- Move all `@keyframes` animations (bob, fadeUp, playhead, lineGrow)
- Move `prefers-reduced-motion` media query

#### 1.3 Extract Navigation Styles to `css/nav.css`
- Move navigation bar styles
- Move dropdown menu styles
- Move hamburger button styles

#### 1.4 Extract Hero Section Styles to `css/hero.css`
- Move header/hero layout styles
- Move timeline widget styles
- Move timecode display styles

#### 1.5 Extract Project Section Styles to `css/projects.css`
- Move project card styles
- Move image grid styles
- Move project navigation button styles

#### 1.6 Extract Footer Styles to `css/footer.css`
- Move footer layout styles
- Move contact link styles
- Move social media link styles

#### 1.7 Update `<helmet>` Section
Replace inline `<style>` block with `<link>` tags:
```html
<helmet>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/nav.css">
  <link rel="stylesheet" href="css/hero.css">
  <link rel="stylesheet" href="css/projects.css">
  <link rel="stylesheet" href="css/footer.css">
</helmet>
```

### Phase 2: JavaScript Separation (Priority: High)

**Goal**: Extract JavaScript from inline `<script>` block to separate files.

#### 2.1 Create JavaScript Directory Structure
```bash
mkdir js
```

#### 2.2 Create `js/app.js` (Main Component)
- Move `Component extends DCLogic` class
- Import other modules (if dc-runtime supports ES modules)
- OR concatenate all JS files in correct order

#### 2.3 Create `js/scroll.js` (Scroll Functionality)
- Extract `IntersectionObserver` setup
- Extract scroll reveal animation logic
- Export functions for scroll handling

#### 2.4 Create `js/menu.js` (Menu Functionality)
- Extract menu toggle logic
- Extract dropdown menu state management
- Export menu control functions

#### 2.5 Create `js/timecode.js` (Timecode Counter)
- Extract SMPTE timecode calculation
- Extract timer interval logic
- Export timecode update function

#### 2.6 Update `<script>` Tag
Replace inline script with external script:
```html
<script type="text/x-dc" data-dc-script src="js/app.js"></script>
```

**Note**: Need to verify if dc-runtime supports external script files via `src` attribute.

### Phase 3: HTML Cleanup (Priority: Medium)

**Goal**: Clean up HTML structure while maintaining dc-runtime compatibility.

#### 3.1 Semantic HTML Improvements
- Ensure proper heading hierarchy (h1, h2, h3)
- Add ARIA labels where missing
- Verify accessibility attributes

#### 3.2 Remove Inline Styles
- After CSS extraction, remove all `style=""` attributes from HTML
- Replace with appropriate CSS classes
- Maintain exact same visual appearance

#### 3.3 Component Structure
- Verify each section has proper `data-reveal` attributes
- Ensure all interactive elements have proper event handlers
- Maintain dc-runtime template syntax (`{{ }}` interpolation)

### Phase 4: Testing & Validation (Priority: High)

**Goal**: Ensure refactored site works identically to original.

#### 4.1 Visual Testing
- Compare pixel-perfect rendering
- Verify all animations work correctly
- Check responsive design on all breakpoints
- Test dark theme appearance

#### 4.2 Functionality Testing
- Test navigation menu toggle
- Test smooth scroll navigation
- Verify timecode counter updates
- Test scroll progress bar
- Verify all links work correctly

#### 4.3 Framework Compatibility
- Verify dc-runtime loads correctly
- Test component mounting and rendering
- Verify React integration works
- Check for console errors

#### 4.4 Performance Testing
- Compare load times before/after
- Verify no render-blocking resources
- Check CSS/JS file sizes

## Implementation Strategy

### Safe Refactoring Approach
1. **Create backup** of original `index.html`
2. **Work incrementally** - one file type at a time
3. **Test after each change** - verify no visual/functional regression
4. **Maintain dc-runtime patterns** - keep required syntax
5. **Document changes** - update README and Agent.md

### Risk Mitigation
1. **dc-runtime compatibility**: Test external CSS/JS loading
2. **Inline styles**: Some may need to remain for dynamic values
3. **Animation timing**: Preserve exact animation sequences
4. **Framework constraints**: Some patterns cannot be changed

### Verification Checklist
- [ ] All CSS extracted to separate files
- [ ] All JavaScript extracted to separate files  
- [ ] No inline styles remain (except dynamic ones)
- [ ] All animations work correctly
- [ ] Navigation menu functions properly
- [ ] Timecode counter updates
- [ ] Scroll progress bar works
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] dc-runtime integration intact

## Dependencies & Considerations

### dc-runtime Constraints
1. **`<helmet>` section**: Must contain all CSS links
2. **`<script type="text/x-dc">`**: May need to remain for framework
3. **Template syntax**: Must maintain `{{ }}` interpolation
4. **Custom elements**: `<sc-if>`, `<sc-for>` must remain

### External Dependencies
1. **Google Fonts**: Already loaded externally
2. **React/ReactDOM**: Loaded via cdn through support.js
3. **support.js**: Must remain unchanged

### Build Process (Optional Future Enhancement)
Consider adding a simple build process:
- CSS preprocessing (Sass/Less)
- JavaScript bundling
- Minification
- Asset optimization

## Success Metrics
1. **File count**: From 1 to 10+ files (organized)
2. **Code readability**: Improved with separation of concerns
3. **Maintainability**: Easier to update individual components
4. **Performance**: No degradation in load times
5. **Functionality**: 100% feature parity with original