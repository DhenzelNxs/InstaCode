import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
import {styles} from './styles/profilePost';

class Post extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.props.image}} style={styles.image} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    name: user.name,
  };
};

export default connect(mapStateToProps)(Post);
