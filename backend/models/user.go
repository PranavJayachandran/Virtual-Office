package models

type User struct {
  UserId string `bson:"_id,omitempty"`;
  UserName string `bson:"username" json:"username"`;
  Password string `bson:"password" json:"password`;
}
