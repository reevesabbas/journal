import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Onboarding } from './Onboarding';

export type OnboardingScreensParams = {
  WelcomeScreen: undefined;
}

const OnboardingSceen = createNativeStackNavigator<OnboardingScreensParams>();

export const OnboardingScreens = ({}) => {
    return (
      <NavigationContainer>
        <OnboardingSceen.Navigator screenOptions={{headerShown: false}}>
          <OnboardingSceen.Screen name='WelcomeScreen' component={Onboarding} />
        </OnboardingSceen.Navigator>
      </NavigationContainer>
    );
}