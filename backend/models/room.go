
package models

type Room struct {
  RoomId string `bson:"_id,omitempty"`;
  OwnerId string `bson:"ownerId" json:"ownerId"`;
  MemeberIds []string `bson:"memberIds" json:"memberIds`;
}
