package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Size struct {
	gorm.Model
	Value     string `json:"value" validate:"required"`
	ProductID uint   `json:"product_id"`
}

func SelectAllSizes() []*Size {
	var sizes []*Size
	configs.DB.Find(&sizes)
	return sizes
}

func SelectSizesByProductId(id int) []*Size {
	var sizes []*Size
	configs.DB.Where("product_id = ?", id).Find(&sizes)
	return sizes
}

func CreateSizeProduct(size *Size) error {
	result := configs.DB.Create(&size)
	return result.Error
}

func UpdateSizeProduct(id int, updatedSize *Size) error {
	result := configs.DB.Model(&Size{}).Where("id = ?", id).Updates(updatedSize)
	return result.Error
}

func DeleteSizeProduct(id int) error {
	result := configs.DB.Delete(&Size{}, "id = ?", id)
	return result.Error
}
