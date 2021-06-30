import db from './db';

export const db_synchronization = async () => {
  await db.sync();
  console.log("All models were synchronized successfully.")
}