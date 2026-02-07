import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import { useTheme } from '@shared/hooks/useTheme';
import { sizes } from '@shared/constants/theme';

// Placeholder screens — we'll build real ones in later phases
import { DocumentsScreen } from '@features/documents/screens/DocumentsScreen';
import { FoldersScreen } from '@features/documents/screens/FoldersScreen';
import { FavoritesScreen } from '@features/documents/screens/FavoritesScreen';
import { ProfileScreen } from '@features/auth/screens/ProfileScreen';
import { ScanPlaceholderScreen } from '@features/camera/screens/ScanPlaceholderScreen';

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

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: sizes.tabBarHeight,
          paddingBottom: 8,
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
      <Tab.Screen
        name="DocumentsTab"
        component={DocumentsScreen}
        options={{ tabBarLabel: 'Docs' }}
      />
      <Tab.Screen
        name="FoldersTab"
        component={FoldersScreen}
        options={{ tabBarLabel: 'Folders' }}
      />
      <Tab.Screen
        name="ScanTab"
        component={ScanPlaceholderScreen}
        options={{ tabBarLabel: 'Scan' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favorites' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}