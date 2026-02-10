import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography } from '../../../shared/constants/theme';
import type { AuthScreenProps } from '../../../core/navigation/types';

export function WelcomeScreen({ navigation }: AuthScreenProps<'Welcome'>) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.hero}>
        <View style={[styles.logoPlaceholder, { backgroundColor: colors.primaryLight }]}>
          <Text style={styles.logoText}>📄</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>DojoScan</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Scan, organize, and share your documents effortlessly.
        </Text>
      </View>

      <View style={styles.features}>
        {['Smart document detection', 'OCR text extraction', 'Cloud sync across devices'].map(
          (feature, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={[styles.featureIcon, { color: colors.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ),
        )}
      </View>

      <View style={styles.buttons}>
        <Button title="Get Started" onPress={() => navigation.navigate('Register')} fullWidth />
        <Button
          title="I already have an account"
          onPress={() => navigation.navigate('Login')}
          variant="ghost"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.lg },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoPlaceholder: {
    width: 100, height: 100, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
  },
  logoText: { fontSize: 48 },
  title: { ...typography.h1, marginBottom: spacing.sm },
  subtitle: { ...typography.body1, textAlign: 'center', paddingHorizontal: spacing.xl },
  features: { paddingBottom: spacing.xl, gap: spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureIcon: { fontSize: 18, fontWeight: '700' },
  featureText: { ...typography.body1 },
  buttons: { paddingBottom: spacing.xl, gap: spacing.sm },
});
