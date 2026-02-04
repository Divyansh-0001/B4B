# Testimonials Guide

## Adding Real Testimonials

### Location

Edit `app/page.tsx` and update the testimonials array:

```typescript
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Your actual client testimonial text here...",
    author: "Client Name",
    role: "Their Job Title",
    company: "Their Company"
  },
  // Add more testimonials...
];
```

### Testimonial Format

```typescript
interface Testimonial {
  id: number;           // Unique identifier
  quote: string;        // The testimonial text
  author: string;       // Client name
  role: string;         // Job title
  company: string;      // Company name
}
```

### Example

```typescript
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "If you're looking for exceptional security services, Be4Breach is an excellent option. Their team identified critical vulnerabilities we didn't know existed.",
    author: "John Smith",
    role: "Chief Information Security Officer",
    company: "Tech Corp International"
  },
  {
    id: 2,
    quote: "Outstanding penetration testing with comprehensive reporting. Be4Breach helped us achieve compliance and significantly improve our security posture.",
    author: "Sarah Johnson",
    role: "VP of IT Security",
    company: "Financial Services Inc"
  }
];
```

## Carousel Features

### Auto-Rotation
- Automatically rotates every 6 seconds
- Pauses on hover (future enhancement)
- Respects reduced-motion preferences

### Navigation
- Left/right arrow buttons
- Dot indicators at bottom
- Click dots to jump to specific testimonial
- Keyboard accessible

### Animations
- Fade in/out transitions
- Smooth slide up/down
- 500ms duration (or instant for reduced-motion)
- Quote icon accent

## Customization

### Change Rotation Speed

In `app/page.tsx`:

```typescript
<TestimonialCarousel 
  testimonials={testimonials}
  interval={8000}  // 8 seconds
/>
```

### Disable Auto-Rotation

```typescript
<TestimonialCarousel 
  testimonials={testimonials}
  autoRotate={false}
/>
```

### Styling

The carousel automatically uses the RED & WHITE theme:
- Quote icon: RED with low opacity
- Author initial: RED background
- Dots: Active = RED, Inactive = gray
- Arrows: Backdrop blur with hover effect

## Best Practices

### Testimonial Length
- Aim for 2-3 sentences
- Maximum 200 characters for readability
- Focus on specific benefits

### Attribution
- Always include full name
- Include job title for credibility
- Company name adds context

### Variety
- Mix different services mentioned
- Include different company sizes
- Show diverse use cases

## Client Logos

### Adding Logos

1. Place logo files in `/public/clients/`
2. Update `components/ClientLogos.tsx`:

```typescript
const clients: ClientLogo[] = [
  { name: "Client Name", logo: "/clients/logo.svg" },
];
```

### Logo Requirements
- SVG or PNG format
- Transparent background
- Optimized file size (<50KB)
- Monochrome or grayscale preferred

## Design

The testimonial section includes:
- Section header
- Client logos grid (2-6 columns responsive)
- Rotating testimonial carousel
- Auto-rotation with manual controls
- Reduced-motion support

All styled with RED & WHITE theme for consistency.

## Permission

**Important:** Only use testimonials you have explicit permission to publish. 
Verify client approval before adding any testimonial to the public site.
