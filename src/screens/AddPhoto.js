import React, {Component} from 'react';
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
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class AddPhoto extends Component {
  state = {
    image: '',
    comment: '',
    base64: '',
  };

  turnOnCamera = () => {
    launchCamera({maxWidth: 800, maxHeight: 600}, res => {
      if (!res.didCancel) {
        this.setState({image: res.assets[0].uri, base64: res.assets[0].base64});
      }
    });
  };

  openGalery = () => {
    launchImageLibrary({maxWidth: 800, maxHeight: 600}, res => {
      if (!res.didCancel) {
        this.setState({image: res.assets[0].uri, base64: res.assets[0].base64});
      }
    });
  };

  pickImage = () => {
    Alert.alert('Adicionar Imagem', 'Como quer anexar a imagem ?', [
      {
        text: 'Tirar Foto',
        onPress: this.turnOnCamera,
      },
      {
        text: 'Galeria',
        onPress: this.openGalery,
      },
      {
        text: 'Cancelar',
        onPress: () => {},
      },
    ]);
  };

  save = async () => {
    Alert.alert('Imagem Adicionada!', this.state.comment);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image source={{uri: this.state.image}} style={styles.image} />
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

export default AddPhoto;
