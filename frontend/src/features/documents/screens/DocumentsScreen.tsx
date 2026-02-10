import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, sizes } from '../../../shared/constants/theme';
import { SearchBar, FAB, EmptyState } from '../../../shared/components';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useDocumentStore } from '../../../core/state/documentStore';
import { DocumentCard } from '../components/DocumentCard';

const SORT_OPTIONS = [
  { key: 'date_newest', label: 'Newest first' },
  { key: 'date_oldest', label: 'Oldest first' },
  { key: 'name_asc', label: 'Name A→Z' },
  { key: 'name_desc', label: 'Name Z→A' },
  { key: 'size', label: 'Largest first' },
] as const;

export function DocumentsScreen() {
  const { colors } = useTheme();
  const {
    searchQuery, setSearchQuery, sortBy, setSortBy,
    viewMode, setViewMode, getFilteredDocuments, toggleFavorite, deleteDocument,
  } = useDocumentStore();
  const debouncedQuery = useDebounce(searchQuery);
  const documents = useMemo(() => getFilteredDocuments(), [debouncedQuery, sortBy, useDocumentStore.getState().documents]);

  const handleSort = () => {
    const currentIndex = SORT_OPTIONS.findIndex((o) => o.key === sortBy);
    const next = SORT_OPTIONS[(currentIndex + 1) % SORT_OPTIONS.length];
    setSortBy(next.key);
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert('Delete Document', `Move "${title}" to trash?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteDocument(id) },
    ]);
  };

  const currentSort = SORT_OPTIONS.find((o) => o.key === sortBy);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Documents</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleSort} style={styles.headerBtn}>
            <Ionicons name="swap-vertical-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} style={styles.headerBtn}>
            <Ionicons name={viewMode === 'grid' ? 'list-outline' : 'grid-outline'} size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchRow}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {searchQuery.length > 0 || documents.length > 0 ? (
        <View style={styles.sortLabel}>
          <Text style={[styles.sortText, { color: colors.textSecondary }]}>
            {documents.length} documents · {currentSort?.label}
          </Text>
        </View>
      ) : null}

      {documents.length === 0 ? (
        searchQuery.length > 0 ? (
          <EmptyState icon="search-outline" title="No results" subtitle={`No documents match "${searchQuery}"`} />
        ) : (
          <EmptyState
            icon="document-outline"
            title="No documents yet"
            subtitle="Scan your first document to get started"
            actionLabel="Scan Now"
            onAction={() => Alert.alert('Coming soon', 'Camera integration in Phase 2')}
          />
        )
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          contentContainerStyle={styles.list}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={viewMode === 'grid' ? styles.gridItem : undefined}>
              <DocumentCard
                document={item}
                viewMode={viewMode}
                onPress={() => Alert.alert(item.title, `${item.pages} pages · OCR: ${item.ocrText ? 'Yes' : 'No'}`)}
                onFavoriteToggle={() => toggleFavorite(item.id)}
                onLongPress={() => handleDelete(item.id, item.title)}
              />
            </View>
          )}
        />
      )}

      <FAB onPress={() => Alert.alert('Scan', 'Camera integration coming in Phase 2')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.sm },
  title: { ...typography.h1 },
  headerActions: { flexDirection: 'row', gap: spacing.xs },
  headerBtn: { width: sizes.touchTarget, height: sizes.touchTarget, alignItems: 'center', justifyContent: 'center' },
  searchRow: { paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  sortLabel: { paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  sortText: { ...typography.caption },
  list: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  gridRow: { gap: spacing.md },
  gridItem: { flex: 1, maxWidth: '50%' },
});
