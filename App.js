import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { Provider as PaperProvider } from 'react-native-paper';

import WebViewScreen from './src/screens/WebViewScreen';
import VideoScreen from './src/screens/VideoScreen';
import { theme } from './src/theme';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  // Bonus: navigate to Video when tapping a notification
  const navRef = useRef();
  const responseSub = useRef();

  

  useEffect(() => {
    responseSub.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const action = response.notification.request.content.title;
      if (navRef.current && action) {
        navRef.current.navigate('Video');
      }
    });
    return () => {
      if (responseSub.current) Notifications.removeNotificationSubscription(responseSub.current);
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WebView" component={WebViewScreen} />
          <Stack.Screen name="Video" component={VideoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
