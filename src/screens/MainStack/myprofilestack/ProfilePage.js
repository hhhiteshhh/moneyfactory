import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import bg from '../../../assets/images/image_bg.png';
import ProfileTab from '../../../components/ProfileTab';
import MI from '../../../assets/icons/MI.svg';
import PI from '../../../assets/icons/PI.svg';
import OB from '../../../assets/icons/OB.svg';
import MR from '../../../assets/icons/MR.svg';
import MB from '../../../assets/icons/MB.svg';
import FB from '../../../assets/icons/FB.svg';
import SQ from '../../../assets/icons/SQ.svg';
import NF from '../../../assets/icons/NF.svg';
import CP from '../../../assets/icons/CP.svg';
import LO from '../../../assets/icons/LO.svg';
import SP from '../../../assets/icons/plans.svg';
import {userAtom} from '../../../atoms/userAtom';
import {useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStatusBar from '../../../components/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';

const ProfilePage = ({navigation, data}) => {
  const tw = useTailwind();
  const setUser = useSetRecoilState(userAtom);

  const goToMyProfile = () => {
    navigation.navigate('MyProfile');
  };
  const goToMyInvoices = () => {
    navigation.navigate('MyInvoices');
  };
  const goToMyOrders = () => {
    navigation.navigate('MyOrders');
  };
  const goToSubscribedPlan = () => {
    navigation.navigate('SubscribedPlan');
  };
  const goToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };
  const logout = async () => {
    setUser(false);
    await AsyncStorage.removeItem('UserData');
  };
  const dummy = () => {
    // navigation.navigate('MyOrders');
  };
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  const navigateToReferPage = () => {
    navigation.navigate('Refer');
  };
  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View
        style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <MenuIcon />
          <Text style={[tw('font-bold ml-3'), styles.header]}>Profile</Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <BellIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[tw('mt-5 relative')]}>
          <LinearGradient
            start={{x: 0, y: 3.3}}
            end={{x: 1.3, y: 0}}
            colors={[Colors.primary, Colors.planCardColor1]}
            style={[tw('rounded-md h-[108px] w-full flex flex-row')]}>
            <View style={[tw('absolute top-3 left-5')]}>
              <View style={[tw('flex flex-row items-center justify-start')]}>
                <Image
                  source={{uri: data?.data?.avatar}}
                  style={[tw('rounded-full w-20 h-20')]}
                  progressiveRenderingEnabled={true}
                />
                <View style={[tw('ml-2')]}>
                  <Text style={[tw('font-bold'), styles.name]}>
                    {data?.data?.name} {data?.data?.last_name}
                  </Text>
                  <Text style={[tw('font-medium mt-1'), styles.email]}>
                    {data?.data?.email}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={[tw('mt-5')]}>
          <Text style={[tw('font-semibold'), styles.account]}>Account</Text>
        </View>
        <View style={[tw('')]}>
          <ProfileTab
            Icon={PI}
            action={goToMyProfile}
            title={'Personal Information'}
          />
          <ProfileTab Icon={MI} action={dummy} title={'My Invoices'} />
          <ProfileTab Icon={OB} action={goToMyOrders} title={'My Order Book'} />
          {/* <ProfileTab Icon={MR} action={dummy} title={'My Reports'} /> */}
          {/* <ProfileTab Icon={MB} action={dummy} title={'My Brokers'} /> */}
          <ProfileTab
            Icon={SP}
            action={goToSubscribedPlan}
            title={'Subscription Plans'}
          />
          {/* <ProfileTab Icon={FB} action={dummy} title={'Feedback'} /> */}
          {/* <ProfileTab Icon={SQ} action={dummy} title={'Subscribed Quants'} /> */}
          {/* <ProfileTab Icon={NF} action={dummy} title={'Notifications'} toggle /> */}
          <ProfileTab
            Icon={CP}
            action={goToChangePassword}
            title={'Change Password'}
          />
          <ProfileTab
            Icon={LO}
            action={navigateToReferPage}
            title={'Refer a Friend'}
          />
          <ProfileTab Icon={LO} action={logout} title={'Logout'} last />
          <View style={{height: 100}} />
        </View>
      </ScrollView>

      {/* <TouchableOpacity onPress={goToMyProfile}>
        <Text>ProfilePage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToMyInvoices}>
        <Text>goToMyInvoices</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToMyOrders}>
        <Text>goToMyOrders</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  name: {color: Colors.white, fontSize: 18, lineHeight: 25},
  email: {color: Colors.white, fontSize: 14, lineHeight: 25},
  account: {color: Colors.white, fontSize: 16, lineHeight: 22},
});
