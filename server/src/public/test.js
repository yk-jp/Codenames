const socket = io("http://localhost:3001");

const message = document.getElementById("messages");
const form = document.getElementById("form");
const sendInput = document.getElementById("sendInput");
const roomInput = document.getElementById("roomInput");
const sendBtn = document.getElementById("send");
const roomBtn = document.getElementById("room");

socket.on("connect", () => {
  displayMessage("connection success", socket.id);
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = sendInput.value;
  const roomName = room.value;
})

sendBtn.addEventListener("click", (e) => {
  if (sendInput.value == "") return;
  socket.emit("send-message", sendInput.value,roomInput.value);
});

socket.on("display-message", (msg) => {
  displayMessage(msg);
  sendInput.value = "";
})

roomBtn.addEventListener("click", () => {
  if (roomInput.value == "") return;
  socket.emit("join-room", roomInput.value);
});

const displayMessage = (msg) => {
  message.innerHTML += `<p>${msg}</p>`;
}