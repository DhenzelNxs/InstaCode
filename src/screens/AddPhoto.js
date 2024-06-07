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
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { colors } from '../GlobalStyle/Style';
import Icon from 'react-native-vector-icons/FontAwesome';

const noUser = 'Você precisa estar logado para adicionar imagens';

class AddPhoto extends Component {
  state = {
    image: '',
    base64: null,
    description: '',
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
        this.setState({
          image: res.assets[0].uri,
          base64: 'data:image/jpeg;base64,' + res.assets[0].base64,
        });
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
      Alert.alert('Falha!', noUser, [
        {
          text: 'Fazer Login',
          onPress: () => this.props.navigation.navigate('loginorprofile')
        },
        {
          text: 'Cancelar',
          onPress: () => {},
        }
      ]);
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
    this.props.onAddPost({
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.base64,
      description: this.state.description,
      comments: [],
    });
    setTimeout(() => {
      this.setState({image: null, description: '', base64: null});
    }, 2000)
    this.props.navigation.navigate('Feed');
  };

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            {this.state.image == '' ? (
              <Text style={{color: '#FFF'}}>Escolha uma imagem para postar</Text>
            ) : (
              <Image source={{uri: this.state.image}} style={styles.image} />
            )}
          </View>
          <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
            <Icon name='camera' size={30} color={colors.loadingColor}/>
          </TouchableOpacity>
          {this.state.image == '' ? null : 
          <View style={{
            flex: 1,
            backgroundColor: colors.backgroundFeedColor,
            alignItems: 'center',
            }}>
            <TextInput
            placeholder="Alguma descrição para a foto?"
            style={styles.input}
            value={this.state.description}
            onChangeText={desc => this.setState({description: desc})}
            placeholderTextColor="#FFF"
            editable={!!this.props.name}
            multiline={true}
            />
            <TouchableOpacity 
            onPress={this.save} 
            style={
              [styles.buttom, {backgroundColor: colors.loadingColor, borderRadius: 20}]
              }>
              <Text style={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
          </View>
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundFeedColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imageContainer: {
    width: '90%',
    height: '50%',
    backgroundColor: '#1E1C1C',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '85%',
    resizeMode: 'contain',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
  },
  buttomText: {
    fontSize: 20,
    color: '#000',
  },
  input: {
    marginTop: 20,
    width: '90%',
    color: '#FFF',
    backgroundColor:'#1E1C1C',
    padding: 20,
    maxWidth: '80%'
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
