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
} from 'react-native';

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
