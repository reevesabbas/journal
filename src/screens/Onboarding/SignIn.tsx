import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Screen from '../../components/Screen';
import tw from '../../../tailwind';
import { UserInput } from '../../components/UserInput';
import { StackParams } from '..';
import { Controller, useForm } from 'react-hook-form';
import { AppDataSource } from '../../typeorm/data-source';
import { User } from '../../typeorm/entity/User';

export type SignInProps = NativeStackScreenProps<StackParams, 'SIGNIN'>
export type SignInNavigationProp = NativeStackNavigationProp<StackParams, 'SIGNIN'>

type Inputs = {
  email: string,
  password: string,
}

const SignIn = ({}) => {
  const { control, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const navigation = useNavigation<SignInNavigationProp>();

  const onSubmit = handleSubmit(async (data) => {
    const findUser = await AppDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', {email: data.email})
      .getOneOrFail()
        .then(() => console.log('User found'))
        .catch((err) => console.log('Finding user: ' + err))

    return findUser;
  })
    return (
      <Screen style={tw`flex-1`} avoidKeyboard={true}>
        <View style={tw`flex-1 justify-center mx-8`}>
          <View>
            <Text style={tw`h2 text-center mb-5`}> Sign In </Text>
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
                Don&apos;t have an account?
              </Text>
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