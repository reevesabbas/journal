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
      style={tw`w-31 h-25 items-center justify-center rounded-lg bg-[#1C1E28] mx-2`}
      onPress={onPress}
    >
      <Icon 
        name={icon}
        size={32}
        color={color}
        style={tw`opacity-55`}
      />
      {title && 
        <Text style={tw`text-${color} font-bold text-sm pt-1 opacity-55`}> {title} </Text>}
    </TouchableOpacity>
  );
}