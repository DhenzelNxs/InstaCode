import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const colorTheme = (colorScheme) => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorScheme === "dark" ? colors.backgroundFeedColor : "#CCCCCC",
    },
    emptyText: {
      textAlign: 'center',
      margin: '0 auto',
      marginTop: '50%',
      fontSize: 20,
      color: '#FFF',
      fontWeight: '200'
    },
    Loginbuttom: {
      padding: 10,
      paddingRight: 30,
      paddingLeft: 30,
      backgroundColor: colors.loadingColor,
      marginTop: 50,
      borderRadius: 10
    },
    buttomText: {
      fontSize: 20,
      color: '#000',
      fontStyle: "italic",
      fontWeight: "500",
      textAlign: "center"
    },
  });