import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import {useTailwind} from 'tailwind-rn';
import BackIcon from '../../../assets/icons/back.svg';
import {Colors} from '../../../assets/colors';
import CongratulationsImage from '../../../assets/images/congratulations.svg';
import MyStatusBar from '../../../components/MyStatusBar';
const Congratulations = ({navigation}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View style={[tw('flex flex-row items-center justify-between mt-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw('font-bold ml-3'), styles.header]}>
            Virtual Portfolio
          </Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <BellIcon />
        </TouchableOpacity>
      </View>
      <View style={[tw('mt-16 flex items-center justify-center'), {}]}>
        <CongratulationsImage />
        <Text
          style={[
            tw('font-extrabold mt-12 text-center px-12'),
            {fontSize: 20, lineHeight: 32, color: Colors.primary},
          ]}>
          CONGRATULATION! YOUR QUANTS DEPLOY SUCCESSFULLY
        </Text>
        <Text
          style={[
            tw('mt-3 text-center px-12'),
            {fontSize: 16, lineHeight: 25, color: Colors.white},
          ]}>
          AI-powered investment strategies to maximise your profits and help you
          find the right opportunities up to 10 cr.
        </Text>
        <View
          style={[
            tw('flex items-center justify-center flex-row mt-5 mx-auto'),
          ]}>
          <TouchableOpacity
            style={[
              tw('w-28 mr-2 rounded-md'),
              {borderWidth: 1, borderColor: Colors.primary},
            ]}
            onPress={goBack}>
            <View>
              <Text style={[tw('text-center py-2'), {color: Colors.white}]}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw('w-28 rounded-md'),
              {
                borderWidth: 1,
                borderColor: Colors.primary,
                backgroundColor: Colors.primary,
              },
            ]}>
            <View>
              <Text style={[tw('text-center py-2'), {color: Colors.white}]}>
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subHeader: {color: Colors.white, fontSize: 18, lineHeight: 25},
});
