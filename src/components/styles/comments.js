import { StyleSheet } from "react-native";

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
      width: 30,
      height: 30,
      borderRadius: 15,
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