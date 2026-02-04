# Theme Configuration - RED & WHITE

## Color Palette

This project uses a **strict RED & WHITE** color scheme:

### Primary Colors
- **RED**: `#E10600` (HSL: `2 100% 44%`)
  - Primary actions, accents, branding
  - Focus states, active states
  - Call-to-action buttons
  
- **WHITE**: `#FFFFFF` (HSL: `0 0% 100%`)
  - Backgrounds (light mode)
  - Text on RED backgrounds
  - Clean, minimal aesthetics

### Supporting Colors
- **Dark Charcoal**: `#1F1F1F` (HSL: `0 0% 12%`)
  - Backgrounds (dark mode)
  - Primary text color (light mode)
  
- **Grays**: Neutral grays only (no color tint)
  - Borders, dividers, subtle UI elements
  - Muted text
  - Disabled states

## CSS Variables

All colors are defined as CSS variables in `app/globals.css`:

### Light Mode
```css
:root {
  --background: 0 0% 100%;          /* White */
  --foreground: 0 0% 15%;           /* Dark Charcoal text */
  --primary: 2 100% 44%;            /* RED #E10600 */
  --primary-foreground: 0 0% 100%;  /* White on RED */
  /* ... more variables */
}
```

### Dark Mode
```css
.dark {
  --background: 0 0% 12%;           /* Dark Charcoal */
  --foreground: 0 0% 100%;          /* White text */
  --primary: 2 100% 44%;            /* RED #E10600 */
  --primary-foreground: 0 0% 100%;  /* White on RED */
  /* ... more variables */
}
```

## Using Theme Colors

### In Tailwind Classes
```tsx
// Use semantic color names
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click Me
  </button>
</div>
```

### In shadcn/ui Components
```tsx
import { Button } from "@/components/ui/button"

// Variants automatically use theme colors
<Button variant="default">Primary RED button</Button>
<Button variant="outline">Outlined button</Button>
<Button variant="ghost">Ghost button</Button>
```

### In Custom Components
```tsx
export function CustomCard() {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground">
      <h3 className="text-lg font-semibold">Title</h3>
      <p className="text-muted-foreground">Description</p>
      <Button className="mt-4">Action</Button>
    </div>
  )
}
```

## Color Usage Guidelines

### ✅ DO:
- Use `bg-primary` for main call-to-action buttons
- Use `text-primary` for links and important text
- Use `bg-background` and `text-foreground` for main content
- Use `text-muted-foreground` for secondary text
- Use neutral grays for borders and dividers

### ❌ DON'T:
- Add blue, green, purple, or other colors
- Use arbitrary colors like `bg-blue-500`
- Mix different color schemes
- Override theme colors with hardcoded hex values

## Component Examples

### Button Variants
```tsx
<Button variant="default">     {/* RED background, WHITE text */}
<Button variant="secondary">   {/* Light gray background */}
<Button variant="outline">     {/* WHITE bg, RED border */}
<Button variant="ghost">       {/* Transparent, hover effects */}
<Button variant="destructive"> {/* RED for delete/remove */}
```

### Text Colors
```tsx
<h1 className="text-foreground">Main heading</h1>
<p className="text-muted-foreground">Secondary text</p>
<a className="text-primary hover:underline">Link</a>
```

### Backgrounds
```tsx
<div className="bg-background">Main background</div>
<div className="bg-card">Card background</div>
<div className="bg-muted">Subtle background</div>
<div className="bg-primary">RED accent background</div>
```

## Dark Mode Support

Toggle dark mode by adding the `dark` class to the `<html>` element:

```tsx
// In layout.tsx or a theme provider
<html className={darkMode ? 'dark' : ''}>
```

Dark mode automatically switches to:
- Dark charcoal backgrounds
- White text
- Same RED accent color
- Adjusted borders and subtle elements

## Customizing the Theme

### Changing the RED Shade

Edit `app/globals.css`:
```css
:root {
  --primary: 2 100% 44%;  /* Change to your RED */
}
```

### Adding More Grays

Only neutral grays are allowed:
```css
:root {
  --gray-100: 0 0% 95%;
  --gray-200: 0 0% 90%;
  /* etc... */
}
```

## shadcn/ui Integration

All shadcn/ui components automatically use the theme:

```bash
# Install a new component
npx shadcn@latest add card

# It will use the RED & WHITE theme automatically
```

Components are installed to `/components/ui` and styled with your theme colors.

## Accessibility

The theme maintains WCAG 2.1 AA contrast ratios:

- RED (`#E10600`) on WHITE: ✓ Pass
- WHITE on RED: ✓ Pass
- Dark Charcoal on WHITE: ✓ Pass
- WHITE on Dark Charcoal: ✓ Pass

## Figma/Design Handoff

Share these values with designers:

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Primary RED | `#E10600` | `#E10600` |
| Background | `#FFFFFF` | `#1F1F1F` |
| Text | `#262626` | `#FFFFFF` |
| Border | `#E5E5E5` | `#404040` |

## Migration Checklist

When updating existing components:

- [ ] Replace hardcoded colors with theme variables
- [ ] Use `bg-primary` instead of `bg-red-600`
- [ ] Use `text-foreground` instead of `text-gray-900`
- [ ] Use `border-border` instead of `border-gray-300`
- [ ] Test in both light and dark mode
- [ ] Verify no other colors are introduced

## FAQ

**Q: Can I use other colors for charts/data visualization?**  
A: Use shades of RED and grays only. Differentiate with opacity or patterns.

**Q: What about success/error states?**  
A: Use RED for destructive actions. Use opacity or iconography for states.

**Q: Can I use gradients?**  
A: Yes, but only RED to charcoal or WHITE to charcoal.

**Q: How do I show different states?**  
A: Use opacity, borders, shadows, and iconography instead of colors.

---

**Theme maintained strictly as RED & WHITE only.**
