import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import LinearGradient from 'react-native-linear-gradient';
import Image from '../../../assets/images/card_image.svg';
import Play from '../../../assets/icons/play.svg';
import Like from '../../../assets/icons/like.svg';
import Add from '../../../assets/icons/add.svg';
import Dislike from '../../../assets/icons/dislike.svg';
import Button from '../../../components/Button';
import Annualised from '../../../assets/icons/annualised.svg';
import Drawdown from '../../../assets/icons/drawdown.svg';
import Ratio from '../../../assets/icons/ratio.svg';
import Bajaj from '../../../assets/images/bajaj.svg';
import Tata from '../../../assets/images/tata.svg';
import Reliance from '../../../assets/images/reliance.svg';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Close from '../../../assets/icons/close.svg';
import Index from '../../../assets/icons/Positional Future.svg';
import Position from '../../../assets/icons/positional.svg';
import {SvgUri} from 'react-native-svg';
import apis, {MONEY_FACTORY_IMAGE} from '../../../consts/apis';
import 'intl';
import 'intl/locale-data/jsonp/en';
import GetApi from '../../../hooks/GetApi';
import PostApi from '../../../hooks/PostApi';
import MyStatusBar from '../../../components/MyStatusBar';

const windowHeight = Dimensions.get('window').height;

const QuantDetails = ({navigation, route, data}) => {
  const tw = useTailwind();
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  const quantData = route?.params?.data;
  const [deploy, setDeploy] = useState('Automatic');
  const [subscribe, setSubscribe] = useState(false);
  const [userSelectedBroker, setBroker] = useState(10);
  const [brokerName, setBrokerName] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [brokerList, setBrokerList] = useState({
    Stimulated: [
      {
        status: 'active',
        _id: 6,
        name: 'MF Virtual Cash',
        description: 'Money Factory Virtual Cash for simulated deployment',
        imgURL: 'moneyFactory',
      },
    ],
  });
  const [showDeployModal, setShowDeployModal] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToMyQuants = () => {
    navigation.navigate('MyQuants');
  };
  const [indexFutures, setIndexFutures] = useState([]);
  const [positionalFutures, setPositionalFutures] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [msg, setMessage] = useState('');
  // const [brokers, setBrokers] = useState([]);
  const [selectedList, setSelectedList] = useState([
    'Automatic',
    'Assisted',
    'Stimulated',
  ]);
  useEffect(() => {
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    quantData?.subCategories?.map(category => {
      temp1.push(category?.subCategoryName);
    });
    quantData?.functionality?.map(functionality => {
      temp2.push(functionality?.functionalityId?.name);
    });
    quantData?.stocks?.map(stock => {
      temp3.push(stock?.name);
    });
    setIndexFutures(temp1);
    setPositionalFutures(temp2);
    setStocks(temp3);
  }, [quantData]);
  const handleSubscribed = async () => {
    if (!subscribe) {
      try {
        const options = {
          quantId: quantData?._id,
          userId: data?.data.id,
        };

        let result = await PostApi(apis.subscribedAQuant, options);
        if (result.status === 200) {
          showToaster('Successfully subscribed');
          setSubscribe(true);
        } else {
          showToaster('not subscribed');
        }
      } catch (error) {
        showToaster('not subscribed');
      }
    }
  };

  const showToaster = (msg, onCallback = false) => {
    setMessage(msg);
    onCallback ? setShowToast(false) : setShowToast(true);
  };
  const [loading, setLoading] = React.useState(true);
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  useEffect(async () => {
    let result = await GetApi(apis.brokers);
    if (result.status === 200) {
      setBrokerList(prev => ({...prev, Automatic: result.data}));

      // setBrokers(result.data);
      // setBrokerList(result.data);
    }
    let result2 = await GetApi(`${apis.subscribedQuants}/${data?.data.id}`);
    if (result2.status === 200) {
      result2.data.subQts.forEach(ele => {
        if (quantData._id == ele.quant._id) {
          setSubscribe(true);
        }
      });
    }
    let result3 = await GetApi(`${apis.savedBroker}/${data?.data.id}`);
    let temp = [{_id: 'guest', name: 'Link new broker'}];
    if (result3.status === 200) {
      for (var key in result3.data.brokers) {
        temp.push({_id: key, name: key});
      }
      // setAssistedBrokerList(temp);
      setBrokerList(prev => ({...prev, Assisted: temp}));
      setBroker(10);
      setBrokerName(temp[0]._id);
    }
  }, []);

  const handleDeployment = async () => {
    try {
      const options = {
        quantId: quantData._id,
        userId: data?.data.id,
        mode: deploy,
        quantity: multiplier,
        broker: userSelectedBroker,
        brokerName: brokerName,
      };

      const sigoptions = {
        quantId: quantData._id,
        userId: data?.data.id,
        brokerId: 1,
        subscribedPrice: quantData.price * multiplier,
      };
      let result = await PostApi(apis.deployQuants, options);
      console.log(result);
      if (result.status === 200) {
        showToaster('Successfully deployed');
        let result2 = await PostApi(apis.createSignal, sigoptions);
        if (result2.status === 200) {
          showToaster('Signals created Successfully');
          console.log('Signals created Successfully');
          setShowDeployModal(false);
          setTimeout(() => {
            navigateToMyQuants();
          }, 2000);
        } else {
          showToaster('Signals not deployed');
        }
      } else {
        setShowDeployModal(false);
        showToaster('Error: Quants already deployed');
      }
    } catch (e) {
      setShowDeployModal(false);
      showToaster('Error: Quants already deployed');
    }
  };
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  console.log(userSelectedBroker);
  console.log(brokerName);
  return (
    <View style={[tw('h-full '), styles.container]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0}}
        colors={[Colors.card1, Colors.card2]}>
        <MyStatusBar padding={50} transparent/>
        <View
          style={[
            tw('flex px-5 flex-row items-center justify-between my-3'),
            {},
          ]}>
          <View style={[tw('flex flex-row items-center flex-1')]}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={[tw('font-bold ml-3'), styles.header]}>
              {quantData?.categories?.[0]?.categoryId?.name}
            </Text>
          </View>
          <TouchableOpacity onPress={navigateToNotifications}>
            <BellIcon />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
          colors={[Colors.card1, Colors.card2]}
          style={[{width: '100%', height: 300}]}>
          <View style={[tw('flex flex-row w-full items-start px-5 mt-7')]}>
            <View style={[tw('h-24 w-24 items-center justify-center')]}>
              <SvgUri
                width="100%"
                height="100%"
                uri={`${MONEY_FACTORY_IMAGE}/${quantData.imgUrl}`}
                onError={onError}
                onLoad={onLoad}
              />
              {loading && (
                <ActivityIndicator size="large" color={Colors.primary} />
              )}
            </View>
            <View style={tw('ml-5 flex-1')}>
              <View style={[tw('flex flex-row items-center justify-between')]}>
                <Text style={[tw('font-bold'), styles.detailsHeader]}>
                  {quantData?.name}
                </Text>
                <Text
                  style={[
                    tw('font-semibold px-2 py-1'),
                    {
                      color: Colors.white,
                      backgroundColor:
                        quantData?.risk === 'Low'
                          ? Colors.primary
                          : quantData?.risk === 'Medium'
                          ? Colors.orange
                          : 'red',
                      zIndex: 999,
                      fontSize: 12,
                    },
                  ]}>
                  {quantData?.risk}
                </Text>
              </View>
              <View>
                <Text style={[tw('font-bold mt-2'), styles.name]}>
                  {quantData?.categories?.[0]?.categoryId?.name}
                </Text>
              </View>
              <View>
                <Text style={[tw('font-bold mt-3'), styles.price]}>
                  {formatter.format(quantData?.price)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={tw(' mt-7 flex flex-row items-start justify-between px-5')}>
            <View style={[tw('flex flex-row items-start w-[49%] mr-7')]}>
              <Position />
              <Text style={[tw('font-medium ml-3'), styles.iconLabel]}>
                {indexFutures.join(', ')}
              </Text>
            </View>
            <View style={[tw('flex flex-row items-start w-[40%] ')]}>
              <Index />
              <Text style={[tw('font-medium ml-3 mr-5'), styles.iconLabel]}>
                {positionalFutures.join(', ')}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View
          style={[
            tw('flex flex-row items-center justify-between px-5 py-3'),
            styles.card,
          ]}>
          <View style={tw('flex items-center')}>
            <Play />
            <Text style={styles.iconText}>Play</Text>
          </View>
          <View style={tw('flex items-center')}>
            <Add />
            <Text style={styles.iconText}>Add</Text>
          </View>
          <View style={tw('flex items-center')}>
            <Like />
            <Text style={styles.iconText}>Like</Text>
          </View>
          <View style={tw('flex items-center')}>
            <Dislike />
            <Text style={styles.iconText}>Dislike</Text>
          </View>
        </View>
        <View
          style={[
            tw('flex items-center w-full justify-between flex-row px-5 mt-2'),
          ]}>
          <TouchableOpacity style={{width: '45%'}} onPress={handleSubscribed}>
            <Button title={subscribe ? 'Subscribed' : 'Subscribe Now'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '45%'}}
            onPress={() => {
              setShowDeployModal(true);
            }}>
            <View style={[tw('rounded-md mt-3'), styles.deployButton]}>
              <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                Deploy
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={[tw('px-5 mt-5')]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}>
          <View
            style={[
              tw('flex items-start pl-2 pr-5 py-3 rounded-md mr-1 w-[123px]'),
              styles.card,
            ]}>
            <Annualised />
            <Text style={[tw('py-2 font-semibold'), styles.return]}>
              Annualised Return
            </Text>
            <Text style={[tw('font-bold'), styles.data]}>41%</Text>
          </View>
          <View
            style={[
              tw(
                'flex items-start pl-2 pr-5 py-3 rounded-md ml-1 mr-1 w-[123px]',
              ),
              styles.card,
            ]}>
            <Drawdown />
            <Text style={[tw('py-2 font-semibold'), styles.return]}>
              Max {'         '}Drawdown
            </Text>
            <Text style={[tw('font-bold'), styles.data]}>20.2%</Text>
          </View>
          <View
            style={[
              tw('flex items-start pl-2 pr-5 py-3 rounded-md ml-1 w-[123px]'),
              styles.card,
            ]}>
            <Ratio />
            <Text style={[tw('py-2 font-semibold'), styles.return]}>
              Sharp{'         '} Ratio
            </Text>
            <Text style={[tw('font-bold'), styles.data]}>0.83%</Text>
          </View>
          <View style={{width: 50}} />
        </ScrollView>
        <View
          style={[
            tw('w-full p-5 mt-5 flex flex-row justify-between'),
            styles.card,
          ]}>
          <View>
            <View style={[tw(''), {}]}>
              <Text style={[tw(' font-bold'), styles.list]}>
                {`\u2022`} Start Date
              </Text>
              <Text style={[tw('pl-2'), styles.list2]}>
                {quantData?.startdate}
              </Text>
            </View>
            <View style={[tw('mt-3'), {}]}>
              <Text style={[tw(' font-bold'), styles.list]}>
                {`\u2022`} Risk Rating
              </Text>
              <Text style={[tw('pl-2'), styles.list2]}>{quantData?.risk}</Text>
            </View>
          </View>
          <View>
            <View style={[tw(''), {}]}>
              <Text style={[tw(' font-bold'), styles.list]}>
                {`\u2022`} Created by
              </Text>
              <Text style={[tw('pl-2'), styles.list2]}>
                {quantData?.createdBy}
              </Text>
            </View>
            <View style={[tw('mt-3'), {}]}>
              <Text style={[tw(' font-bold'), styles.list]}>
                {`\u2022`} Trading Frequency
              </Text>
              <Text style={[tw('pl-2'), styles.list2]}>
                {quantData?.trading_frequency}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw('px-5')}>
          <Text style={[tw('font-bold mt-5'), styles.data]}>Category</Text>
          <Text style={[tw('font-medium mt-2'), styles.description]}>
            {quantData?.categories?.[0]?.categoryId?.name}
          </Text>
          <Text style={[tw('font-bold mt-5'), styles.data]}>Description</Text>
          <Text style={[tw('mt-1 '), styles.description2]}>
            {quantData?.description}
          </Text>
          <View style={styles.hr} />
          <Text style={[tw('font-bold mt-5'), styles.data]}>Stocks</Text>
        </View>
        <ScrollView
          // horizontal
          style={[tw('px-5')]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}>
          {stocks?.map(stock => (
            <View
              style={[
                tw('my-2'),
                {borderBottomWidth: 1, borderBottomColor: Colors.basegray2},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  // handleShowDetails(index);
                }}>
                <View
                  style={[tw('flex items-center flex-row justify-start pb-2')]}>
                  <Text
                    style={[
                      tw('font-semibold ml-2'),
                      {fontSize: 16, lineHeight: 22, color: Colors.white},
                    ]}>
                    {stock}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
          <View style={{width: 50}} />
        </ScrollView>
        <View style={{height: 10}} />
      </ScrollView>
      <Modal
        isVisible={showDeployModal}
        style={styles.modal}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => {
          setShowDeployModal(false);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 0}}
          style={{borderRadius: 6}}
          colors={[Colors.card1, Colors.card2]}>
          <ScrollView
            style={{
              height: windowHeight * 0.9,
              padding: 20,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={tw('flex flex-row items-center justify-between')}>
              <Text style={[tw('font-semibold'), styles.header]}>
                Deploy Quants
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowDeployModal(false);
                }}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <Text style={[tw('mt-5 font-semibold'), styles.data]}>
              Select Mode
            </Text>
            {selectedList?.map(listItem => {
              return (
                <TouchableOpacity
                  style={[tw('flex items-center flex-row -ml-2 mt-3')]}
                  onPress={() => {
                    setDeploy(listItem);
                    // handleBrokerList(listItem);
                    // setBroker('');
                  }}>
                  <RadioButton
                    value="true"
                    status={deploy === listItem ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setDeploy(listItem);
                      // handleBrokerList(listItem);
                      // setBroker('');
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
                          deploy === listItem ? Colors.white : Colors.basegray,
                      },
                    ]}>
                    {listItem}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <View style={tw('mt-5')}>
              <View style={tw('flex items-center justify-between flex-row')}>
                <Text style={[tw('font-semibold'), styles.data]}>
                  Multiplier
                </Text>
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
            <Text style={[tw('mt-5 font-semibold'), styles.data]}>Broker</Text>
            {brokerList &&
              deploy &&
              brokerList[deploy]?.map(broker => (
                <TouchableOpacity
                  style={[tw('flex items-center flex-row -ml-2 mt-3')]}
                  onPress={() => {
                    if (typeof broker?._id == 'number') {
                      setBroker(broker?._id);
                      setBrokerName('');
                    } else {
                      setBroker(10);
                      setBrokerName(broker?._id);
                    }
                    // setBroker(broker?._id);
                    // handleBroker(broker?._id);
                  }}>
                  <RadioButton
                    value="true"
                    status={
                      userSelectedBroker === 10
                        ? broker?._id === brokerName
                          ? 'checked'
                          : 'unchecked'
                        : userSelectedBroker === broker?._id
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      if (typeof broker?._id == 'number') {
                        setBroker(broker?._id);
                        setBrokerName('');
                      } else {
                        setBroker(10);
                        setBrokerName(broker?._id);
                      }
                      // setBroker(broker?._id);
                      // handleBroker(broker?._id);
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
                          userSelectedBroker === 10
                            ? broker?._id === brokerName
                              ? Colors.white
                              : Colors.basegray
                            : userSelectedBroker === broker?._id
                            ? Colors.white
                            : Colors.basegray,
                      },
                    ]}>
                    {broker?.name}
                  </Text>
                </TouchableOpacity>
              ))}

            <View
              style={[
                tw('flex items-center justify-between flex-row px-5 mt-2'),
                {width: '100%'},
              ]}>
              <TouchableOpacity
                style={{width: '45%'}}
                onPress={() => {
                  setBroker(10);
                  setMultiplier(1);
                  setShowDeployModal(false);
                }}>
                <View
                  style={[
                    tw('rounded-md mt-3 border '),
                    {
                      backgroundColor: Colors.primary3,
                      borderColor: Colors.yellow,
                    },
                  ]}>
                  <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                    Clear
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '45%'}}
                onPress={handleDeployment}>
                <Button title="Deploy" />
              </TouchableOpacity>
            </View>
            <View style={{height: 100}} />
          </ScrollView>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default QuantDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  detailsHeader: {fontSize: 18, lineHeight: 25, color: Colors.white},
  name: {fontSize: 14, lineHeight: 19, color: Colors.white},
  price: {fontSize: 22, lineHeight: 29, color: Colors.primary},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
  card: {backgroundColor: Colors.lightBlack},
  iconText: {color: Colors.text2, marginTop: 5},
  deployButton: {backgroundColor: Colors.primary3},
  return: {fontSize: 14, lineHeight: 19, color: Colors.text},
  data: {fontSize: 18, lineHeight: 24, color: Colors.white},
  list: {color: Colors.basegray, fontSize: 14, lineHeight: 19},
  list2: {color: Colors.primary},
  description: {fontSize: 14, lineHeight: 25, color: Colors.orange},
  description2: {fontSize: 14, lineHeight: 25, color: Colors.basegray},
  hr: {height: 1, backgroundColor: Colors.basegray, marginTop: 15},
  stockCard: {
    fontSize: 18,
    lineHeight: 25,
    backgroundColor: Colors.black2,
    color: Colors.white,
  },
  stockCardLogo: {backgroundColor: Colors.white, borderRadius: 10},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
});
