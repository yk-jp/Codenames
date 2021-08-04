import { roomId_insert, roomId_delete, roomId_find } from "../../controllers/queries/RoomIdsQuery";
import { player_findAll, player_insert } from "../../controllers/queries/PlayersQuery";
const roomId = "test";
const playerId = "test_id";

beforeEach(async () => {
  await roomId_insert(roomId);
  await player_insert(playerId, roomId,"socketid" ,"test");
  // await player_delete(playerId);
})

afterEach(async () => {
  await roomId_delete(roomId);
});

// After all players left in a room
describe('check-player-in-room', () => {
  test('find all players in room', async () => {
    const result = await player_findAll(roomId);
    expect(result).not.toBeNull();
  });

  test('roomId should be empty after all players left room', async () => {
    const players = await player_findAll(playerId);
    expect(players).not.toBeNull();
    const record = await roomId_delete(roomId);
    expect(record).not.toBeNull();

    const isIdEmpty = await roomId_find(roomId);
    expect(isIdEmpty).toBeNull();
  });
})
