import Player from '../../models/schema/Players';

export const player_find = (id: string) => {
  return Player.findOne({ where: { id: id } })
}

export const player_findAll = (roomId: string) => {
  return Player.findAll({ where: { roomId: roomId } });
}

// when player connected the room
export const player_insert = (id: string, roomId: string, player: string) => {
  return Player.create({ id: id, roomId: roomId, player: player })
}

// when player disconnected the room
export const player_delete = (id: string) => {
  return Player.destroy({ where: { id: id } });
}

export const player_update = (player: string, id: string) => {
  return Player.update({ player: player }, { where: { id: id } });
}



