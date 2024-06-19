import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme()

export const colors = {
  loadingColor: colorScheme === 'dark' ? '#1AF38C' : '#7DFFC4',
  backgroundHeaderColor: colorScheme === 'dark' ? '#1B1C1E' : '#AFAFAF',
  backgroundFeedColor: colorScheme === 'dark' ? '#181818' : '#CCCCCC',
  placeholderTextColor: colorScheme === 'dark' ? '#FFF': '#000',
  textColor: colorScheme === 'dark' ? '#FFF' : '#000'
};
