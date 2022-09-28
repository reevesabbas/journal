import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import tw from '../../tailwind';
import { EntryOptions } from './EntryOptions';

interface EntryProps {
  title: string,
  body: string,
  date?: string,
  onPress?: (param?: any) => void;
}

export const Entry: React.FC<EntryProps> = ({title, body, date, onPress}) => {
  return (
    <View style={tw`w-full mb-3`}>
      <Text style={tw`h5 text-lavenderBlue text-right pb-0.5`}> 
        {date} 
      </Text>
      <TouchableOpacity 
        style={tw`bg-gray h-31 p-2 pl-3 rounded-md overflow-hidden`}
        onPress={onPress}
      >
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`h4 -mt-1`}>
            {title}
          </Text>
          <TouchableOpacity 
            style={tw`p-2`}
            onPress={() => {
              return (
                <View></View>
              )
            }}
          >
            <Icon 
              name='options'
              size={17}
              color={'#FFF'}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`pl-2 w-5/6 h-20`}>
          <Text style={tw`p2`}>
            {body}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}