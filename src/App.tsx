import "reflect-metadata";
import { registerRootComponent } from "expo";
import { View } from 'react-native';
import { useDeviceContext } from "twrnc";

import { NavigatorStack } from "./screens/Journal";
import tw from "../tailwind";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { OnboardingScreens } from "./screens/Onboarding";

function App() {
  const [userId, setUserId] = useState('');
  useDeviceContext(tw)

  return (
    <View style={tw`flex-1`}>
      <UserContext.Provider value={{userId, setUserId}}>
        {
          userId === '' 
          ? 
          <OnboardingScreens /> 
          : 
          <NavigatorStack /> 
        }
      </UserContext.Provider>
    </View>
  );
}

registerRootComponent(App);
export default App;