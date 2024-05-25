package models

import (
	// "gofiber-marketplace/src/configs"

	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type CartProduct struct {
	gorm.Model
	CartID    uint `json:"cart_id"`
	ProductID uint `json:"product_id"`
	Quantity uint `json:"quantity"`
}
func CreateCartProduct(cartProduct *CartProduct) error {
	result := configs.DB.Create(&cartProduct)
	return result.Error
}

// func SelectAllCart() []*CartProduct {
// 	var cartProduct []*CartProduct
// 	configs.DB.Preload("Seller").Preload("Products").Find(&cartProduct)
// 	return cartProduct
// }