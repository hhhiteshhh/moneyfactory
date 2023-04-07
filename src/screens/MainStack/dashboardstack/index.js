import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import Dashboard from './Dashboard';
import MyQuantDetails from './MyQuantDetails';
import Notifications from './Notifications';
const Stack = createNativeStackNavigator();

const HomeScreenStack = ({dashboard}) => {
  const userData = useRecoilValue(userDataAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={props => <Dashboard {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuantDetails"
        component={props => <MyQuantDetails {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={props => <Notifications {...props} data={userData} />}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
