import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.backgroundFeedColor,
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginTop: 50,
    },
    nickname: {
      marginTop: 30,
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF',
    },
    email: {
      fontSize: 20,
      color: '#FFF',
      fontWeight: '300',
    },
    buttom: {
      marginTop: 30,
      padding: 10,
      backgroundColor: '#DE2C2C',
      borderRadius: 20,
      paddingLeft: 25,
      paddingRight: 25,
      position: 'absolute',
      bottom: 20,
    },
    buttomText: {
      fontSize: 20,
      color: '#FFF',
    },
    emptyText: {
      color: '#A1A1A1',
      fontWeight: '300',
      textAlign: 'center'
    },
    flatlist: {
      width: '100%',
      height: 280, 
      flexGrow: 0, 
      marginTop: 20
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: '#FFF'
    },
    Image: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginTop: 50,
    },
    IconContainer: {
        position: 'absolute',
        right: 1,
        bottom: 5
    }
  });