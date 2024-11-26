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

func AddRoom(ownerId string, posX string, posY string, direction string)(string){
  col := db.DbClient.Database("virtual-office").Collection("room");
  newRoom := models.Room{
    OwnerId: ownerId,
    MemeberIds: []models.RoomUser{{UserId: ownerId,X: posX, Y:posY, Direction: direction}},
  }
  result, err := col.InsertOne(context.TODO(), newRoom);
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
func AddMemberToRoom(roomId string, memberId string, posX string, posY string, direction string)(error){
  col := db.DbClient.Database("virtual-office").Collection("room");
  newMember :=  models.RoomUser{
    UserId : memberId,
    X: posX,
    Y: posY,
    Direction: direction,
  }
  objId, err := primitive.ObjectIDFromHex(roomId);
  if err != nil{
    return err;
  }
  filter := bson.M{"_id":objId};
  update := bson.M{
    "$addToSet": bson.M{
      "memberIds": newMember,
    },
  }

  result, err := col.UpdateOne(context.TODO(),filter, update);
  if err != nil{
    return err;
  }
  if result.MatchedCount == 0{
    return errors.New("Room not found")
  } else if result.MatchedCount == 1{
    return nil
  } else{
    return errors.New("No change");
  }
}
