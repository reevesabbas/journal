import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useRef, useState } from 'react'
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
import Screen from '../../components/Screen';
import {SLIDES} from './slides';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParams } from '../../App';
import { AppDataSource } from '../../typeorm/data-source';
import { User } from '../../typeorm/entity';

export type OnboardScreenProps = NativeStackScreenProps<StackParams, 'ONBOARD'>
export type OnboardScreenNavigationProp = NativeStackNavigationProp<StackParams, 'ONBOARD'>


export const Onboarding = ({navigation}: OnboardScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const { width } = useWindowDimensions();
  const slidesRef = useRef<FlatList>(null);
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
      console.log('username: ' + userInput);
      slidesRef.current?.scrollToIndex({index: currentIndex + 1})
    } else {
      exitOnboarding();
    }
  }

  const exitOnboarding = async () => {
    try {
      const userRepo = AppDataSource.getRepository(User)
      const user = await userRepo.create({
        name: userInput
      })
      await userRepo.save(user);
      console.log('User created: ' + user.id)
      await AsyncStorage.setItem('userId', `${user.id}`);
      navigation.replace('HOME');
    } catch (err) {
      console.log('Error exiting onboarding: ' + err);
    }
  }

  return (
    <Screen style={tw`flex-3`} avoidKeyboard={true}>
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
                    placeholder='Name'
                    value={userInput}
                    onChangeText={t => setUserInput(t)}
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
      <View style={tw`flex-row justify-between my-3`}>
        <TouchableOpacity 
          style={tw`p-2 ml-2`}
          onPress={() => {exitOnboarding()}}  
        >
          <Text style={tw`h4`}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`flex-row items-center justify-center p-3`}
          onPress={() => {nextOnPress()}}  
        >
          <Text style={tw`h4`}>{currentIndex === SLIDES.length - 1 ? 'Go' : 'Next'}</Text>
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