package room

import (
	"encoding/json"
	"fmt"
	"net/http"
	roomdb "virtual-office/db/room"
)

func CreateRoomHandler(w http.ResponseWriter, r *http.Request){
  var roomData struct{
    Id string `json:"ownerId"`;
    PosX int `json:"x"`;
    PosY int `json:"y"`;
    Direction string `json:"direction"`
  };
  decoder := json.NewDecoder(r.Body);

  defer r.Body.Close();

  if err := decoder.Decode(&roomData); err != nil{
    http.Error(w, "Invalid request body", http.StatusBadRequest);
    return;
  }
  w.Header().Set("Content-Type","application/json");
  fmt.Println(roomData)
  id := roomdb.AddRoom(roomData.Id, roomData.PosX, roomData.PosY, roomData.Direction);
  json.NewEncoder(w).Encode(map[string]string{"id":id});
  };

func JoinRoomHandler(w http.ResponseWriter, r *http.Request){
  var roomData struct {
    RoomId string `json:"roomId"`;
    MemberId string `json:"memberId"`;
    PosX int `json:"x"`;
    PosY int `json:"y"`;
    Direction string `json:"direction"`
  }
  decoder := json.NewDecoder(r.Body);

  defer r.Body.Close();

  if err := decoder.Decode(&roomData); err != nil{
    http.Error(w, "Invalid request body", http.StatusBadRequest);
    return;
  }
  w.Header().Set("Content-Type","application/json");

  err := roomdb.AddMemberToRoom(roomData.RoomId, roomData.MemberId, roomData.PosX, roomData.PosY, roomData.Direction);
  if err != nil{
    http.Error(w, err.Error(), http.StatusNotFound);
  }
  json.NewEncoder(w).Encode(map[string]string{"id":roomData.RoomId});
}

func GetRoomHandler(w http.ResponseWriter, r *http.Request){

  var roomId = r.URL.Query().Get("roomId")

  w.Header().Set("Content-Type", "application/json")
  roomDetails, err := roomdb.GetRoom(roomId)
  if err!= nil{
    http.Error(w, err.Error(), http.StatusNotFound)
  }
  json.NewEncoder(w).Encode(roomDetails)
}

