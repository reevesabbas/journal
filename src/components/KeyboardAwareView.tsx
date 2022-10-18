import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, ViewStyle } from 'react-native';
import tw from '../../tailwind';


interface KeyboardAwareViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const KeyboardAwareView: React.FC<KeyboardAwareViewProps> = ({ style, children, ...rest}) => {
  return (
    <KeyboardAvoidingView
      style={tw`flex-1` && style}
      {...rest}
      behavior={Platform.select({ios: 'padding'})}
    >
      <ScrollView 
        style={tw`flex-1`} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`grow`}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAwareView