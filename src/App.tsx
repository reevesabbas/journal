import "reflect-metadata";
import { registerRootComponent } from "expo";
import { ActivityIndicator, View } from 'react-native';
import { useDeviceContext } from "twrnc";

import tw from "../tailwind";
import { DataSource } from "typeorm";
import { NavigatorStack } from "./screens";
import { AppDataSource } from "./typeorm/data-source";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

const Loading = () => {
  return (
    <View style={tw`flex-1 bg-night justify-center`}>
      <ActivityIndicator size={'large'} />
    </View>
  )
}

function App() {
  const [defaultConnection, setConnection] = useState<DataSource | null>()
  const [isLoading, setisLoading] = useState(true);
  const [viewedOnboarding, setviewedOnboarding] = useState(false);
  useDeviceContext(tw);

  const setupConnection = useCallback(async() => {
    try {
      const connection = await AppDataSource.initialize();
      console.log('Database initialized.')
      setConnection(connection);
    } catch(err) {
      console.log('Error initializing data source: ' + err)
    }
  }, [])

  const checkOnboarding = async () => {
    try {
      const viewed = await AsyncStorage.getItem('@viewedOnboarding')
      if (viewed !== null) {
        setviewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error checking onboarding: ' + err)
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (!defaultConnection) {
      setupConnection();
    } else {
      checkOnboarding();
    }
    setisLoading(false);
    return () => {
      setisLoading(true);
    }
  }, [])

  return (
    <View style={tw`flex-1`}>
      {isLoading ? <Loading /> : <NavigatorStack />}
    </View>
  );
}

registerRootComponent(App);
export default App;