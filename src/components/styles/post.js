import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const colorTheme = colorScheme => StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * (2 / 4),
    },
    imageContainer: {
      backgroundColor: colorScheme === "dark" ? '#1E1C1C' : '#7A6F6F',
      marginTop: 60
    },
    description: {
      color: colorScheme === "dark" ? '#FFF': "#000",
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
      backgroundColor: colorScheme === "dark" ? colors.backgroundFeedColor : "#7A6F6F",
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
      color: colorScheme === "dark" ? 'white': '#000',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });