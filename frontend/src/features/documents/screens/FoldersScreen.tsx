import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput as RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing, typography, borderRadius } from '../../../shared/constants/theme';
import { EmptyState, Button } from '../../../shared/components';
import { useDocumentStore } from '../../../core/state/documentStore';
import { FolderCard } from '../components/FolderCard';

const FOLDER_COLORS = ['#FF9800', '#4CAF50', '#2196F3', '#F44336', '#9C27B0', '#00BCD4', '#FF5722', '#607D8B'];

export function FoldersScreen() {
  const { colors } = useTheme();
  const { folders, addFolder, deleteFolder, getDocumentsByFolder } = useDocumentStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedColor, setSelectedColor] = useState(FOLDER_COLORS[0]);

  const handleAddFolder = () => {
    if (!newName.trim()) return;
    addFolder(newName.trim(), selectedColor);
    setNewName('');
    setShowAdd(false);
  };

  const handleDeleteFolder = (id: string, name: string) => {
    Alert.alert('Delete Folder', `Delete "${name}"? Documents inside won't be deleted.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteFolder(id) },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Folders</Text>
        <Button title={showAdd ? 'Cancel' : '+ New'} onPress={() => { setShowAdd(!showAdd); setNewName(''); }} variant="ghost" />
      </View>

      {showAdd && (
        <View style={[styles.addSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <RNTextInput
            style={[styles.addInput, { color: colors.text, borderColor: colors.border }]}
            placeholder="Folder name"
            placeholderTextColor={colors.placeholder}
            value={newName}
            onChangeText={setNewName}
            autoFocus
          />
          <View style={styles.colorRow}>
            {FOLDER_COLORS.map((c) => (
              <View
                key={c}
                style={[styles.colorDot, { backgroundColor: c, borderWidth: selectedColor === c ? 3 : 0, borderColor: colors.text }]}
                onTouchEnd={() => setSelectedColor(c)}
              />
            ))}
          </View>
          <Button title="Create Folder" onPress={handleAddFolder} fullWidth disabled={!newName.trim()} />
        </View>
      )}

      {folders.length === 0 ? (
        <EmptyState
          icon="folder-outline"
          title="No folders yet"
          subtitle="Create folders to organize your documents"
          actionLabel="Create Folder"
          onAction={() => setShowAdd(true)}
        />
      ) : (
        <FlatList
          data={folders}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const docCount = getDocumentsByFolder(item.id).length;
            return (
              <View style={styles.gridItem}>
                <FolderCard
                  {...item}
                  documentCount={docCount}
                  onPress={() => Alert.alert(item.name, `${docCount} documents`)}
                  onLongPress={() => handleDeleteFolder(item.id, item.name)}
                />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  title: { ...typography.h1 },
  addSection: { margin: spacing.lg, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, gap: spacing.md },
  addInput: { height: 44, borderWidth: 1, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, fontSize: 15 },
  colorRow: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' },
  colorDot: { width: 28, height: 28, borderRadius: 14 },
  list: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 32 },
  gridRow: { gap: spacing.md },
  gridItem: { flex: 1, maxWidth: '50%' },
});
