



import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
  Platform,
} from 'react-native';
import { Appbar, Button, Text, Avatar, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';
import { ensureNotificationPermission } from '../utils/notifications';

export default function WebViewScreen() {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;

  /** Unlock orientation for landscape support */
  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  /** Notifications with exact timing */
  const scheduleLocal = useCallback(async (title, body, delaySeconds) => {
    const ok = await ensureNotificationPermission();
    if (!ok) {
      alert('Please enable notifications to proceed.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { seconds: delaySeconds }, // EXACT delay
    });
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsReady(true);
    scheduleLocal('Page Loaded', 'You will get a notification shortly!', 2);
  }, [scheduleLocal]);

  return (
    <LinearGradient colors={['#000428', '#004e92']} style={styles.bg}>
      <SafeAreaView style={styles.screen}>

        {/* HEADER */}
        {!isLandscape && (
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Learn Hub" subtitle="Premium WebView" />
            <Appbar.Action
              icon="video"
              color="#ff4444"
              onPress={() => navigation.navigate("Video")}
            />
          </Appbar.Header>
        )}

        {/* MAIN CARD */}
        <View style={[styles.glassCard, isLandscape && styles.glassLandscape]}>

          {/* Title Row */}
          {!isLandscape && (
            <View style={styles.headerRow}>
              <Avatar.Icon size={40} icon="web" style={styles.avatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.title}>Wikipedia</Text>
                <Text style={styles.sub}>Embedded Web Content</Text>
              </View>
              <Chip style={styles.liveBadge}>WEB</Chip>
            </View>
          )}

          {/* RESPONSIVE WEBVIEW */}
          <View
            style={[
              styles.webViewWrap,
              {
                height: isLandscape ? height : height * 0.70, // reduced height
              },
            ]}
          >
            <WebView
              source={{ uri: 'https://www.wikipedia.org/' }}
              onLoadEnd={handleLoadEnd}
              startInLoadingState
              style={styles.webView}
              scrollEnabled
              nestedScrollEnabled
            />
          </View>

          {/* Loading Hint */}
          {!isReady && (
            <Text style={styles.hint}>Loading site… A notification will arrive soon.</Text>
          )}
        </View>

        {/* FIXED RESPONSIVE BOTTOM BUTTONS */}
        {!isLandscape && (
          <View style={styles.fixedButtons}>
            <LinearGradient
              colors={['#4f46e5', '#6d28d9']}
              style={styles.primaryButtonWrapper}
            >
              <Button
                icon="bell"
                mode="contained"
                contentStyle={{ paddingVertical: 0 }}
                style={styles.btnPrimary}
                onPress={() =>
                  scheduleLocal('Reminder A', 'This is your first reminder!', 2)
                }
              >
                Notify A
              </Button>
            </LinearGradient>

            <Button
              icon="bell-ring"
              mode="contained-tonal"
              contentStyle={{ paddingVertical: 0 }}
              style={styles.btnSecondary}
              onPress={() =>
                scheduleLocal('Reminder B', 'This is your second reminder!', 5)
              }
            >
              Notify B
            </Button>
          </View>
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  screen: { flex: 1 },

  /** HEADER */
  appbar: {
    margin: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff22',
    elevation: 8,
  },

  /** GLASS CARD **/
  glassCard: {
    marginHorizontal: 14,
    marginTop: 10,
    backgroundColor: '#ffffff22',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffffff33',
    height: '80%',
  },
  glassLandscape: {
    margin: 0,
    padding: 0,
    borderRadius: 0,
  },

  /** TITLE */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: { backgroundColor: '#ffffff22' },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  sub: { color: '#b8b8b8', fontSize: 13 },
  liveBadge: {
    backgroundColor: '#3b82f6',
    color: '#fff',
  },

  /** WEBVIEW */
  webViewWrap: { width: '100%' },
  webView: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: '30%',
  },

  hint: {
    padding: 12,
    color: '#d1d5db',
    textAlign: 'center',
  },

  fixedButtons: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 50 : 30,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  
  primaryButtonWrapper: {
    borderRadius: 12,
    padding: 1,
   
  },
  
  btnPrimary: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 10,
   
    minWidth: 120,
  },
  
  btnSecondary: {
    borderRadius: 12,
    paddingHorizontal: 10,
    minWidth: 120,
    
  },
  
});
