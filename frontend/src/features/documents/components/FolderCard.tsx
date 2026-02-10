import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, borderRadius, shadows } from '../../../shared/constants/theme';

interface FolderCardProps {
  id: string;
  name: string;
  color: string;
  icon: string;
  documentCount: number;
  onPress: () => void;
  onLongPress?: () => void;
}

export function FolderCard({ name, color, icon, documentCount, onPress, onLongPress }: FolderCardProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, shadows.sm]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={28} color={color} />
      </View>
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{name}</Text>
      <Text style={[styles.count, { color: colors.textSecondary }]}>
        {documentCount} {documentCount === 1 ? 'document' : 'documents'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1,
    alignItems: 'center', marginBottom: spacing.md,
  },
  iconContainer: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  name: { ...typography.body1, fontWeight: '600', textAlign: 'center' },
  count: { ...typography.caption, marginTop: 2 },
});
