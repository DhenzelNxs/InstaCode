import React, {Component} from 'react';
import {Alert, StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import Routes from './Navigator';
import {setMessage} from './store/actions/message';

class App extends Component {
  componentDidUpdate = () => {
    if (this.props.text && this.props.text.toString().trim()) {
      Alert.alert(this.props.title || 'Mensagem', this.props.text.toString());
      this.props.clearMessage();
    }
  };

  render() {
    return (<>
    <StatusBar translucent backgroundColor="transparent" />
    <Routes user={this.props.name} />
    </>);
  }
}

const mapStateToProp = ({message}) => {
  return {
    title: message.title,
    text: message.text,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(setMessage({title: '', text: ''})),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);
