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

func UpdateSizesProduct(productId uint, updatedSizes []Size) error {
	var existingSizes []Size
	configs.DB.Where("product_id = ?", productId).Find(&existingSizes)

	existingSizesMap := make(map[string]Size)
	for _, size := range existingSizes {
		existingSizesMap[size.Value] = size
	}

	for _, size := range updatedSizes {
		if _, exists := existingSizesMap[size.Value]; !exists {
			size.ProductID = productId
			if err := configs.DB.Create(&size).Error; err != nil {
				return err
			}
		}
		delete(existingSizesMap, size.Value)
	}

	for _, size := range existingSizesMap {
		if err := configs.DB.Delete(&size).Error; err != nil {
			return err
		}
	}

	return nil
}

func DeleteSizeProduct(id int) error {
	result := configs.DB.Delete(&Size{}, "id = ?", id)
	return result.Error
}
