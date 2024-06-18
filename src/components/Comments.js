import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import { styles } from './styles/comments';

class Comments extends Component {
  render() {
    let view = null;
    if (this.props.comments.length > 0) {
      view = this.props.comments.map((item, index) => {
        return item.comment ? (
            <View style={styles.commentContainer} key={index}>
              <Image 
              style={styles.Image}
              source={{uri: this.props.profile_image}}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nickname}>{item.nickname}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            </View>
        ) : (
          <View />
        );
      });
    } else {
      return (
        <View >
          <Text style={styles.centeredText}>
            Seja o primero a comentar
          </Text>
        </View>
      )
    }

    return <View style={styles.container}>{view}</View>;
  }
}

export default Comments;
