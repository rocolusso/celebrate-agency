# Image Placeholders Guide

## ✅ Current Status

All placeholder images have been generated as **proper JPG files** with correct dimensions.

## 📐 Image Specifications

### Hero Section
- **File:** `public/images/hero/hero-bg.jpg`
- **Dimensions:** 1920x600 pixels
- **Format:** JPEG
- **Usage:** Homepage hero background

### Service Images (12 total)
- **Location:** `public/images/services/`
- **Dimensions:** 800x600 pixels (4:3 aspect ratio)
- **Format:** JPEG
- **Files:**
  1. `edinorozhka.jpg` - Pink (#FF1493)
  2. `kuromi-i-melodi.jpg` - Purple (#9D4EDD)
  3. `labubu.jpg` - Blue (#00B4D8)
  4. `labubu-i-edinorozhka.jpg` - Teal (#06D6A0)
  5. `mikki-i-minni-maus.jpg` - Red (#EF476F)
  6. `super-geroi.jpg` - Orange (#FF6B35)
  7. `tik-tok.jpg` - Cyan (#00F5FF)
  8. `umnik-i-konfetka.jpg` - Yellow (#FFD60A)
  9. `fiksiki.jpg` - Green (#90E0A0)
  10. `fyeki.jpg` - Coral (#FF9B85)
  11. `holodnoe-serdce.jpg` - Ice Blue (#A8DADC)
  12. `shchenyachij-patrul.jpg` - Royal Blue (#457B9D)

### Event Images (21 total)
- **Location:** `public/images/events/`
- **Featured Images:** 1200x675 pixels (16:9 aspect ratio)
- **Gallery Images:** 800x600 pixels (4:3 aspect ratio)
- **Format:** JPEG

**Event 1:**
- `event-1-featured.jpg` (1200x675)
- `event-1-1.jpg` through `event-1-6.jpg` (800x600)

**Event 2:**
- `event-2-featured.jpg` (1200x675)
- `event-2-1.jpg` through `event-2-6.jpg` (800x600)

**Event 3:**
- `event-3-featured.jpg` (1200x675)
- `event-3-1.jpg` through `event-3-5.jpg` (800x600)

### Generic Placeholder
- **File:** `public/images/placeholder.jpg`
- **Dimensions:** 800x600 pixels
- **Format:** JPEG

## 🔄 How to Replace Images

### Option 1: Manual Replacement
1. Prepare your real photos in the correct dimensions
2. Name them exactly as the placeholder files
3. Replace the files in the respective directories

### Option 2: Using the Generator Script
If you need to regenerate placeholders:

\`\`\`bash
node scripts/generate-jpg-placeholders.js
\`\`\`

## 📝 Image Requirements for Production

### Hero Image
- **Recommended size:** 1920x600 pixels minimum
- **Content:** Group photo of all animators
- **Format:** JPG or WebP
- **File size:** Keep under 500KB for performance

### Service Images
- **Recommended size:** 800x600 pixels minimum
- **Content:** Clear photo of each character/service
- **Format:** JPG or WebP
- **File size:** Keep under 200KB each
- **Tip:** Use bright, colorful photos with good lighting

### Event Images
- **Featured:** 1200x675 pixels minimum (16:9 ratio)
- **Gallery:** 800x600 pixels minimum (4:3 ratio)
- **Content:** Photos from actual events
- **Format:** JPG or WebP
- **File size:** Keep under 300KB for featured, 200KB for gallery

## 🎨 Image Optimization Tips

1. **Compress images** before uploading (use tools like TinyPNG, ImageOptim)
2. **Use WebP format** for better compression (Next.js will auto-convert)
3. **Maintain aspect ratios** to avoid distortion
4. **Use descriptive filenames** for SEO
5. **Add alt text** in the code for accessibility

## ✅ Verification

All images are now:
- ✅ Proper JPEG format (not SVG)
- ✅ Correct dimensions
- ✅ Referenced correctly in data files
- ✅ Working with Next.js Image component
- ✅ No "dangerouslyAllowSVG" errors

## 🚀 Next Steps

1. Replace placeholder images with real photos
2. Optimize images for web
3. Test loading performance
4. Verify images display correctly on all devices
