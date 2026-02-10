import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '../../../shared/components';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, borderRadius, sizes } from '../../../shared/constants/theme';
import { validators } from '../../../shared/utils/validators';
import { authService } from '../services/authService';
import type { AuthScreenProps } from '../../../core/navigation/types';

export function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: typeof errors = {};
    const emailErr = validators.email(email);
    const passErr = password ? (password.length < 8 ? 'Minimum 8 characters' : null) : 'Password is required';
    if (emailErr) e.email = emailErr;
    if (passErr) e.password = passErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: Replace with authService.login() when backend is ready
      await authService.mockLogin(email, password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Please try again');
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

          <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to access your documents</Text>

          <View>
            <TextInput label="Email" placeholder="you@example.com" leftIcon="mail-outline"
              value={email} onChangeText={setEmail} error={errors.email}
              keyboardType="email-address" autoCapitalize="none" />
            <TextInput label="Password" placeholder="Enter your password" leftIcon="lock-closed-outline"
              isPassword value={password} onChangeText={setPassword} error={errors.password} />
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot password?</Text>
            </TouchableOpacity>
            <Button title="Sign In" onPress={handleLogin} fullWidth loading={loading} />
          </View>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]} accessibilityLabel="Sign in with Google">
              <Ionicons name="logo-google" size={20} color={colors.text} />
              <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]} accessibilityLabel="Sign in with Apple">
              <Ionicons name="logo-apple" size={20} color={colors.text} />
              <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>Sign Up</Text>
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
  forgotPassword: { alignSelf: 'flex-end', marginBottom: spacing.lg, padding: spacing.xs },
  forgotPasswordText: { ...typography.body2, fontWeight: '500' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { ...typography.body2, marginHorizontal: spacing.md },
  socialButtons: { flexDirection: 'row', gap: spacing.md },
  socialButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: sizes.buttonHeight, borderWidth: 1.5, borderRadius: borderRadius.md, gap: spacing.sm },
  socialText: { ...typography.button },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  footerText: { ...typography.body2 },
  footerLink: { ...typography.body2, fontWeight: '600' },
});
