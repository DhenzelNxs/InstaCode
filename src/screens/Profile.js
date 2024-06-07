import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import { colors } from '../GlobalStyle/Style';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ProfilePost from '../components/ProfilePost';
import mock from '../../mock.json';

class Profile extends Component {
  state = {
    posts: [],
  };

  UNSAFE_componentWillMount = () => {
    this.getUserPosts();
  };

  logout = () => {
    this.props.onLogout();
    this.props.navigation.navigate('Auth');
  };

  getUserPosts = async () => {
    await axios.get(`/users/getposts/${this.props.name}`)
      .catch(err => {
        Alert.alert('Error', `${err}`);
      })
      .then(res => {
        const data = res.data.posts;
        this.setState({ posts: data });
      });
  };

  render() {
    const options = { email: this.props.email, secure: true };
    const { posts } = this.state;
    console.log(posts.length);

    return (
      <View style={styles.container}>
        <Gravatar options={options} style={styles.avatar} />
        <Text style={styles.nickname}>{this.props.name}</Text>
        <Text style={styles.email}>{this.props.email}</Text>
        <Text style={{fontSize: 20, marginTop: 20, color: colors.loadingColor}}>Suas Postagens</Text>
        <FlatList
          data={posts}
          style={[styles.flatlist, posts.length > 2 ? {width: '100%'} : {width: '60%'}]}
          numColumns={3} 
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyText}>
                Poste uma foto para complementar seu perfil
              </Text>
            </View>
          }
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <ProfilePost
              key={item.id}
              {...item}
              requestFunc={this.requestPosts}
            />
          )}
        />
        <TouchableOpacity onPress={this.logout} style={styles.buttom}>
          <Text style={styles.buttomText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.backgroundFeedColor,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
  },
  nickname: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  email: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '300',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#DE2C2C',
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    position: 'absolute',
    bottom: 20,
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  emptyText: {
    color: '#FFF',
    fontWeight: '200',
  },
  flatlist: {
    width: '100%',
    height: 290, 
    flexGrow: 0, 
    marginTop: 20
  },
});

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
