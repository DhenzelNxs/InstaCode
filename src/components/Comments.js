import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import { styles } from './styles/comments';
import axios from 'axios';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile_image: ""
    }
  }

  componentDidMount = () => {
    this.requestProfileImage(this.props.nickname)
  }

  requestProfileImage = name => {
    axios
      .get('/users')
      .catch(err => {console.log(`${err}`)})
      .then(res => {
        const data = res.data.users
        const user = data.filter(user => name === user.name)
        this.setState({profile_image: user[0].profile_image})
      }) 
  }

  render() {
    console.log("props dos" , this.props)
      return (
        <View style={styles.commentContainer}>
          <Image 
          style={styles.Image}
          source={{uri:this.state.profile_image}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nickname}>{this.props.nickname}</Text>
            <Text style={styles.comment}>{this.props.comment}</Text>
          </View>
        </View>
      )
  }
}

export default Comments;
