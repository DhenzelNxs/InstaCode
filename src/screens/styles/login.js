import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundFeedColor
    },
    Loginbuttom: {
      padding: 10,
      paddingRight: 30,
      paddingLeft: 30,
      backgroundColor: colors.loadingColor,
      marginTop: 50,
      borderRadius: 10
    },
    Registerbuttom: {
      padding: 10,
    },
    buttomText: {
      fontSize: 20,
      color: '#000',
      fontStyle: "italic",
      fontWeight: "500",
      textAlign: "center"
    },
    input: {
      marginTop: 20,
      width: '90%',
      backgroundColor: colors.backgroundFeedColor,
      height: 40,
      borderWidth: 1,
      color: '#FFF',
      borderRadius: 10,
    },
    image: {
      height: 350,
      width: 350,
      resizeMode: 'contain',
      position: 'absolute',
      bottom: "50%",
    },
    inputContainer: {
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    registerContainer: {
      position: "absolute",
      bottom: 30
    }
  });