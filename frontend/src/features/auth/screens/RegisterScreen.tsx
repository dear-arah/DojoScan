import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '../../../shared/components';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, sizes } from '../../../shared/constants/theme';
import { validators } from '../../../shared/utils/validators';
import { authService } from '../services/authService';
import type { AuthScreenProps } from '../../../core/navigation/types';

export function RegisterScreen({ navigation }: AuthScreenProps<'Register'>) {
  const { colors } = useTheme();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const nameErr = validators.displayName(displayName);
    const emailErr = validators.email(email);
    const passErr = validators.password(password);
    const confirmErr = validators.confirmPassword(password, confirmPassword);
    if (nameErr) e.displayName = nameErr;
    if (emailErr) e.email = emailErr;
    if (passErr) e.password = passErr;
    if (confirmErr) e.confirmPassword = confirmErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: Replace with authService.register() when backend is ready
      await authService.mockRegister(email, displayName);
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Start scanning and organizing your documents</Text>
          <View>
            <TextInput label="Full Name" placeholder="John Doe" leftIcon="person-outline"
              value={displayName} onChangeText={setDisplayName} error={errors.displayName} />
            <TextInput label="Email" placeholder="you@example.com" leftIcon="mail-outline"
              value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
            <TextInput label="Password" placeholder="Min. 8 characters" leftIcon="lock-closed-outline"
              isPassword value={password} onChangeText={setPassword} error={errors.password} />
            <TextInput label="Confirm Password" placeholder="Re-enter your password" leftIcon="lock-closed-outline"
              isPassword value={confirmPassword} onChangeText={setConfirmPassword} error={errors.confirmPassword} />
            <View style={styles.spacer} />
            <Button title="Create Account" onPress={handleRegister} fullWidth loading={loading} />
          </View>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  backButton: { marginTop: spacing.md, marginBottom: spacing.lg, width: sizes.touchTarget, height: sizes.touchTarget, justifyContent: 'center' },
  title: { ...typography.h1, marginBottom: spacing.xs },
  subtitle: { ...typography.body1, marginBottom: spacing.xl },
  spacer: { height: spacing.md },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  footerText: { ...typography.body2 },
  footerLink: { ...typography.body2, fontWeight: '600' },
});
