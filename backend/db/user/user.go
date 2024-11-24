package user

import (
	"context"
	"fmt"
	"virtual-office/db"
	"virtual-office/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func AddUser(user models.User)(string){
  col := db.DbClient.Database("virtual-office").Collection("user");
  result, err := col.InsertOne(context.TODO(),user);
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

func UserExists(userData models.User)(bool){
  col := db.DbClient.Database("virtual-office").Collection("user");
  filter := bson.M{
    "username": userData.UserName,
  };
  var result bson.M;
  err := col.FindOne(context.TODO(), filter).Decode(result);
  if err == mongo.ErrNoDocuments{
    return false;
  }
  return true;
}

func UserPasswordMatch(userData models.User)(bool, string){
  col := db.DbClient.Database("virtual-office").Collection("user");
  filter := bson.M{
    "username": userData.UserName,
    "password": userData.Password,
  };
  var result struct {
		ID string `bson:"_id"`
	}
  err := col.FindOne(context.TODO(), filter).Decode(result);
  if err == mongo.ErrNoDocuments{
    return false, "";
  }
  return true, result.ID;
}

func GetUser(){
  db.DbClient.Database("virtual-office").Collection("user");
}
