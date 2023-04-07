import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import forgotPassword from '../../../assets/images/virtual_portfolio.png';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../../components/Button';
import MyStatusBar from '../../../components/MyStatusBar';

const VirtualPortFolio = ({navigation}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const [planSelected, setPlanSelected] = useState('');
  const checkboxHandler = (value, index) => {
    const newValue = plans.map((plan, i) => {
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
          setPlanSelected(plan.title);
        } else setPlanSelected('');
        return item;
      }

      return plan;
    });
    setPlans(newValue);
  };
  const [plans, setPlans] = useState([
    {title: '₹ 5 Lakh', checked: false},
    {title: '₹ 10 Lakh', checked: false},
    {title: '₹ 20 Lakh', checked: false},
    {title: '₹ 50 Lakh', checked: false},
    {title: '₹ 1 cr', checked: false},
  ]);

  return (
    <View style={[tw('h-full px-5 '), styles.container]}>
      <MyStatusBar padding={50} />
      <View style={[tw('my-3 flex flex-row items-center')]}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[tw('font-bold'), styles.header]}>Virtual PortFolio</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={tw('mb-5')}>
        <View style={tw('flex items-center mt-10 mb-6 justify-center')}>
          <Image
            source={forgotPassword}
            style={[tw('mt-3'), styles.image]}
            resizeMode="contain"
          />
          <View style={tw('w-[85%] flex mt-5 justify-center items-center')}>
            <Text style={[(tw('text-center font-extrabold'), styles.text1)]}>
              Select your portfolio amount
            </Text>
            <Text style={[tw('text-center mt-1 font-medium'), styles.text2]}>
              How big do you want your portfolio to be?
            </Text>
            <Text style={[tw('text-center'), styles.text2]}>
              Select an amount based on your goals, risk appetite, and current
              investment capacity.
            </Text>
          </View>
        </View>
        {plans.map((plan, index) => (
          <TouchableOpacity
            key={index}
            style={[
              tw('flex items-center justify-between flex-row p-5 my-2'),
              styles.checkbox,
            ]}
            onPress={e => {
              checkboxHandler(e, index);
            }}>
            <View>
              <Text style={[tw(''), styles.portfolio]}>Portfolio Value</Text>
              <Text style={[tw('font-bold '), styles.title]}>{plan.title}</Text>
            </View>
            <CheckBox
              value={plan.checked}
              onValueChange={e => {
                checkboxHandler(e, index);
              }}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            if (planSelected) {
              navigation.navigate('VirtualQuants');
            }
            //   setUserData({name: 'Mustafa'});
            //   setUser(true);
          }}>
          <Button title="Next" />
        </TouchableOpacity>
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default VirtualPortFolio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
  text1: {color: Colors.primary, fontSize: 18, lineHeight: 28},
  text2: {fontSize: 14, lineHeight: 24, color: Colors.white},
  checkbox: {backgroundColor: Colors.lightBlack},
  portfolio: {fontSize: 14, lineHeight: 18, color: Colors.dullwhite},
  title: {fontSize: 20, lineHeight: 26, color: Colors.white},
});
