/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Life Admin custom color palette
export const COLORS = {
  calmBlue: '#3A7CA5', // Calm blue
  black: '#000000', // Black
  white: '#FFFFFF', // White
  lightGray: '#F4F4F4', // Light gray
  charcoal: '#2D2D2D', // Charcoal
  shadow: 'rgba(0,0,0,0.08)',
  health: '#43A047', // Green
  bills: '#FFD600', // Yellow
  documents: '#FFB300', // Orange
  personal: '#3A7CA5', // Blue
  custom: '#AB47BC', // Purple
};


export const Colors = {
  light: {
    accent: "#5F6FFF",
    faded: "#e0e0e0",
    headText: COLORS.black,
    subText: COLORS.charcoal,
    fadedText: '#687076',
    background: '#F8F9FA',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    card: COLORS.white,
    tabIconSelected: '#0a7ea4',
    border: '#E0E0E0',
    shadow: 'rgba(0,0,0,0.08)',
    alert: '#FF5252', // Red for alerts
    success: '#4CAF50', // Green for success messages
    warning: '#FF9800', // Orange for warnings
    info: '#2196F3', // Blue for informational messages
  },
  dark: {
    accent: "#7F5AF0",
    headText: COLORS.white,
    subText: COLORS.lightGray,
    fadedText: '#9BA1A6',
    faded: "#44475a",
    background: '#1E2022',
    tint: COLORS.white,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    card: COLORS.black,
    tabIconSelected: COLORS.white,
    border: '#2C2F33',
    shadow: 'rgb(255, 255, 255)',
    alert: '#FF5252', // Red for alerts
    success: '#4CAF50', // Green for success messages
    warning: '#FF9800', // Orange for warnings
    info: '#2196F3', // Blue for informational messages
  },
};


