import { createContext, useState } from "react";
import { AppDataSource } from "./typeorm/data-source";
import { User } from "./typeorm/entity";

interface UserContextInterface {
  userId: string,
  setUserId: (params?: any) => void;
}

export const UserContext = createContext<UserContextInterface>({
  userId: '',
  setUserId: () => {},
});