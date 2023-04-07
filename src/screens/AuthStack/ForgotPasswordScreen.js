import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import forgotPassword from '../../assets/images/forgotPassword.png';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import EmailVerified from '../../assets/icons/email_verified.svg';
import REGEX from '../../consts/regularExpression';
import MyStatusBar from '../../components/MyStatusBar';

const windowWidth = Dimensions.get('window').width;
export default function ForgotPassword({navigation}) {
  const tw = useTailwind();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const goBack = () => {
    navigation.goBack();
  };
  const navigateToOTP = () => {
    navigation.navigate('OTP', {name: 'password'});
  };
  const checkEmail = email => {
    if (email) {
      let result = REGEX.email.test(email);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
  };
  const checkPhone = phone => {
    if (phone) {
      let result = REGEX.phone.test(phone);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
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
      <Text style={[tw('mt-3 font-bold '), styles.header]}>
        Forgot Password
      </Text>
      <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
        Please enter your registered email/mobile to reset your password.{' '}
      </Text>
      <View style={tw('flex items-center justify-center')}>
        <Image
          source={forgotPassword}
          style={[tw('mt-3'), styles.image]}
          resizeMode="contain"
        />
      </View>
      <View style={tw('mt-3')}>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Phone Number"
            placeholderTextColor={Colors.basegray}
            style={styles.phoneInput}
            maxLength={10}
            onChangeText={text => {
              setPhone(text);
              setPhoneError(checkPhone(text) ? '' : 'Invalid Phone Number');

              // handleMobileNumber(text);
            }}
            value={phone}
          />
        </View>
        <Whatsapp style={tw(`absolute top-3 right-4`)} />
        {phoneError && phone && <Text style={styles.error}>{phoneError}</Text>}
      </View>
      <View style={tw('mt-3')}>
        <View style={[tw('flex flex-row items-center mx-auto')]}>
          <View style={[tw('w-[30%]'), styles.hr]}></View>
          <Text style={[tw('mx-8 font-semibold'), styles.or]}>Or</Text>
          <View style={[tw('w-[30%]'), styles.hr]}></View>
        </View>
      </View>
      <View style={tw('mt-3')}>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={Colors.basegray}
          style={styles.input}
          onChangeText={text => {
            setEmail(text);
            setEmailError(checkEmail(text) ? '' : 'Invalid Email');
          }}
          value={email}
        />
        {email && !emailError && (
          <EmailVerified style={tw(`absolute top-3 right-4`)} />
        )}

        {emailError && email && <Text style={styles.error}>{emailError}</Text>}
      </View>

      <TouchableOpacity
        onPress={() => {
          navigateToOTP();
        }}>
        <Button title="Reset Password" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33},
  subHeader: {color: Colors.basegray, fontSize: 16, lineHeight: 22},
  image: {width: windowWidth, height: 150},
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
  hr: {
    borderBottomWidth: 2,
    borderColor: Colors.basegray2,
  },
  or: {fontSize: 12, lineHeight: 16, color: Colors.dullwhite},
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: Colors.basegray2,
  },
  phoneInput: {
    height: 50,
    fontSize: 14,
    color: Colors.white,
    flex: 1,
    marginRight: 40,
  },
  error: {color: 'red', fontSize: 14, marginLeft: 2, marginTop: 2},
});
