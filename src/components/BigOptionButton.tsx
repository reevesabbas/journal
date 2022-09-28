import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import tw from '../../tailwind';

interface BigOptionButtonProps {
  icon: string;
  title?: string;
  onPress?: (params?: any) => void;
  color: string;
}

export const BigOptionButton: React.FC<BigOptionButtonProps> = ({icon, title, color, onPress}) => {
  return (
    <TouchableOpacity 
      style={tw`w-29 h-23 items-center justify-center rounded-lg bg-[#191C27] mx-2`}
      onPress={onPress}
    >
      <Icon 
        name={icon}
        size={32}
        color={color}
        style={tw`opacity-55`}
      />
      {title && 
        <Text style={tw`text-${color} text-sm pt-1 opacity-55`}> {title} </Text>}
    </TouchableOpacity>
  );
}