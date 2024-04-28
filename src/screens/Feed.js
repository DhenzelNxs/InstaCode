import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';

class Feed extends Component {
  state = {
    posts: [
      {
        id: Math.random(),
        nickname: 'Rafael Pereira Filho',
        email: 'rafaelprrfh@gamil.com',
        image: require('../../assets/imgs/fence.jpg'),
        comment: [
          {
            nickname: 'Jhon Ray Sheldon',
            comment: 'Stunning!',
          },
          {
            nickname: 'Ana Julia Arruda',
            comment: 'Foto linda! Onde foi tirada ?',
          },
        ],
      },
      {
        id: Math.random(),
        nickname: 'Francisco Leandro Lima',
        email: 'fllima@gamil.com',
        image: require('../../assets/imgs/bw.jpg'),
        comment: [],
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.state.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Post key={item.id} {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Feed;
