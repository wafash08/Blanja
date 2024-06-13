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

func UpdateColorsProduct(productId uint, updatedColors []Color) error {
	var existingColors []Color
	configs.DB.Where("product_id = ?", productId).Find(&existingColors)

	existingColorsMap := make(map[string]Color)
	for _, color := range existingColors {
		existingColorsMap[color.Value] = color
	}

	for _, color := range updatedColors {
		if _, exists := existingColorsMap[color.Value]; !exists {
			color.ProductID = productId
			if err := configs.DB.Create(&color).Error; err != nil {
				return err
			}
		}
		delete(existingColorsMap, color.Value)
	}

	for _, color := range existingColorsMap {
		if err := configs.DB.Delete(&color).Error; err != nil {
			return err
		}
	}

	return nil
}

func DeleteColorProduct(id int) error {
	result := configs.DB.Delete(&Color{}, "id = ?", id)
	return result.Error
}
