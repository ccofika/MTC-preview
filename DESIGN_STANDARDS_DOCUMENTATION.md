# MTC HomePage Design Standards & Guidelines

## Overview
This document outlines the current design system and technical guidelines for the MTC aluminum systems website, based on the actual HomePage implementation. This serves as the definitive guide for maintaining consistency and implementing future pages that match the current HomePage's design system exactly.

---

## Major Changes Implemented

### 1. Hero Section Transformation
**Before**: Basic hero with simple grid layout
**After**: Premium, immersive hero experience with:
- **Modern Dark Theme**: Professional dark gradient background (neutral-900 → neutral-800)
- **Enhanced Visual Hierarchy**: Premium quality badge, structured stats display
- **Interactive Elements**: Floating product icons with mouse tracking
- **Feature Card**: Glass morphism card showcasing key benefits
- **Advanced CTAs**: Icons integrated with buttons for better UX
- **Responsive Stats**: Quick company credentials (15+ years, 1000+ projects, ISO certified)

### 2. Values Section Enhancement
**Before**: Simple three-column layout with basic cards
**After**: Sophisticated presentation with:
- **Numbered Cards**: Clear visual progression (01, 02, 03)
- **Featured Card Design**: First card highlighted with gradient background
- **Modern Icons**: SVG icons replacing generic images
- **Feature Tags**: ISO 9001:2015, CE marking, latest technologies, etc.
- **Advanced Animations**: Hover effects with gradient borders and transforms
- **Improved Typography**: Better hierarchy with display fonts

### 3. Products Section Modernization
**Before**: Basic product slideshow
**After**: Professional showcase with:
- **Dark Theme Integration**: Consistent with hero section
- **Grid Layout**: Responsive product cards instead of slider
- **Enhanced Interactions**: Smooth hover transitions and overlays
- **Professional Imagery**: Better image treatment and filters
- **Modern Typography**: Improved text hierarchy and spacing

### 4. Recent Projects Refinement
**Before**: Basic project cards
**After**: Premium project showcase with:
- **Glass Morphism Cards**: Modern semi-transparent design
- **Enhanced Metadata**: Better project year and category tags
- **Improved Imagery**: Professional image scaling and filters
- **Modern Layout**: Better spacing and typography
- **Advanced Shadows**: Multiple shadow layers for depth

---

## Design System Specifications

### Color Palette

#### Primary Brand Colors - Orange System
**The restored orange brand color (#da5913) is the core of our identity.**

```css
--primary-50: #fef7f0   /* Lightest orange tint */
--primary-100: #feedde  /* Light backgrounds */
--primary-200: #fcd9bd  /* Subtle borders */
--primary-300: #fab083  /* Secondary accents */
--primary-400: #f7803f  /* Interactive highlights */
--primary-500: #da5913  /* PRIMARY BRAND COLOR - Orange */
--primary-600: #cc4a0c  /* Primary hover state */
--primary-700: #aa390c  /* Primary active state */
--primary-800: #88300f  /* Dark orange variants */
--primary-900: #6f2a10  /* Darkest orange */

/* Primary Color Usage */
--primary-color: var(--primary-500);     /* Main brand color */
--primary-light: var(--primary-400);     /* Lighter variant */
--primary-dark: var(--primary-600);      /* Darker variant */
```

**Critical**: Always use `#da5913` as the primary brand color. This orange represents MTC's aluminum systems identity.

#### Neutral System
```css
--neutral-50: #fafafa   /* Background light */
--neutral-100: #f5f5f5  /* Background subtle */
--neutral-200: #e5e5e5  /* Borders light */
--neutral-300: #d4d4d4  /* Borders */
--neutral-400: #a3a3a3  /* Text muted */
--neutral-500: #737373  /* Text secondary */
--neutral-600: #525252  /* Text primary */
--neutral-700: #404040  /* Text strong */
--neutral-800: #262626  /* Backgrounds dark */
--neutral-900: #171717  /* Text darkest */
--neutral-950: #0a0a0a  /* Backgrounds darkest */
```

#### Semantic Colors
```css
--success-500: #10b981  /* Success states */
--error-500: #ef4444    /* Error states */
--warning-500: #f59e0b  /* Warning states */
--info-500: #3b82f6     /* Info states */
```

### Typography System

#### Font Families
- **Primary**: 'Inter', system fonts fallback
- **Display**: 'Inter' with optimized spacing for headlines

#### Font Scale
```css
--text-xs: 0.75rem      /* 12px - Captions */
--text-sm: 0.875rem     /* 14px - Secondary text */
--text-base: 1rem       /* 16px - Body text */
--text-lg: 1.125rem     /* 18px - Large body */
--text-xl: 1.25rem      /* 20px - Subheadings */
--text-2xl: 1.5rem      /* 24px - Small headlines */
--text-3xl: 1.875rem    /* 30px - Medium headlines */
--text-4xl: 2.25rem     /* 36px - Large headlines */
--text-5xl: 3rem        /* 48px - Hero text */
--text-6xl: 3.75rem     /* 60px - Display text */
--text-7xl: 4.5rem      /* 72px - Large display */
```

#### Font Weights
```css
--font-light: 300       /* Light text */
--font-normal: 400      /* Regular text */
--font-medium: 500      /* Medium emphasis */
--font-semibold: 600    /* Semi-bold */
--font-bold: 700        /* Bold */
--font-extrabold: 800   /* Extra bold */
```

### Spacing System (8px Grid)
```css
--space-1: 0.25rem      /* 4px */
--space-2: 0.5rem       /* 8px */
--space-3: 0.75rem      /* 12px */
--space-4: 1rem         /* 16px */
--space-5: 1.25rem      /* 20px */
--space-6: 1.5rem       /* 24px */
--space-8: 2rem         /* 32px */
--space-10: 2.5rem      /* 40px */
--space-12: 3rem        /* 48px */
--space-16: 4rem        /* 64px */
--space-20: 5rem        /* 80px */
--space-24: 6rem        /* 96px */
--space-32: 8rem        /* 128px */
```

### Border Radius System
```css
--radius-sm: 0.125rem   /* 2px - Tight corners */
--radius-base: 0.25rem  /* 4px - Default */
--radius-md: 0.375rem   /* 6px - Subtle rounding */
--radius-lg: 0.5rem     /* 8px - Cards */
--radius-xl: 0.75rem    /* 12px - Large cards */
--radius-2xl: 1rem      /* 16px - Feature cards */
--radius-3xl: 1.5rem    /* 24px - Hero elements */
--radius-full: 9999px   /* Fully rounded */
```

### Shadow System
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)      /* Subtle */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1)...    /* Light */
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1)... /* Default */
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1)... /* Medium */
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1)... /* Large */
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)  /* Extra large */
--shadow-2xl: 0 50px 100px -20px rgba(0, 0, 0, 0.25) /* Maximum */
```

---

## Component Standards

### Button System

#### Base Button Structure
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-normal);
  line-height: 1;
}
```

#### btn-primary (Orange Brand)
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: var(--color-white);
  border-color: var(--primary-500);
  box-shadow: 0 4px 15px rgba(218, 89, 19, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(218, 89, 19, 0.4);
}
```

#### btn-secondary (Glass Effect)
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.1);
}
```

#### btn-outline (Outline Style)
```css
.btn-outline {
  background-color: transparent;
  color: var(--primary-600);
  border-color: var(--primary-500);
}

.btn-outline:hover {
  background-color: var(--primary-500);
  color: var(--color-white);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(218, 89, 19, 0.3);
}
```

#### btn-large (Large Variant)
```css
.btn-large {
  padding: var(--space-5) var(--space-8);
  font-size: var(--text-lg);
}
```

#### btn-with-icon (With Arrow)
```css
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.btn-with-icon svg {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-normal);
}

.btn-with-icon:hover svg {
  transform: translateX(2px);
}
```

### Card Components

#### Value Cards
```css
.value-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: var(--space-10) var(--space-8);
  border-radius: var(--radius-2xl);
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  cursor: pointer;
}

.value-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Number Badge */
.value-number {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  font-size: var(--text-4xl);
  font-weight: 800;
  color: rgba(115, 115, 115, 0.15);
  line-height: 1;
}

/* Icon Container */
.value-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto var(--space-8) auto;
  background: linear-gradient(135deg, rgba(115, 115, 115, 0.1) 0%, rgba(115, 115, 115, 0.15) 100%);
  border: 2px solid rgba(115, 115, 115, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.value-card:hover .value-icon {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(115, 115, 115, 0.2);
}

/* Feature Tags */
.value-features .feature {
  background: rgba(115, 115, 115, 0.1);
  color: var(--neutral-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  border: 1px solid rgba(115, 115, 115, 0.2);
}
```

#### Project Cards (Glass Morphism)
```css
.project-slide {
  position: relative;
  height: 320px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
}

.project-slide:hover {
  transform: translateY(-20px) scale(1.03);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Project Tags */
.project-year, .project-type {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
  margin-right: var(--spacing-2);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(218, 89, 19, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.project-slide:hover .project-year,
.project-slide:hover .project-type {
  background: linear-gradient(135deg, var(--primary-400) 0%, var(--primary-500) 100%);
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 3px 8px rgba(218, 89, 19, 0.5);
}
```

### Section Header Pattern

**Standard Structure**: section-label → section-title → section-subtitle → (optional button)

```css
.section-header {
  text-align: center;
  margin-bottom: var(--spacing-20);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* 1. Section Label (Small Badge) */
.section-label span {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: var(--color-white);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(218, 89, 19, 0.4);
}

/* 2. Section Title */
.section-title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin: 0;
  color: var(--color-black);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-base);
  box-shadow: 0 2px 8px rgba(218, 89, 19, 0.3);
}

/* 3. Section Subtitle */
.section-subtitle {
  font-size: var(--text-lg);
  color: var(--neutral-600);
  margin: 0;
  max-width: 600px;
  line-height: 1.6;
}

/* 4. Section Button (Optional) */
.section-header .btn {
  margin-top: 0;
  padding: var(--space-4) var(--space-8);
  font-weight: 600;
  border-width: 2px;
}
```

---

### Floating Elements System

**Used in Hero Section with Mouse Tracking**

```css
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 6;
}

.floating-element {
  position: absolute;
  transition: transform 0.2s ease-out;
  transform-origin: center;
  will-change: transform;
}

.floating-element .icon-image {
  display: block;
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
  transition: filter 0.3s ease;
}

/* Element Positions */
.floating-element.element-1 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Behind main content */
}

.floating-element.element-2 {
  top: 10%;
  left: 10%;
  z-index: 4;
}

/* JavaScript Mouse Tracking */
/* Applied via useEffect with mousemove event listener */
/* Different multipliers: [0.015, 0.018, 0.02, 0.017] */
```

### Product Slideshow System

```css
.product-slideshow {
  display: flex;
  gap: var(--spacing-2);
  justify-content: center;
  align-items: stretch;
  overflow: hidden;
  border-radius: var(--radius-xl);
  height: 450px;
  box-shadow: var(--shadow-lg);
}

.product-slide {
  position: relative;
  flex: 1.2;
  min-width: 120px;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.product-slide:hover {
  flex: 3.5;
  box-shadow: var(--shadow-xl);
  z-index: 10;
}

.product-slide:not(:hover) {
  flex: 0.7;
  transform: scale(0.98);
  filter: grayscale(10%) brightness(0.9);
}

.product-slideshow:hover .product-slide:not(:hover) {
  flex: 0.5;
  transform: scale(0.95);
  filter: grayscale(20%) brightness(0.8);
}
```

## Animation & Interaction Standards

### Transition System
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)     /* Quick feedback */
--transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1)   /* Default */
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)     /* Smooth transitions */
--transition-bounce: 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55) /* Bounce effect */
```

### Animation Principles
1. **Purposeful Motion**: Every animation serves a functional purpose
2. **Consistent Easing**: Use system easing curves
3. **Appropriate Duration**: Fast for feedback (150ms), normal for transitions (300ms)
4. **Respect Motion Preferences**: Disable animations for users who prefer reduced motion
5. **Layer Separation**: Different z-index values for proper stacking

### Hover Effects
- **Cards**: translateY(-8px to -12px) + enhanced shadows
- **Buttons**: translateY(-1px to -2px) + enhanced shadows
- **Icons**: scale(1.05 to 1.1) + enhanced filters
- **Images**: scale(1.05) + improved contrast/brightness

---

## Responsive Design Standards

### Breakpoint System
```css
/* Mobile-first approach */
@media (max-width: 480px)  /* Extra small devices */
@media (max-width: 768px)  /* Mobile devices */
@media (max-width: 1024px) /* Tablet devices */
@media (min-width: 1536px) /* Extra large screens */
```

### Container Behavior
- **Mobile**: Full-width with minimal padding (--space-3 to --space-4)
- **Tablet**: Moderate padding (--space-6)
- **Desktop**: Max-width 1280px with generous padding
- **Extra Large**: Max-width 1536px

### Grid Adaptations

#### Hero Section
```css
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-20);
  align-items: center;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
    text-align: center;
  }
}
```

#### Values Section
```css
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-10);
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
  }
}
```

#### Product Slideshow
```css
/* Desktop: Flexible slideshow */
.product-slideshow {
  display: flex;
  height: 450px;
}

/* Mobile: Column layout */
@media (max-width: 768px) {
  .product-slideshow {
    flex-direction: column;
    height: auto;
    gap: var(--spacing-4);
  }
  
  .product-slide {
    flex: none;
    height: 200px;
  }
}
```

#### Projects Section
```css
.projects-slider {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 768px) {
  .projects-slider {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
}
```

---

## Accessibility Standards

### Focus Management
```css
*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Motion Respect
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus states
- Color is not the only means of conveying information

---

## Performance Optimizations

### CSS Architecture
- **Scoped Styles**: All styles scoped to `.home-page` class
- **CSS Custom Properties**: Consistent design token usage
- **Efficient Selectors**: Minimal nesting, specific selectors
- **Font Loading**: System font fallbacks for immediate rendering

### Image Optimization
- **Lazy Loading**: `loading="lazy"` on non-critical images
- **Responsive Images**: Proper `object-fit` usage
- **Optimized Filters**: GPU-accelerated transforms

### Animation Performance
- **GPU Acceleration**: `transform` and `opacity` for animations
- **Will-Change**: Strategic use for complex animations
- **Containment**: Proper stacking contexts

---

### Loading & Error States

**Implement consistent loading skeletons and error handling**

```css
/* Loading Skeleton */
.loading-skeleton {
  animation: pulse 1.5s ease-in-out infinite alternate;
}

.skeleton {
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.skeleton-image {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 2s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error-state p {
  margin-bottom: 1rem;
  color: #dc3545;
}
```

## Implementation Guidelines

### Creating New Pages
1. **Follow Section Pattern**: Always use section-label → section-title → section-subtitle → button structure
2. **Use Orange Brand Color**: `--primary-500: #da5913` for all primary actions and accents
3. **Implement Button Variations**: Use btn-primary, btn-secondary, btn-outline, btn-with-icon as needed
4. **Add Floating Elements**: For hero sections, use the floating elements pattern with mouse tracking
5. **Include Loading States**: Always implement skeleton loading for dynamic content
6. **Mobile-First**: Start with mobile layout, enhance for desktop

### Component Reuse
1. **Value Cards**: Use for feature highlights, benefits, or service descriptions
2. **Project Cards**: Use for case studies, portfolio items, or testimonials
3. **Product Slideshow**: Use for any product/service showcase
4. **Section Headers**: Use consistent header pattern across all sections

### Design Token Usage
```css
/* Always use these for consistency */
--primary-color: var(--primary-500);    /* #da5913 */
--spacing-standard: var(--space-6);     /* 24px */
--radius-standard: var(--radius-lg);    /* 8px */
--shadow-standard: var(--shadow-base);  /* Standard depth */
--transition-standard: var(--transition-normal); /* 300ms */
```

### Extending Color Palette
1. **Maintain Consistency**: Follow established naming conventions
2. **Test Contrast**: Ensure WCAG compliance
3. **Document Usage**: Update this guide with new colors

### Typography Additions
1. **Use Existing Scale**: Avoid creating new font sizes
2. **Semantic Naming**: Use purpose-based naming (not appearance-based)
3. **Test Readability**: Ensure good contrast and spacing

### Component Variations
1. **Extend Base Components**: Build on existing patterns
2. **Consistent Behavior**: Match interaction patterns
3. **Document Changes**: Update design system documentation

---

## Browser Support

### Modern Browsers (Primary)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- **CSS Grid**: Primary layout method with flexbox fallbacks
- **Custom Properties**: Extensive use with fallback values
- **Backdrop Filter**: Enhanced with graceful degradation

### Polyfills (if needed)
- CSS custom properties for older browsers
- Grid layout polyfills if required
- Intersection Observer for scroll animations

---

## Maintenance Guidelines

### Code Organization
1. **Logical Grouping**: Related styles grouped together
2. **Consistent Naming**: Follow established conventions
3. **Documentation**: Comment complex calculations and decisions
4. **Version Control**: Meaningful commit messages for changes

### Performance Monitoring
1. **Bundle Size**: Monitor CSS bundle growth
2. **Runtime Performance**: Test animation performance
3. **Core Web Vitals**: Ensure design doesn't hurt metrics

### Design Updates
1. **Token-First**: Update design tokens before components
2. **Cascading Changes**: Consider system-wide impact
3. **Testing**: Test across different devices and browsers
4. **Documentation**: Keep this guide updated

---

### Quick Reference - Essential Patterns

#### Page Structure Template
```jsx
<div className="page-name">
  <Header language={language} onLanguageChange={changeLanguage} content={content} />
  
  {/* Hero Section */}
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        {/* Content */}
      </div>
    </div>
  </section>
  
  {/* Standard Section */}
  <section className="section-name">
    <div className="container">
      <div className="section-header">
        <div className="section-label">
          <span>Label Text</span>
        </div>
        <h2 className="section-title">Section Title</h2>
        <p className="section-subtitle">Section description</p>
        <button className="btn btn-outline btn-with-icon">
          <span>Button Text</span>
          <svg><!-- Arrow icon --></svg>
        </button>
      </div>
      {/* Section content */}
    </div>
  </section>
  
  <Footer content={content} />
</div>
```

#### Color Usage Quick Guide
- **Primary Actions**: `--primary-500` (#da5913)
- **Hover States**: `--primary-600` (#cc4a0c) 
- **Active States**: `--primary-700` (#aa390c)
- **Light Accents**: `--primary-400` (#f7803f)
- **Backgrounds**: `--neutral-50` (#fafafa)
- **Text**: `--neutral-900` (#171717)
- **Secondary Text**: `--neutral-600` (#525252)

#### Button Usage Guide
- **Primary CTA**: `btn btn-primary btn-large`
- **Secondary Actions**: `btn btn-secondary`
- **Navigation Links**: `btn btn-outline btn-with-icon`
- **Hero Actions**: `btn btn-primary btn-large` + `btn btn-secondary btn-large`

## Conclusion

This documentation reflects the actual implementation of the MTC HomePage and serves as the definitive guide for maintaining design consistency. The orange brand color (#da5913) is central to the identity, and all components follow the established patterns for professional, modern user experience.

**Key Implementation Rules:**
1. Always use the section-label → section-title → section-subtitle pattern
2. Use the orange primary color (#da5913) for all brand elements
3. Implement button variations consistently (btn-primary, btn-outline, btn-with-icon)
4. Include loading states and error handling for dynamic content
5. Follow the mobile-first responsive approach
6. Use the floating elements pattern for engaging hero sections

All future pages must follow these exact patterns to maintain the professional, cohesive design system established by the HomePage implementation.