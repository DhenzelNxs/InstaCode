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
import { styles } from './styles/login';

class Login extends Component {
  state = {
    name: 'temporario',
    email: '',
    password: '',
    focusEmail: false,
    focusPassword: false,
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('Routes');
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
          style={[styles.input, {borderColor: this.state.focusEmail ? colors.loadingColor : '#FFF'}]}
          autoFocus={false}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          onFocus={() => this.setState({focusEmail: true})}
          onBlur={() => this.setState({focusEmail: false})}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#FFF"
          style={[styles.input, {borderColor: this.state.focusPassword ? colors.loadingColor : '#FFF'}]}
          autoFocus={false}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          onFocus={() => this.setState({focusPassword: true})}
          onBlur={() => this.setState({focusPassword: false})}
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
