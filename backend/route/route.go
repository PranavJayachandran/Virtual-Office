package route

import (
	"fmt"
	"net/http"
	"virtual-office/route/room"
	"virtual-office/route/user"
)

func Init() (*http.ServeMux){
    manager := &ClientManager{
      rooms : make(map[string]*Room),
    }
  mux := http.NewServeMux()
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			user.LoginHandler(w, r)
		} else {
			http.Error(w, "Method not allower", http.StatusMethodNotAllowed)
		}
	})

  mux.HandleFunc("/sign-up", func(w http.ResponseWriter, r *http.Request){
    if r.Method == http.MethodPost{
      user.SignUpHandler(w,r);
    } else{
      http.Error(w, "Method not allowed", http.StatusMethodNotAllowed);
    }
  })
  
  mux.HandleFunc("/create-room", func(w http.ResponseWriter, r *http.Request){
    if r.Method == http.MethodPost{
      room.CreateRoomHandler(w, r);
    } else {
      http.Error(w, "Method not allowed", http.StatusMethodNotAllowed);
    }
  })
  mux.HandleFunc("/join-room", func(w http.ResponseWriter, r *http.Request){
    if r.Method == http.MethodPost{
      room.JoinRoomHandler(w, r);
    } else {
      http.Error(w, "Method not allowed", http.StatusMethodNotAllowed);
    }
  })
  mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
    fmt.Println("Here")
    handleSocketConnection(manager,w,r);
  })
  return mux;
}
