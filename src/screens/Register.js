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
import { styles } from './styles/register';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    toLogin: this.props.navigation.navigate,
    focusName: false,
    focusEmail: false,
    focusPassword: false,
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
          style={[styles.input, {borderColor: this.state.focusName ? colors.loadingColor : '#FFF'}]}
          autoFocus={true}
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          onFocus={() => this.setState({focusName: true})}
          onBlur={() => this.setState({focusName: false})}
          returnKeyType='next'
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#FFF"
          style={[styles.input, {borderColor: this.state.focusEmail ? colors.loadingColor : '#FFF'}]}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          onFocus={() => this.setState({focusEmail: true})}
          onBlur={() => this.setState({focusEmail: false})}
          returnKeyType='next'
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#FFF"
          style={[styles.input, {borderColor: this.state.focusPassword ? colors.loadingColor : '#FFF'}]}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          onFocus={() => this.setState({focusPassword: true})}
          onBlur={() => this.setState({focusPassword: false})}
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



const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
