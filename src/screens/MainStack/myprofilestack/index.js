import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import ProfilePage from './ProfilePage';
import MyInvoices from './MyInvoices';
import MyOrders from './MyOrders';
import MyProfile from './MyProfile';
import SubscribedPlan from './SubscribedPlan';
import ChangePassword from './ChangePassword';
import Notifications from './Notifications';
import Refer from './Refer';
const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
  const userData = useRecoilValue(userDataAtom);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilePage"
        component={props => <ProfilePage {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyProfile"
        component={props => <MyProfile {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={props => <MyOrders {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyInvoices"
        component={props => <MyInvoices {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubscribedPlan"
        component={props => <SubscribedPlan {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={props => <ChangePassword {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={props => <Notifications {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Refer"
        component={props => <Refer {...props} data={userData} />}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
