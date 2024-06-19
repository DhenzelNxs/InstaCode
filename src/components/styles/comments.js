import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
    commentContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    nickname: {
      fontWeight: 'bold',
      color: '#FFF',
    },
    comment: {
      color: '#FFF',
    },
    Image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#FFF"
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      textAlign: 'justify',
      marginLeft: 10
    },
    centeredText: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: '300',
    },
  });