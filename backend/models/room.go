
package models

type Room struct {
  RoomId string `bson:"_id,omitempty" json:"id"`;
  OwnerId string `bson:"ownerId" json:"ownerId"`;
  MemeberIds []RoomUser `bson:"memberIds" json:"memberIds"`;
}

type RoomUser struct{
  UserId string `bson:"userId" json:"userId"`;
  X string `bson:"x" json:"x"`;
  Y string `bson:"y" json:"y"`;
  Direction string `bson:"direction" json:"direction"`;
}
// direction would follow the clockwise numbering starting with 0 to top
