package main

//import "net/http"
import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type Config struct {
	Server string
	Input  string
}

type PostRequest struct {
	UriPart string
	Paylaod string
}

var post_CreateDesign = PostRequest{"CreateDesign", `{
	"sneaker" : "org.acme.sample.Sneaker#1290",
	"plasticAmount": 1
}`}
var post_MaterialCollection = PostRequest{"MaterialCollection", ""}
var post_Manufacture = PostRequest{"Manufacture", ""}
var post_SendShoe = PostRequest{"SendShoe", ""}
var post_LoginAtLocation = PostRequest{"LoginAtLocation", ""}
var post_LogOutFromLocation = PostRequest{"LogOutFromLocation", ""}
var post_Recycle = PostRequest{"Recycle", ""}

func main() {
	messages := make(chan string)
	go getDataFromDevice(messages)
	createTestData(messages)
}

func createTestData(messages chan string) {
	for true {
		reader := bufio.NewReader(os.Stdin)
		text, _ := reader.ReadString('\n')
		messages <- text
	}
}

func postDataToREST(endpint string, body string) {
	var byteString = []byte(body)
	url := "http://159.122.178.244:31090/api/" + endpint
	fmt.Println(body)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(byteString))
	req.Header.Set("X-Custom-Header", "myvalue")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println("Status:", resp.Status)
}

func getDataFromDevice(messages chan string) {
	log.Println("I'm starting to listen")
	for true {
		msg := <-messages
		msg = strings.Trim(msg, "\n")
		switch msg {
		case "createdesign", "1":
			postDataToREST(post_CreateDesign.UriPart, post_CreateDesign.Paylaod)
		case "manufacture", "2":
			postDataToREST(post_Manufacture.UriPart, post_Manufacture.Paylaod)
		case "loginatlocation", "3":
			postDataToREST(post_LoginAtLocation.UriPart, post_LoginAtLocation.Paylaod)
		case "logoutfromlocation", "4":
			postDataToREST(post_LogOutFromLocation.UriPart, post_LogOutFromLocation.Paylaod)
		case "recycle", "5":
			postDataToREST(post_Recycle.UriPart, post_Recycle.Paylaod)
		default:
			fmt.Println("Wrong format", msg)
		}
		time.Sleep(2 * time.Second)
	}
}
