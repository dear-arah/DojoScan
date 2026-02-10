export const colors = {
  // Primary palette
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#BBDEFB',

  // Secondary
  secondary: '#FF9800',
  secondaryDark: '#F57C00',
  secondaryLight: '#FFE0B2',

  // Semantic
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',

  // Neutrals — light mode
  background: '#FFFFFF',
  surface: '#F5F5F5',
  border: '#E0E0E0',
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  placeholder: '#9E9E9E',

  // Neutrals — dark mode
  backgroundDark: '#121212',
  surfaceDark: '#1E1E1E',
  borderDark: '#333333',
  textDark: '#FFFFFF',
  textSecondaryDark: '#B0B0B0',

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
} as const;

// ---- Typography --------------------------------------------
export const fontSizes = {
  xs: 10,
  sm: 12,
  caption: 12,
  body2: 14,
  body1: 16,
  button: 16,
  h3: 20,
  h2: 24,
  h1: 32,
  display: 40,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const typography = {
  h1: { fontSize: fontSizes.h1, fontWeight: fontWeights.bold, lineHeight: 40 },
  h2: { fontSize: fontSizes.h2, fontWeight: fontWeights.semiBold, lineHeight: 32 },
  h3: { fontSize: fontSizes.h3, fontWeight: fontWeights.semiBold, lineHeight: 28 },
  body1: { fontSize: fontSizes.body1, fontWeight: fontWeights.regular, lineHeight: 24 },
  body2: { fontSize: fontSizes.body2, fontWeight: fontWeights.regular, lineHeight: 20 },
  caption: { fontSize: fontSizes.caption, fontWeight: fontWeights.regular, lineHeight: 16 },
  button: { fontSize: fontSizes.button, fontWeight: fontWeights.medium, lineHeight: 24 },
} as const;

// ---- Spacing -----------------------------------------------
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ---- Border Radius -----------------------------------------
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

// ---- Shadows (iOS + Android) -------------------------------
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

// ---- Sizes (touch targets, icons, etc.) --------------------
export const sizes = {
  touchTarget: 44, // minimum WCAG-compliant touch target
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 64,
  inputHeight: 48,
  buttonHeight: 48,
  headerHeight: 56,
  tabBarHeight: 60,
  thumbnailSm: 150,
  thumbnailMd: 300,
} as const;