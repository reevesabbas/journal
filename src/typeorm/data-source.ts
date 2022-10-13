import "reflect-metadata"
import { DataSource } from "typeorm"

import { User, Entry } from "./entity"


export const AppDataSource = new DataSource({
  database: 'mydb',
  driver: require('expo-sqlite'),
  type: 'expo',
  entities: [User, Entry],
  synchronize: true,
})

AppDataSource.initialize()
  .then(() => console.log('Data source initialized'))
    .catch((err) => console.log('Error initializing data source: ' + err))