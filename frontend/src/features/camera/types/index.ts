import { CameraView } from 'expo-camera';

export type CameraType = 'front' | 'back';

export interface CameraPermissions {
  status: 'granted' | 'denied' | 'undetermined';
  canAskAgain: boolean;
  expires: 'never';
}

export interface TakePictureOptions {
  quality?: number;
  base64?: boolean;
  exif?: boolean;
  skipProcessing?: boolean;
  mirror?: boolean;
}

export interface CameraRef {
  takePictureAsync: (options?: TakePictureOptions) => Promise<{ uri: string; base64?: string }>;
  recordAsync?: (options?: any) => Promise<{ uri: string }>;
  pausePreview?: () => Promise<void>;
  resumePreview?: () => Promise<void>;
}

export interface ScanResult {
  uri: string;
  timestamp: number;
  type: 'photo' | 'video';
}
