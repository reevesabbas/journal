import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react'
import { LogBox } from 'react-native';

import { Home } from './Home';
import { EntryView } from './EntryView';
import OnboardingStack from './Onboarding';
import { AuthContext, AuthProvider } from '../AuthContext';
import { CreateEntry } from './CreateEntry';
import { Entry } from '../typeorm/entity';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

export type StackParams = {
  HOME: undefined;
  CREATE: {id?: number, title?: string, body?: string};
  ENTRY: Entry;
  SIGNIN: undefined;
  SIGNUP: undefined;
}

const Stack = createNativeStackNavigator<StackParams>();

export const NavigatorStack = ({}) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const {isLoading, userToken} = useContext(AuthContext);

    return (
      <AuthProvider>
        <NavigationContainer>        
          { 
            loggedIn ?
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name='HOME' component={Home} />
              <Stack.Screen name='ENTRY' component={EntryView} />
              <Stack.Screen name='CREATE' component={CreateEntry} />
            </Stack.Navigator>
            :
            <OnboardingStack /> 
          }
        </NavigationContainer>
      </AuthProvider>
    );
}