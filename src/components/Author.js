import React from 'react';
import {View, Text, Image, useColorScheme} from 'react-native';
import { colorTheme } from './styles/author';

export default props => {
  const colorScheme = useColorScheme()
  const styles = colorTheme(colorScheme)
  return (
      <View style={styles.container}>
        <View >
          <Image 
            style={styles.Image}
            source={{uri: props.profile_image}}
          />
          </View>
        <Text style={styles.nickname}>{props.nickname}</Text>
      </View>
  );
};
