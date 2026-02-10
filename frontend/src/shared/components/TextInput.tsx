import React, { useState } from 'react';
import {
  View, TextInput as RNTextInput, Text, StyleSheet,
  TouchableOpacity, TextInputProps as RNTextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, sizes, typography } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function TextInput({ label, error, leftIcon, isPassword = false, ...rest }: TextInputProps) {
  const { colors: themeColors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error ? themeColors.error : isFocused ? themeColors.primary : themeColors.border;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>}
      <View style={[styles.inputContainer, { borderColor, backgroundColor: themeColors.surface }]}>
        {leftIcon && (
          <Ionicons name={leftIcon} size={20} color={themeColors.placeholder} style={styles.leftIcon} />
        )}
        <RNTextInput
          style={[styles.input, { color: themeColors.text }, leftIcon && { paddingLeft: 0 }]}
          placeholderTextColor={themeColors.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize={isPassword ? 'none' : rest.autoCapitalize}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={themeColors.placeholder} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, { color: themeColors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { ...typography.body2, fontWeight: '500', marginBottom: spacing.xs },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', height: sizes.inputHeight,
    borderWidth: 1.5, borderRadius: borderRadius.md, paddingHorizontal: spacing.md,
  },
  leftIcon: { marginRight: spacing.sm },
  input: { flex: 1, ...typography.body1, height: '100%' },
  error: { ...typography.caption, marginTop: spacing.xs },
});
