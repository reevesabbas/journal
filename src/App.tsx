import "reflect-metadata";
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";

import { AppDataSource } from "./typeorm/data-source";

export default function App() {

  useEffect(() => {
  }, [])

  return (
    <View style={styles.container}>
      <Text>
        Hello
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
