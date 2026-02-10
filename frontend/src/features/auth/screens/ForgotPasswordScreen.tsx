import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '../../../shared/components';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, sizes } from '../../../shared/constants/theme';
import type { AuthScreenProps } from '../../../core/navigation/types';

export function ForgotPasswordScreen({ navigation }: AuthScreenProps<'ForgotPassword'>) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityLabel="Go back">
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      {sent ? (
        <View style={styles.sentContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="mail-outline" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Check your email</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            We sent a password reset link to {email}.
          </Text>
          <Button title="Back to Login" onPress={() => navigation.navigate('Login')} fullWidth />
        </View>
      ) : (
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Reset password</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter the email associated with your account and we'll send you a reset link.
          </Text>
          <TextInput label="Email" placeholder="you@example.com" leftIcon="mail-outline"
            value={email} onChangeText={setEmail} error={error} keyboardType="email-address" autoCapitalize="none" />
          <Button title="Send Reset Link" onPress={handleSubmit} fullWidth />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.lg },
  backButton: { marginTop: spacing.md, marginBottom: spacing.lg, width: sizes.touchTarget, height: sizes.touchTarget, justifyContent: 'center' },
  sentContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  title: { ...typography.h1, marginBottom: spacing.sm },
  subtitle: { ...typography.body1, marginBottom: spacing.xl },
});
