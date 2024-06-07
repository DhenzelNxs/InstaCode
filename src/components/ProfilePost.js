import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Image, Dimensions, Text} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    marginLeft: 10,
    marginTop: 20
  },
});

const mapStateToProps = ({user}) => {
  return {
    name: user.name,
  };
};

export default connect(mapStateToProps)(Post);
