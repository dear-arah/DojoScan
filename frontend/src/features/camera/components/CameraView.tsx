import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { CameraView as ExpoCameraView, useCameraPermissions, CameraMountError } from 'expo-camera';
import { useTheme } from '../../../shared/hooks/useTheme';
import { CameraType } from '../types';

interface CameraViewProps {
  cameraRef: React.RefObject<any>;
  facing: CameraType;
  onCameraReady?: () => void;
  onError?: (error: CameraMountError) => void;
  children?: React.ReactNode;
}

export function CameraView({
  cameraRef,
  facing,
  onCameraReady,
  onError,
  children,
}: CameraViewProps) {
  const { colors } = useTheme();
  const [permission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate camera ready state after brief delay
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.text, { color: colors.text }]}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.text, { color: colors.text }]}>Camera permission was denied</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ExpoCameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={onCameraReady}
          onMountError={onError}
        >
          {children}
        </ExpoCameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});
