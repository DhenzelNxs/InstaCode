import React from 'react';
import {View, Text, Image} from 'react-native';
import { styles } from './styles/author';

export default props => {
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
