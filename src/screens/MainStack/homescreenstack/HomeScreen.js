import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Share,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import {Colors} from '../../../assets/colors';
import Card from '../../../components/HomePlanCard';
import card1 from '../../../assets/images/card1.svg';
import card2 from '../../../assets/images/card2.svg';
import card3 from '../../../assets/images/card3.svg';
import card4 from '../../../assets/images/card4.svg';
import ReferImage from '../../../assets/images/refer.svg';
import ShareImage from '../../../assets/icons/share.svg';
import ShareWhatsapp from '../../../assets/icons/shareWhatsapp.svg';
import Copy from '../../../assets/icons/copy.svg';
import MyStatusBar from '../../../components/MyStatusBar';

const HomeScreen = ({data, navigation}) => {
  const referCode = 'MF7869';
  const tw = useTailwind();
  const navigateToInvest100 = () => {
    navigation.navigate('Invest100');
  };
  const navigateToVirtualInvestor = () => {
    navigation.navigate('VirtualInvestor');
  };
  const navigateToGrowthPlan = () => {
    navigation.navigate('GrowthPlanDescription');
  };
  const navigateToProPlan = () => {
    navigation.navigate('ProPlanDescription');
  };
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Greetings Investor! 

The Flag of India is going to be the Face of the World for the next few decades🇮🇳 
Be a part of the journey and build your future! 🔮 
        
With Moneyfactory, Start Investing with as little as ₹100 daily into the best stocks, build wealth while you earn dividend income💵
        
Here's your exclusive invite from ${data.name} to join the revolution!! 
Use the Code : MF7869 at the time of Sign Up. 
        
Make your 1st Investment of ₹100 - Earn ₹100 on every referral - Enter a chance to Win IPhone 📱
        
Happy Investing!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // Alert.alert(error.message);
    }
  };

  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />

      <View style={[tw('flex flex-row items-center justify-between mt-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <MenuIcon />
          <Text style={[tw('font-bold ml-3'), styles.header]}>
            Welcome {data.name}!
          </Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <BellIcon />
        </TouchableOpacity>
      </View>
      <Text style={[tw('font-bold mt-3'), styles.subHeader]}>
        Let's start building your portfolio
      </Text>
      <ScrollView
        style={tw(`mt-3 h-full`)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={[tw('flex flex-row items-center justify-between flex-wrap')]}>
          <Card
            title="Virtual Investor"
            SvgImage={card1}
            action={navigateToVirtualInvestor}
          />
          <Card
            title="Starter Plan"
            SvgImage={card2}
            action={navigateToInvest100}
          />
          <Card
            title="Growth Plan"
            SvgImage={card3}
            action={navigateToGrowthPlan}
          />
          <Card title="Pro Plan" SvgImage={card4} action={navigateToProPlan} />
        </View>
        <View style={[tw('mt-4 w-full rounded-md py-3 '), styles.referCard]}>
          <View
            style={[
              tw('flex flex-row items-center pl-3 justify-start pb-3'),
              {borderBottomWidth: 1, borderBottomColor: Colors.basegray2},
            ]}>
            <ReferImage />
            <View style={[tw('')]}>
              <Text style={[tw('font-bold'), styles.subHeader]}>
                Refer A Friend{' '}
              </Text>
              <Text style={[tw('mr-5'), styles.card2Subtitle]}>
                Invite a friend and get{' '}
                <Text style={[tw('font-bold'), styles.hundred]}>₹ 100</Text>
                {'\n'}for every user who makes
                {'\n'}the first investment
              </Text>
            </View>
          </View>
          <View style={[tw('flex items-start px-3 justify-start pb-3')]}>
            <View>
              <Text style={[tw('font-bold my-2'), styles.subHeader]}>
                Share Your Code
              </Text>
            </View>
            <View
              style={[tw('flex w-full flex-row items-center justify-between')]}>
              <View
                style={[
                  tw(
                    'w-[70%] relative flex items-start justify-center h-12 bg-white rounded-md',
                  ),
                ]}>
                <Text style={[tw('font-semibold ml-4'), styles.refer]}>
                  {referCode}
                </Text>
                <View
                  style={[
                    tw('absolute top-0 right-0 h-12 w-12 rounded-md'),
                    {backgroundColor: Colors.gray},
                  ]}>
                  <TouchableOpacity
                    style={[
                      tw('flex flex-row items-center justify-center mt-2'),
                    ]}>
                    <Copy />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[tw('flex flex-row items-start justify-start')]}>
                <TouchableOpacity style={{marginRight: 10}} onPress={onShare}>
                  <ShareImage />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <ShareWhatsapp />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
        <View
          style={[tw('mt-4 w-full rounded-md px-5 py-3 '), styles.callCard]}>
          <View style={[tw('')]}>
            <Text style={[tw('font-bold'), styles.subHeader]}>
              Need help with Investing?
            </Text>
            {/* <Text style={[tw('pr-5'), styles.card2Subtitle]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text> */}
            <TouchableOpacity
              style={[
                tw('mt-2 w-28 px-4 py-2 rounded-md'),
                {backgroundColor: Colors.yellow},
              ]}
              onPress={() => {
                ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
              }}>
              <Text
                style={[
                  tw('text-center font-bold'),
                  {color: Colors.eerie, fontSize: 14, lineHeight: 19},
                ]}>
                Book A Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 10}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subHeader: {color: Colors.white, fontSize: 18, lineHeight: 25},
  card2Subtitle: {fontSize: 14, lineHeight: 21, color: Colors.white},
  refer: {fontSize: 20, lineHeight: 27, color: Colors.purple},
  hundred: {fontSize: 16, lineHeight: 25, color: Colors.white},
  referCard: {backgroundColor: Colors.purple},
  callCard: {backgroundColor: Colors.planCardColor3},
});
