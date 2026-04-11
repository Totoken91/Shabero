import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shabero.app',
  appName: 'Shabero',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#4AA3DF',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      backgroundColor: '#2B7BC0',
      style: 'DARK',
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1056175212463-c109qc6elb1vben9tglhnqt94bk60pam.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
