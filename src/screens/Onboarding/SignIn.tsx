import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Screen from '../../components/Screen';
import tw from '../../../tailwind';
import { UserInput } from '../../components/UserInput';
import { StackParams } from '..';

export type SignInProps = NativeStackScreenProps<StackParams, 'SIGNIN'>
export type SignInNavigationProp = NativeStackNavigationProp<StackParams, 'SIGNIN'>

const SignIn = ({}) => {
  const navigation = useNavigation<SignInNavigationProp>();
    return (
      <Screen style={tw`flex-1`} avoidKeyboard={true}>
        <View style={tw`flex-1 justify-center mt-20 mx-8`}>
          <Text style={tw`h2 text-center mb-5`}> Sign In </Text>
          <UserInput
            title='Email'
            email={true}
          />
          <UserInput 
            title='Password'
            secure={true}
          />
          <View style={tw`items-center mt-5`}>
            <TouchableOpacity style={tw`w-1/4 mt-10 p-2 rounded-md items-center bg-lavenderBlue`}>
              <Text style={tw`h4`}> Submit </Text>
            </TouchableOpacity>
            <View style={tw`flex-row justify-end items-center mt-13`}>
              <Text style={tw`text-base font-medium text-white`}> Don&apos;t have an account? </Text>
              <Button 
                title='Sign up.'
                onPress={() => navigation.navigate('SIGNUP')}
              />
            </View>
          </View>
        </View>
      </Screen>
    );
}

export default SignIn;