import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator, StatusBar, Appearance} from 'react-native';
import {styles} from './styles/splash';
import {colors} from '../GlobalStyle/Style';
import configs from '../../app.json';

export default class Splash extends Component {
  constructor(props) {
    super(props)
    const colorScheme = Appearance.getColorScheme();
    this.state = {
      colorScheme: colorScheme
    }
  }

  async componentDidMount() {
    this.colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ colorScheme: colorScheme });
    });
  }

  componentWillUnmount() {
    if (this.colorSchemeListener) {
      this.colorSchemeListener.remove();
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('loginorprofile');
    }, 3000);
  };
  render() {
    const image = this.state.colorScheme === 'dark' ? 
    '../../assets/imgs/instacode-logo.png' :
    '../../assets/imgs/instacode-logo-ligth.png'
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
