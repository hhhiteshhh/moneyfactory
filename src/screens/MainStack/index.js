import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRecoilValue} from 'recoil';
// import HomeScreen from './HomeScreen';
import {userDataAtom} from '../../atoms/userDataAtom';
// import Invest100 from './Invest100';
// import Discover from './BottomTabs';
// import HomePage from './HomePage';
// import MyQuantDetails from './MyQuantDetails';
// import VirtualInvestor from './VirtualInvestor';
// import VirtualPortFolio from './VirtualPortFolio';
// import VirtualQuants from './VirtualQuants';
// import VirtualQuantDetail from './VirtualQuantDetail';
// import DeployVirtualQuant from './DeployVirtualQuant';
// import VirtualDeployedQuants from './VirtualDeployedQuants';
import BottomTabs from './BottomTabs';
import {deployedAtom} from '../../atoms/deployedAtom';
// import MyProfile from './MyProfile';
// import MyOrders from './MyOrders';
// import MyInvoices from './MyInvoices';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  const userData = useRecoilValue(userDataAtom);
  const dashboard = useRecoilValue(deployedAtom);
  return (
    <Stack.Navigator initialRouteName={'BottomTabs'}>
      <Stack.Screen
        name="BottomTabs"
        component={props => (
          <BottomTabs {...props} data={userData} dashboard={dashboard} />
        )}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Invest100"
        component={Invest100}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualInvestor"
        component={VirtualInvestor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualPortFolio"
        component={VirtualPortFolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualQuants"
        component={VirtualQuants}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualQuantDetail"
        component={VirtualQuantDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeployVirtualQuant"
        component={DeployVirtualQuant}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualDeployedQuants"
        component={VirtualDeployedQuants}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuantDetails"
        component={MyQuantDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyInvoices"
        component={MyInvoices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
