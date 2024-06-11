import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 30,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: '#FFF',
    },
    nickname: {
      color: '#FFF',
      marginVertical: 10,
      fontSize: 15,
      fontWeight: '400',
      fontStyle: 'italic'
    },
  });