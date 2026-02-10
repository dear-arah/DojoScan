import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'auto';
type CompressionQuality = 'low' | 'medium' | 'high';

interface PreferencesState {
  theme: ThemeMode;
  autoUpload: boolean;
  compressionQuality: CompressionQuality;
  ocrLanguage: string;
  wifiOnlyUpload: boolean;

  setTheme: (theme: ThemeMode) => void;
  setAutoUpload: (enabled: boolean) => void;
  setCompressionQuality: (quality: CompressionQuality) => void;
  setOcrLanguage: (language: string) => void;
  setWifiOnlyUpload: (enabled: boolean) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'auto',
      autoUpload: false,
      compressionQuality: 'medium',
      ocrLanguage: 'en',
      wifiOnlyUpload: true,

      setTheme: (theme) => set({ theme }),
      setAutoUpload: (autoUpload) => set({ autoUpload }),
      setCompressionQuality: (compressionQuality) => set({ compressionQuality }),
      setOcrLanguage: (ocrLanguage) => set({ ocrLanguage }),
      setWifiOnlyUpload: (wifiOnlyUpload) => set({ wifiOnlyUpload }),
    }),
    {
      name: 'dojoscan-prefs',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);