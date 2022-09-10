import "reflect-metadata";
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components'
import { useEffect } from "react";

import { AppDataSource } from "./typeorm/data-source";
import theme from "./theme";

export default function App() {

  useEffect(() => {
  }, [])

  return (
    <View style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        
      </ThemeProvider>
    </View>
  );
}