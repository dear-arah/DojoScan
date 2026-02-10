import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography } from '../../../shared/constants/theme';
import { EmptyState } from '../../../shared/components';
import { useDocumentStore } from '../../../core/state/documentStore';
import { DocumentCard } from '../components/DocumentCard';

export function FavoritesScreen() {
  const { colors } = useTheme();
  const { getFavorites, toggleFavorite } = useDocumentStore();
  const favorites = getFavorites();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
        {favorites.length > 0 && (
          <Text style={[styles.count, { color: colors.textSecondary }]}>{favorites.length} documents</Text>
        )}
      </View>

      {favorites.length === 0 ? (
        <EmptyState
          icon="star-outline"
          title="No favorites yet"
          subtitle="Tap the star icon on any document to add it here"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DocumentCard
              document={item}
              viewMode="list"
              onPress={() => Alert.alert(item.title, `${item.pages} pages`)}
              onFavoriteToggle={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  title: { ...typography.h1 },
  count: { ...typography.body2, marginTop: spacing.xs },
  list: { paddingHorizontal: spacing.lg, paddingBottom: 32 },
});
