import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import Search from '../../../assets/icons/search.svg';
import MyQuantCard from '../../../components/MyQuantCard';
import MyStatusBar from '../../../components/MyStatusBar';

const VirtualDeployedQuants = ({navigation}) => {
  const tw = useTailwind();

  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View
        style={[tw('flex  flex-row items-center justify-between mt-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          {/* <MenuIcon /> */}
          <Text style={[tw('font-bold'), styles.header]}>My Quants</Text>
        </View>
        {/* <BellIcon /> */}
        {/* <Filter style={tw('ml-3')} /> */}
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
        <MyQuantCard data={true} navigation={navigation} />
        <MyQuantCard data={true} navigation={navigation} />
        <MyQuantCard data={true} navigation={navigation} />
        <MyQuantCard data={true} navigation={navigation} />
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default VirtualDeployedQuants;

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
