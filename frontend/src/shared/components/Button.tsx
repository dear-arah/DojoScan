import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, sizes, typography } from '@shared/constants/theme';
import { useTheme } from '@shared/hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const { colors: themeColors } = useTheme();
  const isDisabled = disabled || loading;

  const containerStyles = [
    styles.base,
    fullWidth && styles.fullWidth,
    variant === 'primary' && { backgroundColor: themeColors.primary },
    variant === 'secondary' && { backgroundColor: themeColors.secondary },
    variant === 'outline' && {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: themeColors.primary,
    },
    variant === 'ghost' && { backgroundColor: 'transparent' },
    isDisabled && styles.disabled,
    style,
  ].filter(Boolean) as ViewStyle[];

  const labelStyles = [
    styles.label,
    (variant === 'primary' || variant === 'secondary') && { color: colors.white },
    variant === 'outline' && { color: themeColors.primary },
    variant === 'ghost' && { color: themeColors.primary },
    isDisabled && styles.labelDisabled,
    textStyle,
  ].filter(Boolean) as TextStyle[];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={containerStyles}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? themeColors.primary : colors.white}
        />
      ) : (
        <Text style={labelStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: sizes.buttonHeight,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    minWidth: sizes.touchTarget,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.button,
  },
  labelDisabled: {
    opacity: 0.7,
  },
});