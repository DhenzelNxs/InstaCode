import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * (2 / 4),
    },
    imageContainer: {
      backgroundColor: '#1E1C1C',
      marginTop: 60
    },
    description: {
      color: '#FFF',
      marginLeft: 20,
    }
  });