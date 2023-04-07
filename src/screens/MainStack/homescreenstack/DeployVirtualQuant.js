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
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Button from '../../../components/Button';
import Deploy from '../../../assets/images/deployModalImage.svg';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../../components/MyStatusBar';

const DeployVirtualQuant = ({navigation}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const [broker, setBroker] = useState('5Paisa');
  const [mode, setMode] = useState('simulated');
  const [multiplier, setMultiplier] = useState(1);
  const [showSubscribeModal, setSubscribeModal] = useState(false);

  return (
    <View style={[tw('h-full px-5 '), styles.container]}>
      <MyStatusBar padding={50} />
      <View style={[tw('my-3  flex flex-row items-center')]}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <View style={tw('flex flex-row items-center justify-between')}>
        <Text style={[tw('font-semibold'), styles.header]}>Deploy Quants</Text>
      </View>
      <View style={styles.hr}></View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={[tw('mt-5 font-semibold'), styles.data]}>Broker</Text>
        <TouchableOpacity
          style={[tw('flex items-center flex-row -ml-2 mt-3')]}
          onPress={() => {
            setBroker('5Paisa');
          }}>
          <RadioButton
            value="true"
            status={broker === '5Paisa' ? 'checked' : 'unchecked'}
            onPress={() => {
              setBroker('5Paisa');
            }}
            uncheckedColor={Colors.basegray2}
            color={Colors.primary}
          />
          <Text
            style={[
              {
                fontSize: 14,
                lineHeight: 19,
                color: broker === '5Paisa' ? Colors.white : Colors.basegray,
              },
            ]}>
            5Paisa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw('flex items-center flex-row -ml-2 mt-3')]}
          onPress={() => {
            setBroker('Zerodha');
          }}>
          <RadioButton
            value="true"
            status={broker === 'Zerodha' ? 'checked' : 'unchecked'}
            onPress={() => {
              setBroker('Zerodha');
            }}
            uncheckedColor={Colors.basegray2}
            color={Colors.primary}
          />
          <Text
            style={[
              {
                fontSize: 14,
                lineHeight: 19,
                color: broker === 'Zerodha' ? Colors.white : Colors.basegray,
              },
            ]}>
            Zerodha
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw('flex items-center flex-row -ml-2 mt-3')]}
          onPress={() => {
            setBroker('Upstox');
          }}>
          <RadioButton
            value="true"
            status={broker === 'Upstox' ? 'checked' : 'unchecked'}
            onPress={() => {
              setBroker('Upstox');
            }}
            uncheckedColor={Colors.basegray2}
            color={Colors.primary}
          />
          <Text
            style={[
              {
                fontSize: 14,
                lineHeight: 19,
                color: broker === 'Upstox' ? Colors.white : Colors.basegray,
              },
            ]}>
            Upstox
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw('flex items-center flex-row -ml-2 mt-3')]}
          onPress={() => {
            setBroker('Motilal Oswal');
          }}>
          <RadioButton
            value="true"
            status={broker === 'Motilal Oswal' ? 'checked' : 'unchecked'}
            onPress={() => {
              setBroker('Motilal Oswal');
            }}
            uncheckedColor={Colors.basegray2}
            color={Colors.primary}
          />
          <Text
            style={[
              {
                fontSize: 14,
                lineHeight: 19,
                color:
                  broker === 'Motilal Oswal' ? Colors.white : Colors.basegray,
              },
            ]}>
            Motilal Oswal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw('flex items-center flex-row -ml-2 mt-3')]}
          onPress={() => {
            setBroker('Flyers');
          }}>
          <RadioButton
            value="true"
            status={broker === 'Flyers' ? 'checked' : 'unchecked'}
            onPress={() => {
              setBroker('Flyers');
            }}
            uncheckedColor={Colors.basegray2}
            color={Colors.primary}
          />
          <Text
            style={[
              {
                fontSize: 14,
                lineHeight: 19,
                color: broker === 'Flyers' ? Colors.white : Colors.basegray,
              },
            ]}>
            Flyers
          </Text>
        </TouchableOpacity>
        <View style={tw('mt-5')}>
          <View style={tw('flex items-center justify-between flex-row')}>
            <Text style={[tw('font-semibold'), styles.data]}>Multiplier</Text>
            <Text style={styles.iconLabel}>{multiplier}x</Text>
          </View>

          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor={Colors.yellow}
            maximumTrackTintColor={Colors.yellow}
            thumbTintColor={Colors.yellow}
            onValueChange={value => {
              setMultiplier(value);
            }}
            value={multiplier}
          />
          <View style={tw('flex items-center justify-between flex-row')}>
            <Text style={styles.name}>1x</Text>
            <Text style={styles.name}>10x</Text>
          </View>
        </View>
        <Text style={[tw('mt-5 font-semibold'), styles.data]}>Select Mode</Text>
        <TouchableOpacity
          style={[tw('flex items-center flex-row -ml-2 mt-3')]}
          onPress={() => {
            setMode('simulated');
          }}>
          <RadioButton
            value="true"
            status={mode === 'simulated' ? 'checked' : 'unchecked'}
            onPress={() => {
              setMode('simulated');
            }}
            uncheckedColor={Colors.basegray2}
            color={Colors.primary}
          />
          <Text
            style={[
              {
                fontSize: 14,
                lineHeight: 19,
                color: mode === 'simulated' ? Colors.white : Colors.basegray,
              },
            ]}>
            Simulated
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => {
            setSubscribeModal(true);
          }}>
          <Button title="Deploy" />
        </TouchableOpacity>
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
            <Deploy />
            <Text
              style={[
                tw('text-center mt-3 font-semibold'),
                styles.modalHeader,
              ]}>
              Deploy Your Quants
            </Text>
            <Text
              style={[tw('text-center w-[75%] mt-2 '), styles.modalSubHeader]}>
              AI-powered investment strategies to maximise your profits and help
              you find the right opportunities up to 10 cr.
            </Text>
            <TouchableOpacity
              style={tw('w-[75%] mt-8')}
              onPress={() => {
                setSubscribeModal(false);
                navigation.navigate('MyQuants');
              }}>
              <Button title="Continue" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default DeployVirtualQuant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  hr: {height: 1, backgroundColor: Colors.basegray, marginTop: 15},
  data: {fontSize: 18, lineHeight: 24, color: Colors.white},
  name: {fontSize: 14, lineHeight: 19, color: Colors.white},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  modalHeader: {fontSize: 20, lineHeight: 28, color: Colors.white},
  modalSubHeader: {fontSize: 14, lineHeight: 24, color: Colors.white},
});
