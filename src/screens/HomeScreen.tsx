import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, RefreshControl, Alert, Button } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { StackParams } from '.';
import tw from '../../tailwind';
import Screen from '../components/Screen'
import { Entry } from '../typeorm/entity';
import { AppDataSource } from '../typeorm/data-source';
import { EntryListItem } from '../components/EntryListItem';
import { BigOptionButton } from '../components/BigOptionButton';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const insertPredicate = (name: string) => {
  const length = name.length - 1;
  const endsInS = name.at(length) === 's' ? true : false;
  return (endsInS ? '\' Entries' : '\'s Entries');
}

export type HomeProps = NativeStackScreenProps<StackParams, 'HOME'>
export type HomeNavigationProp = NativeStackNavigationProp<StackParams, 'HOME'>

/**
 * TOO MANY THINGS IN THIS FILE, SEPERATE WHAT U CAN!!!!!!
 * 
 * @param navigation - Navigation prop used to navigate between screens in stack.
 * @param route - Route prop to pass username from Onboarding.
 * 
 * @returns - Main Screen of app, displaying User info, search bar, filter button, list of Entry buttons w/ options; directs you to EntryView screen.
 * Create button that directs you to CreateEntry screen.
 */
export const HomeScreen = ({navigation, route}: HomeProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entry, setEntry] = useState<Entry>();
  const [name, setName] = useState();
  const [refresh, setRefresh] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['55%'], []);
  
  const onRefresh = useCallback(() => {
    setRefresh(true);
    getEntries();
    wait(2000).then(() => setRefresh(false));
  }, []);

  const getEntries = useCallback(async () => {
    try {
      const entryRepo = AppDataSource.getRepository(Entry);
      let entries = await entryRepo.find();
      console.log('Entries updated.')
      setEntries(entries.reverse());
    } catch (err) {
      console.log('Error getting entries: ' + err);
    }
  }, [])

  const deleteEntry = useCallback(async (entryId?: number) => {
    try {
      await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Entry)
        .where("id = :id", {id: entryId})
        .execute();
      bottomSheetRef.current?.close();
      getEntries();
    } catch (err) {
      console.log('Error deleting entry: ' + err);
    }
  }, [])

  const handleOptionPress = useCallback((index: number, entry?: Entry) => {
    bottomSheetRef.current?.snapToIndex(index);
    setEntry(entry);
  }, [])

  const handleEntryPress = useCallback((entry: Entry) => {  
    bottomSheetRef.current?.close();
    console.log(entry);
    navigation.navigate('ENTRY', entry)
  }, [])

  useFocusEffect(useCallback(() => {
    bottomSheetRef.current?.close();
    getEntries();
  }, []))

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (e) {
      console.log('Error removing user: ' + e);
    }
  }

  return (
    <>
      <Screen style={tw`flex-1`}>
        {/** Home Header */}
        <View style={tw`items-start mt-5 mx-3`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`h1`}>{}{insertPredicate('')}</Text>
            <Button 
              title='exit'
              onPress={clearUser}
            />
          </View>
          <Text style={tw`h4 text-lavenderBlue pt-1`}>{entries.length} Entries</Text>
          <View style={tw`flex-row w-full justify-between pt-3 mb-5`}>
            <View style={tw`w-3/4 h-14 flex-row p-2 bg-gray rounded-full items-center`}>
              <Icon 
                name='search' 
                size={26} 
                color='#FFF' 
                style={tw`opacity-50 p-1 pr-2`}
              />
              <TextInput 
                style={tw`flex-1 h-10 pb-1 text-base text-white`}
                placeholder='Search'
                value={searchPhrase}
              />
            </View>
            <TouchableOpacity 
              style={tw`w-15 h-15 justify-center items-center rounded-full bg-lavenderBlue`}
              onPress={() => {}}
            >
              <Icon 
                name='pricetags'
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/** Create Entry Button */}
        <View style={tw`absolute w-20 h-20 z-1 bottom-10 right-3`}>
          <TouchableOpacity 
            style={tw`rounded-full bg-lavenderBlue flex-1 items-center justify-center`}
            onPress={() => {navigation.navigate('CREATE', {})}}
          >
            <Icon 
              name='add'
              size={70}
              color={'#000000'}
            />
          </TouchableOpacity>
        </View>
        {entries.length < 1 && <View style={tw`flex-1 items-center justify-center`}>
          <Text style={tw`p opacity-40`}>No Entries</Text>
        </View>}
        <FlatList
          data={entries}
          renderItem={({item: entry}) => {
            return (
              <EntryListItem 
                key={entry.id}
                title={entry.title}
                body={entry.body}
                date={entry.date}
                onPress={() => handleEntryPress(entry)}
                optionsOnPress={() => handleOptionPress(0, entry)}
              />
            )
          }}
          refreshControl={            
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        />
      </Screen>
      {/** Entry Options */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        style={tw`absolute`}
        handleStyle={tw`h-9 rounded-t-lg bg-dusk`}
      >
        <View style={tw`flex-1 items-center bg-dusk px-3`}>
          <View style={tw`flex-row mb-7`}>
            <BigOptionButton
              icon={'pin'}
              title={'Pin'}
              onPress={() => {}}
              color={'white'}
            />
            <BigOptionButton
              icon={'note-edit'}
              title={'Edit'}
              onPress={() => {
                navigation.navigate('CREATE', {entry})
                bottomSheetRef.current?.close();
              }
              }
              color={'white'}
            />
            <BigOptionButton
              icon={'trash-can'}
              title={'Delete'}
              onPress={() => {
                return Alert.alert(
                  "Delete Entry",
                  "This action is irreversable!",
                  [
                    { text: 'Cancel' },
                    {
                      text: 'Yes',
                      onPress: () => {deleteEntry(entry?.id)}
                    },
                  ]
                )
              }}
              color={'red'}
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
}