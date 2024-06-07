import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator, StatusBar} from 'react-native';
import {styles} from './styles/splash';
import {colors} from '../GlobalStyle/Style';
import configs from '../../app.json';

export default class Splash extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Routes');
    }, 3000);
  };
  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.container}>
          <Image
            source={require('../../assets/imgs/instacode-logo.png')}
            style={styles.image}
          />
          <ActivityIndicator color={colors.loadingColor} size={45} />
          <Text style={styles.version}>Version: {configs.version}</Text>
        </View>
      </>
    );
  }
}
