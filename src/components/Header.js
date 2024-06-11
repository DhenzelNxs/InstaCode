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
    const name = this.props.name || 'Fazer Login';
    const gravatar = this.props.email ? (
      <Gravatar
        options={{email: this.props.email, secure: true}}
        style={styles.avatar}
      />
    ) : null;
    return (
      <View style={styles.container}>
        <View style={styles.rowCotainer}>
          <Text style={styles.title}>InstaCode</Text>
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => this.props.navigate('loginorprofile')}>
            <Text style={styles.user}>{name}</Text>
          </TouchableOpacity>
          {gravatar}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    email: user.email,
    name: user.name,
  };
};

export default connect(mapStateToProps)(Header);
