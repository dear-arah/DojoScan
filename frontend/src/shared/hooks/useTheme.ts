import { useColorScheme } from 'react-native';
import { colors } from '../constants/theme';

export type ThemeColors = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  error: string;
  success: string;
  warning: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  placeholder: string;
};

const lightTheme: ThemeColors = {
  primary: colors.primary,
  primaryDark: colors.primaryDark,
  primaryLight: colors.primaryLight,
  secondary: colors.secondary,
  error: colors.error,
  success: colors.success,
  warning: colors.warning,
  background: colors.background,
  surface: colors.surface,
  border: colors.border,
  text: colors.text,
  textSecondary: colors.textSecondary,
  textDisabled: colors.textDisabled,
  placeholder: colors.placeholder,
};

const darkTheme: ThemeColors = {
  primary: colors.primary,
  primaryDark: colors.primaryDark,
  primaryLight: colors.primaryLight,
  secondary: colors.secondary,
  error: colors.error,
  success: colors.success,
  warning: colors.warning,
  background: colors.backgroundDark,
  surface: colors.surfaceDark,
  border: colors.borderDark,
  text: colors.textDark,
  textSecondary: colors.textSecondaryDark,
  textDisabled: colors.textDisabled,
  placeholder: colors.placeholder,
};

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return { colors: isDark ? darkTheme : lightTheme, isDark };
}
