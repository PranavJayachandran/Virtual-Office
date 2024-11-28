package route

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	roomdb "virtual-office/db/room"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
  CheckOrigin: func(r *http.Request) bool {
    return true;
  },
}

type roomMessageData struct{
  PosX int `json:"posx"`
  PosY int `json:"posy"`
  OldX   int    `json:"oldx"`
  OldY   int    `json:"oldy"`      
  UserId string `json:"userId"`
}

type Room struct{
  clients map[*websocket.Conn] bool
  broadcast chan []byte 
  mutex sync.Mutex
}

type ClientManager struct {
  rooms map[string]*Room 
  mutex sync.Mutex
}

func (room *Room) start(){
  for{
    select{
    case msg := <- room.broadcast:
      for client := range(room.clients){
        err := client.WriteMessage(websocket.TextMessage, msg);
            if err != nil {
                client.Close()
                delete(room.clients, client)
            }
      }
    }
  }
}

type Message struct {
    UserID string `json:"userId"`
    PosX   int    `json:"posx"`
    PosY   int    `json:"posy"`
    OldX   int    `json:"oldx"`
    OldY   int    `json:"oldy"`      
}
func handleSocketConnection(manager *ClientManager, w http.ResponseWriter, r *http.Request){
  roomId := r.URL.Query().Get("roomId")
  if roomId == ""{
    http.Error(w, "roomId is required", http.StatusBadRequest);
    return;
  }

  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil{
    fmt.Println("Error upgrading connection:" ,err)
    return
  }

  manager.mutex.Lock()
  room, exists := manager.rooms[roomId]
  if !exists {
    room = &Room{
      clients: make(map[*websocket.Conn]bool),
      broadcast: make(chan []byte),
    }
    manager.rooms[roomId] = room
    go room.start();
  }
  manager.mutex.Unlock()

  room.mutex.Lock();
  room.clients[conn] = true
  room.mutex.Unlock()
  fmt.Println(room);
  defer func(){
    room.mutex.Lock()
    delete(room.clients, conn)
    room.mutex.Unlock()
    conn.Close()
  }()

  for {
    fmt.Println("Waiting for message")
    _, message, err := conn.ReadMessage()
        if err != nil {
            fmt.Println("Error reading message:", err)
            break
        }

        // Unmarshal the incoming message to a Message struct
        var roomData Message
        err = json.Unmarshal(message, &roomData)
        if err != nil {
            fmt.Println("Error unmarshalling message:", err)
            continue
        }

        // Log the received message
      msg := roomMessageData{
        UserId: roomData.UserID,
        PosX: roomData.PosX,
        PosY: roomData.PosY,
        OldX: roomData.OldX,
        OldY: roomData.OldY,
    }
    err = roomdb.UpdateMemberPosition(roomId, roomData.UserID, roomData.PosX, roomData.PosY)
    if err != nil{
      fmt.Println(err.Error());
    }
    m, _ := json.Marshal(msg);
    room.broadcast <- m;
  }

}
