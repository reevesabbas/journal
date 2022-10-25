import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useMemo, useState } from 'react'
import { LogBox } from 'react-native';

import { HomeScreen } from './HomeScreen';
import { EntryView } from './EntryView';
import { CreateEntry } from './CreateEntry';
import { Entry } from '../typeorm/entity';
import { Onboarding } from './Onboarding/Onboarding';

export type StackParams = {
  HOME: {username?: string};
  CREATE: {entry?: Entry};
  ENTRY: Entry;
  ONBOARD: undefined;
}

const Stack = createNativeStackNavigator<StackParams>();

type NavigatorStackProps = {

}

export const NavigatorStack = ({}: NavigatorStackProps) => {
    return (
      <NavigationContainer>        
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
              <Stack.Screen name='ONBOARD' component={Onboarding} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name='HOME' component={HomeScreen} />
              <Stack.Screen name='ENTRY' component={EntryView} />
              <Stack.Screen name='CREATE' component={CreateEntry} />
            </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
}