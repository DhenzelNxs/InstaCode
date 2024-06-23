import { StyleSheet, Platform } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const colorTheme = colorScheme => StyleSheet.create({
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
      backgroundColor: colorScheme === 'dark' ? '#1E1C1C' : '#A1A1A1',
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
      color: '#FFF' ,
      backgroundColor:colorScheme === 'dark' ? '#000' : '#A1A1A1',
      padding: 20,
      maxWidth: '80%',
      borderRadius: 20
    },
  });