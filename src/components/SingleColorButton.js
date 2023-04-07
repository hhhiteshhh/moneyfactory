import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';

const SingleColorButton = () => {
  const tw = useTailwind();
  return (
    <View>
      <Text style={[tw('font-semibold text-center'), styles.buttonText]}>
        Get Started
      </Text>
    </View>
  );
};

export default SingleColorButton;

const styles = StyleSheet.create({
  buttonText: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white,
    fontSize: 14,
    lineHeight: 19,
  },
});
