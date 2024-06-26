package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Checkout struct {
    gorm.Model
    // AddressID uint     `json:"address_id"`
    // Address   Address  `gorm:"foreignKey:AddressID" validate:"-"`
    Carts     []Cart   `json:"carts"`
    Delivery  uint     `json:"delivery" validate:"required"`
    Summary   uint     `json:"summary" validate:"required"`
    UserID    uint     `json:"user_id" validate:"required"`
    User      User     `gorm:"foreignKey:UserID" validate:"-"`
}

func CreateCheckout(checkout *Checkout) error {
	result := configs.DB.Create(&checkout)
	return result.Error
}
func SelectCheckoutById(id int) *Checkout {
	var checkout *Checkout
	configs.DB.Preload("Carts.Products").First(&checkout, "user_id = ?", id)
	return checkout
}
