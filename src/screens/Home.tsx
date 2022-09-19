import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from '../../tailwind';

import Screen from '../components/Screen'

interface HomeProps {

}

export const Home = ({}) => {

    return (
      <Screen style={tw`content-container`} avoidKeyboard={true}>
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
            <TouchableOpacity style={tw`w-15 h-15 justify-center items-center rounded-full bg-[#3b41af]`}>
              <Icon 
                name='folder-open'
                size={30}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    );
}