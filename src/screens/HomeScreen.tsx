import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, RefreshControl, Alert, Button, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { StackParams } from '../App';
import tw from '../../tailwind';
import Screen from '../components/Screen'
import { Entry, User } from '../typeorm/entity';
import { AppDataSource } from '../typeorm/data-source';
import { EntryListItem } from '../components/EntryListItem';
import { BigOptionButton } from '../components/BigOptionButton';
import { EntryOptionSheet } from '../components/EntryOptionSheet';
import { TableForeignKey } from 'typeorm';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const journalTitle = (name: string | undefined) => {
  if (!name) {
    return 'Journal';
  }
  const length = name.length - 1;
  const endsInS = name.at(length) === 's' ? true : false;
  return name + (endsInS ? '\'' : '\'s') + ' Journal';
}

export type HomeProps = NativeStackScreenProps<StackParams, 'HOME'>
export type HomeNavigationProp = NativeStackNavigationProp<StackParams, 'HOME'>

/**
 * TODO- Separate components & allow editing Journal title.
 * 
 * @param navigation - Navigation prop used to navigate between screens in stack.
 * @returns - Main Screen of app, displaying User info, search bar, filter button, list of Entry buttons w/ options; directs you to EntryView screen.
 * Create button that directs you to CreateEntry screen.
 */
export const HomeScreen = ({navigation}: HomeProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currEntry, setCurrEntry] = useState<Entry>();
  const [searchedEntries, setSearchedEntries] = useState<Entry[]>();
  const [refresh, setRefresh] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState<string>();
  const [isLoading, setisLoading] = useState(true);
  
  const entryRepo = AppDataSource.getRepository(Entry);
  const userRepo = AppDataSource.getRepository(User);

  const bottomSheetRef = useRef<BottomSheet>(null)
  
  const onRefresh = useCallback(() => {
    setRefresh(true);
    checkUserData();
    wait(2000).then(() => setRefresh(false));
  }, []);

  const checkUserData = useCallback(async() => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userData = await userRepo.findOneByOrFail({id: parseInt(userId!)})
      setUser(userData);
      if (userData.entries) {
        setEntries(userData.entries.reverse())
      }
    } catch (err) {
      console.log('Error finding user: ' + err);
    } finally  {
      setisLoading(false)
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
      checkUserData();
    } catch (err) {
      console.log('Error deleting entry: ' + err);
    }
  }, [])

  const handleOptionPress = useCallback((index: number, entry?: Entry) => {
    bottomSheetRef.current?.snapToIndex(index);
    setCurrEntry(entry);
  }, [])

  const handleEntryPress = useCallback((entry: Entry) => {  
    bottomSheetRef.current?.close();
    console.log(entry)
    navigation.navigate('ENTRY', entry)
  }, [])

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
    } catch (e) {
      console.log('Error removing user: ' + e);
    }
  }
  
  const searchEntries = (async(entries: Entry[], text: string) => {
    setSearchPhrase(text);
    if (text) {
      const filterEntries = entries.filter((entry) => `${entry.title} ${entry.body}`.toLowerCase().includes(text))
      setSearchedEntries(filterEntries);
    }
  })
  
  useFocusEffect(useCallback(() => {
    bottomSheetRef.current?.close();
    checkUserData();
  }, []))

  return (
    <>
      <Screen style={tw`flex-1`}>
        {/** Home Header */}
        <View style={tw`mt-3 mx-3`}>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-start`}>
              <Text style={tw`h1`}>{journalTitle(user?.name)}</Text>
              <Text style={tw`h4 text-lavenderBlue pt-1`}>{entries.length} Entries</Text>
              {/* <Button 
                title='exit'
                onPress={clearUser}
              /> */}
            </View>
          </View>
          <View style={tw`flex-row w-full justify-between pt-3 mb-3`}>
            <View style={tw`w-3/4 h-14 flex-row p-2 bg-purple rounded-full items-center`}>
              <Icon 
                name='text-search' 
                size={26} 
                color='#FFF' 
                style={tw`opacity-50 p-1 pr-2`}
              />
              <TextInput 
                style={tw`flex-1 h-10 pb-1 text-base text-white`}
                placeholder='Search'
                value={searchPhrase}
                onChangeText={(t) => {searchEntries(entries, t)}}
              />
            </View>
            {/** Create Entry Button */}
            <View>
              <TouchableOpacity 
                style={tw`w-22 h-14 bg-lavenderBlue rounded-3xl p-1`}
                onPress={() => {navigation.navigate('CREATE', {user: user!})}}
              >
                <Icon 
                  name='pencil-plus'
                  size={38}
                  color={'#12141d'}
                  style={tw`m-auto`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
          { isLoading ? 
            <View style={tw`absolute m-auto left-[50%] -ml-[15px] top-[50%]`}>
              <ActivityIndicator size={'large'} />
            </View> 
            : entries[0] === undefined ?
            <View style={tw`m-auto pb-30`}>
              <Text style={tw`p opacity-40`}>No Entries</Text>
            </View> 
            :
            <FlatList
              data={searchPhrase ? searchedEntries : entries}
              refreshControl={            
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={onRefresh}
                />
              }
              renderItem={({item: entry, index}) => {
                const showEntryDate = (currIndex: number, currDate: string, prevDate: string | undefined) => {
                  if (currIndex === 0) return true;
                    if (currDate === prevDate) {
                      return false;
                    }
                    return true;
                }
                const currDate = entry.date.toDateString();
                const prevDate = index != 0 ? entries[index - 1].date.toDateString() : '';
                return (
                  <EntryListItem 
                    key={entry.id}
                    title={entry.title}
                    body={entry.body}
                    date={entry.date}
                    first={index === 0}
                    showDate={showEntryDate(index, currDate, prevDate)}
                    onPress={() => handleEntryPress(entry)}
                    optionsOnPress={() => handleOptionPress(0, entry)}
                  />
                )
              }}
            />
        }
      </Screen>
      <EntryOptionSheet 
        entry={currEntry}
        bottomSheetRef={bottomSheetRef}
        editOnPress={() => {navigation.navigate('CREATE', {entry: currEntry, user: user!})}}
        pinOnPress={() => {}}
        deleteOnPress={() => {
          return Alert.alert(
            "Delete Entry",
            "This action is irreversable!",
            [
              { text: 'Cancel' },
              {
                text: 'Yes',
                onPress: () => {deleteEntry(currEntry?.id)}
              },
            ]
          )
        }}
      />
    </>
  );
}