import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Gravatar} from 'react-native-gravatar';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  nickname: {
    color: '#FFF',
    marginVertical: 10,
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic'
  },
});
