package room

import (
	"context"
	"errors"
	"fmt"
	"virtual-office/db"
	"virtual-office/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func AddRoom(room models.Room)(string){
  col := db.DbClient.Database("virtual-office").Collection("room");
  result, err := col.InsertOne(context.TODO(), room);
  if err != nil{
    panic(err);
  }
  fmt.Printf("New user with userId %s was added", result.InsertedID);
  var id string;
  insertedID := result.InsertedID
	// Check the type of the inserted ID and convert it to string
	switch v := insertedID.(type) {
	case string:
		id = v
	case primitive.ObjectID:
		id = v.Hex()
	default:
		id = fmt.Sprintf("%v", insertedID)
	}
  return id;
}
func GetRoom(id string)(models.Room, error){
  col := db.DbClient.Database("virtual-office").Collection("room");
  objectId, _ := primitive.ObjectIDFromHex(id);
  filter := bson.M{
    "_id": objectId,  
  }
  var result models.Room;
  err := col.FindOne(context.TODO(), filter).Decode(&result);
  if err == mongo.ErrNoDocuments{
    return models.Room{}, errors.New("No such room");
  }
  result.RoomId = id
  return result, nil
}

