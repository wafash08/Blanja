package models

import "gorm.io/gorm"
import "gofiber-marketplace/src/configs"

type Cart struct {
	gorm.Model
	ProductID uint `json:"product_id" validate:"required"`
	SellerID uint `json:"seller_id" validate:"required"`
	UserID uint `json:"user_id" validate:"required"`
	Seller Seller `gorm:"foreignKey:SellerID" validate:"-"`
	Products []Product `gorm:"many2many:cart_products;" json:"products"`
	User User `gorm:"foreignKey:UserID" validate:"-"`
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
