import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { typography, spacing } from '../../../shared/constants/theme';

export function ScanPlaceholderScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name="camera-outline" size={64} color={colors.primaryLight} />
      <Text style={[styles.title, { color: colors.text }]}>Scanner</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Camera integration coming in Phase 2.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  title: { ...typography.h2, marginTop: spacing.md, marginBottom: spacing.xs },
  subtitle: { ...typography.body1, textAlign: 'center' },
});
