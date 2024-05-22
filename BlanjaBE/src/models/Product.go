package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name        string   `json:"name" validate:"required"`
	Price       float64  `json:"price" validate:"required,gt=0"`
	Stock       int      `json:"stock" validate:"required,gt=0"`
	Images      []Image  `json:"images" gorm:"foreignKey:ProductID"`
	Sizes       []Size   `json:"sizes" gorm:"foreignKey:ProductID"`
	Colors      []Color  `json:"colors" gorm:"foreignKey:ProductID"`
	Rating      uint     `json:"rating" gorm:"default:0"`
	Description string   `json:"description" validate:"required"`
	Condition   string   `json:"condition" gorm:"default:new" validate:"oneof=new used"`
	CategoryID  uint     `json:"category_id" validate:"required"`
	Category    Category `gorm:"foreignKey:CategoryID" validate:"-"`
	SellerID    uint     `json:"seller_id" validate:"required"`
	Seller      Seller   `gorm:"foreignKey:SellerID" validate:"-"`
}

type Image struct {
	gorm.Model
	URL       string `json:"url" validate:"required"`
	ProductID uint   `json:"product_id"`
}

type Size struct {
	gorm.Model
	Value     string `json:"value" validate:"required"`
	ProductID uint   `json:"product_id"`
}

type Color struct {
	gorm.Model
	Value     string `json:"value" validate:"required,iscolor"`
	ProductID uint   `json:"product_id"`
}

func SelectAllProducts(keyword, sort string, limit, offset int) []*Product {
	var products []*Product
	keyword = "%" + keyword + "%"
	configs.DB.Preload("Images").Preload("Sizes").Preload("Colors").Preload("Category").Preload("Seller").Order(sort).Limit(limit).Offset(offset).Where("name ILIKE ?", keyword).Find(&products)
	return products
}

func SelectProductById(id int) *Product {
	var product Product
	configs.DB.Preload("Images").Preload("Sizes").Preload("Colors").Preload("Category").Preload("Seller").First(&product, "id = ?", id)
	return &product
}

func CountData(keyword string) int64 {
	var result int64
	keyword = "%" + keyword + "%"
	configs.DB.Table("products").Where("deleted_at IS NULL AND name ILIKE ?", keyword).Count(&result)
	return result
}

func CreateProduct(product *Product) error {
	result := configs.DB.Create(&product)
	return result.Error
}

func UpdateProduct(id int, updatedProduct *Product) error {
	result := configs.DB.Model(&Product{}).Where("id = ?", id).Updates(updatedProduct)
	return result.Error
}

func DeleteProduct(id int) error {
	result := configs.DB.Delete(&Product{}, "id = ?", id)
	return result.Error
}

func CreateImageProduct(image *Image) error {
	result := configs.DB.Create(&image)
	return result.Error
}

func CreateSizeProduct(size *Size) error {
	result := configs.DB.Create(&size)
	return result.Error
}

func CreateColorProduct(color *Color) error {
	result := configs.DB.Create(&color)
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

func UpdateSizeProduct(id int, updatedSize *Size) error {
	result := configs.DB.Model(&Size{}).Where("id = ?", id).Updates(updatedSize)
	return result.Error
}

func DeleteSizeProduct(id int) error {
	result := configs.DB.Delete(&Size{}, "id = ?", id)
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

// func updateImages(product *Product, updatedImages []Image) {
// 	existingIDs := make(map[uint]struct{})
// 	for _, img := range product.Images {
// 		existingIDs[img.ID] = struct{}{}
// 	}
// 	updatedIDs := make(map[uint]struct{})
// 	for _, updatedImg := range updatedImages {
// 		updatedIDs[updatedImg.ID] = struct{}{}
// 	}

// 	// Delete removed images
// 	for id := range existingIDs {
// 		if _, exists := updatedIDs[id]; !exists {
// 			configs.DB.Where("id = ?", id).Delete(&Image{})
// 		}
// 	}

// 	// Add or update images
// 	for _, updatedImg := range updatedImages {
// 		if updatedImg.ID == 0 {
// 			// New image
// 			updatedImg.ProductID = product.ID
// 			configs.DB.Create(&updatedImg)
// 		} else {
// 			// Existing image
// 			configs.DB.Model(&Image{}).Where("id = ?", updatedImg.ID).Updates(updatedImg)
// 		}
// 	}
// }
