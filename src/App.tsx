import "reflect-metadata";
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";

import { AppDataSource } from "./typeorm/data-source";
import { Home } from "./screens/Home";
import { NavigatorStack } from "./screens";
import { useDeviceContext } from "twrnc";
import tw from "../tailwind";

export default function App() {
  useDeviceContext(tw)

  return (
    <View style={tw`flex-1`}>
      <NavigatorStack />
    </View>
  );
}