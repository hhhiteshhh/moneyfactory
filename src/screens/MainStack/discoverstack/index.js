import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import Discover from './Discover';
import QuantDetails from './QuantDetails';
import MyQuants from './MyQuants';
import MyQuantDetails from './MyQuantDetails';
import Notifications from './Notifications';
const Stack = createNativeStackNavigator();

const HomeScreenStack = ({dashboard}) => {
  const userData = useRecoilValue(userDataAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={props => <Discover {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuantDetails"
        component={props => <QuantDetails {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuants"
        component={props => <MyQuants {...props} data={userData} />}
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
