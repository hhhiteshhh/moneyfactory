import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import PasswordShow from '../../assets/icons/password_show.svg';
import PasswordHide from '../../assets/icons/password_hide.svg';
import MyStatusBar from '../../components/MyStatusBar';

const ResetPassword = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView
      style={[tw('h-full px-5'), styles.container]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <MyStatusBar padding={50} />
      <TouchableOpacity onPress={goBack}>
        <BackIcon style={[tw('mt-3')]} />
      </TouchableOpacity>
      <Text style={[tw('mt-3 font-bold '), styles.header]}>Reset Password</Text>
      <View style={tw('mt-6')}>
        <View style={tw('relative')}>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Password"
            placeholderTextColor="gray"
            style={[tw('mt-3'), styles.input]}
            onChangeText={text => {
              // handleMobileNumber(text);
            }}
            // value={mobileNumber}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={tw(`absolute top-6 right-4`)}>
            {showPassword ? <PasswordHide /> : <PasswordShow />}
          </TouchableOpacity>
        </View>
        <TextInput
          secureTextEntry={!showPassword}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          style={[tw('mt-3'), styles.input]}
          onChangeText={text => {
            // handleMobileNumber(text);
          }}
          // value={mobileNumber}
        />
      </View>
      <TouchableOpacity
        style={tw('mt-3')}
        onPress={() => {
          navigateToSignIn();
        }}>
        <Button title="Reset Password" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33},
  subHeader: {color: Colors.basegray, fontSize: 16, lineHeight: 22},
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
  agreement: {color: Colors.dullwhite, fontSize: 12},
  links: {color: Colors.primary},
  signin: {
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 22,
  },
});
