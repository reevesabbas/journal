import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useMemo, useState } from 'react'
import { LogBox } from 'react-native';

import { Home } from './Home';
import { EntryView } from './EntryView';
import { CreateEntry } from './CreateEntry';
import { Entry, User } from '../../typeorm/entity';
import { Onboarding } from '../Onboarding/Onboarding';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

export type StackParams = {
  HOME: undefined;
  CREATE: {entry?: Entry};
  ENTRY: Entry;
  ONBOARD: undefined;
}

const Stack = createNativeStackNavigator<StackParams>();
export const NavigatorStack = ({}) => {
    return (
      <NavigationContainer>        
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='HOME' component={Home} />
          <Stack.Screen name='ENTRY' component={EntryView} />
          <Stack.Screen name='CREATE' component={CreateEntry} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}