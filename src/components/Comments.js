import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { styles } from './styles/comments';

class Comments extends Component {
  render() {
    let view = null;
    if (this.props.comments) {
      view = this.props.comments.map((item, index) => {
        return item.comment ? (
          <View style={styles.commentContainer} key={index}>
            <Text style={styles.nickname}>{item.nickname}: </Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        ) : (
          <View />
        );
      });
    }

    return <View style={styles.container}>{view}</View>;
  }
}

export default Comments;
