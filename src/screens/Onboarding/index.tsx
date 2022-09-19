import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthStack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'SIGNUP'} component={SignUp} />
      <AuthStack.Screen name={'SIGNIN'} component={SignIn} />
    </AuthStack.Navigator>
  )
}

export default OnboardingStack