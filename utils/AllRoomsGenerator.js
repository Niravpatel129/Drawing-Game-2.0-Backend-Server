const { roomData } = require("./roomData");

class AllRoomsGenerator {
  constructor() {
    this.rooms = [];
  }

  newRoom(roomName) {
    if (this.rooms.indexOf(roomName) === -1) {
      this.rooms.push(new roomData(roomName));
    }
  }

  findUserAndAddToRoom(roomName, { googleUserInfo, socketId }) {
    const find = this.rooms.find(i => i.roomId === roomName);
    if (find) return find.addUser({ googleUserInfo, socketId: socketId.id });
  }

  findAllUsersForRoom(roomName) {
    const find = this.rooms.find(i => i.roomId === roomName);
    if (find) return find.getAllUsersInRoom();
  }

  findAllRooms() {
    return this.rooms;
  }

  pushMessage(name, roomName, input) {
    const find = this.rooms.find(i => i.roomId === roomName);
    if (find) find.addMessage(name, input);
  }

  getAllMessages(roomName) {
    const find = this.rooms.find(i => i.roomId === roomName);
    if (find) return find.getAllMessages();
  }

  resetRooms() {
    this.rooms = [];
  }

  removeUser(socketId) {
    this.clearEmptyRooms();
    for (let room of this.rooms) {
      const user = room.users.find(i => i.user.socketId === socketId);
      if (user) room.removeUser(user);
    }
  }

  clearEmptyRooms() {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].users.length === 0) {
        console.log("Empty room");
        this.rooms.splice(i, 1);
      }
    }
  }
}

module.exports = { AllRoomsGenerator };
