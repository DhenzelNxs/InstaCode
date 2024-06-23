import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AddPost, requestPost} from '../store/actions/post';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Appearance
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { colors } from '../GlobalStyle/Style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorTheme } from './styles/addphoto';
import { getUserPost } from '../store/actions/user';
import { MediaPlayer } from '../components/Video';

const noUser = 'Você precisa estar logado para adicionar imagens';

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    this.state = {
    media: '',
    mediaType: '',
    base64: null,
    description: '',
    loading: false,
    colorScheme: colorScheme,
    styles: colorTheme(colorScheme),
  };
  }

  async componentDidMount() {
    this.colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ colorScheme: colorScheme, styles: colorTheme(colorScheme) });
    });
  }

  componentWillUnmount() {
    if (this.colorSchemeListener) {
      this.colorSchemeListener.remove();
    }
  }
  

  /**
    @param {Object} options - As opções para selecionar a imagem.
    @param {'camera' | 'galery'} options.mode - O modo de seleção da imagem ( 'camera' ou 'galery' ).
   */

  imagePickMode = mode => {
    this.setState({loading: true});
    const configCam = {maxWidth: 800, maxHeight: 600, includeBase64: true, mediaType: "mixed"};
    const callback = res => {
      if (!res.didCancel) {
        this.setState({
          media: res.assets[0].uri,
          base64: 'data:image/jpeg;base64,' + res.assets[0].base64,
        });
      }
      const mediaType = res.assets[0].type
      if(mediaType.startsWith('image')) {
        this.setState({mediaType: 'image'})
      } else if (mediaType.startsWith('video')) {
        this.setState({mediaType: 'video'})
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
        text: 'Camera',
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
      image: this.state.media,
      media_type: this.state.mediaType,
      likes: null,
      description: this.state.description,
      comments: [],
      liked_by: [],
    });
    setTimeout(() => {
      this.setState({media: '', description: '', base64: null});
      this.props.onRequestPost()
      this.props.onRequestuserPost(this.props.name)
    }, 2000)
    this.props.navigation.navigate('Feed');
  };

  render() {
    const {loading, styles} = this.state;
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            {this.state.media == '' ? (
              <Text style={{color: '#FFF'}}>Escolha uma imagem para postar</Text>
            ) : (
              <MediaPlayer
                type={this.state.mediaType}
                source={this.state.media}
                screen={'AddPhoto'}
              />
            )}
          </View>
          <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
            <Icon name='camera' size={30} color={colors.loadingColor}/>
          </TouchableOpacity>
          {this.state.media == '' ? null : 
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
            placeholderTextColor={'#FFF'}
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

const mapStateToProps = ({user}) => {
  return {
    email: user.email,
    name: user.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(AddPost(post)),
    onRequestPost: () => dispatch(requestPost()),
    onRequestuserPost: name => dispatch(getUserPost(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);
