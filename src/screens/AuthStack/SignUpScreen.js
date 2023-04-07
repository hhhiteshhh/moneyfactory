import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useState, useRef} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import EmailVerified from '../../assets/icons/email_verified.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Agreement from '../../assets/icons/agreement.svg';
import PasswordShow from '../../assets/icons/password_show.svg';
import PasswordHide from '../../assets/icons/password_hide.svg';
import REGEX from '../../consts/regularExpression';
import OTPScreen from './OTPScreen';
import apis from '../../consts/apis';
import PostApi from '../../hooks/PostApi';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Close from '../../assets/icons/close.svg';
import MyStatusBar from '../../components/MyStatusBar';

export default function SignUp({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNameIcon, setShowNameIcon] = useState(false);
  const [showEmailIcon, setShowEmailIcon] = useState(false);
  const [msg, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [otp, setOtp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(true);
  let OTPref = useRef(otp);
  OTPref.current = otp;

  const tw = useTailwind();

  const check = (data, resolve) => {
    if (data.length === 6) {
      resolve();
    } else {
      setTimeout(() => {
        check(OTPref.current, resolve);
      }, 1000);
    }
  };

  // Promise which resolves when OTP is inserted
  const otpInserted = () => {
    return new Promise(function (resolve, myReject) {
      // "Producing Code" (May take some time)
      if (OTPref.current.length === 6) {
        resolve();
      } else {
        setTimeout(() => {
          check(OTPref.current, resolve);
        }, 1000);
      }
    });
  };

  const goBack = () => {
    navigation.goBack();
  };
  const navigateToOTP = () => {
    setOtp('');
    setShowModal(true);
  };
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
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
  const checkName = name => {
    if (name) {
      let result = REGEX.name.test(name);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      showToaster('Password Mismatch');
    } else {
      try {
        let response = await PostApi(apis.validateSignup, {
          email: email,
          phone: phone,
        });
        console.log(response.data);
        if (response.status === 200) {
          initiateAuthFunc().then(async () => {
            try {
              let createUser = await PostApi(apis.signup, {
                email: email,
                last_name: '',
                name: name,
                password: password,
                phone: phone,
              });
              if (createUser.status === 201) {
                navigateToSignIn();
              } else {
                showToast(createUser.data.msg);
                console.log('err');
              }
            } catch {
              showToast(createUser.data.msg);
              console.log('error');
            }
          });
        } else {
          showToaster(result.data.msg);
        }
      } catch (error) {
        if (error.response.status === 400) {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        }
      }
    }
  };

  const initiateAuthFunc = () => {
    return new Promise((resolve, reject) => {
      let formValues = {
        email: email,
        last_name: '',
        name: name,
        password: password,
        phone: '8295180678',
      };
      fetch(`https://api.moneyfactory.ai/api/users/sendOTP`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formValues),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            res.json().then(r => {
              reject(r.msg);
            });
          }
        })
        .then(res => {
          navigateToOTP();
          otpInserted().then(() => {
            // setIsSubmit(true);
            fetch(`https://api.moneyfactory.ai/api/users/confirmOTP`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                ...formValues,
                otp: OTPref.current.toString(),
              }),
            })
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  res.json().then(r => {
                    reject(r.msg);
                  });
                }
              })
              .then(res => {
                resolve(res);
              });
          });
        });
    });
  };

  const showToaster = (msg, onCallback = false) => {
    setMessage(msg);
    onCallback ? setShowToast(false) : setShowToast(true);
  };
  return (
    <ScrollView
      style={[tw('h-full px-5'), styles.container]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <MyStatusBar padding={50} />
      <View style={[tw('flex flex-row items-center flex-1 mt-3')]}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[tw(' font-bold ml-3'), styles.header]}>Sign Up</Text>
      </View>
      <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
        Create an account and enjoy service!
      </Text>
      <View style={tw('mt-3')}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={Colors.basegray}
          style={styles.input}
          onChangeText={text => {
            setNameError('');
            setShowNameIcon(false);
            setName(text);
          }}
          onBlur={() => {
            setNameError(checkName(name) ? '' : 'Invalid Name');
            setShowNameIcon(checkName(name));
            // setShowEmaiIcon(checkEmail(email));
          }}
          value={name}
        />
        {name && !nameError && showNameIcon && (
          <EmailVerified style={tw(`absolute top-3 right-4`)} />
        )}
        {nameError && name && <Text style={styles.error}>{nameError}</Text>}
        <View style={tw('mt-3 relative')}>
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Phone Number"
              placeholderTextColor={Colors.basegray}
              style={styles.phoneInput}
              maxLength={10}
              onChangeText={text => {
                setPhoneError('');
                setPhone(text);
              }}
              onBlur={() => {
                setPhoneError(checkPhone(phone) ? '' : 'Invalid Phone Number');
              }}
              value={phone}
            />
          </View>
          <Whatsapp style={tw(`absolute top-3 right-4`)} />
          {phoneError && phone && (
            <Text style={styles.error}>{phoneError}</Text>
          )}
        </View>
        <View style={tw('relative')}>
          <TextInput
            placeholder="Email address"
            placeholderTextColor={Colors.basegray}
            style={[tw('mt-3'), styles.input]}
            onChangeText={text => {
              setEmailError('');
              setShowEmailIcon(false);
              setEmail(text);
            }}
            onBlur={() => {
              setEmailError(checkEmail(email) ? '' : 'Invalid Email');
              setShowEmailIcon(checkEmail(email));
            }}
            value={email}
          />
          {email && !emailError && showEmailIcon && (
            <EmailVerified style={tw(`absolute top-6 right-4`)} />
          )}
          {emailError && email && (
            <Text style={styles.error}>{emailError}</Text>
          )}
        </View>
        <View style={tw('relative')}>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Password"
            placeholderTextColor="gray"
            style={[tw('mt-3'), styles.input]}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
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
            setConfirmPassword(text);
            // handleMobileNumber(text);
          }}
          value={confirmPassword}
        />
        {/* 
        <View style={tw('mt-3')}>
          <View style={[tw('flex flex-row items-center mx-auto')]}>
            <View style={[tw('w-[25%]'), styles.hr]}></View>
            <Text style={[tw('mx-4 font-semibold'), styles.or]}>
              Have a Referral Code?
            </Text>
            <View style={[tw('w-[25%]'), styles.hr]}></View>
          </View>
        </View>
        <View style={tw('relative')}>
          <TextInput
            placeholder="Referral Code"
            placeholderTextColor="gray"
            style={[tw('mt-3'), styles.input]}
            onChangeText={text => {
              setReferralCode(text);
            }}
            value={referralCode}
          />
          <TouchableOpacity
            onPress={() => {}}
            style={tw(`absolute top-6 right-4`)}>
            <Info />
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={tw('flex flex-row items-start mt-3')}>
        <Agreement />
        <Text style={[tw('ml-3'), styles.agreement]}>
          By clicking Agree & Join, you agree to the MoneyFactory
          <Text style={styles.links}> User Agreement Privacy Policy </Text>
          and<Text style={styles.links}> Cookie Policy.</Text>
        </Text>
      </View>
      <TouchableOpacity
        disabled={
          emailError ||
          nameError ||
          phoneError ||
          !email ||
          !password ||
          !phone ||
          !confirmPassword ||
          !name
        }
        onPress={() => {
          // goBack();
          handleSubmit();
          // navigateToOTP();
        }}>
        <Button title="Next" />
      </TouchableOpacity>
      <View
        style={[tw('flex flex-row items-center justify-center w-full py-3')]}>
        <Text style={styles.subHeader}>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToSignIn}>
          <Text style={[tw('font-bold pl-2'), styles.signin]}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <OTPScreen
        otp={otp}
        setOtp={setOtp}
        showModal={showModal}
        setShowModal={setShowModal}
        navigation={navigation}
        phone={phone}
      />

      <Modal
        isVisible={showPhoneModal}
        style={styles.modal}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        animationOutTiming={500}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 3, y: 0}}
          colors={[Colors.card1, Colors.card2]}
          style={[tw('p-3 pb-1 relative'), styles.container]}>
          <View style={[tw('flex flex-row items-center justify-end')]}>
            <TouchableOpacity
              onPress={() => {
                setShowPhoneModal(false);
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          <Text style={[tw('mt-3 px-5 font-light'), styles.subHeader]}>
            Please enter your Whatsapp phone number to receive OTP.
          </Text>

          <TouchableOpacity
            style={[tw('my-5 px-5')]}
            onPress={() => {
              setShowPhoneModal(false);
            }}>
            <Button title="OK" />
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </ScrollView>
  );
}
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
  hr: {
    borderBottomWidth: 2,
    borderColor: Colors.yellow,
  },
  or: {fontSize: 14, lineHeight: 16, color: Colors.white},
  modal: {
    margin: 0,
    justifyContent: 'center',
    borderRadius: 6,
    // height: 100,
  },
});
