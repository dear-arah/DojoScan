import { useEffect, useRef, useState } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { CameraRef, CameraType, TakePictureOptions, CameraPermissions } from '../types';

export function useCamera() {
  const cameraRef = useRef<CameraRef>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);

  // Request permission on mount
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const toggleFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async (options?: TakePictureOptions) => {
    if (!cameraRef.current) {
      throw new Error('Camera is not ready');
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: options?.quality ?? 0.8,
        base64: options?.base64 ?? false,
        exif: options?.exif ?? true,
        ...options,
      });

      return {
        uri: photo.uri,
        base64: photo.base64,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Failed to take picture:', error);
      throw error;
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current) {
      throw new Error('Camera is not ready');
    }

    try {
      const video = await cameraRef.current.recordAsync?.();
      return video;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current) {
      throw new Error('Camera is not ready');
    }

    try {
      await cameraRef.current.pausePreview?.();
    } catch (error) {
      console.error('Failed to stop recording:', error);
      throw error;
    }
  };

  const hasPermission = permission?.granted ?? false;

  return {
    cameraRef,
    facing,
    toggleFacing,
    hasPermission,
    permission: permission as CameraPermissions | undefined,
    takePicture,
    startRecording,
    stopRecording,
    isReady,
    setIsReady,
  };
}
