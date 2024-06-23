import React, {useState, useRef} from 'react';
import { StyleSheet, Image, Alert, Dimensions, View, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons'
 
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
 
export const MediaPlayer = ({type, source, screen}) => {
    const [isPaused, setIsPaused] = useState(true);
    const [playVisible, setPlayVisible] = useState(true)
    const [controlsVisible, setControlsVisible] = useState(false)
    const handlePlayPause = () => {
        setIsPaused(!isPaused);
        setPlayVisible(!playVisible)
        setControlsVisible(!controlsVisible)
      };


    if(type === 'image'){
        return (
            <Image 
                source={{uri: source}}
                style={screen === 'AddPhoto' ? styles.imageAddPhoto : styles.imagePost}
            />
        )
    } else if (type === 'video') {
        return (
            <View style={styles.videoWrapper}>
            <Video
              source={{ uri: source }}
              onError={(err) => Alert.alert('Erro', `${err}`)}
              style={styles.backgroundVideo}
              resizeMode="cover"
              paused={isPaused}
              controls={controlsVisible}
            />
            {playVisible === true ? (
                <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPause}
            >
              <Icon name={isPaused ? "play-circle" : "pause-circle"} size={70} color="white" />
            </TouchableOpacity>
            )
            :
            <View />
        }
            
          </View>
        )
    }
}
 
// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imageAddPhoto: {
    width: '80%',
    height: '85%',
    resizeMode: 'contain',
  },
  imagePost: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * (2 / 4),
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * (2 / 4),
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});