import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment} from '../store/actions/post';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback as TWF,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddComment extends Component {
  state = {
    comment: '',
    editMode: false,
  };

  handleAddComment = () => {
    this.props.onAddComment({
      key: this.props.keyId,
      requestFunc: this.props.requestFunc,
      postId: this.props.postId,
      comment: {
        nickname: this.props.name,
        comment: this.state.comment,
      },
    });

    this.setState({comment: '', editMode: false});
  };

  render() {
    let commentArea = null;
    if (this.state.editMode) {
      commentArea = (
        <View style={styles.container}>
          <TextInput
            placeholder="Pode comentar..."
            style={styles.input}
            autoFocus={true}
            value={this.state.comment}
            onChangeText={comment => this.setState({comment})}
            onSubmitEditing={this.handleAddComment}
            placeholderTextColor={'#CCC'}
          />
          <TWF onPress={() => this.setState({editMode: false})}>
            <Icon name="times" size={15} color="#555" />
          </TWF>
        </View>
      );
    } else {
      commentArea = (
        <TWF onPress={() => this.setState({editMode: true})}>
          <View style={styles.container}>
            <Icon name="comment-o" size={25} color="#555" />
            <Text style={styles.caption}>Adicione um comentario...</Text>
          </View>
        </TWF>
      );
    }

    return <View style={{flex: 1}}>{commentArea}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: '90%',
    color: '#000',
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#000',
  },
});

const mapStateToProps = ({user}) => {
  return {
    name: user.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: payload => dispatch(addComment(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
