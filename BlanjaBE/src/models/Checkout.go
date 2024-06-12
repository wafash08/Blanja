package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Checkout struct {
	gorm.Model
	Address Address `json:"address" validate:"required"`
	Cart []Cart `json:"cart" validate:"required"`
	Delivery uint `json:"delivery" validate:"required"`
	Summary uint `json:"summary" validate:"required"`
}

func CreateCheckout(checkout *Checkout) error {
	result := configs.DB.Create(&checkout)
	return result.Error
}