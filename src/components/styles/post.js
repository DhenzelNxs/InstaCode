import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * (2 / 4),
    },
    imageContainer: {
      backgroundColor: '#1E1C1C',
      marginTop: 60
    },
    description: {
      color: '#FFF',
      marginLeft: 20,
    },
    like: {
      marginTop: 10,
      marginLeft: 6,
      flexDirection: "row"
    },
    share: {
      marginTop: 10,
      marginLeft: 20
    },
    comment: {
      marginTop: 6,
      marginLeft: 15
    },
    post_icons: {
      flex: 1,
      flexDirection: 'row'
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo transparente
    },
    modalView: {
      width: '100%',
      height: '50%', // Ocupa 50% da tela
      backgroundColor: colors.backgroundFeedColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.loadingColor,
    },
    button: {
      position: 'absolute',
      top: 7,
      right: 20,
      zIndex: 999
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });