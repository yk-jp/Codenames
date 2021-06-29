import Player from '../../models/schema/Players';

export const player_find = async (id: string) => {
  await Player.findOne({ where: { id: id } })
    .then(data => {
      console.log("player found");
    })
    .catch(err => {
      console.log(err.message);
    });
}

export const player_findAll = async (roomId: string) => {
  await Player.findAll({ where: { roomId: roomId } })
    .then(data => {
      console.log("player found");
    })
    .catch(err => {
      console.log(err.message);
    });
}

// when player connected the room
export const player_insert = async (id: string, name: string, roomId: string) => {
  await Player.create({ id: id, name: name, roomId: roomId })
    .then(() => {
      console.log(`stored new Player`);
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
    console.log(`deleted Player`);
  })
    .catch((err) => {
      console.log(err.message);
    });
}

