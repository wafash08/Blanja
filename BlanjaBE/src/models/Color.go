package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Color struct {
	gorm.Model
	Value     string `json:"value" validate:"required,iscolor"`
	ProductID uint   `json:"product_id"`
}

func SelectAllColors() []*Color {
	var colors []*Color
	configs.DB.Find(&colors)
	return colors
}

func CreateColorProduct(color *Color) error {
	result := configs.DB.Create(&color)
	return result.Error
}

func UpdateColorProduct(id int, updatedColor *Color) error {
	result := configs.DB.Model(&Color{}).Where("id = ?", id).Updates(updatedColor)
	return result.Error
}

func DeleteColorProduct(id int) error {
	result := configs.DB.Delete(&Color{}, "id = ?", id)
	return result.Error
}
