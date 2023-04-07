import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Close from '../../assets/icons/close.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import REGEX from '../../consts/regularExpression';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;

export default function OTPScreen({
  otp,
  setOtp,
  showModal,
  setShowModal,
  navigation,
  phone,
}) {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = e => {
    let {total, hours, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    }
  };

  const clearTimer = e => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:10');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 30);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const [OTPError, setOTPError] = useState('');
  const [hash, setHash] = useState('');
  const tw = useTailwind();
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  const navigateToReset = () => {
    navigation.navigate('Reset');
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

  useEffect(() => {
    let temp2 = [];
    let temp = phone?.slice(0, -2);
    temp?.split('')?.map(item => {
      temp2.push('*');
    });
    setHash(temp2.join(''));
  }, [phone]);
  return (
    <Modal
      isVisible={showModal}
      style={styles.modal}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackdropPress={() => {
        setShowModal(false);
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 3, y: 0}}
        colors={[Colors.card1, Colors.card2]}
        style={[tw('p-3 pb-8 relative'), styles.container]}>
        <View style={[tw('mt-7 flex flex-row items-center justify-between')]}>
          <Text style={[tw(' font-bold '), styles.header]}>
            OTP Verification
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}>
            <Close />
          </TouchableOpacity>
        </View>
        <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
          We have sent the verification code to your mobile number/ Whatsapp
          number +91 {hash}
          {phone?.slice(-2)}
        </Text>

        <OTPInputView
          style={[tw('mx-auto my-5'), {width: '80%', height: 80}]}
          pinCount={6}
          code={otp}
          onCodeChanged={code => {
            setOtp(code);
            setOTPError(checkPhone(code) ? '' : 'Invalid OTP');
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setOtp(code);
            setShowModal(false);
          }}
        />
        {OTPError && otp && <Text style={styles.error}>{OTPError}</Text>}
        <Text style={[tw('font-bold'), styles.timer]}>{timer}</Text>
        <TouchableOpacity
          style={[tw('mt-5')]}
          // onPress={() => {
          //   if (route?.params?.name) {
          //     navigateToReset();
          //   } else {
          //     navigateToSignIn();
          //   }
          // }}
        >
          <Button title="Submit" />
        </TouchableOpacity>
        <View
          style={[
            tw(
              'flex flex-row items-center justify-center w-full pb-5 mt-8 mb-5',
            ),
          ]}>
          <Text style={styles.subHeader}>Didn't receive the code?</Text>
          <TouchableOpacity
          // onPress={navigateToSignUp}
          >
            <Text style={[tw('font-bold pl-2'), styles.resend]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
    height: windowHeight * 0.55,
    paddingBottom: 30,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33},
  subHeader: {color: Colors.basegray, fontSize: 16, lineHeight: 26},
  image: {color: Colors.basegray, fontSize: 16, lineHeight: 22},
  resend: {
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  timer: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  error: {color: 'red', fontSize: 14, marginLeft: 2, marginTop: 2},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
    // height: 100,
  },
});
