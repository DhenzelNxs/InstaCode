import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundFeedColor
    },
    buttom: {
      marginTop: 50,
      padding: 10,
      backgroundColor: colors.loadingColor,
      paddingLeft: 25,
      paddingRight: 25,
      borderRadius: 10,
    },
    buttomText: {
      fontSize: 20,
      color: '#000',
    },
    input: {
      marginTop: 20,
      width: '90%',
      backgroundColor: colors.backgroundFeedColor,
      height: 40,
      borderWidth: 1,
      paddingLeft: 15,
      borderRadius: 10,
      color: colors.placeholderTextColor,
    },
    inputContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60,
    },
    image: {
      height: 350,
      width: 350,
      resizeMode: 'contain',
      position: 'absolute',
      bottom: "50%",
    },
  });