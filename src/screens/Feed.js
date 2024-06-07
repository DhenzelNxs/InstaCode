import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';
import axios from 'axios';
import { colors } from '../GlobalStyle/Style';
import mock from '../../mock.json'

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      keys: [],
      refreshing: false,
      loading: false,
    };
  }

  async componentDidMount() {
    this.requestPosts();
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.requestPosts();
    this.setState({refreshing: false});
  };

  requestPosts = async (updateControl = false) => {
    !updateControl ? this.setState({loading: true}) : null;
    await axios
      .get('/posts')
      .then(response => {
        this.setState({data: response.data.posts.reverse()});
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
    this.setState({loading: false});
  };
  render() {
    const {data, refreshing, loading, keys} = this.state;
    //console.log('data: ', data);
    return (
      <View style={styles.container}>
        <Header navigate={this.props.navigation.navigate}/>
        {loading ? (
          <ActivityIndicator color={colors.loadingColor} size={45} />
        ) : (
          <FlatList
            data={data}
            contentContainerStyle={styles.flatList}
            ListEmptyComponent={
              <View>
                <Text style={styles.emptyText}>
                  Não há postagens no momento
                </Text>
              </View>
            }
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Post
                key={item.id}
                {...item}
                keys={keys[data.indexOf(item)]}
                requestFunc={this.requestPosts}
              />
            )}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundFeedColor,
  },
  emptyText: {
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '50%',
    fontSize: 20,
    opacity: 0.3,
    color: '#888',
  },
  flatList: {
  }
});

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.posts,
  };
};

export default connect(mapStateToProps)(Feed);
