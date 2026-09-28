import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.mayra.assistant',
  appName: 'MAYRA AI',
  webDir: 'dist',
  backgroundColor: '#040914',
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  server: {
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#040914',
      showSpinner: false,
      androidSplashResourceName: 'splash'
    }
  }
};

export default config;
