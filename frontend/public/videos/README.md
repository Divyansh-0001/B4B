# Video Assets

Place your cybersecurity background video here.

## Required Video

**Filename:** `cybersecurity-bg.mp4`

**Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 or higher
- Duration: 10-30 seconds (will loop)
- Framerate: 30fps recommended
- Audio: None required (will be muted)
- Size: <10MB recommended for web performance

**Optional:** `cybersecurity-bg.webm` for better compression

## Video Content Suggestions

Cybersecurity-themed visuals:
- Abstract data streams
- Network nodes and connections
- Binary code flowing
- Digital locks and shields
- Server rooms with glowing lights
- Abstract tech patterns
- Matrix-style code rain
- Digital fingerprints
- Encryption visualizations

## Free Video Sources

1. **Pexels Videos** - https://www.pexels.com/videos/
   - Search: "cybersecurity", "technology", "data", "network"
   
2. **Pixabay Videos** - https://pixabay.com/videos/
   - Search: "technology", "digital", "cyber", "network"
   
3. **Coverr** - https://coverr.co/
   - Category: Technology, Abstract

## Optimization

Before adding video:

```bash
# Compress with ffmpeg
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -an cybersecurity-bg.mp4

# Convert to WebM (better compression)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an cybersecurity-bg.webm
```

## Fallback

If no video is provided, the component automatically falls back to:
- Animated gradient background
- RED overlay effects
- Scanline animation
- Particle effects
- Grid pattern

The experience remains cinematic even without video!
