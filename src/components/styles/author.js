import { StyleSheet } from "react-native";
import { colors } from "../../GlobalStyle/Style";

export const colorTheme = colorScheme => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    nickname: {
      color: colorScheme === 'dark' ? '#FFF' : '#000',
      marginVertical: 10,
      fontSize: 15,
      fontWeight: '400',
      fontStyle: 'italic',
      marginLeft: 5,
    },
    Image: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginLeft: 5,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#FFF' : '#000',
    },
  });