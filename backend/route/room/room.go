package room

import (
	"encoding/json"
	"fmt"
	"net/http"
	roomdb "virtual-office/db/room"
	"virtual-office/models"
)

func CreateRoomHandler(w http.ResponseWriter, r *http.Request){
  roomData, err := getRoomDataFromBody(r);
  if err != nil{
    http.Error(w, "Invalid request body", http.StatusBadRequest);
    return;
  }
  w.Header().Set("Content-Type","application/json");
  id := roomdb.AddRoom(roomData);
  json.NewEncoder(w).Encode(map[string]string{"id":id});
  };

func JoinRoomHandler(w http.ResponseWriter, r *http.Request){
  roomData, err := getRoomDataFromBody(r);
  if err != nil{
    http.Error(w, "Invaid Request Body", http.StatusBadRequest);
    return;
  }
  w.Header().Set("Content-Type","application/json");
  roomDetails, err := roomdb.GetRoom(roomData.RoomId);
  fmt.Println(roomDetails, err);
  if err != nil{
    http.Error(w, err.Error(), http.StatusNotFound);
  }
  json.NewEncoder(w).Encode(roomDetails);
}



func getRoomDataFromBody(r *http.Request)(models.Room, error){
  var roomData models.Room;
  decoder := json.NewDecoder(r.Body);

  defer r.Body.Close();

  if err := decoder.Decode(&roomData); err != nil{
    return models.Room{}, err;
  }
  return roomData, nil
}
