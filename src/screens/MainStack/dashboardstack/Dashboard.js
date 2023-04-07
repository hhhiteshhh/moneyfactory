import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LogoBig from '../../../assets/images/card_image.svg';
import {useTailwind} from 'tailwind-rn';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import {Colors} from '../../../assets/colors';
import Search from '../../../assets/icons/search.svg';
import OverViewIcon from '../../../assets/icons/overview.svg';
import More from '../../../assets/icons/moreVertYellow.svg';
import MoreWhite from '../../../assets/icons/more_vert.svg';
import Profit from '../../../assets/icons/today_profit.svg';
import Logo from '../../../assets/images/logo.svg';
import card1 from '../../../assets/images/next_image_1.png';
import card1_1 from '../../../assets/images/next_image_1_1.png';
import card2 from '../../../assets/images/next_image_2.png';
import card3 from '../../../assets/images/next_image_3.png';
import Modal from 'react-native-modal';
import Close from '../../../assets/icons/close.svg';
import ViewDetails from '../../../assets/icons/view.svg';
import LinearGradient from 'react-native-linear-gradient';
import Play from '../../../assets/icons/play.svg';
import Pause from '../../../assets/icons/pause.svg';
import ExitAll from '../../../assets/icons/exitAll.svg';
import Exit from '../../../assets/icons/exit.svg';
import ModalDropdown from 'react-native-modal-dropdown';
import {ProgressChart} from 'react-native-chart-kit';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import 'intl';
import 'intl/locale-data/jsonp/en';
import apis from '../../../consts/apis';
import GetApi from '../../../hooks/GetApi';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../../../consts/apis';
import MyStatusBar from '../../../components/MyStatusBar';

const chartConfig = {
  backgroundGradientFrom: 'transparent',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'transparent',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(105, 202, 215, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.4,
  useShadowColorFromDataset: false, // optional
};
const dataGraph = {
  labels: ['Swim', 'Bike', 'Run'], // optional
  data: [0.65],
};

const Dashboard = ({data, navigation}) => {
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  const tw = useTailwind();
  const [quantSelected, setQuantSelected] = useState();
  const [overall, setoverall] = useState(0.0);
  const overviewData = [
    {title: 'Available Balance', amount: '0'},
    {title: 'Portfolio Value', amount: '0'},
    {title: 'Capital Deployed', amount: overall},
  ];
  const [detailsModal, setDetailsModal] = useState(false);
  const navigateToMyQuantDetails = () => {
    navigation.navigate('MyQuantDetails', {data: quantSelected});
  };
  const [quants, setQuants] = useState([]);
  const calcTotalPnl = quants => {
    let total = 0;
    quants.stocksignals.map(ele => {
      total += ele?.pldata?.pl;
      //   calc(ele.subscribed_price, ele.ltp);
    });

    return isNaN(total) ? 0 : Number(total).toFixed(2);
  };

  useEffect(async () => {
    let result = await GetApi(`${apis.myQuants}/${data?.id}`);
    if (result.status === 200) {
      setQuants(result.data);
      let ovtmp = 0,
        r = 0;
      result?.data?.activeQuants.forEach(q => {
        let capital = (ovtmp += q.quant.quant.price * q.quant.quantity);
        r += Number(calcTotalPnl(q));
      });
      setoverall(ovtmp);
    }
  }, []);
  // useEffect(async () => {
  //   let result = await GetApi(`${apis.total}/${data?.id}`);
  //   if (result.status === 200) {
  //     setQuants(result.data);
  //   }
  // }, []);
  const checkNaN = value => {
    if (isNaN(value)) {
      return true;
    } else {
      return false;
    }
  };
  const checkNegativeNo = value => {
    if (value < 0) {
      return true;
    } else {
      return false;
    }
  };
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  const [loading, setLoading] = React.useState(true);
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />

      <View style={[tw('flex flex-row items-center justify-between my-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <MenuIcon />
          <Text style={[tw('font-bold ml-3'), styles.header]}>
            Hello, {data.name}!
          </Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <BellIcon />
        </TouchableOpacity>
      </View>
      <View style={[tw('mt-3 relative')]}>
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
        <Search style={tw(`absolute top-3 left-3`)} />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={tw('my-5')}>
          <Text style={[tw('font-bold mb-2'), styles.subheader]}>OverView</Text>
          <FlatList
            horizontal
            // style={[tw('')]}
            // showsHorizontalScrollIndicator={true}
            // showsVerticalScrollIndicator={false}
            data={overviewData}
            renderItem={({item, index}) => (
              <View
                style={[
                  tw('relative mr-2 p-3 rounded-md'),
                  styles.overviewCard,
                ]}>
                <ModalDropdown
                  style={tw('absolute top-3 right-1')}
                  dropdownStyle={{
                    backgroundColor: Colors.black,
                    width: 100,
                    height: 106,
                    borderColor: Colors.black,
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: 3,
                    // marginLeft: -30,
                  }}
                  options={['Assisted', 'Stimulated', 'Automatic']}
                  renderRow={item => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 33,
                          padding: 6,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            tw('font-semibold'),
                            {
                              // marginHorizontal: 2,
                              fontSize: 14,
                              color: Colors.white,
                              textAlignVertical: 'center',
                              lineHeight: 18,
                            },
                          ]}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                  isFullWidth={true}>
                  <More />
                </ModalDropdown>
                <View
                  style={[tw('flex w-full items-center justify-between mt-3')]}>
                  <OverViewIcon />
                  <Text
                    style={[
                      tw('w-28 text-center mt-3'),
                      styles.overviewCardTitle,
                    ]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      tw('mt-2 font-extrabold'),
                      styles.overviewCardAmount,
                    ]}>
                    {formatter.format(item.amount)}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={[tw('flex flex-row')]}>
          <View
            style={[tw('mr-2 p-5 w-[49%] rounded-md'), styles.overviewCard]}>
            <View>
              <View style={[tw('h-24')]}>
                <View style={[tw('relative flex items-center justify-center')]}>
                  <ProgressChart
                    data={dataGraph}
                    width={79}
                    height={79}
                    strokeWidth={9}
                    radius={35}
                    chartConfig={chartConfig}
                    hideLegend={true}
                  />
                  <Text
                    style={[
                      tw('absolute top-[35%] font-bold'),
                      {fontSize: 20, color: Colors.white},
                    ]}>
                    65%
                  </Text>
                </View>
              </View>
              <View
                style={[tw('flex flex-row items-center justify-center'), {}]}>
                <OverViewIcon />
                <View style={[tw('ml-2')]}>
                  <Text style={styles.overviewCardTitle}>Used Balance</Text>
                  <Text style={[tw('font-bold'), styles.balance]}>
                    {formatter.format(0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[tw('mr-2 p-5 w-[49%] rounded-md'), styles.overviewCard]}>
            <View>
              <View style={[tw('h-24 flex items-center justify-center')]}>
                <View style={[tw('flex flex-row items-center justify-center')]}>
                  <Text style={[tw('mr-2'), styles.overviewCardTitle]}>
                    Today Profit
                  </Text>
                  <Profit />
                </View>
                <Text
                  style={[
                    tw('font-bold text-center'),
                    {...styles.balance, color: Colors.primary},
                  ]}>
                  {formatter.format(0)}
                </Text>
              </View>
              <View
                style={[tw('flex flex-row items-center justify-center'), {}]}>
                <OverViewIcon />
                <View style={[tw('ml-2')]}>
                  <Text style={styles.overviewCardTitle}>Total PNL</Text>
                  <Text style={[tw('font-bold'), styles.balance]}>
                    {formatter.format(0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={tw('')}>
          <Text style={[tw('font-bold my-3'), styles.subheader]}>
            Current Statistic
          </Text>
        </View>
        <View
          style={[
            tw(
              'flex flex-row items-start justify-start relative mb-5 bg-black p-5 rounded-md',
            ),
          ]}>
          <View style={[tw('relative')]}>
            <View style={[tw('relative')]}>
              <View style={[tw('absolute top-0')]}>
                <AnimatedCircularProgress
                  size={160}
                  width={10}
                  backgroundWidth={5}
                  fill={dataGraph.data * 100}
                  tintColor="#00ff00"
                  tintColorSecondary="#ff0000"
                  backgroundColor="#3d5875"
                  arcSweepAngle={180}
                  rotation={-90}
                  lineCap="round"
                />
              </View>
              <View style={[tw('mt-5 ml-5 relative')]}>
                <AnimatedCircularProgress
                  size={120}
                  width={8}
                  backgroundWidth={5}
                  fill={dataGraph.data * 100}
                  tintColor="#ededed"
                  tintColorSecondary="#ff0000"
                  backgroundColor="#3d5875"
                  arcSweepAngle={180}
                  rotation={-90}
                  lineCap="round"
                />
                <View style={[tw('absolute mt-5 ml-5')]}>
                  <AnimatedCircularProgress
                    size={80}
                    width={6}
                    backgroundWidth={5}
                    fill={dataGraph.data * 100}
                    tintColor="#e32eee"
                    tintColorSecondary="#ff0000"
                    backgroundColor="#ffffff"
                    arcSweepAngle={180}
                    rotation={-90}
                    lineCap="round"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[tw('flex ml-8')]}>
            <View>
              <View style={[tw('flex flex-row items-center')]}>
                <View
                  style={[
                    tw('rounded-full w-3 h-3'),
                    {backgroundColor: Colors.primary},
                  ]}
                />
                <Text style={[tw('ml-2'), styles.overviewCardTitle]}>
                  Used Balance
                </Text>
              </View>
              <Text style={[tw('font-bold'), styles.card1Text]}>
                {formatter.format(0)}
              </Text>
            </View>
            <View style={[tw('mt-3')]}>
              <View style={[tw('flex flex-row items-center')]}>
                <View
                  style={[
                    tw('rounded-full w-3 h-3'),
                    {backgroundColor: Colors.primary},
                  ]}
                />
                <Text style={[tw('ml-2'), styles.overviewCardTitle]}>
                  Used Balance
                </Text>
              </View>
              <Text style={[tw('font-bold'), styles.card1Text]}>
                {formatter.format(0)}
              </Text>
            </View>
            <View style={[tw('mt-3')]}>
              <View style={[tw('flex flex-row items-center')]}>
                <View
                  style={[
                    tw('rounded-full w-3 h-3'),
                    {backgroundColor: Colors.primary},
                  ]}
                />
                <Text style={[tw('ml-2'), styles.overviewCardTitle]}>
                  Used Balance
                </Text>
              </View>
              <Text style={[tw('font-bold'), styles.card1Text]}>
                {formatter.format(0)}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[tw('absolute top-3 right-1')]}>
            <More />
          </TouchableOpacity>
        </View>
        <View style={tw('')}>
          <View style={[tw('flex flex-row items-center justify-between')]}>
            <Text style={[tw('font-bold mb-2'), styles.subheader]}>
              Active Quants
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyQuants');
              }}>
              <Text
                style={[
                  tw('font-bold mb-2'),
                  {fontSize: 16, lineHeight: 22, color: Colors.yellow},
                ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {quants?.activeQuants?.map(
            (ele, index) =>
              index < 3 && (
                <View
                  style={[
                    tw(
                      'flex flex-row items-center justify-between rounded-md p-3 my-1',
                    ),
                    {backgroundColor: Colors.black},
                  ]}>
                  <View
                    style={[
                      tw('flex flex-row items-center justify-center'),
                      {},
                    ]}>
                    <View
                      style={[
                        tw(
                          'relative rounded-full justify-center items-center flex',
                        ),
                        styles.logo,
                      ]}>
                      <View
                        style={[tw('h-16 w-16 items-center justify-center')]}>
                        <SvgUri
                          width="100%"
                          height="100%"
                          uri={`${MONEY_FACTORY_IMAGE}/${ele?.quant?.quant?.imgUrl}`}
                          onError={onError}
                          onLoad={onLoad}
                        />
                        {loading && (
                          <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                          />
                        )}
                      </View>
                      <View
                        style={[
                          tw('absolute bottom-0 right-0 rounded-full w-3 h-3'),
                          styles.activeButton,
                        ]}
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setQuantSelected(ele);
                          setDetailsModal(true);
                        }}>
                        <Text
                          style={[
                            tw('ml-3 font-bold'),
                            {fontSize: 18, lineHeight: 23, color: Colors.white},
                          ]}>
                          {ele?.quant?.quant?.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={[tw('flex flex-row items-center')]}>
                        <Text
                          style={[
                            tw('ml-3 pt-1'),
                            {
                              fontSize: 14,
                              lineHeight: 18,
                              color: Colors.dullwhite,
                            },
                          ]}>
                          P&L :
                        </Text>
                        <Text
                          style={[
                            tw('ml-3 pt-1 font-bold'),
                            {
                              fontSize: 14,
                              lineHeight: 18,
                              color: checkNegativeNo(calcTotalPnl(ele))
                                ? Colors.red
                                : Colors.primary,
                            },
                          ]}>
                          {checkNegativeNo(calcTotalPnl(ele))
                            ? `- ₹ ${-1 * calcTotalPnl(ele)}`
                            : !checkNaN(calcTotalPnl(ele))
                            ? `₹ ${calcTotalPnl(ele)}`
                            : '---'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <MoreWhite />
                </View>
              ),
          )}
        </View>
        {/* <View style={tw('my-5')}>
          <View style={[tw('flex flex-row items-center justify-between')]}>
            <Text style={[tw('font-bold mb-2'), styles.subheader]}>
              What Next?
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  tw('font-bold mb-2'),
                  {fontSize: 16, lineHeight: 22, color: Colors.yellow},
                ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <ScrollView
          style={[tw('mb-10')]}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={[tw('mr-4 relative')]}>
            <Image source={card1} />
            <Image source={card1_1} style={[tw('absolute top-6 right-5')]} />

            <View
              style={[
                tw('absolute top-3 left-5 w-[197px]'),
                {lineHeight: 35, letterSpacing: 10},
              ]}>
              <View
                style={tw('flex items-center flex-row w-[197px] flex-wrap')}>
                <Text style={[tw('font-semibold'), styles.card1Text]}>
                  Get{' '}
                </Text>
                <Text style={[tw('font-bold'), styles.card1Rupee]}>₹500 </Text>
                <Text style={[tw('font-semibold'), styles.card1Text]}>
                  Cashback on your
                </Text>
                <Text style={[tw('font-bold '), styles.card1Referral]}>
                  FIRST Referral
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  tw('mt-2 w-28 px-4 py-2 rounded-md'),
                  {backgroundColor: Colors.white, color: Colors.eerie},
                ]}>
                <Text
                  style={[
                    tw('text-center font-semibold'),
                    {color: Colors.eerie, fontSize: 14, lineHeight: 19},
                  ]}>
                  Refer Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[tw('mr-4 relative')]}>
            <Image source={card2} />
            <View style={[tw('absolute top-3 left-5')]}>
              <Text style={[tw('font-bold'), styles.card2Title]}>
                Need help with Investing?
              </Text>
              <Text style={[tw('pr-5'), styles.card2Subtitle]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
              <TouchableOpacity
                style={[
                  tw('mt-2 w-28 px-4 py-2 rounded-md'),
                  {backgroundColor: Colors.yellow},
                ]}>
                <Text
                  style={[
                    tw('text-center font-bold'),
                    {color: Colors.eerie, fontSize: 14, lineHeight: 19},
                  ]}>
                  Book A Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[tw('mr-4 relative')]}>
            <Image source={card3} />
            <View style={[tw('absolute top-3 left-5')]}>
              <Text style={styles.card2Title}>
                Explore the best deals for you
              </Text>
              <Text style={[tw('font-bold'), styles.card1Rupee]}>
                Invest Right Way.
              </Text>
              <TouchableOpacity
                style={[
                  tw('mt-2 w-28 px-4 py-2 rounded-md'),
                  {backgroundColor: Colors.yellow},
                ]}>
                <Text
                  style={[
                    tw('text-center font-bold'),
                    {color: Colors.eerie, fontSize: 14, lineHeight: 19},
                  ]}>
                  Invest Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView> */}
      </ScrollView>
      <Modal
        isVisible={detailsModal}
        style={styles.modal}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => {
          setDetailsModal(false);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 0}}
          style={{borderRadius: 6}}
          colors={[Colors.card1, Colors.card2]}>
          <View>
            <View style={[tw('flex flex-row justify-between py-3 px-5')]}>
              <View
                style={[tw('flex flex-row justify-center items-center'), {}]}>
                <View style={[tw('h-16 w-16 items-center justify-center')]}>
                  <SvgUri
                    width="100%"
                    height="100%"
                    uri={`${MONEY_FACTORY_IMAGE}/${quantSelected?.quant?.quant?.imgUrl}`}
                    onError={onError}
                    onLoad={onLoad}
                  />
                  {loading && (
                    <ActivityIndicator size="large" color={Colors.primary} />
                  )}
                </View>
                <View style={(tw(''), {marginLeft: 20})}>
                  <Text style={[tw('font-bold'), styles.iconSubText]}>
                    {quantSelected?.quant?.quant?.name}
                  </Text>
                  <Text style={[tw('font-bold'), styles.modalSubText]}>
                    {quantSelected?.quant?.quant?.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setDetailsModal(false);
                }}>
                <Close />
              </TouchableOpacity>
            </View>
            <View
              style={[
                tw('flex flex-row items-center px-5 justify-between px-5 py-3'),
              ]}>
              <View style={tw('flex items-center')}>
                <Play />
                <Text style={styles.iconText2}>Start</Text>
              </View>
              <View style={tw('flex items-center')}>
                <Pause />
                <Text style={styles.iconText2}>Pause</Text>
              </View>
              <View style={tw('flex items-center')}>
                <ExitAll />
                <Text style={styles.iconText2}>Exit All</Text>
              </View>
              <View style={tw('flex items-center')}>
                <Exit />
                <Text style={styles.iconText2}>Exit Selected</Text>
              </View>
            </View>
            <View style={styles.hr} />
            <TouchableOpacity
              onPress={navigateToMyQuantDetails}
              style={[
                tw('py-3 flex flex-row items-center px-5 justify-between'),
              ]}>
              <Text style={[tw('font-bold'), styles.iconSubText]}>
                View More Details
              </Text>
              <ViewDetails />
            </TouchableOpacity>
          </View>
          <View style={{height: 50}} />
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default Dashboard;

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
  subheader: {color: Colors.white, fontSize: 18, lineHeight: 24},
  overviewCard: {backgroundColor: Colors.lightBlack},
  overviewCardTitle: {color: Colors.dullwhite, fontSize: 14, lineHeight: 19},
  overviewCardAmount: {color: Colors.white, fontSize: 24, lineHeight: 31},
  logo: {backgroundColor: Colors.lightBlack, width: 60, height: 60},
  activeButton: {backgroundColor: Colors.primary},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  iconSubText: {color: Colors.white, fontSize: 16, lineHeight: 21},
  hr: {height: 1, backgroundColor: Colors.basegray2, marginTop: 10},
  iconText2: {color: Colors.text2, marginTop: 5},
  modalSubText: {color: Colors.primary, fontSize: 20, lineHeight: 27},
  balance: {fontSize: 18, lineHeight: 29, color: Colors.white},
  card1Text: {fontSize: 16, lineHeight: 22, color: Colors.white},
  card1Rupee: {fontSize: 22, lineHeight: 30, color: Colors.white},
  card1Referral: {fontSize: 24, lineHeight: 32, color: Colors.yellow},
  card2Title: {fontSize: 18, lineHeight: 25, color: Colors.white},
  card2Subtitle: {fontSize: 14, lineHeight: 21, color: Colors.white},
});
