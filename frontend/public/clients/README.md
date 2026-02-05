# Client Logos

Place client/partner logos in this directory.

## File Naming Convention

Use lowercase with hyphens:
- `client-name-logo.png`
- `client-name-logo.svg` (preferred for scalability)

## Image Specifications

**Format:**
- SVG (preferred) - Scalable, small file size
- PNG with transparent background
- Dimensions: 200x80px recommended

**Optimization:**
- Keep file size under 50KB
- Use transparent background
- Monochrome or grayscale for consistency

## Adding Logos

1. Place logo files in `/public/clients/`
2. Update `components/ClientLogos.tsx`:

```typescript
const clients: ClientLogo[] = [
  { name: "Client Name", logo: "/clients/client-name-logo.svg" },
  // Add more clients...
];
```

## Design Guidelines

**Display:**
- Logos shown in grayscale by default
- Color on hover
- Uniform sizing (height: 48px)
- Grid layout: 2 cols (mobile) → 6 cols (desktop)

**Accessibility:**
- Alt text for each logo
- Keyboard navigable
- Screen reader friendly

## Example

```
/public/clients/
  ├── company-a-logo.svg
  ├── company-b-logo.png
  └── company-c-logo.svg
```

Then in `ClientLogos.tsx`:

```typescript
const clients = [
  { name: "Company A", logo: "/clients/company-a-logo.svg" },
  { name: "Company B", logo: "/clients/company-b-logo.png" },
  { name: "Company C", logo: "/clients/company-c-logo.svg" },
];
```
