import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { ErrorMessage } from '@hookform/error-message';

import { StackParams } from '.';
import tw from '../../../tailwind';
import Screen from '../../components/Screen';
import { AppDataSource } from '../../typeorm/data-source';
import { Entry } from '../../typeorm/entity';

export type CreateEntryProps = NativeStackScreenProps<StackParams, 'CREATE'>
export type CreateEntryNavigationProp = NativeStackNavigationProp<StackParams, 'CREATE'>

type FormData = {
  title: string,
  body: string
}

export const CreateEntry = ({navigation, route}: CreateEntryProps) => {
  const entry = route.params.entry;
  const { control, handleSubmit, formState: {errors} } = useForm<FormData>({
    defaultValues: {
      title: entry ? entry.title : '',
      body: entry ? entry.body : '',
    }
  })

  const onSubmit = useCallback(async(data: FormData) => {
    if (!entry) {
      const newEntry = new Entry();
      newEntry.title = data.title;
      newEntry.body = data.body;
      newEntry.pinned = false;
      await newEntry.save()
        .then(() => console.log('Entry inserted, ID: ' + newEntry.id))
          .catch((e) => console.log('Error creating entry: ' + e))
    } else {
        await AppDataSource.manager.update(Entry, entry.id, {...data})
          .then(() => console.log('Entry with Id ' + entry.id + ' updated successfully.'))
            .catch((e) => console.log('Error updating entry: ' + e))
      }
    navigation.goBack();
  }, [])

    return (
      <Screen style={tw`content-container`} avoidKeyboard={true}>
        <View style={tw`flex-row justify-end mt-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon 
              name='close'
              size={45}
              color='#FFF'
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1 items-center`}>
          <View style={tw``}>
            <Text style={tw`h3 pb-1 text-lavenderBlue`}>Title</Text>
            <Controller 
              control={control}
              rules={{maxLength: 100}}
              render={({field: {onChange, value}}) => (                
                <TextInput 
                  onChangeText={onChange}
                  style={tw`p-3 bg-gray h-14 rounded-md text-white text-lg w-100`}
                  value={value}
                />
              )}
              name="title"
            />
            {errors.title && <Text style={tw`p text-red`}>Field required.</Text>}
          </View>
          <View style={tw`mt-5`}>
            <Text style={tw`h3 pb-1 text-lavenderBlue`}>Body</Text>
            <Controller 
              control={control}
                render={({field: {onChange, value}}) => (                  
                  <TextInput 
                    onChangeText={onChange}
                    style={tw`p-3 bg-gray rounded-md text-white text-lg w-100 h-100`}
                    multiline={true}  
                    value={value}
                  />
                )}
              name='body'
            />
          </View>
          <TouchableOpacity 
            style={tw`mt-10 w-25 h-12 rounded-md bg-lavenderBlue items-center justify-center`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`h4`}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
}