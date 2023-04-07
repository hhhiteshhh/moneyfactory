import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import SortIcon from '../../../assets/icons/sort.svg';
import Order from '../../../components/Order';
import GetApi from '../../../hooks/GetApi';
import apis from '../../../consts/apis';
import MyStatusBar from '../../../components/MyStatusBar';

const MyOrders = ({navigation, data}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };

  const [orders, setOrders] = useState([]);
  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return `${date}/${month}/${year}`;
  };

  function GetTime() {
    // Creating variables to hold time.
    var date, TimeType, hour, minutes, fullTime;

    // Creating Date() function object.
    date = new Date();

    // Getting current hour from Date object.
    hour = date.getHours();

    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 11) {
      TimeType = 'AM';
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = 'PM';
    }

    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour == 0) {
      hour = 12;
    }

    // Getting the current minutes from date object.
    minutes = date.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    // Adding all the variables in fullTime variable.
    fullTime =
      hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();

    return fullTime;
  }
  useEffect(async () => {
    let result = await GetApi(`${apis.orders}/${data?.id}`);
    if (result.status === 200) {
      setOrders(result.data);
    }
  }, []);

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
            My Order Book
          </Text>
        </View>
        <SortIcon />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={[tw('font-medium mt-3'), styles.subheader]}>
          Order History
        </Text>
        {orders.map((order, index) => {
          return <Order data={order} key={index} />;
        })}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subheader: {color: Colors.dullwhite, fontSize: 15, lineHeight: 18},
});
