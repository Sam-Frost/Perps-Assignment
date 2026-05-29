import type { DbUser } from "./db-types";

const users: DbUser[] = [];

export const db = {
  user: users,
  printDb: () => {
    console.log("-----------DATABASE STATE-----------");
    console.log(db);
    console.log("-----------DATABASE STATE-----------");
  },
};
