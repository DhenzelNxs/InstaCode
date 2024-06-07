import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../store/actions/user';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
import { colors } from '../GlobalStyle/Style';

class Login extends Component {
  state = {
    name: 'temporario',
    email: '',
    password: '',
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('Profile');
    }
  };

  login = () => {
    this.props.onLogin({...this.state});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.isLoading ? <ActivityIndicator size={45} /> : null}
        <Image
            source={require('../../assets/imgs/instacode-logo.png')}
            style={styles.image}
          />
        <View style={styles.inputContainer}>
          <TextInput
          placeholder="Email"
          placeholderTextColor="#FFF"
          style={styles.input}
          autoFocus={false}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#FFF"
          style={styles.input}
          autoFocus={false}
          keyboardType="visible-password"
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        </View>

          <TouchableOpacity onPress={this.login} style={styles.Loginbuttom}>
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={{color: '#FFF', fontWeight: "300"}}>Ainda não possui uma conta ?</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
          style={styles.Registerbuttom}>
          <Text style={[styles.buttomText, {color: colors.loadingColor}]}>Registrar-se</Text>
        </TouchableOpacity>
        </View>
        
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
  Loginbuttom: {
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: colors.loadingColor,
    marginTop: 50,
    borderRadius: 10
  },
  Registerbuttom: {
    padding: 10,
  },
  buttomText: {
    fontSize: 20,
    color: '#000',
    fontStyle: "italic",
    fontWeight: "500",
    textAlign: "center"
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: colors.backgroundFeedColor,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    color: '#FFF',
    borderRadius: 10,
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: "50%",
  },
  inputContainer: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  registerContainer: {
    position: "absolute",
    bottom: 30
  }
});

const mapStateToProp = ({user}) => {
  return {
    isLoading: user.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user)),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Login);
