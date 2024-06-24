package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	UserID     uint `json:"user_id" validate:"required"`
	User       User `gorm:"foreignKey:UserID" validate:"-"`
	CheckoutID uint `json:"checkout_id" validate:"required"`
	// Checkout      Checkout      `gorm:"foreignKey:CheckoutID" validate:"-"`
	Status string `json:"status" validate:"required,oneof=not_yet_paid get_paid processed sent completed canceled"`
}

func SelectAllOrders() []*Order {
	var orders []*Order
	configs.DB.Preload("User").Find(&orders)
	return orders
}

func SelectOrderbyId(id int) *Order {
	var order Order
	configs.DB.Preload("User").First(&order, "id = ?", id)
	return &order
}

func SelectOrdersbyUserId(userID int) []*Order {
	var orders []*Order
	configs.DB.Preload("User").Find(&orders, "user_id = ?", userID)
	return orders
}

// func SelectOrderbyStatus(status string) *Order {
// 	var order Order
// 	configs.DB.Preload("User").First(&order, "status = ?", status)
// 	return &order
// }

// func SelectOrdersbyStatus(status string) []*Order {
// 	var orders []*Order
// 	configs.DB.Preload("User").Find(&orders, "status = ?", status)
// 	return orders
// }

func CreateOrder(order *Order) error {
	result := configs.DB.Create(&order)
	return result.Error
}

func UpdateOrder(id int, updatedOrder *Order) error {
	result := configs.DB.Model(&Order{}).Where("id = ?", id).Updates(updatedOrder)
	return result.Error
}

func UpdateStatusOrder(id int, updatedOrder *Order) error {
	result := configs.DB.Model(&Order{}).Where("id = ?", id).Updates(updatedOrder)
	return result.Error
}

func DeleteOrder(id int) error {
	result := configs.DB.Delete(&Order{}, "id = ?", id)
	return result.Error
}
