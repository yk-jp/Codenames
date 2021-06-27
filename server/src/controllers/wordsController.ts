//get 25 words randomly from the database.
import En_words from '../models/schema/Words';
import { Sequelize, DataTypes, Model } from "sequelize";

/*
  findAll: return Promise<Array<Model>>
*/

export const Words_get = async () => {
  await En_words.findAll({ order: Sequelize.literal('rand()'), limit: 25, raw: true }).then((data) => {
    console.log(data);
  })
    .catch(err => {
      console.log(err.message);
    });
}

