package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	ProductID  uint      `json:"product_id" validate:"required"`
	Quantity   uint      `json:"quantity"`
	SellerID   uint      `json:"seller_id" validate:"required"`
	UserID     uint      `json:"user_id" validate:"required"`
	Seller     Seller    `gorm:"foreignKey:SellerID" validate:"-"`
	Products   []Product `gorm:"many2many:cart_products;" json:"products"`
	User       User      `gorm:"foreignKey:UserID" validate:"-"`
	CheckoutID *uint     `json:"checkout_id"`
	Checkout   Checkout  `gorm:"foreignKey:CheckoutID" validate:"-"`

	// Color     Color		`gorm:"foreignKey:ColorID" validate:"required"`
	// Size      Size      `gorm:"foreignKey:SizeID" validate:"required"`
}

func CreateCart(cart *Cart) error {
	result := configs.DB.Create(&cart)
	return result.Error
}

func SelectAllCart() []*Cart {
	var cart []*Cart
	configs.DB.Preload("Seller").Preload("Products").Find(&cart)
	return cart
}
func SelectCartById(id int) []*Cart {
	var cart []*Cart
	configs.DB.Preload("Seller").Preload("Products").Find(&cart, "user_id = ?", id)
	return cart
}
func DeleteCart(id []int) error {
	result := configs.DB.Delete(&Cart{}, "id = ?", id)
	return result.Error
}
