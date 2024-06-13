package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Checkout struct {
    gorm.Model
    AddressID uint     `json:"address_id"`
    Address   Address  `gorm:"foreignKey:AddressID" validate:"-"`
    Carts     []Cart   `gorm:"many2many:checkout_carts;" validate:"-"`
    Delivery  uint     `json:"delivery" validate:"required"`
    Summary   uint     `json:"summary" validate:"required"`
    UserID    uint     `json:"user_id" validate:"required"`
    User      User     `gorm:"foreignKey:UserID" validate:"-"`
}

type CheckoutCart struct {
    CheckoutID uint
    CartID     uint
}

func CreateCheckout(checkout *Checkout) error {
	result := configs.DB.Create(&checkout)
	return result.Error
}
func SelectCheckoutById(id int) *Checkout {
	var checkout *Checkout
	configs.DB.Preload("Address").Preload("Carts.Products").First(&checkout, "user_id = ?", id)
	return checkout
}
