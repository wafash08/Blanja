package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	ProductID uint      `json:"product_id" validate:"required"`
	Quantity  uint      `json:"quantity"`
	SellerID  uint      `json:"seller_id" validate:"required"`
	UserID    uint      `json:"user_id" validate:"required"`
	Seller    Seller    `gorm:"foreignKey:SellerID" validate:"-"`
	Products  []Product `gorm:"many2many:cart_products;" json:"products"`
	User      User      `gorm:"foreignKey:UserID" validate:"-"`
}

func CreateCart(cart *Cart) (uint, uint, uint, error) {
	result := configs.DB.Create(&cart)
	return cart.ID, cart.Quantity, cart.ProductID, result.Error
}

func SelectAllCart() []*Cart {
	var cart []*Cart
	configs.DB.Preload("Seller").Preload("Products").Find(&cart)
	return cart
}
