export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  env: (process.env.EXPO_PUBLIC_ENV ?? 'development') as 'development' | 'production',
  isDev: process.env.EXPO_PUBLIC_ENV !== 'production',
} as const;