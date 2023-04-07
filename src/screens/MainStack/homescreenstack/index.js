import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import HomeScreen from './HomeScreen';
import Invest100 from './Invest100';
import VirtualInvestor from './VirtualInvestor';
import VirtualPortFolio from './VirtualPortFolio';
import VirtualQuants from './VirtualQuants';
import VirtualQuantDetail from './VirtualQuantDetail';
import DeployVirtualQuant from './DeployVirtualQuant';
import VirtualDeployedQuants from './VirtualDeployedQuants';
import MyQuants from './MyQuants';
import MyQuantDetails from './MyQuantDetails';
import StarterPlan from './StarterPlan';
import QuantDetails from './QuantDetails';
import ProPlan from './ProPlan';
import GrowthPlan from './GrowthPlan';
import Notifications from './Notifications';
import GrowthPlanDescription from './GrowthPlanDescription';
import ProPlanDescription from './ProPlanDescription';

const Stack = createNativeStackNavigator();

const HomeScreenStack = ({dashboard}) => {
  const userData = useRecoilValue(userDataAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={props => <HomeScreen {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Invest100"
        component={Invest100}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GrowthPlanDescription"
        component={GrowthPlanDescription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProPlanDescription"
        component={ProPlanDescription}
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
        name="StarterPlan"
        component={props => <StarterPlan {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProPlan"
        component={props => <ProPlan {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuantDetails"
        component={props => <QuantDetails {...props} data={userData} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GrowthPlan"
        component={props => <GrowthPlan {...props} data={userData} />}
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
