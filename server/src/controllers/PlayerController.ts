import Player from '../models/schema/Players';

export const player_find = async (id: string) => {
  await Player.findOne({ where: { id: id } })
    .then(data => {
      console.log(data);
      console.log("player found. id = ", data!.id);
    })
    .catch(err => {
      console.log("player not found", err.message)
    });
}

// when player connected the room
export const player_insert = async (id: string, name: string) => {
  await Player.create({ id: id, name: name })
    .then(() => {
      console.log(`registered new Player, id = `, id);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// when player disconnected the room
export const player_delete = async (id: string) => {
  await Player.destroy({
    where: {
      id: id
    }
  }).then(() => {
    console.log(`deleted Player, id = `, id);
  })
    .catch((err) => {
      console.log(err.message);
    });
}

