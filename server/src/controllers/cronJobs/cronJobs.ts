import db from "../../config/db";
import { QueryTypes } from "sequelize";
export const cronJobs = async () => {
  try {
    /*Delete roomId that 6 hours passed since it was created.
      MYSQL CURDATE() doesn't work. It has to be NOW() function instead. 
    */
    await db.query("DELETE FROM roomIds WHERE (createdAt < DATE_SUB(NOW(), INTERVAL 6 HOUR))", { type: QueryTypes.DELETE });

  } catch (err) {
    console.log(err);
  } finally {
    console.log("scheduling jobs are done!");
  }
};
 
cronJobs();