import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react'

import { Home } from './Home';
import OnboardingStack from './Onboarding';

export type StackParams = {
  HOME: undefined;
  CREATE: undefined;
  ENTRY: {title: string, body: string};
  SIGNIN: undefined;
  SIGNUP: undefined;
}

const Stack = createNativeStackNavigator<StackParams>();

export const NavigatorStack = ({}) => {
  const [loggedIn, setLoggedIn] = useState(true);

    return (
      <NavigationContainer>        
        { loggedIn ?
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'HOME'} component={Home} />
          </Stack.Navigator>
          :
          <OnboardingStack /> 
        }
      </NavigationContainer>
    );
}