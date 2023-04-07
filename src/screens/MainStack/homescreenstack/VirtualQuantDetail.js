import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import LinearGradient from 'react-native-linear-gradient';
import Image from '../../../assets/images/card_image.svg';
import Bajaj from '../../../assets/images/bajaj.svg';
import Tata from '../../../assets/images/tata.svg';
import Reliance from '../../../assets/images/reliance.svg';
import Button from '../../../components/Button';
import Modal from 'react-native-modal';
import Subscribe from '../../../assets/images/subscribe.svg';
import Position from '../../../assets/icons/positional.svg';
import Index from '../../../assets/icons/Positional Future.svg';
import MyStatusBar from '../../../components/MyStatusBar';

const VirtualQuantDetail = ({navigation}) => {
  const [showSubscribeModal, setSubscribeModal] = useState(false);
  const [subscribeText, setSubscribeText] = useState('Subscribe');
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  let severity = 'Medium';

  return (
    <View style={[tw('h-full '), styles.container]}>
      <MyStatusBar padding={50} />
      <View style={[tw('my-3 px-5 flex flex-row items-center')]}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={tw('flex px-5 items-center justify-center ')}>
          <View
            style={tw('w-[80%] flex px-5 items-center mb-5 justify-center')}>
            <Text style={[(tw('text-center font-extrabold'), styles.text1)]}>
              Make It Official
            </Text>
            <Text style={[tw('text-center mt-1 font-medium'), styles.text2]}>
              Understand the stocks that are part of your quant and the level of
              risk it offers.
            </Text>
          </View>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
          colors={[Colors.card1, Colors.card2]}
          style={[{width: '100%', height: 200}]}>
          <View style={[tw('flex px-5 flex-row w-full items-start mt-7')]}>
            <Image />
            <View style={tw('ml-5 flex-1')}>
              <View style={[tw('flex flex-row items-center justify-between')]}>
                <Text style={[tw('font-bold'), styles.detailsHeader]}>
                  Zeus
                </Text>
                <Text
                  style={[
                    tw('font-semibold px-2 py-1'),
                    {
                      color: Colors.white,
                      backgroundColor:
                        severity === 'Low'
                          ? Colors.primary
                          : severity === 'Medium'
                          ? Colors.orange
                          : 'red',
                      zIndex: 999,
                      fontSize: 12,
                    },
                  ]}>
                  {severity}
                </Text>
              </View>
              <View>
                <Text style={[tw('font-bold mt-2'), styles.name]}>
                  Banknifty
                </Text>
              </View>
              <View>
                <Text style={[tw('font-bold mt-3'), styles.price]}>
                  ₹ 2,50,000
                </Text>
              </View>
            </View>
          </View>
          <View
            style={tw('mt-7 flex flex-row items-center justify-between px-5')}>
            <View style={[tw('flex flex-row items-center')]}>
              <Position />
              <Text style={[tw('font-medium ml-3'), styles.iconLabel]}>
                Index Futures
              </Text>
            </View>
            <View style={[tw('flex flex-row items-center')]}>
              <Index />
              <Text style={[tw('font-medium ml-3'), styles.iconLabel]}>
                Positional Futures
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={tw('px-5')}>
          <Text style={[tw('font-bold mt-5'), styles.data]}>Stocks</Text>
          <ScrollView
            horizontal
            style={[tw('mt-5')]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={20}>
            <View
              style={[
                tw('flex items-start p-4 rounded-md mr-1 w-[123px]'),
                styles.stockCard,
              ]}>
              <View
                style={[
                  tw('p-1 w-[40px] h-[40px] flex items-center justify-center'),
                  styles.stockCardLogo,
                ]}>
                <Reliance />
              </View>
              <Text style={[tw('pt-3 font-medium'), styles.return]}>
                Reliance Industries. ltd
              </Text>
            </View>
            <View
              style={[
                tw('flex items-start p-4 rounded-md mx-1 w-[123px]'),
                styles.stockCard,
              ]}>
              <View
                style={[
                  tw('p-1 w-[40px] h-[40px] flex items-center justify-center'),
                  styles.stockCardLogo,
                ]}>
                <Tata />
              </View>
              <Text style={[tw('pt-3 font-medium w-[129px]'), styles.return]}>
                Tata Consultancy Services Ltd.
              </Text>
            </View>
            <View
              style={[
                tw('flex items-start p-4 rounded-md mx-1 w-[123px]'),
                styles.stockCard,
              ]}>
              <View
                style={[
                  tw('p-1 w-[40px] h-[40px] flex items-center justify-center'),
                  styles.stockCardLogo,
                ]}>
                <Bajaj />
              </View>
              <Text style={[tw('pt-3 font-medium'), styles.return]}>
                Bajaj Finance Limited
              </Text>
            </View>
            <View
              style={[
                tw('flex items-start p-4 rounded-md mx-1 w-[123px]'),
                styles.stockCard,
              ]}>
              <View
                style={[
                  tw('p-1 w-[40px] h-[40px] flex items-center justify-center'),
                  styles.stockCardLogo,
                ]}>
                <Reliance />
              </View>
              <Text style={[tw('pt-3 font-medium'), styles.return]}>
                Reliance Industries. ltd
              </Text>
            </View>
            <View style={{width: 50}} />
          </ScrollView>
          <View
            style={[
              tw('flex items-center w-full justify-between flex-row my-5'),
            ]}>
            <TouchableOpacity
              style={{width: '49%'}}
              onPress={() => {
                goBack();
                //   setShowDeployModal(true);
              }}>
              <View style={[tw('rounded-md mt-3'), styles.deployButton]}>
                <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                  Previous
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '49%'}}
              onPress={() => {
                if (subscribeText === 'Subscribe') {
                  setSubscribeModal(true);
                }
                if (subscribeText === 'Deploy Next') {
                  navigation.navigate('DeployVirtualQuant');
                }
              }}>
              <Button title={subscribeText} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>

      <Modal
        isVisible={showSubscribeModal}
        style={styles.modal}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => {
          setSubscribeModal(false);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 0}}
          style={{borderRadius: 6}}
          colors={[Colors.card1, Colors.card2]}>
          <View style={tw('flex items-center justify-center my-8 ')}>
            <Subscribe />
            <Text
              style={[
                tw('text-center mt-3 font-semibold'),
                styles.modalHeader,
              ]}>
              Welcome to the 1% club!
            </Text>
            <Text style={[tw('text-center w-[60%] mt-2'), styles.text2]}>
              Congratulations! Your quant has been deployed and you're all set
              to start building exponential wealth.
            </Text>
            <TouchableOpacity
              style={{width: '45%', marginTop: 30}}
              onPress={() => {
                setSubscribeText('Deploy Next');
                setSubscribeModal(false);
              }}>
              <Button title="Okay" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default VirtualQuantDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  detailsHeader: {fontSize: 18, lineHeight: 25, color: Colors.white},
  name: {fontSize: 14, lineHeight: 19, color: Colors.white},
  price: {fontSize: 22, lineHeight: 29, color: Colors.primary},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
  return: {fontSize: 14, lineHeight: 19, color: Colors.text},
  stockCard: {
    fontSize: 18,
    lineHeight: 25,
    color: Colors.white,
    backgroundColor: Colors.black2,
  },
  stockCardLogo: {backgroundColor: Colors.white, borderRadius: 10},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  text1: {color: Colors.primary, fontSize: 18, lineHeight: 28},
  text2: {fontSize: 14, lineHeight: 24, color: Colors.white},
  modalHeader: {fontSize: 20, lineHeight: 28, color: Colors.white},
  data: {fontSize: 18, lineHeight: 24, color: Colors.white},
});
