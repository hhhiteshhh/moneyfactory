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
import QuantCard from '../../../components/VirtualQuantCard';
import {data} from '../../../consts/VirtualQuants';
import Button from '../../../components/Button';
import MyStatusBar from '../../../components/MyStatusBar';

const VirtualQuants = ({navigation}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const [mockData, setMockData] = useState(data);
  const [planSelected, setPlanSelected] = useState('');
  const checkboxHandler = (value, index) => {
    const newValue = mockData.map((plan, i) => {
      if (i !== index)
        return {
          ...plan,
          checked: false,
        };
      if (i === index) {
        const item = {
          ...plan,
          checked: !plan.checked,
        };
        if (!plan.checked) {
          setPlanSelected(plan.name);
        } else setPlanSelected('');
        return item;
      }

      return plan;
    });
    setMockData(newValue);
  };

  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View style={[tw('my-3 flex flex-row items-center')]}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[tw('font-bold'), styles.header]}>Quants</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={tw('flex items-center my-5 justify-center ')}>
          <View style={tw('w-[90%]  flex items-center justify-center')}>
            <Text style={[(tw('text-center font-extrabold'), styles.text1)]}>
              Choose Your Quant
            </Text>
            <Text style={[tw('text-center mt-1 font-medium'), styles.text2]}>
              These offer an AI-optimised portfolio of stocks geared towards
              increasing your profits while decreasing your margin for error.
            </Text>
          </View>
        </View>
        <View
          style={[
            tw('flex flex-row w-full items-center justify-between flex-wrap'),
          ]}>
          {mockData.map((item, index) => {
            return (
              <View style={tw('mb-3 w-[48%]')} key={index}>
                <QuantCard
                  price={item.price}
                  name={item.name}
                  Image={item.Image}
                  severity={item.severity}
                  navigation={navigation}
                  checked={item.checked}
                  checkboxHandler={checkboxHandler}
                  index={index}
                />
              </View>
            );
          })}
        </View>
        <View
          style={[
            tw('flex items-center w-full justify-between flex-row my-5'),
          ]}>
          <TouchableOpacity
            style={{width: '48%'}}
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
            style={{width: '48%'}}
            onPress={() => {
              if (planSelected) {
                navigation.navigate('VirtualQuantDetail');
              }
            }}>
            <Button title="Next" />
          </TouchableOpacity>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default VirtualQuants;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
  text1: {color: Colors.primary, fontSize: 18, lineHeight: 28},
  text2: {fontSize: 14, lineHeight: 24, color: Colors.white},
});
