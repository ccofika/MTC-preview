# NISSAL Intro Animation

Ultra-modern 5-second intro animation for NISSAL aluminum systems company, designed with 2025 web design trends.

## Features

### 🎨 **Modern 2025 Design**
- **Dynamic particle system** with physics-based animations
- **Technical blueprint lines** drawing from center outward  
- **Laser-drawn tagline** with progressive reveal
- **Glow effects** and pulsing animations
- **Bounce animations** for tech indicators
- **Cinematic zoom** and automatic homepage transition

### ⚡ **Performance Optimized**
- **5 seconds** duration (150 frames at 30fps)
- **1920x1080** Full HD resolution
- **Responsive animations** that work on all screen sizes
- **Optimized rendering** with hardware acceleration

### 🏭 **NISSAL Brand Identity**
- **Aluminum framework** visual elements
- **Industrial color palette** (silver/gray with orange accents)
- **Technical precision** aesthetic with clean lines
- **Professional typography** with Inter font family

## Animation Sequence

1. **0-0.5s**: Particle system initialization
2. **0.5-1.5s**: Technical blueprint lines draw from center
3. **1.5-2s**: Aluminum framework logo formation
4. **2-2.5s**: NISSAL text reveal with glow and pulsing
5. **2.5-3.5s**: Laser-drawn tagline animation
6. **3-3.5s**: Tech indicators bounce in
7. **4-5s**: Cinematic zoom and automatic fade to homepage

## Commands

```bash
# Preview animation in browser
npm run intro:preview

# Render to MP4 video
npm run intro:render
```

## Technical Details

- **Framework**: Remotion.dev with React/TypeScript
- **Animations**: Spring physics and custom easing functions
- **Effects**: SVG filters, CSS transforms, and backdrop filters
- **Output**: H.264 MP4 with optimized compression
- **File size**: ~1.2MB for 5-second video

## Customization

The animation can be customized by modifying props in `Root.tsx`:

```tsx
defaultProps={{
  brandName: 'NISSAL',
  tagline: 'Aluminijumski sistemi'
}}
```

## Browser Compatibility

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

Automatically includes hardware acceleration and modern CSS features with graceful fallbacks.