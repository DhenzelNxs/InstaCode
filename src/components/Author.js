import React from 'react';
import {View, Text} from 'react-native';
import {Gravatar} from 'react-native-gravatar';
import { styles } from './styles/author';

export default props => {
  return (
    <View style={styles.container}>
      <Gravatar
        options={{email: props.email, secure: true}}
        style={styles.avatar}
      />
      <Text style={styles.nickname}>{props.nickname}</Text>
    </View>
  );
};
