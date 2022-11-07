import BottomSheet from '@gorhom/bottom-sheet';
import React, { RefObject, useMemo } from 'react'
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from '../../tailwind';
import { Entry } from '../typeorm/entity';
import { BigOptionButton } from './BigOptionButton';

interface EntryOptionSheetProps {
  entry?: Entry;
  bottomSheetRef: RefObject<BottomSheet>;
  editOnPress: (params?: any) => void;
  deleteOnPress: (params?: any) => void;
  pinOnPress: (params?: any) => void;
}

export const EntryOptionSheet: React.FC<EntryOptionSheetProps> = ({entry, bottomSheetRef, editOnPress, deleteOnPress, pinOnPress}) => {
  const snapPoints = useMemo(() => ['50%', '85%'], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      style={tw`absolute`}
      handleStyle={tw`h-9 rounded-t-lg bg-[#1d1d24]`}
    >
      <View style={tw`flex-1 bg-[#1d1d24] px-3`}>
        <View style={tw`flex-row mb-7 justify-center`}>
          <BigOptionButton
            icon={'pin'}
            title={'Pin'}
            onPress={pinOnPress}
            color={'white'}
          />
          <BigOptionButton
            icon={'note-edit'}
            title={'Edit'}
            onPress={editOnPress}
            color={'white'}
          />
          <BigOptionButton
            icon={'trash-can'}
            title={'Delete'}
            onPress={deleteOnPress}
            color={'red'}
          />
        </View>
        <View style={tw`flex-0.3`}>

        </View>
        <View style={tw`h-40`}>
          <ScrollView style={tw`p-2`} contentContainerStyle={tw`h-20 items-start justify-end`}>
            <Text style={tw`h3 mb-3`}>{entry?.title}</Text>
            <Text style={tw`p2`}>{entry?.body}</Text>
          </ScrollView>
        </View>
      </View>
    </BottomSheet>
  );
}