
package models

type Room struct {
  RoomId string `bson:"_id" json:"id"`;
  OwnerId string `bson:"ownerId" json:"ownerId"`;
  MemeberIds []roomUser `bson:"memberIds" json:"memberIds`;
}

type roomUser struct{
  x int;
  y int;
  direction int;
}
// direction would follow the clockwise numbering starting with 0 to top
