# Expo WebView + Notifications + HLS Player

## What’s inside
- WebView screen embedding `https://expo.dev`.
- Two local notifications with 2–5s delay using `expo-notifications`.
- Bonus: notification on WebView load; tapping any notification opens the Video page.
- Video page plays HLS (`https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`) via `expo-av` with play/pause, mute, fullscreen.
- UI via `react-native-paper`; navigation with `@react-navigation/native-stack`.

## Setup
1. Install deps:
   ```
   npx expo install react-native-webview expo-notifications expo-av react-native-paper @react-navigation/native @react-navigation/native-stack react-native-safe-area-context react-native-screens
   ```
2. Start dev server:
   ```
   npx expo start --tunnel
   ```
3. Test in Expo Go; allow notifications.

## Notes
- HLS works on Android in Expo Go.


