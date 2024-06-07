import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../GlobalStyle/Style';

export const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundFeedColor,
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
  },
  version: {
    fontSize: 16,
    position: 'absolute',
    bottom: 20, // Altera esta margem inferior conforme necessário
    textAlign: 'center',
    width: '100%',
    color: '#FFF',
  },
});
