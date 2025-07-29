# Sketch Thumbnails

This directory contains thumbnail images for each sketch in the gallery.

## File Naming Convention

Thumbnails should be named using the sketch's `slug` property from `sketches.tsx`:

- `random-walk.png`
- `multiplicative-epicycloid.png`
- `perlin-field.png`
- `perlin-flow.png`
- `cityscape.png`
- `drift.png`
- `psychedelic-spiral.png`

## Image Specifications

- **Format**: PNG (recommended) or JPG
- **Dimensions**: 400x300px (4:3 aspect ratio)
- **Size**: Keep under 200KB for optimal loading

## How to Create Thumbnails

1. **Manual Screenshots**:

   - Run each sketch in the browser
   - Take a screenshot when it looks good
   - Crop to 400x300px
   - Save with the correct filename

2. **Automated Capture** (future enhancement):
   - Create a script that runs each sketch for a few seconds
   - Automatically capture a frame and save it

## Fallback Behavior

If a thumbnail image is not found, the component will display:

- A gradient background with the sketch's initials
- The same hover and click behavior as thumbnailed cards

## Adding New Sketches

When adding a new sketch:

1. Add the sketch to `constants/sketches.tsx`
2. Create a thumbnail image with the filename `{slug}.png`
3. Place it in this directory
