import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import Down from '../../../assets/icons/down.svg';
import Button from '../../../components/Button';
import Camera from '../../../assets/icons/camera.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import PostApi from '../../../hooks/PostApi';
import apis from '../../../consts/apis';
import PutApi from '../../../hooks/PutApi';
import MyStatusBar from '../../../components/MyStatusBar';

const MyProfile = ({navigation, data}) => {
  const tw = useTailwind();

  const goBack = () => {
    navigation.goBack();
  };
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState(data?.data?.name);
  const [lastName, setLastName] = useState(data?.data?.last_name);
  const [email, setEmail] = useState(data?.data?.email);
  const [phone, setPhone] = useState(data?.data?.phone_number);
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [country, setCountry] = useState('India');
  const [msg, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const galleryOptions = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
    selectionLimit: 1,
  };

  const openGallery = () => {
    launchImageLibrary(galleryOptions, setResponse);
  };

  const handleSubmit = async () => {
    try {
      let response = await PutApi(`${apis.profileEdit}/${data?.id}`, {
        Fname: firstName,
        Lname: lastName,
        email: email,
        mob: phone,
        city: city,
        state: state,
        country: country,
      });
      if (response.status === 200) {
        showToaster('User Profile edited!');
        goBack();
      } else {
        showToaster(response.data.message);
      }
    } catch (error) {}
  };

  const showToaster = (msg, onCallback = false) => {
    setMessage(msg);
    onCallback ? setShowToast(false) : setShowToast(true);
  };
  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View
        style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw('font-bold ml-3'), styles.header]}>
            Personal Information
          </Text>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={[tw('relative flex items-center justify-center mt-8 mb-5')]}>
          <Image
            source={{
              uri: response?.didCancel
                ? 'https://firebasestorage.googleapis.com/v0/b/ritu-portfolio.appspot.com/o/profile.jpg?alt=media&token=adbcab78-bf33-4547-aa8d-c7adcde8b95f'
                : response?.assets[0]
                ? response?.assets[0]?.uri
                : 'https://firebasestorage.googleapis.com/v0/b/ritu-portfolio.appspot.com/o/profile.jpg?alt=media&token=adbcab78-bf33-4547-aa8d-c7adcde8b95f',
            }}
            style={[tw('rounded-full w-32 h-32')]}
          />
          <TouchableOpacity
            style={[tw('absolute -bottom-2 pl-20')]}
            onPress={openGallery}>
            <Camera />
          </TouchableOpacity>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setFirstName(text);
            }}
            onBlur={() => {}}
            value={firstName}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            First Name
          </Text>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setLastName(text);
            }}
            onBlur={() => {}}
            value={lastName}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            Last Name
          </Text>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setEmail(text);
            }}
            onBlur={() => {}}
            value={email}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            Email
          </Text>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            maxLength={10}
            onChangeText={text => {
              setPhone(text);
            }}
            onBlur={() => {}}
            value={phone}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            Mobile Number
          </Text>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setCity(text);
            }}
            onBlur={() => {}}
            value={city}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            City
          </Text>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setState(text);
            }}
            onBlur={() => {}}
            value={state}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            State
          </Text>
          <View style={[tw('absolute top-[48px] right-5')]}>
            <Down />
          </View>
        </View>
        <View style={[tw('relative')]}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setCountry(text);
            }}
            onBlur={() => {}}
            value={country}
          />
          <Text
            style={[
              tw('absolute top-[16px] left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            Country
          </Text>
          <View style={[tw('absolute top-[48px] right-5')]}>
            <Down />
          </View>
        </View>
        <View
          style={[
            tw('flex items-center justify-between flex-row mt-2'),
            {width: '100%'},
          ]}>
          <TouchableOpacity
            style={{width: '49%'}}
            onPress={() => {
              goBack();
            }}>
            <View
              style={[
                tw('rounded-md mt-3'),
                {
                  backgroundColor: Colors.primary3,
                },
              ]}>
              <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '49%'}}
            onPress={() => {
              handleSubmit();
            }}>
            <Button title="Save" />
          </TouchableOpacity>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  input: {
    height: 50,
    fontSize: 14,
    lineHeight: 22,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
    marginTop: 23,
  },
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
});
