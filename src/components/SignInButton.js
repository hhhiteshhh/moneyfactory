import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';

const SignInButton = ({Icon, title, full = false}) => {
  const tw = useTailwind();
  return (
    <TouchableOpacity
      style={[
        tw(
          `flex flex-row items-center w-[49%] p-4 rounded-xl ${
            full && 'w-full'
          }`,
        ),
        styles.container,
      ]}>
      <Icon height={24} width={24} />
      <Text style={[tw('pl-3 font-bold'), styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.bgcolor1},
  buttonText: {fontSize: 16, lineHeight: 19, color: Colors.white},
});
