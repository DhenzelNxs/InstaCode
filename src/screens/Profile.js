import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, updateProfile } from '../store/actions/user';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { colors } from '../GlobalStyle/Style';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ProfilePost from '../components/ProfilePost';
import mock from '../../mock.json';
import { styles } from './styles/profile';
import Icon from 'react-native-vector-icons/FontAwesome'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class Profile extends Component {
  state = {
    posts: [],
    profileImage: this.props.profile_image,
    base64: '',
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
        this.setState({ posts: data.reverse() });
      });
  };

  imagePickMode = mode => {
    this.setState({loading: true});
    const configCam = {maxWidth: 800, maxHeight: 600, includeBase64: true};
    const callback = res => {
      if (!res.didCancel) {
        this.setState({
          profileImage: res.assets[0].uri,
        });

        this.props.onUpdateProfile({
          profile_id: this.props.id,
          profile_image: this.state.profileImage,
        })
      }
    };

    if (mode === 'camera') {
      launchCamera({...configCam}, callback);
    } else if (mode === 'galery') {
      launchImageLibrary({...configCam}, callback);
    }

    this.setState({loading: false});
  };

  pickImage = () => {
    Alert.alert('Atualizar foto do perfil', 'Como quer anexar a imagem ?', [
      {
        text: 'Tirar Foto',
        onPress: () => this.imagePickMode('camera'),
      },
      {
        text: 'Galeria',
        onPress: () => this.imagePickMode('galery'),
      },
      {
        text: 'Cancelar',
        onPress: () => {},
      },
    ]);
  };

  render() {
    const { posts, profileImage } = this.state;
    
    return (
      <View style={styles.container}>
        <View styles={styles.imageContainer}>
          <Image 
            style={styles.Image} 
            source={{uri: profileImage}} 
          />
          <View style={styles.IconContainer}>
            <TouchableOpacity onPress={this.pickImage}>
              <Icon name="camera" size={35} color={colors.loadingColor}/>
            </TouchableOpacity>
          </View>
          </View>
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

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
    profile_image: user.profile_image,
    id: user.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
    onUpdateProfile: profile => dispatch(updateProfile(profile))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
