import "reflect-metadata";
import { registerRootComponent } from "expo";
import { ActivityIndicator, View } from 'react-native';
import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDeviceContext } from "twrnc";
import { DataSource } from "typeorm";

import tw from "../tailwind";
import { AppDataSource } from "./typeorm/data-source";
import { NavigationContainer } from "@react-navigation/native";
import { Entry, User } from "./typeorm/entity";
import { Onboarding } from "./screens/Onboarding/Onboarding";
import { HomeScreen } from "./screens/HomeScreen";
import { EntryView } from "./screens/EntryView";
import { CreateEntry } from "./screens/CreateEntry";

const Loading = () => {
  return (
    <View style={tw`flex-1 bg-night justify-center`}>
      <ActivityIndicator size={'large'} />
    </View>
  )
}

export type StackParams = {
  HOME: undefined;
  CREATE: {entry?: Entry, user: User};
  ENTRY: Entry;
  ONBOARD: undefined;
}

const Stack = createNativeStackNavigator<StackParams>();

/**
 * Creates connection to database and checks userId in AsyncStorage to determine presenting Onboarding or Home screen.
 * @returns App's main navigator stack.
 */
function App() {
  const [defaultConnection, setConnection] = useState<DataSource | null>()
  const [viewedOnboarding, setviewedOnboarding] = useState(false);
  const [isLoading, setisLoading] = useState(true);
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

  const checkUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      if (userId !== null) {
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
    }
    checkUser();
    return () => {
      setisLoading(true);
    }
  }, [])

  return (
    <View style={tw`flex-1`}>
    { isLoading ? <Loading /> : defaultConnection &&
      <NavigationContainer>        
        <Stack.Navigator screenOptions={{headerShown: false}}>
            { !viewedOnboarding && 
              <Stack.Group>
                <Stack.Screen name='ONBOARD' component={Onboarding} />
              </Stack.Group>
            }
          <Stack.Group>
            <Stack.Screen name='HOME' component={HomeScreen} />
            <Stack.Screen name='ENTRY' component={EntryView} />
            <Stack.Screen name='CREATE' component={CreateEntry} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    }
    </View>
  );
}

registerRootComponent(App);
export default App;