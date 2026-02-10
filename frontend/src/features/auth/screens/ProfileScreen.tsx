import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, borderRadius, colors as themeTokens } from '../../../shared/constants/theme';
import { Button } from '../../../shared/components';
import { useAuthStore } from '../../../core/state/authStore';
import { usePreferencesStore } from '../../../core/state/preferencesStore';
import { useDocumentStore } from '../../../core/state/documentStore';
import { formatFileSize } from '../../../shared/utils/formatters';

function SettingsRow({ icon, label, value, onPress, rightElement }: {
  icon: keyof typeof Ionicons.glyphMap; label: string; value?: string;
  onPress?: () => void; rightElement?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.settingsRow, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress && !rightElement}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <Ionicons name={icon} size={22} color={colors.primary} style={styles.rowIcon} />
      <Text style={[styles.rowLabel, { color: colors.text }]}>{label}</Text>
      {rightElement || (
        <View style={styles.rowRight}>
          {value && <Text style={[styles.rowValue, { color: colors.textSecondary }]}>{value}</Text>}
          {onPress && <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />}
        </View>
      )}
    </TouchableOpacity>
  );
}

export function ProfileScreen() {
  const { colors } = useTheme();
  const { user, logout } = useAuthStore();
  const { autoUpload, setAutoUpload, wifiOnlyUpload, setWifiOnlyUpload, compressionQuality, setCompressionQuality } = usePreferencesStore();
  const { documents } = useDocumentStore();

  const totalSize = documents.reduce((sum, d) => sum + d.size, 0);
  const storageLimit = 100_000_000; // 100MB free
  const storagePercent = Math.round((totalSize / storageLimit) * 100);

  const displayName = user?.displayName || 'DojoScan User';
  const email = user?.email || 'user@dojoscan.app';
  const tier = user?.subscriptionTier || 'free';

  const handleQuality = () => {
    const options: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    const current = options.indexOf(compressionQuality);
    setCompressionQuality(options[(current + 1) % 3]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Profile</Text>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>{displayName}</Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{email}</Text>
            <View style={[styles.tierBadge, { backgroundColor: tier === 'free' ? colors.surface : colors.primaryLight }]}>
              <Text style={[styles.tierText, { color: tier === 'free' ? colors.textSecondary : colors.primary }]}>
                {tier.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Storage */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Storage</Text>
          <View style={styles.storageBar}>
            <View style={[styles.storageTrack, { backgroundColor: colors.border }]}>
              <View style={[styles.storageFill, {
                backgroundColor: storagePercent > 80 ? themeTokens.error : colors.primary,
                width: `${Math.min(storagePercent, 100)}%`,
              }]} />
            </View>
          </View>
          <Text style={[styles.storageText, { color: colors.textSecondary }]}>
            {formatFileSize(totalSize)} of {formatFileSize(storageLimit)} used ({storagePercent}%)
          </Text>
          {storagePercent > 80 && (
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.upgradeBtnText}>Upgrade to Pro</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Preferences */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <SettingsRow icon="cloud-upload-outline" label="Auto Upload"
            rightElement={<Switch value={autoUpload} onValueChange={setAutoUpload} trackColor={{ true: colors.primary }} />}
          />
          <SettingsRow icon="wifi-outline" label="Wi-Fi Only Upload"
            rightElement={<Switch value={wifiOnlyUpload} onValueChange={setWifiOnlyUpload} trackColor={{ true: colors.primary }} />}
          />
          <SettingsRow icon="image-outline" label="Image Quality" value={compressionQuality} onPress={handleQuality} />
          <SettingsRow icon="language-outline" label="OCR Language" value="English" onPress={() => Alert.alert('OCR Language', 'Language selection coming soon')} />
        </View>

        {/* About */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <SettingsRow icon="information-circle-outline" label="Version" value="1.0.0" />
          <SettingsRow icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => Alert.alert('Privacy', 'Privacy policy URL')} />
          <SettingsRow icon="document-text-outline" label="Terms of Service" onPress={() => Alert.alert('Terms', 'Terms of service URL')} />
          <SettingsRow icon="help-circle-outline" label="Help & Support" onPress={() => Alert.alert('Support', 'support@dojoscan.app')} />
        </View>

        {/* Sign Out */}
        <View style={styles.logoutSection}>
          <Button title="Sign Out" onPress={() => {
            Alert.alert('Sign Out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: logout },
            ]);
          }} variant="outline" fullWidth />
          <Text style={[styles.versionText, { color: colors.textDisabled }]}>DojoScan v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenTitle: { ...typography.h1, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  profileCard: { flexDirection: 'row', alignItems: 'center', margin: spacing.lg, marginTop: 0, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1 },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, fontWeight: '700' },
  profileInfo: { marginLeft: spacing.md, flex: 1 },
  profileName: { ...typography.h3 },
  profileEmail: { ...typography.body2, marginTop: 2 },
  tierBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginTop: 4 },
  tierText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  section: { marginHorizontal: spacing.lg, marginBottom: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, padding: spacing.md },
  sectionTitle: { ...typography.body1, fontWeight: '600', marginBottom: spacing.sm },
  storageBar: { marginBottom: spacing.xs },
  storageTrack: { height: 8, borderRadius: 4, overflow: 'hidden' },
  storageFill: { height: '100%', borderRadius: 4 },
  storageText: { ...typography.caption },
  upgradeBtn: { marginTop: spacing.sm, paddingVertical: 8, borderRadius: borderRadius.md, alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  rowIcon: { marginRight: spacing.md },
  rowLabel: { ...typography.body1, flex: 1 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowValue: { ...typography.body2 },
  logoutSection: { padding: spacing.lg, paddingTop: spacing.sm, alignItems: 'center' },
  versionText: { ...typography.caption, marginTop: spacing.md },
});
