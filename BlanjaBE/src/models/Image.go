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

func UpdateImagesProduct(productId uint, updatedImages []Image) error {
	var existingImages []Image
	configs.DB.Where("product_id = ?", productId).Find(&existingImages)

	existingImagesMap := make(map[string]Image)
	for _, image := range existingImages {
		existingImagesMap[image.URL] = image
	}

	for _, image := range updatedImages {
		if _, exists := existingImagesMap[image.URL]; !exists {
			image.ProductID = productId
			if err := configs.DB.Create(&image).Error; err != nil {
				return err
			}
		}
		delete(existingImagesMap, image.URL)
	}

	for _, image := range existingImagesMap {
		if err := configs.DB.Delete(&image).Error; err != nil {
			return err
		}
	}

	return nil
}

func DeleteImageProduct(id int) error {
	result := configs.DB.Delete(&Image{}, "id = ?", id)
	return result.Error
}
