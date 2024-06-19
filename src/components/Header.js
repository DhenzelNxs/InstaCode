import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Gravatar} from 'react-native-gravatar';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Appearance
} from 'react-native';
import { colorTheme } from './styles/header';

class Header extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    this.state = {
      colorScheme: colorScheme,
      styles: colorTheme(colorScheme),
    }
  }

  componentDidMount = () => {
    this.colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ colorScheme: colorScheme, styles: colorTheme(colorScheme) });
    });
  }

  componentWillUnmount() {
    if (this.colorSchemeListener) {
      this.colorSchemeListener.remove();
    }
  }

  render() {
    const {styles} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.rowCotainer}>
          <Text style={styles.title}>InstaCode</Text>
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => this.props.navigate('Profile')}>
            <Text style={styles.user}>{this.props.name}</Text>
          </TouchableOpacity>
          <View >
            <Image 
              style={styles.Image}
              source={{uri: this.props.profile_image}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    email: user.email,
    name: user.name,
    profile_image: user.profile_image
  };
};

export default connect(mapStateToProps)(Header);
