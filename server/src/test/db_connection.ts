import db from "../config/db";

//test db connection
export const testDBConnection = () => {
  db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
}