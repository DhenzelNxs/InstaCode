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
import { colors } from '../GlobalStyle/Style';

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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundHeaderColor,
    zIndex: 1000,
  },
  rowCotainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    color: '#19F28B',
    fontFamily: 'monospace',
    height: 30,
    fontSize: 28,
  },
  userContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontSize: 10,
    color: '#FFF',
    fontStyle: 'italic'
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 30,
  },
});

const mapStateToProps = ({user}) => {
  return {
    email: user.email,
    name: user.name,
  };
};

export default connect(mapStateToProps)(Header);
