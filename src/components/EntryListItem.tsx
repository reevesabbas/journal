import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import tw from '../../tailwind';

interface EntryProps {
  title: string,
  body: string,
  date: Date,
  onPress?: (param?: any) => void;
  optionsOnPress?: (param?: any) => void;
}

export const EntryListItem: React.FC<EntryProps> = ({title, body, date, onPress, optionsOnPress}) => {
  return (
    <TouchableOpacity 
      style={tw`flex-row mb-4`}
      onPress={onPress}
    >
      <View style={tw`items-center`}>
        <View style={tw`bg-purple h-12 w-15 items-center justify-center rounded-r-full`}>
          <Text style={tw`h2 text-lavenderBlue`}>{date.getDate()}</Text>
        </View>
        <Text style={tw`p font-bold pt-2`}>{date.toDateString().substring(4, 7)}</Text>
        <Text style={tw`text-sm text-white`}>{date.toDateString().substring(0, 3)}</Text>
      </View>
      <View style={tw`ml-2 mb-2`}>
        <View style={tw``}>
          <View style={tw`ml-5 mt-1 overflow-hidden`}>
            <Text style={tw`h4 max-w-3/4`} numberOfLines={1}>
              {title}
            </Text>
            <Text style={tw`p2 w-70 h-12`} numberOfLines={2}>
              {body}
            </Text>
          </View>
        </View>
        <View style={tw`w-full h-7 border-b-[1px] border-white/10`}>
          {/** Placeholder container for tags at some point. */}
        </View>
      </View>
      <TouchableOpacity 
        style={tw`p-2 h-12`}
        onPress={optionsOnPress}
      >
        <Icon 
          name='options'
          size={23}
          color={'#FFF'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}