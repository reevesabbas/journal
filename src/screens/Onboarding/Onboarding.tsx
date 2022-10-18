import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useRef, useState } from 'react'
import { Animated, FlatList, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View, ViewabilityConfig, ViewToken } from 'react-native';

import tw from '../../../tailwind';
import { OnboardingScreensParams } from '.';
import Screen from '../../components/Screen';
import WomanJournaling from '../../assets/images/WomanJournaling.svg'
import {SLIDES, ISlideInfo} from './slides';

export type WelcomeScreenProps = NativeStackScreenProps<OnboardingScreensParams, 'WelcomeScreen'>
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<OnboardingScreensParams, 'WelcomeScreen'>


export const Onboarding = ({navigation}: WelcomeScreenProps) => {
  const [currIndex, setCurrIndex] = useState(0);
  const { width } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useCallback(({}) => {
  }, [])

  const viewConfig = useRef({viewAreaCoveragePercentThreshhold: 50}).current;

  return (
    <Screen style={tw`flex-3`}>
      <FlatList
        data={SLIDES}
        renderItem={({item}) => {
          return (
            <View style={[tw`flex-1 items-center`, { width }]}>
              {React.createElement(item.image)}
              <Text style={tw`h2 mt-10 text-lightPink`}> {item.title} </Text>
              <Text style={tw`p mt-7 mx-3 text-center text-lightPink leading-relaxed`}>{item.description}</Text>
            </View>
          )
        }} 
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: false,
        })}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={32}
      />
    </Screen>
  );
}