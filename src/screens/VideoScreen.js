

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Button, Text, Avatar, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';

const TEST_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoScreen() {
  const navigation = useNavigation();
  const videoRef = useRef(null);

  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;

  const [status, setStatus] = useState({});
  const [showOverlayPlay, setShowOverlayPlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Detect orientation change
  useEffect(() => {
    ScreenOrientation.unlockAsync();

    const sub = ScreenOrientation.addOrientationChangeListener(event => {
      const o = event.orientationInfo.orientation;

      if (
        o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setIsFullscreen(true);     // hide controls + go fullscreen
      } else {
        setIsFullscreen(false);    // back to normal UI
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub);
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const togglePlay = () => {
    if (!status.isLoaded) return;
    status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
    setShowOverlayPlay(false);
  };

  const toggleMute = async () => {
    if (!status.isLoaded) return;
    await videoRef.current.setIsMutedAsync(!status.isMuted);
  };

  return (
    <LinearGradient colors={['#000428', '#004e92']} style={styles.bg}>
      
    
      <SafeAreaView style={[styles.screen, isFullscreen && styles.fullscreenMode]}>

     
        {!isFullscreen && (
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="HLS Player" subtitle="Premium Modern UI" />
          </Appbar.Header>
        )}

       
        <View style={[styles.glassCard, isFullscreen && styles.glassCardFS]}>

         
          {!isFullscreen && (
            <View style={styles.headerRow}>
              <Avatar.Icon size={40} icon="play" style={{ backgroundColor: '#ffffff22' }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.title}>Big Buck Bunny</Text>
                <Text style={styles.sub}>HLS Demo Stream</Text>
              </View>
              <Chip style={styles.liveBadge}>LIVE</Chip>
            </View>
          )}

        
          <View style={[styles.videoWrap, isFullscreen && styles.videoWrapFS]}>
            <Video
              ref={videoRef}
              source={{ uri: TEST_HLS }}
              style={[
                styles.video,
                isFullscreen ? { width, height } : { width: '100%', aspectRatio: 16 / 9 },
              ]}
              useNativeControls
              resizeMode="contain"
              usePoster={!isFullscreen}
              posterSource={{
                uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
              }}
              onPlaybackStatusUpdate={(s) => {
                setStatus(() => s);
                setShowOverlayPlay(!s.isPlaying && !isFullscreen);
              }}
            />

         
            {showOverlayPlay && !isFullscreen && (
              <TouchableOpacity style={styles.overlayPlay} onPress={togglePlay}>
                <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.playGlow}>
                  <Avatar.Icon size={70} icon="play" style={styles.playIcon} />
                </LinearGradient>
              </TouchableOpacity>
            )}

          

          </View>

       
          {!isFullscreen && (
            <View style={styles.actions}>
              <Button
                icon={status.isPlaying ? 'pause' : 'play'}
                mode="contained"
                onPress={togglePlay}
                style={styles.btnPrimary}
              >
                {status.isPlaying ? 'Pause' : 'Play'}
              </Button>

              <Button
                icon={status.isMuted ? 'volume-off' : 'volume-high'}
                mode="contained-tonal"
                onPress={toggleMute}
                style={styles.btnSecondary}
              >
                {status.isMuted ? 'Muted' : 'Unmute'}
              </Button>
            </View>
          )}

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  screen: { flex: 1 },

  /** Fullscreen mode => no margins, no card UI **/
  fullscreenMode: {
    padding: 0,
    margin: 0,
    backgroundColor: '#000',
  },

  /** Header **/
  appbar: {
    margin: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff22',
  },

  /** Glass Card **/
  glassCard: {
    margin: 14,
    backgroundColor: '#ffffff22',
    borderRadius: 20,
    padding: 12,
  },
  glassCardFS: {
    margin: 0,
    padding: 0,
    borderRadius: 0,
    backgroundColor: '#000',
  },

  /** Title section **/
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  sub: { color: '#a3a3a3', fontSize: 13 },
  liveBadge: {
    backgroundColor: '#ef4444',
    color: '#fff',
  },

  /** Video wrapper **/
  videoWrap: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  videoWrapFS: {
    borderRadius: 0,
    marginBottom: 0,
    width: '100%',
    height: '100%',
  },

  video: {
    backgroundColor: '#000',
  },

  /** Play overlay **/
  overlayPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -35 }, { translateY: -35 }],
  },
  playGlow: { padding: 4, borderRadius: 50 },
  playIcon: { backgroundColor: '#000000aa' },

  /** Fullscreen button **/
  fullBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 50,
  },

  /** Action Buttons **/
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnPrimary: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
  },
  btnSecondary: {
    borderRadius: 10,
  },
});
