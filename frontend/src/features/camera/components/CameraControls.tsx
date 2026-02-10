import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing } from '../../../shared/constants/theme';

const WHITE = '#FFFFFF';

interface CameraControlsProps {
  onCapture: () => Promise<void>;
  onToggleCamera?: () => void;
  onCaptureComplete?: (uri: string) => void;
  isCapturing?: boolean;
}

export function CameraControls({
  onCapture,
  onToggleCamera,
  onCaptureComplete,
  isCapturing = false,
}: CameraControlsProps) {
  const { colors } = useTheme();
  const [isCaptureLoading, setIsCaptureLoading] = useState(false);

  const handleCapture = async () => {
    setIsCaptureLoading(true);
    try {
      await onCapture();
    } catch (error) {
      console.error('Capture failed:', error);
    } finally {
      setIsCaptureLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
      {/* Top controls */}
      <View style={styles.topControls}>
        {onToggleCamera && (
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            onPress={onToggleCamera}
          >
            <Ionicons name="camera-reverse-outline" size={24} color={WHITE} />
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom controls with capture button */}
      <View style={styles.bottomControls}>
        {/* Capture button */}
        <TouchableOpacity
          style={[
            styles.captureButton,
            { backgroundColor: colors.primary },
            (isCaptureLoading || isCapturing) && styles.captureButtonDisabled,
          ]}
          onPress={handleCapture}
          disabled={isCaptureLoading || isCapturing}
          activeOpacity={0.8}
        >
          {isCaptureLoading || isCapturing ? (
            <ActivityIndicator size="small" color={WHITE} />
          ) : (
            <Ionicons name="camera" size={32} color={WHITE} />
          )}
        </TouchableOpacity>

        {/* Info text */}
        <Text style={[styles.infoText, { color: WHITE }]}>
          {isCaptureLoading ? 'Capturing...' : 'Tap to scan document'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: spacing.md,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    alignItems: 'center',
    gap: spacing.md,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
