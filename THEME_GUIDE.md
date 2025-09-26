# Dark Theme System

This project uses a permanent dark theme with hex colors defined directly in the Tailwind config, allowing you to use meaningful color names instead of hardcoded colors. The theme is always dark and cannot be switched to light mode.

## Available Semantic Colors

### Core Colors (Dark Theme Only)
- `bg-background-dark` - Main background color (dark)
- `text-foreground-dark` - Main text color (dark)
- `bg-card-dark` - Card background (dark)
- `text-card-foreground-dark` - Card text color (dark)
- `bg-popover-dark` - Popover/dropdown background (dark)
- `text-popover-foreground-dark` - Popover text color (dark)

### Brand Colors (Dark Theme Only)
- `bg-primary-dark` - Primary brand color (dark)
- `text-primary-dark-foreground` - Primary text color (dark)
- `bg-secondary-dark` - Secondary brand color (dark)
- `text-secondary-dark-foreground` - Secondary text color (dark)
- `bg-accent-dark` - Accent color for highlights (dark)
- `text-accent-foreground-dark` - Accent text color (dark)

### State Colors (Dark Theme Only)
- `bg-destructive-dark` - Error/danger states (dark)
- `text-destructive-dark-foreground` - Destructive text color (dark)
- `bg-success-dark` - Success states (dark)
- `text-success-dark-foreground` - Success text color (dark)
- `bg-warning-dark` - Warning states (dark)
- `text-warning-dark-foreground` - Warning text color (dark)
- `bg-info-dark` - Information states (dark)
- `text-info-dark-foreground` - Info text color (dark)

### Utility Colors (Dark Theme Only)
- `bg-muted-dark` - Muted/subtle color (dark)
- `text-muted-foreground-dark` - Muted text color (dark)
- `border-border-dark` - Border color (dark)
- `ring-ring-dark` - Focus ring color (dark)
- `bg-input-dark` - Input field background (dark)

### Chart Colors
- `bg-chart-1` through `bg-chart-5` - Data visualization colors (consistent across themes)

### Sidebar Colors (Dark Theme Only)
- `bg-sidebar-dark` - Sidebar background (dark)
- `text-sidebar-dark-foreground` - Sidebar text color (dark)
- `bg-sidebar-dark-primary` - Sidebar primary element (dark)
- `text-sidebar-dark-primary-foreground` - Sidebar primary text (dark)
- `bg-sidebar-dark-accent` - Sidebar accent element (dark)
- `text-sidebar-dark-accent-foreground` - Sidebar accent text (dark)

## Usage Examples

### Instead of hardcoded colors:
```jsx
// ❌ Don't do this
<div className="bg-white text-black border-gray-200">

// ✅ Do this instead
<div className="bg-background-dark text-foreground-dark border-border-dark">
```

### Button variants:
```jsx
// Primary button
<button className="bg-primary-dark text-primary-dark-foreground hover:bg-primary-dark/90">

// Destructive button
<button className="bg-destructive-dark text-destructive-dark-foreground hover:bg-destructive-dark/90">

// Success button
<button className="bg-success-dark text-success-dark-foreground hover:bg-success-dark/90">
```

### Card components:
```jsx
<div className="bg-card-dark text-card-foreground-dark border border-border-dark rounded-lg p-4">
  <h3 className="text-card-foreground-dark">Card Title</h3>
  <p className="text-muted-foreground-dark">Card description</p>
</div>
```

### Form elements:
```jsx
<input className="bg-input-dark border border-border-dark text-foreground-dark placeholder:text-muted-foreground-dark" />
```

## Dark Mode

The theme is permanently set to dark mode. The `dark` class is applied globally to the HTML element, ensuring all components use dark theme colors by default.

## Color Palette (Dark Theme Only)

- **Background**: `#0a0a0a` (near black)
- **Foreground**: `#fafafa` (near white)
- **Primary**: `#fafafa` (near white)
- **Secondary**: `#262626` (dark gray)
- **Accent**: `#262626` (dark gray)
- **Muted**: `#262626` (dark gray)
- **Border**: `#262626` (dark gray)
- **Destructive**: `#dc2626` (dark red)
- **Success**: `#16a34a` (dark green)
- **Warning**: `#d97706` (dark orange)
- **Info**: `#2563eb` (dark blue)

## Customization

To customize colors, edit the hex values directly in `tailwindcss.config.js`:

```js
colors: {
  primary: {
    dark: "#fafafa",    // Dark mode primary
  },
  background: {
    dark: "#0a0a0a",   // Dark background
  },
  // ... other dark colors
}
```

## Benefits

1. **Consistency** - All components use the same dark color system
2. **Maintainability** - Change colors in one place (Tailwind config)
3. **Accessibility** - Dark theme colors ensure proper contrast ratios
4. **Permanent Dark Mode** - Always dark, no theme switching complexity
5. **Performance** - Direct hex colors, no CSS variable lookups
6. **Simplicity** - No need for theme switching logic or state management
