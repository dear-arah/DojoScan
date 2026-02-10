import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Modal, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing } from '../../../shared/constants/theme';
import { useCamera } from '../hooks/useCamera';
import { CameraView, CameraControls } from '../components';
import { ScanResult } from '../types';
import { useDocumentStore } from '../../../core/state/documentStore';
import { MockDocument } from '../../../shared/utils/mockData';

const WHITE = '#FFFFFF';
const THUMBNAIL_COLORS = ['#E3F2FD', '#FFF3E0', '#E8F5E9', '#FCE4EC', '#F3E5F5', '#E0F2F1', '#FFF8E1', '#EDE7F6'];

export function ScanScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const {
    cameraRef,
    facing,
    toggleFacing,
    hasPermission,
    takePicture,
    setIsReady,
  } = useCamera();

  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleCapture = useCallback(async () => {
    try {
      const result = await takePicture();

      // Store the scan
      const scanResult: ScanResult = {
        uri: result.uri,
        timestamp: result.timestamp,
        type: 'photo',
      };

      setRecentScans((prev) => [scanResult, ...prev].slice(0, 10));
      setPreviewUri(result.uri);
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to capture:', error);
      Alert.alert('Capture Failed', 'Could not capture the image. Please try again.');
    }
  }, [takePicture]);

  const handleUsePhoto = useCallback(async () => {
    if (!previewUri) return;
    
    const documentStore = useDocumentStore.getState();
    const scanTitle = `Scan ${new Date().toLocaleDateString()}`;
    
    // Create local document immediately
    const localDocument: MockDocument = {
      id: `local_${Date.now()}`,
      title: scanTitle,
      pages: 1,
      size: 0,
      thumbnailColor: THUMBNAIL_COLORS[Math.floor(Math.random() * THUMBNAIL_COLORS.length)],
      thumbnailUri: previewUri, // Store the image URI
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      tags: ['scanned'],
      syncStatus: 'local_only' as const,
    };
    
    // Add to store immediately
    documentStore.addDocument(localDocument);
    
    // Close the preview
    setShowPreview(false);
    setPreviewUri(null);
    
    // Show temporary success notification
    setNotificationVisible(true);
    
    // Navigate back to Documents tab immediately
    setTimeout(() => {
      navigation.navigate('DocumentsTab' as never);
    }, 1000);
  }, [previewUri, navigation]);

  const handleDiscardPhoto = useCallback(() => {
    setShowPreview(false);
    setPreviewUri(null);
  }, []);

  // Auto-hide temporary notification
  useEffect(() => {
    if (notificationVisible) {
      const timer = setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notificationVisible]);

  if (!hasPermission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <Ionicons
            name="camera-outline"
            size={64}
            color={colors.primaryLight}
          />
          <Text style={[styles.permissionTitle, { color: colors.text }]}>
            Camera Access Required
          </Text>
          <Text style={[styles.permissionText, { color: colors.textSecondary }]}>
            Please enable camera access in your device settings to use the document scanner.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <CameraView
        cameraRef={cameraRef}
        facing={facing}
        onCameraReady={() => setIsReady(true)}
        onError={(error) => {
          console.error('Camera error:', error);
          Alert.alert('Camera Error', 'Failed to initialize camera');
        }}
      >
        <CameraControls
          onCapture={handleCapture}
          onToggleCamera={toggleFacing}
        />
      </CameraView>

      {/* Preview Modal */}
      <Modal
        visible={showPreview && !!previewUri}
        transparent={true}
        animationType="fade"
      >
        <View style={[styles.previewContainer, { backgroundColor: colors.background }]}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleDiscardPhoto}
          >
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>

          {/* Preview Image */}
          {previewUri && (
            <Image
              source={{ uri: previewUri }}
              style={styles.previewImage}
            />
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {/* Retake Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.border }]}
              onPress={handleDiscardPhoto}
            >
              <Ionicons name="refresh" size={20} color={colors.text} />
              <Text style={[styles.buttonText, { color: colors.text }]}>Retake</Text>
            </TouchableOpacity>

            {/* Use Photo Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleUsePhoto}
            >
              <Ionicons name="checkmark" size={20} color={WHITE} />
              <Text style={[styles.buttonText, { color: WHITE }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Temporary Success Notification */}
      {notificationVisible && (
        <View style={[styles.scansIndicator, { backgroundColor: colors.success }]}>
          <Ionicons name="checkmark-circle" size={16} color={WHITE} />
          <Text style={[styles.scansText, { color: WHITE }]}>
            Document saved successfully!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  permissionText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.md,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '70%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    paddingBottom: spacing.lg,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 8,
    gap: spacing.sm,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scansIndicator: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  scansText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
