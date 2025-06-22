# Life Admin Scheduler – UI/UX & Theming TODO

A running list of improvements and polish tasks to make the app modern, clean, and consistent.

## Fonts
- [ ] Download and add Inter font TTFs to `assets/fonts/`
- [ ] Integrate font loading (e.g., with Expo Font)
- [ ] Apply Inter font globally via `ThemedText` and default styles

## Theming & Colors
- [ ] Ensure all components use the `COLORS` palette for backgrounds, text, cards, and accents
- [ ] Standardize border radius and padding across all cards, modals, and buttons
- [ ] Use soft, consistent shadows everywhere
- [ ] Add/verify light and dark mode support for all components

## UI Polish
- [ ] Add more whitespace for an airy, minimal feel
- [ ] Ensure all screens use `COLORS.background` as the main background
- [ ] Use `COLORS.card` for all cards and modals
- [ ] Ensure all buttons and interactive elements have clear, accessible touch targets and color contrast
- [ ] Refine empty states with motivational text and icons

## Components
- [ ] Refine `TaskCard` for modern look (rounded, shadow, spacing)
- [ ] Refine `TaskForm` modal for clean, minimal design
- [ ] Refine `TaskList` and `CalendarView` for consistency
- [ ] Ensure `CategoryBadge` uses correct category color and icon
- [ ] Polish `BottomNav` for modern, minimal tab bar

## Accessibility
- [ ] Add accessibility labels and roles to all interactive elements
- [ ] Ensure color contrast meets accessibility standards

## Optional/Future Features
- [ ] Export tasks to PDF or CSV
- [ ] Import/export tasks as JSON
- [ ] Calendar sync with Google/Apple
- [ ] Dark mode toggle
- [ ] Add biometric lock 