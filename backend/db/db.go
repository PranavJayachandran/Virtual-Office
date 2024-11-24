package db

import (
	"context"
	"fmt"
	"os"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)
var DbClient *mongo.Client;
func Init(){
  if err := godotenv.Load(); err!= nil{
    fmt.Println("No .env file found");
  }

  uri := os.Getenv("MONGODB_URI");
  if uri == ""{
    fmt.Println("MONGODB_URI is not set");
  }
  var err error;
  DbClient, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri));
  if err != nil{
    panic(err);
  }

  if err := DbClient.Ping(context.TODO(), readpref.Primary()); err != nil {
        panic(err);
    }
    fmt.Println("connected successfully");
}


