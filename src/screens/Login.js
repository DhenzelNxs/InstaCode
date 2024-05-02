import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../store/actions/user';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class Login extends Component {
  state = {
    name: 'temporario',
    email: '',
    password: '',
  };

  login = () => {
    this.props.onLogin({...this.state});
    this.props.navigation.navigate('Profile');
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          style={styles.input}
          autoFocus={true}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#000"
          style={styles.input}
          autoFocus={false}
          keyboardType="visible-password"
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />

        <TouchableOpacity onPress={this.login} style={styles.buttom}>
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
          style={styles.buttom}>
          <Text style={styles.buttomText}>Criar nova conta.</Text>
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
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286F4',
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    color: '#000',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
