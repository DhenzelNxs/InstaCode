import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import {createUser} from '../store/actions/user';
import { colors } from '../GlobalStyle/Style';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    toLogin: this.props.navigation.navigate,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require('../../assets/imgs/instacode-logo.png')}
            style={styles.image}
          />
        <View style={styles.inputContainer}>
          <TextInput
          placeholder="Nome"
          placeholderTextColor="#FFF"
          style={styles.input}
          autoFocus={true}
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#FFF"
          style={styles.input}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#FFF"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.onCreateUser(this.state);
          }}
          style={styles.buttom}>
          <Text style={styles.buttomText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundFeedColor
  },
  buttom: {
    marginTop: 50,
    padding: 10,
    backgroundColor: colors.loadingColor,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
  },
  buttomText: {
    fontSize: 20,
    color: '#000',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: colors.backgroundFeedColor,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    paddingLeft: 15,
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: "50%",
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
