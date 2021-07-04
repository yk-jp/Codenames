import Player from '../../models/schema/Players';

export const player_find = async (id: string) => {
  return await Player.findOne({ where: { id: id } });
}

export const player_findAll = async (roomId: string) => {
  await Player.findAll({ where: { roomId: roomId } });
}

// when player connected the room
export const player_insert = async (id: string, roomId: string, player: string) => {
  await Player.create({ id: id, roomId: roomId, player: player })
    .then(() => {
      console.log(`stored new player`);
    })
    .catch((err) => {
      console.log("could not store a new player");
    });
}

// when player disconnected the room
export const player_delete = async (id: string) => {
  await Player.destroy({
    where: {
      id: id
    }
  }).then(() => {
    console.log(`deleted Player`);
  })
    .catch((err) => {
      console.log("could not delete the player");
    });
}

export const player_update = async (player: string, id: string) => {
  await Player.update({ player: player }, {
    where: { id: id }
  }).then(() => {
    console.log("updated player,  id = ", id);
  })
    .catch(() => {
      console.log("could not update a player");
    });
}



