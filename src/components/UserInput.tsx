import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import tw from '../../tailwind';

interface UserInputProps {
  children?: React.ReactNode;
  title?: string;
  email?: boolean;
  secure?: boolean;
  placeholder?: string;
  onBlur?: (param?: any) => void;
  onChangeText?: (param?: any) => void;
  value?: string | undefined;
}

export const UserInput: React.FC<UserInputProps> = ({title, placeholder, email, secure, onBlur, value, onChangeText, children, }) => {
  const [showPw, setshowPw] = useState(secure)
  return (
    <View style={tw`mt-5`}>
      <Text style={tw`text-lavenderBlue font-medium text-base`}> {title} </Text>
      <View style={tw`bg-gray rounded-md flex-row items-center`}>
        <TextInput 
          style={tw`flex-1 h-13 text-base p-3 text-white`} 
          secureTextEntry={showPw}
          placeholder={placeholder}
          keyboardType={email ? 'email-address' : 'default'}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
        />
        {secure && 
          <TouchableOpacity onPress={() => setshowPw(!showPw)}>
            <Icon 
              name={showPw ? 'eye-with-line' : 'eye'} 
              size={25} 
              color='#FFF' 
              style={tw`p-3 opacity-60`}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}