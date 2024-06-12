import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Gravatar} from 'react-native-gravatar';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles/header';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowCotainer}>
          <Text style={styles.title}>InstaCode</Text>
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => this.props.navigate('loginorprofile')}>
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
