import "reflect-metadata";
import { registerRootComponent } from "expo";
import { View } from 'react-native';
import { useDeviceContext } from "twrnc";

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

registerRootComponent(App);
export default App;