import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text} from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';
import { styles } from './styles/post';
import axios from 'axios';

class Post extends Component {
  state = {
    profile_image: "",
  }

  componentDidMount = () => {
    this.requestProfileImage();
  }

  requestProfileImage = () => {
    axios
      .get('/users')
      .catch(err => {console.log(`${err}`)})
      .then(res => {
        const data = res.data.users
        const user = data.filter(user => this.props.nickname === user.name)
        this.setState({profile_image: user[0].profile_image})
      }) 
  }

  render() {
    const addComment = this.props.name ? (
      <AddComment
        postId={this.props.id}
        keyId={this.props.keys}
        requestFunc={this.props.requestFunc}
      />
    ) : null;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.props.image}} style={styles.image} />
        </View>
        <Author 
          email={this.props.email}
          nickname={this.props.nickname} 
          profile_image={this.state.profile_image}/>
        <View>
          <Text style={styles.description}>{this.props.nickname}: {this.props.description}</Text>
        </View>
        {this.props.comments.length > 0 ? 
        <Comments comments={this.props.comments} /> 
        : 
        <View><Text 
        style={{color: '#FFF', marginLeft: 10, fontWeight: 200, marginTop: 20,}}>
          Ainda não há comentarios
        </Text></View>}
        {addComment}
      </View>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    name: user.name,
    profile_image: user.profile_image
  };
};

export default connect(mapStateToProps)(Post);
