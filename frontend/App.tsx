import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { RootNavigator } from './src/core/navigation/RootNavigator';
import { colors } from './src/shared/constants/theme';

function LoadingSplash() {
  return (
    <View style={styles.splash}>
      <Text style={styles.splashLogo}>📄</Text>
      <Text style={styles.splashTitle}>DojoScan</Text>
      <ActivityIndicator size="small" color={colors.primary} style={styles.splashSpinner} />
    </View>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for Zustand stores to rehydrate from AsyncStorage
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return <LoadingSplash />;

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  splash: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  splashLogo: { fontSize: 64, marginBottom: 12 },
  splashTitle: { fontSize: 28, fontWeight: '700', color: colors.primary },
  splashSpinner: { marginTop: 24 },
});
