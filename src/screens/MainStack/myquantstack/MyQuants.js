import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import Filter from '../../../assets/icons/filter.svg';
import Search from '../../../assets/icons/search.svg';
import MyQuantCard from '../../../components/MyQuantCard';
import apis from '../../../consts/apis';
import GetApi from '../../../hooks/GetApi';
import MyStatusBar from '../../../components/MyStatusBar';

const MyQuants = ({navigation, data}) => {
  const tw = useTailwind();
  const [quants, setQuants] = useState([]);

  useEffect(async () => {
    let result = await GetApi(`${apis.myQuants}/${data?.id}`);
    if (result.status === 200) {
      setQuants(result.data);
    }
  }, []);
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View
        style={[tw('flex  flex-row items-center justify-between mt-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <MenuIcon />
          <Text style={[tw('font-bold ml-3'), styles.header]}>My Quants</Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <BellIcon />
        </TouchableOpacity>
        <Filter style={tw('ml-3')} />
      </View>
      <View style={[tw(' my-3 relative')]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.basegray}
          style={styles.input}
          onChangeText={text => {
            // setEmail(text);
            // setEmailError(checkEmail(text) ? '' : 'Invalid Email');
          }}
          // value={email}
        />
        <Search style={tw(`absolute top-3 left-4`)} />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {quants?.activeQuants?.map(ele => {
          return <MyQuantCard data={ele} navigation={navigation} />;
        })}

        <View style={{height: 10}} />
      </ScrollView>
    </View>
  );
};

export default MyQuants;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 55,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
});
