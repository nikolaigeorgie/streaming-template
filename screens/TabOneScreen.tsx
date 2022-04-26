// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
// import { RootTabScreenProps } from '../types';

// export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabOneScreen.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });


// import * as React from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Video, AVPlaybackStatus, Audio } from 'expo-av';

// export default function App() {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   return (
//     <View style={{flex: 1}}>
      // <Video
      //   ref={video}
      //   style={{flex: 1}}
      //   source={{
      //     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      //   }}
      //   useNativeControls
      //   resizeMode="contain"
      //   isLooping
      //   onPlaybackStatusUpdate={status => setStatus(() => status)}
      // />
//       <View style={{flex: 1}}>
//         <Button
//           title={status.isPlaying ? 'Pause' : 'Play'}
//           onPress={() =>
//             status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
//           }
//         />
//       </View>
//     </View>
//   );
// }


import React, {useCallback, useEffect, useState} from 'react';
import {  AVPlaybackStatus, Audio } from 'expo-av';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  AppState,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

// @ts-ignore
// import playlistData from './react/data/playlist.json';
// @ts-ignore
// import localTrack from './react/resources/pure.m4a';
// @ts-ignore
// import localArtwork from './react/resources/artwork.jpg';

const setupPlayer = async () => {
  let index = 0;
  try {
    // this method will only reject if player has not been setup yet
    index = await TrackPlayer.getCurrentTrack();
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
    });
    await TrackPlayer.add([
      // ...playlistData,
      {
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        title: 'Pure (Demo)',
        artist: 'David Chavez',
        // artwork: localArtwork,
        duration: 28,
      },
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } finally {
    return index;
  }
};

const App = () => {
  const video = React.useRef(null)
  const progress = useProgress();
  const state = usePlaybackState();
  const [index, setIndex] = useState<number | undefined>();
  const [track, setTrack] = useState<Track | undefined>();
  const [isbackground, setIsBackground] = useState(false)
  const [appState, setAppState] = useState('active')
  const isPlaying = state === State.Playing;
  const isLoading = state === State.Connecting || state === State.Buffering;


  const _handleAppStateChange = (nextAppState) => {
    console.log({
      nextAppState
    })
    // appState.match(/inactive|background/) && 
    // if (nextAppState === 'active') {
    //   console.log('App has come to the foreground!')
    //   TrackPlayer.pause();
    //   video.current.playAsync()
    // } else {
    //   video.current.pauseAsync()
    //   TrackPlayer.play();
    // }

    setAppState(nextAppState)
  }

  // 5

  useEffect(() => {
    // componentDidMount() {
      AppState.addEventListener('change', _handleAppStateChange);
    // }
  
    // componentWillUnmount() {
    //   AppState.removeEventListener('change', this._handleAppStateChange);
    // }
  
  }, [])

  useEffect(() => {
    let mounted = true;
    (async () => {
      // const trackIndex = await setupPlayer();
      // if (mounted) {
      //   setIndex(trackIndex);
      // }

    //   Audio.setAudioModeAsync({
    //     allowsRecordingIOS: false,
    //     staysActiveInBackground: true,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    //     playsInSilentModeIOS: true,
    //     shouldDuckAndroid: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //     playThroughEarpieceAndroid: false
    //  });

     video.current.playAsync()
   
    // await TrackPlayer.setupPlayer();

    // Add a track to the queue
    // await TrackPlayer.add({
    //     id: 'trackId',
    //     url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //     title: 'Track Title',
    //     artist: 'Track Artist',
    //     // artwork: require('track.png')
    // });
          // TrackPlayer.play();
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged],
    async ({ nextTrack }) => {
      setIndex(nextTrack);
    },
  );

  useEffect(() => {
    if (index === undefined) return;
    let mounted = true;
    (async () => {
      // const track = await TrackPlayer.getTrack(index);
      // if (mounted) setTrack(track);
    })();
    return () => {
      mounted = false;
    };
  }, [index]);

  const performTogglePlayback = useCallback(() => {
    // if (index === undefined) return;
    // if (isPlaying) {
    //   TrackPlayer.pause();
    // } else {
    //   TrackPlayer.play();
    // }
  }, [isPlaying]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.contentContainer}>
        <View style={styles.topBarContainer}>
          <TouchableWithoutFeedback>
            <Text style={styles.queueButton}>Queue</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* <Video
        ref={video}
        style={styles.artwork}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}
<Video source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}  
playInBackground
// Can be a URL or a local file.
      //  ref={(ref) => {
      //   //  this.player = ref
      //  }}                                      // Store reference
      //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
      //  onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.artwork}
       
       />
        {/* <Image style={styles.artwork} source={{uri: `${track?.artwork}`}} /> */}
        <Text style={styles.titleText}>{track?.title}</Text>
        <Text style={styles.artistText}>{track?.artist}</Text>
        <Slider
          style={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#FFD479"
          minimumTrackTintColor="#FFD479"
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={value => {
            TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().slice(14, 19)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .slice(14, 19)}
          </Text>
        </View>
      </View>
      <View style={styles.actionRowContainer}>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.secondaryActionButton}>Prev</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={performTogglePlayback}>
          <Text style={styles.primaryActionButton}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.secondaryActionButton}>Next</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statusContainer}>
        {isLoading && <ActivityIndicator />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  queueButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD479',
  },
  artwork: {
    width: 240,
    height: 240,
    marginTop: 30,
    backgroundColor: 'grey',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 30,
  },
  artistText: {
    fontSize: 16,
    fontWeight: '200',
    color: 'white',
  },
  progressContainer: {
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 370,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: 'white',
    fontVariant: ['tabular-nums'],
  },
  actionRowContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryActionButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD479',
  },
  secondaryActionButton: {
    fontSize: 14,
    color: '#FFD479',
  },
  statusContainer: {
    height: 40,
    marginTop: 20,
    marginBottom: 60,
  },
});

export default App