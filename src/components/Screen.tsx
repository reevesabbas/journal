import React, { useMemo } from 'react'
import { View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from '../../tailwind'
import KeyboardAwareView from './KeyboardAwareView';

interface ScreenProps {
  style?: ViewStyle;
  avoidKeyboard?: boolean;
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ style, avoidKeyboard, children, ...rest}) => {
  const wrappedChildren = useMemo(() => {
    if (avoidKeyboard) {
      return (
        <KeyboardAwareView style={tw`flex-1` && style}>
          {children}
        </KeyboardAwareView>
      )
    }
    return (
      <View style={tw`flex-1` && style}>
        {children}
      </View>
    )
  }, [avoidKeyboard, style])

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-night ios:mb-0 android:mb-4`}>
      {wrappedChildren}
    </SafeAreaView>
  );
}

export default Screen