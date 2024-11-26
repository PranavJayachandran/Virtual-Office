package route

import (
	"net/http"
	"virtual-office/route/room"
	"virtual-office/route/user"
)

func Init() (*http.ServeMux){
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
  
  mux.HandleFunc("/room", func(w http.ResponseWriter, r *http.Request){
    if r.Method == http.MethodGet{
      room.JoinRoomHandler(w, r);
    } else if r.Method == http.MethodPost{
      room.CreateRoomHandler(w, r);
    } else {
      http.Error(w, "Method not allowed", http.StatusMethodNotAllowed);
    }
  })
  return mux;
}
