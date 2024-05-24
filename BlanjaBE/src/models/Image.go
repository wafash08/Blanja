package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Image struct {
	gorm.Model
	URL       string `json:"url" validate:"required,url"`
	ProductID uint   `json:"product_id"`
}

func SelectImageById(id int) *Image {
	var image Image
	configs.DB.First(&image, "id = ?", id)
	return &image
}

func CreateImageProduct(image *Image) error {
	result := configs.DB.Create(&image)
	return result.Error
}

func UpdateImageProduct(id int, updatedImage *Image) error {
	result := configs.DB.Model(&Image{}).Where("id = ?", id).Updates(updatedImage)
	return result.Error
}

func DeleteImageProduct(id int) error {
	result := configs.DB.Delete(&Image{}, "id = ?", id)
	return result.Error
}
