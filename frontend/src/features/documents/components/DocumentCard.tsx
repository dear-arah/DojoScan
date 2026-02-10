import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, borderRadius, shadows, sizes } from '../../../shared/constants/theme';
import { formatFileSize, formatDate } from '../../../shared/utils/formatters';
import { MockDocument } from '../../../shared/utils/mockData';

interface DocumentCardProps {
  document: MockDocument;
  viewMode: 'grid' | 'list';
  onPress: () => void;
  onFavoriteToggle: () => void;
  onLongPress?: () => void;
}

export function DocumentCard({ document, viewMode, onPress, onFavoriteToggle, onLongPress }: DocumentCardProps) {
  const { colors } = useTheme();
  const isGrid = viewMode === 'grid';

  const syncIcon = document.syncStatus === 'synced' ? 'cloud-done-outline' :
    document.syncStatus === 'pending' ? 'cloud-upload-outline' : 'phone-portrait-outline';
  const syncColor = document.syncStatus === 'synced' ? colors.success :
    document.syncStatus === 'pending' ? colors.warning : colors.textSecondary;

  if (isGrid) {
    return (
      <TouchableOpacity
        style={[styles.gridCard, { backgroundColor: colors.surface, borderColor: colors.border }, shadows.sm]}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
      >
        <View style={[styles.gridThumbnail, { backgroundColor: document.thumbnailColor }]}>
          {document.thumbnailUri ? (
            <Image
              source={{ uri: document.thumbnailUri }}
              style={styles.gridThumbnailImage}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="document-text" size={36} color={colors.primary} />
          )}
          <View style={styles.pagesBadge}>
            <Text style={styles.pagesBadgeText}>{document.pages}p</Text>
          </View>
        </View>
        <View style={styles.gridInfo}>
          <Text style={[styles.gridTitle, { color: colors.text }]} numberOfLines={2}>
            {document.title}
          </Text>
          <View style={styles.gridMeta}>
            <Text style={[styles.gridDate, { color: colors.textSecondary }]}>
              {formatDate(document.updatedAt)}
            </Text>
            <TouchableOpacity onPress={onFavoriteToggle} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons
                name={document.isFavorite ? 'star' : 'star-outline'}
                size={18}
                color={document.isFavorite ? '#FFC107' : colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.listCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={[styles.listThumbnail, { backgroundColor: document.thumbnailColor }]}>
        {document.thumbnailUri ? (
          <Image
            source={{ uri: document.thumbnailUri }}
            style={styles.listThumbnailImage}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="document-text" size={24} color={colors.primary} />
        )}
      </View>
      <View style={styles.listInfo}>
        <Text style={[styles.listTitle, { color: colors.text }]} numberOfLines={1}>{document.title}</Text>
        <View style={styles.listMetaRow}>
          <Ionicons name={syncIcon} size={12} color={syncColor} />
          <Text style={[styles.listMeta, { color: colors.textSecondary }]}>
            {document.pages} {document.pages === 1 ? 'page' : 'pages'} · {formatFileSize(document.size)} · {formatDate(document.updatedAt)}
          </Text>
        </View>
        {document.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {document.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.primaryLight + '60' }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onFavoriteToggle} style={styles.favButton}>
        <Ionicons
          name={document.isFavorite ? 'star' : 'star-outline'}
          size={20}
          color={document.isFavorite ? '#FFC107' : colors.textSecondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Grid
  gridCard: { borderRadius: borderRadius.lg, borderWidth: 1, overflow: 'hidden', marginBottom: spacing.md },
  gridThumbnail: { height: 120, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  gridThumbnailImage: { width: '100%', height: '100%' },
  pagesBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  pagesBadgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  gridInfo: { padding: spacing.sm },
  gridTitle: { ...typography.body2, fontWeight: '500', minHeight: 36 },
  gridMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  gridDate: { ...typography.caption },

  // List
  listCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, marginBottom: spacing.sm },
  listThumbnail: { width: 48, height: 48, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  listThumbnailImage: { width: '100%', height: '100%' },
  listInfo: { flex: 1, marginLeft: spacing.md },
  listTitle: { ...typography.body1, fontWeight: '500' },
  listMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  listMeta: { ...typography.caption },
  tagsRow: { flexDirection: 'row', gap: 4, marginTop: 4 },
  tag: { paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4 },
  tagText: { fontSize: 10, fontWeight: '500' },
  favButton: { padding: spacing.sm },
});
