import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {createUser} from '../store/actions/user';

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
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#000"
          style={styles.input}
          autoFocus={true}
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          style={styles.input}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#000"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
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
    paddingLeft: 15,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
