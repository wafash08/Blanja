package services

import (
	"os"

	"github.com/veritrans/go-midtrans"
)

var Client midtrans.Client

func InitMidtrans() {
	serverKey := os.Getenv("SERVER_KEY")
	clientKey := os.Getenv("CLIENT_KEY")

	Client = midtrans.Client{
		ServerKey: serverKey,
		ClientKey: clientKey,
	}

	Client.APIEnvType = midtrans.Sandbox
}
