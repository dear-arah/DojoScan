import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// ---- Auth Stack --------------------------------------------
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// ---- Main Tab Navigator ------------------------------------
export type MainTabParamList = {
  DocumentsTab: undefined;
  FoldersTab: undefined;
  ScanTab: undefined;       // This will open camera (Phase 2)
  FavoritesTab: undefined;
  ProfileTab: undefined;
};

// ---- Root Stack (wraps Auth + Main) ------------------------
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// ---- Screen Props Helpers ----------------------------------
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;