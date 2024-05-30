import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AddPost} from '../store/actions/post';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {storage} from '../../firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

const noUser = 'Você precisa estar logado para adicionar imagens';

class AddPhoto extends Component {
  state = {
    image: '',
    base64: null,
    comment: '',
    loading: false,
  };

  /**
    @param {Object} options - As opções para selecionar a imagem.
    @param {'camera' | 'galery'} options.mode - O modo de seleção da imagem ( 'camera' ou 'galery' ).
   */

  imagePickMode = mode => {
    this.setState({loading: true});
    const configCam = {maxWidth: 800, maxHeight: 600, includeBase64: true};
    const callback = res => {
      if (!res.didCancel) {
        this.setState({image: res.assets[0].uri, base64: res.assets[0].base64});
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
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return;
    }
    Alert.alert('Adicionar Imagem', 'Como quer anexar a imagem ?', [
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

  save = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return;
    }
    this.props.onAddPost({
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comments: [
        {
          nickname: this.props.name,
          comment: this.state.comment,
        },
      ],
    });
    this.setState({image: null, comment: '', base64: null});
    this.props.navigation.navigate('Feed');
  };

  render() {
    const {loading} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Image source={{uri: this.state.image}} style={styles.image} />
            )}
          </View>
          <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
            <Text style={styles.buttomText}>Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Algum comentário para a foto?"
            style={styles.input}
            value={this.state.comment}
            onChangeText={comment => this.setState({comment})}
            placeholderTextColor="#000"
            editable={!!this.props.name}
          />
          <TouchableOpacity onPress={this.save} style={styles.buttom}>
            <Text style={styles.buttomText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width * (3 / 4),
    backgroundColor: '#DCDCDC',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (3 / 4),
    resizeMode: 'contain',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
  },
});

const mapStateToProps = ({user}) => {
  return {
    email: user.email,
    name: user.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(AddPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);
