import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { StackParams } from '.';
import tw from '../../../tailwind';
import Screen from '../../components/Screen';

export type EntryViewProps = NativeStackScreenProps<StackParams, 'ENTRY'>
export type EntryViewNavigationProp = NativeStackNavigationProp<StackParams, 'ENTRY'>

export const EntryView = ({navigation, route}: EntryViewProps) => {
  const params = route.params;

  return (
    <Screen style={tw`content-container`}>
      <View style={tw`flex-row justify-end mt-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon 
            name='close'
            size={45}
            color='#FFF'
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={tw`h2`}>{params.title} </Text>
        <Text style={tw`h4`}>{params.date.toLocaleDateString()} </Text>
        <ScrollView style={tw`h-full`}>
          <Text style={tw`text-xl text-white leading-relaxed pt-5`}>{params.body}</Text>
        </ScrollView>
      </View>
    </Screen>
  );
}