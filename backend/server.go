package main

import (
	"fmt"
	"net/http"
	"virtual-office/db"
	"virtual-office/route"

	"github.com/gorilla/handlers"
)
func main() {
  db.Init();
  mux := route.Init()
  headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:4200"}) // Angular's default port
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	err := http.ListenAndServe(":8000", handlers.CORS(originsOk,headersOk,methodsOk)(mux))
	if err != nil {
		fmt.Println("Couldn't start the server at 8000")
	}
}
