import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  Appearance,
  FlatList,
  Alert
} from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';
import { colorTheme } from './styles/post';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import Share from 'react-native-share';
import { MediaPlayer } from './Video';

class Post extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    this.state = {
      profile_image: "",
      liked: this.props.liked_users?.filter(nickname => nickname.nickname === this.props.name).length > 0,
      likes: this.props.likes,
      modalVisible: false,
      colorScheme: colorScheme,
      styles: colorTheme(colorScheme),
      comments: []
    }
  }

  componentDidMount = () => {
    this.requestProfileImage();
    this.requestComments();
    this.colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ colorScheme: colorScheme, styles: colorTheme(colorScheme) });
    });
    console.log(this.props.comments)
  }

  componentWillUnmount() {
    if (this.colorSchemeListener) {
      this.colorSchemeListener.remove();
    }
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

  requestComments = () => {
    axios
      .get(`/comments/${this.props.id}`)
      .catch(err => Alert.alert('Erro', 'Ocorreu algum problema ao tentar monstrar os comentarios'))
      .then(res => {
        const data = res.data
        this.setState({comments: data})
      })
  }

  onLike = async (likeMode) => {
    const {likes} = this.state;
    if(likeMode === 'deslike'){
      this.setState({liked: false})
      this.setState({likes: likes - 1})
    }else {
      this.setState({liked: true})
      this.setState({likes: likes + 1})
    }
    await axios
      .patch(`/posts/likeaction/${this.props.id}/${likeMode}`, {nickname: this.props.name, post_id: this.props.id})
      .catch(err => console.log(`${err}`))
  }

  onShare = async () => {
    await Share.open({
      url: this.props.image,
      message: `INSTACODE!
      \n\nAutor: ${this.props.nickname}
      \nDescrição: ${this.props.description}
      \n\nConfira este post e muito mais no InstaCode!`,
      social: Share.Social.WHATSAPP,
    });
  };

  render() {
    const {liked, modalVisible, styles} = this.state;
    console.log(this.props.id)
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <MediaPlayer 
            type={this.props.media_type}
            source={this.props.image}
            screen={'Post'}
          />
        </View>
        <View style={styles.post_icons}>
          <TouchableOpacity style={styles.like} onPress={() => this.onLike(liked ? 'deslike' : 'like')}>
            <Icon name='heart-o' 
            size={25} 
            color={liked ? "#F00" : this.state.colorScheme === "dark" ? "#FFF" : "#000"}/>
            <Text 
            style={
              {color: this.state.colorScheme === "dark" ? "#FFF" : "#000",
              fontSize: 20, 
              marginLeft: 6}}
              >{this.state.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.comment} onPress={() => {this.setState({modalVisible: !modalVisible})}}>
            <Icon name='comments-o' size={30} color={this.state.colorScheme === "dark" ? "#FFF" : "#000"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.share} onPress={this.onShare}>
            <Icon name='share' size={25} color={this.state.colorScheme === "dark" ? "#FFF" : "#000"}/>
          </TouchableOpacity>
        </View>
        <Author 
          email={this.props.email}
          nickname={this.props.nickname} 
          profile_image={this.state.profile_image}/>
        <View>
          <Text style={styles.description}>{this.props.nickname}: {this.props.description}</Text>
        </View>
        <View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: !modalVisible });
            }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.setState({ modalVisible: !modalVisible })}
                >
                  <Icon name="close" size={30} color="#FFF"/>
                </TouchableOpacity>
                <View style={{maxHeight: "70%"}}>
                  <FlatList 
                  data={this.state.comments}
                  keyExtractor={this.props.postId}
                  renderItem={({item}) => (
                    <Comments 
                      comment={item.comment}
                      nickname={item.nickname}
                    />
                    )}
                  />
                </View>
                <View style={{position: 'absolute', bottom: 40}}>
                  <AddComment
                    postId={this.props.id}
                    keyId={this.props.keys}
                    requestFunc={this.props.requestFunc}
                    requestCommentsFunc={this.requestComments}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {this.props.comments.length <= 0 ?
        (
        <View>
          <Text 
            style={{
              color: this.state.colorScheme === "dark" ? "#FFF" : "#000", 
              marginLeft: 10, 
              fontWeight: "300", 
              marginTop: 20,
              }}>
            Ainda não há comentarios
          </Text>
        </View>
        )

        :

        <Text 
          style={{
            color: this.state.colorScheme === "dark" ? "#FFF" : "#000", 
            marginLeft: 10, 
            marginTop: 10, 
            fontWeight: "300"
          }}
          onPress={() => this.setState({ modalVisible: !modalVisible })}
          >
            Ver {this.state.comments.length} {this.state.comments.length > 1 ? "comentários" : "comentário"}
        </Text>
      }
        
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
