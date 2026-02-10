import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from './types';
import { useTheme } from '../../shared/hooks/useTheme';
import { sizes } from '../../shared/constants/theme';

import { DocumentsScreen } from '../../features/documents/screens/DocumentsScreen';
import { FoldersScreen } from '../../features/documents/screens/FoldersScreen';
import { FavoritesScreen } from '../../features/documents/screens/FavoritesScreen';
import { ProfileScreen } from '../../features/auth/screens/ProfileScreen';
import { ScanScreen } from '../../features/camera/screens/ScanScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  DocumentsTab: 'documents-outline',
  FoldersTab: 'folder-outline',
  ScanTab: 'scan-circle',
  FavoritesTab: 'star-outline',
  ProfileTab: 'person-outline',
};

export function MainTabNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // On Android with edge-to-edge, insets.bottom accounts for the system
  // navigation bar (3-button or gesture pill). Add it so our tab bar
  // sits above the system UI instead of underneath it.
  const bottomInset = Platform.OS === 'android' ? insets.bottom : 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: sizes.tabBarHeight + bottomInset,
          paddingBottom: 8 + bottomInset,
          paddingTop: 4,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={TAB_ICONS[route.name]}
            size={route.name === 'ScanTab' ? 32 : size}
            color={route.name === 'ScanTab' ? colors.primary : color}
          />
        ),
      })}
    >
      <Tab.Screen name="DocumentsTab" component={DocumentsScreen} options={{ tabBarLabel: 'Docs' }} />
      <Tab.Screen name="FoldersTab" component={FoldersScreen} options={{ tabBarLabel: 'Folders' }} />
      <Tab.Screen name="ScanTab" component={ScanScreen} options={{ tabBarLabel: 'Scan' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesScreen} options={{ tabBarLabel: 'Favorites' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}