package user

import (
	"encoding/json"
	"net/http"
	userdb "virtual-office/db/user"
	"virtual-office/models"
)

const userDoesNotExists = "User does not exist";
const successFullLogin = "Successfull login";
const wrongPassWord = "Wrong Password";
const userNameAlreadyTaken = "Username already taken";

func LoginHandler(w http.ResponseWriter, r *http.Request) {
  userData, err := getUserDataFromBody(r);
  if err != nil{
    http.Error(w, "Invalid request body", http.StatusBadRequest);
    return;
  }
  w.Header().Set("Content-Type", "application/json");
  match,id := userdb.UserPasswordMatch(userData);
  if match {
    json.NewEncoder(w).Encode(map[string]string{"msg": successFullLogin, "id": id});
    return;
  }
  json.NewEncoder(w).Encode(map[string]string{"msg": wrongPassWord});
}
func SignUpHandler(w http.ResponseWriter, r *http.Request){
  userData, err := getUserDataFromBody(r);
  if err != nil{
    http.Error(w, "Invalid request body", http.StatusBadRequest);
    return ;
  }
  w.Header().Set("Content-Type", "application/json");
  if userdb.UserExists(userData){
    json.NewEncoder(w).Encode(map[string]string{"msg": userNameAlreadyTaken});
    return;
  }
  userId := userdb.AddUser(userData);
  json.NewEncoder(w).Encode(map[string]string{"id": userId});
}

func getUserDataFromBody(r *http.Request)(models.User, error){
  var userData models.User;
  decoder := json.NewDecoder(r.Body);
  defer r.Body.Close();

  if err := decoder.Decode(&userData); err != nil{
    return models.User{} , err;
  }
  return userData, nil;
}
