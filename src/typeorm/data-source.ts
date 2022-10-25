import "reflect-metadata"
import { DataSource } from "typeorm"

import { Entry } from "./entity"


export const AppDataSource = new DataSource({
  database: 'mydb',
  driver: require('expo-sqlite'),
  type: 'expo',
  entities: [Entry],
  synchronize: true,
})