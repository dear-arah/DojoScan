// Screens
export { ScanScreen } from './screens/ScanScreen';
export { ScanPlaceholderScreen } from './screens/ScanPlaceholderScreen';

// Components
export { CameraView, CameraControls } from './components';

// Hooks
export { useCamera } from './hooks';

// Services
export { processScan, saveScan, getScanHistory } from './services/cameraService';

// Types
export type { CameraType, CameraPermissions, TakePictureOptions, CameraRef, ScanResult } from './types';
