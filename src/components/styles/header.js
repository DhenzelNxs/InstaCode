import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 20 : 0,
      left: 0,
      right: 0,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#000',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.backgroundHeaderColor,
      zIndex: 1000,
    },
    rowCotainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    image: {
      height: 30,
      width: 30,
      resizeMode: 'contain',
    },
    title: {
      color: '#19F28B',
      fontFamily: 'monospace',
      height: 30,
      fontSize: 28,
    },
    userContainer: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
    },
    user: {
      fontSize: 10,
      color: '#FFF',
      fontStyle: 'italic'
    },
    avatar: {
      width: 30,
      height: 30,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: '#FFF',
      borderRadius: 30,
    },
  });