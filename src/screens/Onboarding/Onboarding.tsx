import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { 
  Animated, 
  FlatList, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  useWindowDimensions,
  View, 
  ViewToken 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import tw from '../../../tailwind';
import { OnboardingScreensParams } from '.';
import Screen from '../../components/Screen';
import {SLIDES} from './slides';
import { UserContext } from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WelcomeScreenProps = NativeStackScreenProps<OnboardingScreensParams, 'WelcomeScreen'>
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<OnboardingScreensParams, 'WelcomeScreen'>


export const Onboarding = ({navigation}: WelcomeScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const slidesRef = useRef<FlatList>(null);
  const {setUser} = useContext(UserContext)

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useCallback((info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => {
    const index = info.viewableItems[0].index;
    setCurrentIndex(index!)
  }, [])

  const viewabilityConfigCallbackPairs = useRef([{
    viewabilityConfig: {viewAreaCoveragePercentThreshold: 50},
    onViewableItemsChanged: viewableItemsChanged
  }])

  const nextOnPress = async () => {
    if (currentIndex < SLIDES.length - 1 && slidesRef.current) {
      slidesRef.current?.scrollToIndex({index: currentIndex+1})
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'yes');
      } catch (e) {
        console.log('Error setting viewedOnboarding: ' + e);
      }
    }
  }

  return (
    <Screen style={tw`flex-3`} avoidKeyboard={true} >
      <View style={tw`flex-1`}>
        <FlatList
          data={SLIDES}
          renderItem={({item}) => {
            return (
              <View style={[tw``, { width }]}>
                <View style={tw`items-center m-auto`}> 
                {React.createElement(item.image)}
                <Text style={tw`h2 mt-10 text-lightPink`}> {item.title} </Text>
                {item.id === 2 && 
                  <TextInput 
                    style={tw`w-60 h-12 mt-5 bg-gray p-2 rounded-lg text-lightPink text-base`}
                    placeholder='Username'
                  />
                }
                <Text style={tw`p mt-5 mx-3 text-center text-lightPink leading-loose`}>{item.description}</Text>
                </View>
              </View>
            )
          }} 
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
            useNativeDriver: false,
          })}
          keyExtractor={(item) => item.id.toString()}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <View style={tw`flex-row items-center justify-center`}>
        {SLIDES.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 25, 10],
            extrapolate: 'clamp',
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          })
          return (
            <Animated.View 
              key={`pagination-dot-${i}`}
              style={[tw`h-3 w-3 mx-1.5 bg-lavenderBlue rounded-lg`,{opacity: opacity}, {width: dotWidth}]}
            />
          )
        })}
      </View>
      <View style={tw`flex-row justify-between mt-5`}>
        <TouchableOpacity 
          style={tw`p-2 ml-2`}
          onPress={() => {setUser('')}}  
        >
          <Text style={tw`h4`}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`flex-row items-center justify-center p-2 ml-2`}
          onPress={() => {nextOnPress()}}  
        >
          <Text style={tw`h4`}>Next</Text>
          <Icon 
            name='arrow-forward-ios'
            size={23}
            color={'#FFF'}
            style={tw`pl-1`}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}