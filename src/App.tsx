import "reflect-metadata";
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from "expo";
import { useEffect } from "react";
import { useDeviceContext } from "twrnc";

import { AppDataSource } from "./typeorm/data-source";
import { Home } from "./screens/Home";
import { NavigatorStack } from "./screens";
import tw from "../tailwind";

function App() {
  useDeviceContext(tw)

  return (
    <View style={tw`flex-1`}>
      <NavigatorStack />
    </View>
  );
}

export default registerRootComponent(App);