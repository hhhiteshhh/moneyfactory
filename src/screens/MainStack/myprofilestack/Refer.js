import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import ReferImage from '../../../assets/images/refer.svg';
import CashCard from '../../../assets/images/cashCard.svg';
import ShareImage from '../../../assets/icons/share.svg';
import ShareWhatsapp from '../../../assets/icons/shareWhatsappGreen.svg';
import Copy from '../../../assets/icons/copy.svg';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../../components/MyStatusBar';

const Refer = ({navigation, data}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const unclaimedCash = 10;
  const message = `Greetings Investor! 

  The Flag of India is going to be the Face of the World for the next few decades🇮🇳 
  Be a part of the journey and build your future! 🔮 
  
  With Moneyfactory, Start Investing with as little as ₹100 daily into the best stocks, build wealth while you earn dividend income💵
  
  Here's your exclusive invite from ${data.name} to join the revolution!! 
  Use the Code : MF7869 at the time of Sign Up. 
  
  Make your 1st Investment of ₹100 - Earn ₹100 on every referral - Enter a chance to Win IPhone 📱
  
  Happy Investing!`;
  const shareToWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=${message}`);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: message,
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
      <View
        style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw('font-bold ml-3'), styles.header]}>
            Refer Friends
          </Text>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {unclaimedCash === 0 ? (
          <View style={[tw('relative')]}>
            <CashCard />
            <Text style={[tw('absolute top-3 left-3'), styles.hundred]}>
              MF Cash{`\n`}Balance
            </Text>
            <Text
              style={[
                tw('absolute font-bold top-16 left-3'),
                {fontSize: 32, color: Colors.white},
              ]}>
              ₹ 545
            </Text>
          </View>
        ) : (
          <LinearGradient
            start={{x: 0, y: 3.3}}
            end={{x: 1.3, y: 0}}
            colors={[Colors.primary, Colors.planCardColor1]}
            style={[tw('rounded-md h-[108px] w-full flex flex-row')]}>
            <View
              style={[
                tw('flex py-3 flex-row items-center justify-start w-full'),
              ]}>
              <View
                style={[
                  tw('w-1/2 flex items-center justify-center'),
                  {borderRightWidth: 1, borderRightColor: Colors.eerie},
                ]}>
                <Text style={[tw('text-center'), styles.hundred]}>
                  MF Cash{`\n`}Balance
                </Text>
                <Text
                  style={[
                    tw('font-bold '),
                    {fontSize: 32, color: Colors.white},
                  ]}>
                  ₹ 545
                </Text>
              </View>
              <View style={[tw('w-1/2 flex items-center justify-center')]}>
                <Text style={[tw('text-center'), styles.hundred]}>
                  Unclaimed{`\n`}MF Cash
                </Text>
                <Text
                  style={[
                    tw('font-bold '),
                    {fontSize: 32, color: Colors.white},
                  ]}>
                  ₹ 500
                </Text>
              </View>
            </View>
          </LinearGradient>
        )}
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
          <View style={[tw('flex items-center px-3 justify-start pb-3')]}>
            <View>
              <Text style={[tw('font-bold my-2'), styles.subHeader]}>
                Share Your Code
              </Text>
            </View>
            <View
              style={[
                tw(
                  'w-[70%] relative flex items-start justify-center h-12 bg-white rounded-md',
                ),
              ]}>
              <Text style={[tw('font-semibold ml-4'), styles.refer]}>
                MF7869
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
          </View>
        </View>
        <View
          style={[
            tw('flex items-center w-full justify-between flex-row my-5'),
          ]}>
          <TouchableOpacity style={{width: '48%'}} onPress={onShare}>
            <View style={[tw('rounded-md mt-3 relative'), styles.deployButton]}>
              <Text
                style={[
                  tw('py-3 text-center ml-9 font-bold'),
                  styles.iconLabel,
                ]}>
                Other
              </Text>
              <View style={[tw('absolute top-0 left-0')]}>
                <ShareImage />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '48%', position: 'relative'}}
            onPress={() => {
              // navigation.navigate('VirtualQuantDetail');
              shareToWhatsApp('text');
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.3, y: 0}}
              colors={[Colors.primary, Colors.color1]}
              style={[tw('rounded-md mt-3')]}>
              <Text
                style={[
                  tw('py-3 ml-9 text-center font-bold'),
                  styles.buttonText,
                ]}>
                WhatsApp
              </Text>
            </LinearGradient>
            <View style={[tw('absolute top-3 -left-1')]}>
              <ShareWhatsapp />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Colors.basegray2,
            width: '100%',
            marginTop: 10,
          }}
        />
        <View style={[tw('mt-6')]}>
          <Text style={[tw('font-bold mb-3'), styles.subHeader]}>
            How It Works?
          </Text>
          <Text style={[tw('mb-5'), styles.card2Subtitle]}>
            {`\u2022`} Invite a friend and get ₹ 100 for every user who makes
            the first investment
          </Text>
          <Text style={[tw('mb-5'), styles.card2Subtitle]}>
            {`\u2022`} Invite a friend and get ₹ 100 for every user who makes
            the first investment
          </Text>
          <Text style={[tw('mb-5'), styles.card2Subtitle]}>
            {`\u2022`} Invite a friend and get ₹ 100 for every user who makes
            the first investment
          </Text>
        </View>
        <View style={{height: 10}} />
      </ScrollView>
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  refer: {fontSize: 20, lineHeight: 27, color: Colors.purple},
  hundred: {fontSize: 16, lineHeight: 25, color: Colors.white},
  referCard: {backgroundColor: Colors.purple},
  subHeader: {color: Colors.white, fontSize: 18, lineHeight: 25},
  card2Subtitle: {fontSize: 14, lineHeight: 21, color: Colors.white},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 18, lineHeight: 25, color: Colors.white},
  buttonText: {color: Colors.white, fontSize: 18, lineHeight: 25},
});
