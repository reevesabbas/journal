import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "./entity/User"

export const AppDataSource = new DataSource({
  database: 'mydb',
  driver: require('expo-sqlite'),
  type: 'expo',
  entities: [User],
  synchronize: true,
})

AppDataSource.initialize()
  .then(() => console.log('Data source initialized'))
    .catch((err) => console.log('Error initializing data source: ' + err))