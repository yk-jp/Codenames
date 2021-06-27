import db from '../../config/db';

export const syncModels = async () => {
  await db.sync();
  console.log("All models were synchronized successfully.")
}