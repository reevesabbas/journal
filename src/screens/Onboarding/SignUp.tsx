import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import tw from '../../../tailwind';
import Screen from '../../components/Screen';
import { StackParams } from '..';
import { UserInput } from '../../components/UserInput';
import { useNavigation } from '@react-navigation/native';

type Inputs = {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
}

export type SignUpProps = NativeStackScreenProps<StackParams, 'SIGNUP'>
export type SignUpNavigationProp = NativeStackNavigationProp<StackParams, 'SIGNUP'>

const SignUp = ({}) => {
  const [showPw, setshowPw] = useState(false)
  const { control, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const navigation = useNavigation<SignUpNavigationProp>();

  const onSubmit = handleSubmit(() => {})

  return (
    <Screen style={tw`flex-1`} avoidKeyboard={true}>
      <View style={tw`flex-1 justify-center mx-8`}>
        <View>
          <Text style={tw`h2 text-center mb-5`}> Sign Up </Text>
        </View>
        <Controller
          control={control}
          rules={{ 
            required: true,
            maxLength: 100,
          }}
          render={({field: {onChange, value}}) => (
            <UserInput
              title='Email'
              email={true}
              onChangeText={onChange}
              value={value}
            />
          )} 
          name='email'
        />
        <View>
          {errors.email && <Text style={tw`text-red pl-1 pt-1`}>Required</Text>}
        </View>
        <Controller
          control={control}
          rules={{ 
            required: true,
            maxLength: 100,
          }}
          render={({field: {onChange, value}}) => (
            <UserInput
              title='Username'
              onChangeText={onChange}
              value={value}
            />
          )} 
          name='username'
        />
        <View>
          {errors.username && <Text style={tw`text-red pl-1 pt-1`}>Required</Text>}
        </View>
        <Controller
          control={control}
          rules={{ 
            required: true,
            maxLength: 100,
          }}
          render={({field: {onChange, value}}) => (
            <UserInput
              title='Password'
              secure={true}
              onChangeText={onChange}
              value={value}
            />
          )} 
          name='password'
        />
        <View>
          {errors.password && <Text style={tw`text-red pl-1 pt-1`}>Required</Text>}
        </View>
        <Controller
          control={control}
          rules={{ 
            required: true,
            maxLength: 100,
          }}
          render={({field: {onChange, value}}) => (
            <UserInput
              title='Confirm Password'
              secure={true}
              onChangeText={onChange}
              value={value}
            />
          )} 
          name='confirmPassword'
        />
        <View>
          {errors.confirmPassword && <Text style={tw`text-red pl-1 pt-1`}>Required</Text>}
        </View>
        <View style={tw`items-center mt-5`}>
          <TouchableOpacity 
            style={tw`w-1/4 mt-10 p-2 rounded-md items-center bg-lavenderBlue`}
            onPress={onSubmit}  
          >
            <Text style={tw`h4`}> 
              Submit 
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row justify-end items-center mt-13`}>
            <Text style={tw`text-base font-medium text-white`}> 
              Already have an account?
            </Text>
            <Button 
              title='Sign in.'
              onPress={() => navigation.navigate('SIGNIN')}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default SignUp;