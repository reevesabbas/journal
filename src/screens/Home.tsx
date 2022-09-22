import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackParams } from '.';
import Drawer from 'react-native-draggable-view'

import tw from '../../tailwind';
import { Entry } from '../components/Entry';
import Screen from '../components/Screen'

const TEMP_ENTRIES = [
  {
    title: 'Entry #1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi. Sed tempus urna et pharetra pharetra massa. Et tortor consequat id porta. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Enim tortor at auctor urna nunc id.',
    date: 'Tue, 9/15/22',
  },
  {
    title: 'Stephen Bday Gift Ideas',
    body: 'List of items here.',
    date: 'Sun, 9/22/22'
  },
]

export type HomeProps = NativeStackScreenProps<StackParams, 'HOME'>
export type HomeNavigationProp = NativeStackNavigationProp<StackParams, 'HOME'>

export const Home = ({navigation, route}: HomeProps) => {

  return (
    <Screen style={tw`content-container`}>
      <View style={tw`items-start mt-5`}>
        <Text style={tw`h1`}> Reeves' Journal</Text>
        <Text style={tw`h4 text-lavenderBlue pt-3`}> 0 Entries</Text>
        <View style={tw`flex-row w-full justify-between pt-4`}>
          <View style={tw`w-3/4 h-14 flex-row p-2 bg-gray rounded-full items-center`}>
            <Icon 
              name='search' 
              size={26} 
              color='#FFF' 
              style={tw`opacity-50 p-1 pr-2`}
            />
            <TextInput 
              style={tw`flex-1 h-10 pb-1 text-base text-white`}
              placeholder='Search'
            />
          </View>
          <TouchableOpacity 
            style={tw`w-15 h-15 justify-center items-center rounded-full bg-[#3b41af]`}
          >
            <Icon 
              name='folder-open'
              size={30}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-1 my-5`}>
        <FlatList 
          data={TEMP_ENTRIES}
          renderItem={({item: entry}) => {
            return (
              <Entry 
                title={entry.title}
                body={entry.body}
                date={entry.date}
                onPress={() => navigation.navigate('ENTRY', {
                  title: entry.title,
                  body: entry.body,
                  date: entry.date
                })}
              />
              )
            }}
        />
      </View>
    </Screen>
  );
}