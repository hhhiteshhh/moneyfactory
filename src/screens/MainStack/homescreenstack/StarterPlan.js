import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import QuantCard from '../../../components/QuantCard';
import BackIcon from '../../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import Filter from '../../../assets/icons/filter.svg';
import Search from '../../../assets/icons/search.svg';
import apis from '../../../consts/apis';
import GetApi from '../../../hooks/GetApi';
import MyStatusBar from '../../../components/MyStatusBar';
const StarterPlan = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };
  let planName = 'Invest Daily';
  const tw = useTailwind();
  const renderItem = ({item}) => (
    <QuantCard
      price={item.price}
      name={item.name}
      Image={item.imgUrl}
      severity={item.risk}
      navigation={navigation}
      data={item}
    />
  );

  useEffect(async () => {
    let temp = [];
    let categories = await GetApi(apis.categories);
    let quants = await GetApi(apis.quants);
    categories.data.map((category, ind) => {
      let tempQuant = [];
      const groupCategories = (ele, id) => {
        for (let i = 0; i < ele.categories.length; i++) {
          if (ele.categories[i].categoryId._id === category._id) {
            return true;
          }
        }
      };
      quants.data.filter(groupCategories).map(quant => {
        tempQuant.push(quant);
      });
      temp.push({bank: category.name, quants: tempQuant});
    });

    setData(temp);
  }, []);

  const [data, setData] = useState([]);
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  return (
    <View style={[tw('h-full '), styles.container]}>
      <MyStatusBar padding={50} />
      <View
        style={[
          tw('flex px-5 flex-row items-center justify-between mt-3'),
          {},
        ]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw('font-bold ml-3'), styles.header]}>
            Starter Plan
          </Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <BellIcon />
        </TouchableOpacity>
        <Filter style={tw('ml-3')} />
      </View>
      <View style={[tw('px-5 mt-3 relative')]}>
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
        <Search style={tw(`absolute top-3 left-9`)} />
        <Text style={[tw('font-bold mt-3 mb-3'), styles.subheader]}>
          MoneyFactory Quants
        </Text>
      </View>
      <FlatList
        style={[tw('pl-5')]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) =>
          item.bank === planName && (
            <View>
              <View
                style={[
                  tw(
                    'flex flex-row w-full items-center justify-between mt-3 mb-3',
                  ),
                ]}>
                <Text style={[tw('font-bold'), styles.name]}>{item.bank}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SeeAll', {data: item});
                  }}>
                  <Text style={[tw('font-bold'), styles.seeAll]}>See All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={item.quants}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          )
        }
        keyExtractor={item => item.id}
      />

      {/* <View style={{height: 100}} /> */}
    </View>
  );
};

export default StarterPlan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 55,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subheader: {color: Colors.white, fontSize: 18, lineHeight: 25},
  name: {color: Colors.basegray, fontSize: 18, lineHeight: 24},
  seeAll: {
    color: Colors.primary,
    paddingRight: 10,
    fontSize: 14,
    lineHeight: 19,
  },
});
