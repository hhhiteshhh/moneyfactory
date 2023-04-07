import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainStack from '../screens/MainStack';
import AuthStack from '../screens/AuthStack';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../atoms/userDataAtom';

const StackNavigator = ({user, oldUser}) => {
  const userData = useRecoilValue(userDataAtom);
  return user ? <MainStack /> : <AuthStack oldUser={oldUser} />;
};

export default StackNavigator;

const styles = StyleSheet.create({});
